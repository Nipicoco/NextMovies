import { useState, useEffect } from 'react';
import styles from '@/styles/Register.module.css';
import TopbarRegister from '@/components/RegisterTop';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

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
    const url = 'https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/insertOne';
    const payload = {
      collection: 'users',
      database: 'movies',
      dataSource: 'nextjs',
      document: {
        username: username,
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

      // Set the success message on successful form submission with user email and password
      setSuccessMessage(`Form submitted successfully with Username: ${username} Password: ${password}`);
      //timeout to redirect to movies page after 3 seconds
      setTimeout(() => {
        // use router to redirect to home page
        router.push('/login');
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

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

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
