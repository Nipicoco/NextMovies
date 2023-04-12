import { useState, useEffect } from 'react';
import styles from '@/styles/Register.module.css';
import TopbarRegister from '@/components/RegisterTop';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import RickRollPage from '@/utils/rickroll';



const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    
    e.preventDefault();
    if (username === 'admin') {
      setErrorMessage('Username cannot be admin');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    const url =
      "https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/find";
    const payload = {
      collection: "users",
      database: "movies",
      dataSource: "nextjs",
      filter: { username },
    };
    const headers = {
      "Content-Type": "application/json",
      "api-key":
        "J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U",
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      const users = data.documents;
      if (users.length > 0) {
        setErrorMessage('Username already exists');
        console.log('Username already exists');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      } else {
        try {
          const url2 =
            'https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/insertOne';
          const payload2 = {
            collection: 'users',
            database: 'movies',
            dataSource: 'nextjs',
            document: {
              username: username,
              password: password,
            },
          };
          const headers2 = {
            'Content-Type': 'application/json',
            'api-key': 'J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U',
          };
    
            const response = await axios.post(url2, payload2, { headers: headers2 });
            console.log(response.data);
    
            setSuccessMessage(`Form submitted successfully with Username: ${username} Password: ${password}`);
            setTimeout(() => {
              router.push('/login');
            }, 1500);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log('No token found'); 
    }
    else {
      console.log('Token found');
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div>
      <div className={styles.registerBar}>
        <TopbarRegister />
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.formTitle}>Register</h1>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Username:
            </label>
            <input
              type="username"
              id="username"
              onChange={(e) => {
                const usernameValue = e.target.value.trim().toLowerCase();
                if (usernameValue !== 'admin') {
                  setUsername(usernameValue);
                }
              }}
              minLength={5}
              value={username}
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
              minLength={5}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.formInput}
              required
            />
            {!passwordMatch && (
              <p className={styles.formError}>Passwords do not match</p>
            )}
          </div>
          <button
            type="submit"
            className={styles.formButton}
            disabled={!passwordMatch}
          >
            Register
          </button>
          <div className={styles.succes}
          >{successMessage}
          <div className={styles.error}
          >{errorMessage}

          

          </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Register;