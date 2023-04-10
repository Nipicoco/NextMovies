import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/Login.module.css';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import TopbarLogin from '@/components/LoginTop';
import RickRollPage from '@/utils/rickroll';

const LoginForm = () => {
  
  RickRollPage();

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    
    const api = 'https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/findOne';
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
        const response = await axios.post(api, payload, { headers: headers });
      
        if (response.status === 200) {
          const result = response.data;
      
          if (result.document === null) {
            setErrorMessage('Username not found');
            setSuccessMessage('');
          } else if (result.document.password === password) {
            const token = uuidv4();
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            
            setSuccessMessage(`Logged in successfully with Username: ${username}`);
            console.log('token', token);
            console.log('username', username);
            
            setTimeout(() => {
              router.push('/movies');
              
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
   
  //console log the token as soon as the page loads
  useEffect(() => {
    //if token is not present in local storage, redirect to login page
    if (!localStorage.getItem("token")) {
      console.log('No token found');
      
    }
    else {
      console.log('Token found');
      alert('Already logged in');
      console.log('Token:', localStorage.getItem("token"));
      console.log('Username:', localStorage.getItem("username"));
      router.push('/movies');
    }
  }, []);



  
      

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
