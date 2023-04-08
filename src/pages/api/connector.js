import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    const db = client.db('movies'); // modify database name to 'movies'
    const collection = db.collection('users'); // modify collection name to 'users'

    if (req.method === 'GET') {
      const documents = await collection.find().toArray();

      // Return the results as JSON
      res.status(200).json(documents);
    } else if (req.method !== 'POST') {
      // If the request is not a POST request, return an error message
      return res.status(405).json({ error: 'Method not allowed' });
    } else {
      const { email, password } = req.body;
  
      if (!email || !password) {
        // If either email or password is missing, return an error message
        return res.status(400).json({ error: 'Missing data' });
      }
  
      const client = new MongoClient(process.env.MONGODB_URI);
  
      try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        // Make the appropriate DB calls
        const db = client.db('movies'); // modify database name to 'movies'
        const collection = db.collection('users'); // modify collection name to 'users');
  
        if (typeof email !== 'string' || typeof password !== 'string') {
          // If either email or password is not a string, return an error message
          return res.status(400).json({ error: 'Invalid data' });
        }
  
        const existingUser = await collection.findOne({ email });
  
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
  
        const result = await collection.insertOne({ email, password });
  
        // Return the results as JSON
        res.status(201).json({ message: 'User created', data: result.ops });
    
      } catch (err) {
        console.error(err);

        // Return an error message as JSON
        res.status(500).json({ error: 'Unable to connect to the database' });
      } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
      }
    }
  } catch (err) {
    console.error(err);

    // Return an error message as JSON
    res.status(500).json({ error: 'Unable to connect to the database' });
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}