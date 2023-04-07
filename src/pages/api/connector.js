import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      // Connect to the MongoDB cluster
      await client.connect();
    
      // Make the appropriate DB calls
      const db = client.db('movies'); // modify database name to 'movies'
      const collection = db.collection('users'); // modify collection name to 'users'
      const documents = await collection.find().toArray();
    
      // Return the results as JSON
      res.status(200).json(documents);
    } catch (err) {
      console.error(err);
    
      // Return an error message as JSON
      res.status(500).json({ error: 'Unable to connect to the database' });
    } finally {
      // Close the connection to the MongoDB cluster
      await client.close();
    }
    
}
