import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://prohitpatel012_db_user:fq1y8VqEWHAZ1sxW@cluster0.uftbisu.mongodb.net/pro-animix-ui?appName=Cluster0';

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (cached.conn && (cached.conn as any).connection.readyState === 1) {
        return cached.conn;
    }

    // If connection exists but is disconnected, clear it so we can reconnect
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (cached.conn && (cached.conn as any).connection.readyState === 0) {
        cached.conn = null;
        cached.promise = null;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
