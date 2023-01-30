
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export async function connectDB() {
    var db;
    try {
        await client.connect((err: any) => {
            db = client.db("Conscience");
        });
        console.log("successfully connected")
        return db;
    } catch (e) {
        console.log(e)
        return null;
    }
}
