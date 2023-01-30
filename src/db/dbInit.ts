
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export async function connectDB() {
    try {
        const clientPromise = client.connect();
        console.log("successfully connected")
        return clientPromise;
    } catch (e) {
        console.log(e)
        return null;
    }
}
