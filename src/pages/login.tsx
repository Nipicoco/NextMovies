import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/Login.module.css';

import TopbarLogin from '@/components/LoginTop';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    
    const url = 'https://cors-anywhere.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/findOne';
    const payload = {
      collection: 'users',
      database: 'movies',
      dataSource: 'nextjs',
      "filter": {"username": username}
    };
    const headers = {
      'Content-Type': 'application/json',
      'api-key': 'J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U', 
    };
    try {
        const response = await axios.post(url, payload, { headers: headers });
      
        if (response.status === 200) {
          const result = response.data;
      
          if (result.document === null) {
            setErrorMessage('Username not found');
            setSuccessMessage('');
          } else if (result.document.password === password) {
            setSuccessMessage(`Logged in successfully with Username: ${username}`);
            setTimeout(() => {
              window.location.href = '/movies';
            }, 1500);
          } else {
            setErrorMessage('Incorrect password');
            setSuccessMessage('');
          }
        } else {
          console.log('Error:', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    };

      

  return (
    <div>
      <div className={styles.loginBar}>
        <TopbarLogin />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleLogin} className={styles.form}>
          <h1 className={styles.formTitle}>Login</h1>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username:
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.formButton}
          >
            Login
          </button>
            <div className={styles.formMessage}>{successMessage}</div>
            <div className={styles.formError}>{errorMessage}

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
