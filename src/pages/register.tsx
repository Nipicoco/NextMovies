import { useState, useEffect } from 'react';
import styles from '@/styles/Register.module.css';
import TopbarRegister from '@/components/RegisterTop';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

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

    try {
      const response = await fetch('/api/connector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setMessage(data.message);
        setError(null);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMessage(null);
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage(null);
      setError(null);
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
            <label htmlFor="email" className={styles.formLabel}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {error && <p className={styles.formError}>{error}</p>}
          {message && <p className={styles.formMessage}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
