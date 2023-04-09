import { useState } from 'react';
import axios, { AxiosBasicCredentials } from 'axios';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [second, setSecond] = useState('');
  
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formData = {
      Field1: name,
      Field2: second,
      Field3: email,
    };

    const options = {
      method: 'POST',
      url: 'https://nipicoco.wufoo.com/api/v3/forms/q1o9nf8l199r4ia/entries.json',
      auth: {
        username: 'VRKY-WG80-IFIJ-QEKF',
        password: 'GVF7HM4eree.B8@'
      } as AxiosBasicCredentials,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(formData)
    };

    try {
      const response = await axios(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label  htmlFor="second">Second:</label>
        <input

          type="text"
          id="second"
          name="second"
          value={second}
          onChange={(event) => setSecond(event.target.value)}
        />
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
