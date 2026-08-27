// Server-only MongoDB access. Never import this from client code.
import { MongoClient, type Db } from "mongodb";

let clientPromise: Promise<MongoClient> | undefined;

function getClient(): Promise<MongoClient> {
  const uri = process.env["MONGODB_URI"];
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
    }).connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(process.env["MONGODB_DB"] || "codeninjavik");
}

export type MongoOverview = {
  users: number;
  activeSubscriptions: number;
  totalSubscriptions: number;
  devices: number;
  purchases: number;
  revenue: number;
  downloads: number;
  latestRelease: {
    version: string | null;
    fileSizeMb: number | null;
    url: string | null;
    notes: string | null;
  } | null;
};

export async function fetchOverview(): Promise<MongoOverview> {
  const db = await getDb();
  const [
    users,
    activeSubscriptions,
    totalSubscriptions,
    devices,
    downloads,
    revenueAgg,
    release,
  ] = await Promise.all([
    db.collection("users").estimatedDocumentCount(),
    db.collection("myra_subscriptions").countDocuments({ status: "active" }),
    db.collection("myra_subscriptions").estimatedDocumentCount(),
    db.collection("myra_devices").estimatedDocumentCount(),
    db.collection("appreleasedownloads").estimatedDocumentCount(),
    db
      .collection("purchases")
      .aggregate([
        { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
      ])
      .toArray(),
    db.collection("appreleases").findOne({}, { sort: { updatedAt: -1 } }),
  ]);

  const agg = revenueAgg[0] as { total?: number; count?: number } | undefined;

  return {
    users,
    activeSubscriptions,
    totalSubscriptions,
    devices,
    purchases: agg?.count ?? 0,
    revenue: agg?.total ?? 0,
    downloads,
    latestRelease: release
      ? {
          version: (release["versionName"] as string) ?? null,
          fileSizeMb: (release["fileSizeMb"] as number) ?? null,
          url: (release["apkAssetUrl"] as string) ?? null,
          notes: (release["releaseNotes"] as string) ?? null,
        }
      : null,
  };
}

export type MongoSubscription = {
  id: string;
  userId: string;
  name: string | null;
  email: string | null;
  plan: string | null;
  status: string | null;
  startDate: string | null;
  expiryDate: string | null;
};

export async function fetchRecentSubscriptions(
  limit: number,
): Promise<MongoSubscription[]> {
  const db = await getDb();
  const rows = await db
    .collection("myra_subscriptions")
    .aggregate([
      { $sort: { updatedAt: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "myra_profiles",
          localField: "userId",
          foreignField: "userId",
          as: "profile",
        },
      },
    ])
    .toArray();

  return rows.map((r) => {
    const profile = (r["profile"] as Array<Record<string, unknown>>)?.[0];
    return {
      id: String(r["_id"]),
      userId: String(r["userId"] ?? ""),
      name: (profile?.["fullName"] as string) ?? (profile?.["name"] as string) ?? null,
      email: (profile?.["email"] as string) ?? null,
      plan: (r["plan"] as string) ?? null,
      status: (r["status"] as string) ?? null,
      startDate: r["startDate"] ? String(r["startDate"]) : null,
      expiryDate: r["expiryDate"] ? String(r["expiryDate"]) : null,
    };
  });
}
