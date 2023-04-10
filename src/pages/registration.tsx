import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const url = 'https://cors-anywhere.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/insertOne';

    const payload = {
      collection: 'users',
      database: 'movies',
      dataSource: 'nextjs',
      document: {
        email: email,
        password: password
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      'api-key': 'J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U', 
    };

    try {
      const response = await axios.post(url, payload, { headers: headers });
      console.log(response.data);

      // Set the success message on successful form submission
      setSuccessMessage('Form submitted successfully.');

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (password && confirmPassword) {
      timer = setTimeout(() => {
        setPasswordMatch(password === confirmPassword);
      }, 1000);
    } else {
      setPasswordMatch(true);
    }
    return () => clearTimeout(timer);
  }, [password, confirmPassword]);

  return (
    <form onSubmit={handleSubmit}>
      {successMessage && (
        <p style={{ color: 'green' }}>{successMessage}</p>
      )}

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <div>
            <label htmlFor="confirmPassword" >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            
              required
            />
            {!passwordMatch && (
              <p>Passwords do not match</p>
            )}
          </div>

      <button type="submit"
      disabled={!passwordMatch}
      >Submit</button>
      
    </form>
  );
};

export default RegistrationForm;
