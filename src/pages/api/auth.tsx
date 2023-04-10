import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function authHandler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;
  
    try {
      const response = await axios.get(`/api/users/${username}`);
  
      if (response.status === 200) {
        const result = response.data;
  
        if (result.document === null) {
          res.status(401).json({ error: 'Username not found' });
        } else if (result.document.password === password) {
          res.status(200).json({ message: `Logged in successfully with Username: ${username}` });
        } else {
          res.status(401).json({ error: 'Incorrect password' });
        }
      } else {
        console.log('Error:', response.statusText);
        res.status(500).json({ error: 'Server error' });
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  
  