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
    } else if (req.method === 'POST') {
      const { email, password } = req.body;
    
      if (!email || !password) {
        // If either email or password is missing, return an error message
        return res.status(400).json({ error: 'Missing data' });
      }
    
      try {
        const url = "https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/insertOne";
    
        const payload = JSON.stringify({
          "collection": "users",
          "database": "movies",
          "dataSource": "nextjs",
          "document": {
            "email": email,
            "password": password
          }
        });
    
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': "J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U",
          'Accept': 'application/ejson'
        };
    
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: payload
        });
    
        const data = await response.json();
    
        // Return the results as JSON
        res.status(201).json({ message: 'User created', data: data });
    
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