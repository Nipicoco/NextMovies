import React from 'react';
import fetch from 'isomorphic-unfetch';
import { NextPage } from 'next';
import styles from '@/styles/Users.module.css';

interface User {
  _id: string;
  username: string;
  password: string;
}

interface Props {
  users: User[];
}

const Home: NextPage<Props> = (props) => {
  return (
    <div className={styles.container}>
      <ul className={styles.form}>
      <h1 className={styles.Title}>Users</h1>
        {props.users.map(user => (
          <li key={user._id} className={styles.Users}>
            <p>Username: {user.username}</p>
            <p>Password: {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

Home.getInitialProps = async function() {
  const res = await fetch('https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U',
      'Accept': 'application/ejson'
    },
    body: JSON.stringify({
      database: 'movies',
      dataSource: 'nextjs',
      collection: 'users',
      filter: {}
    })
  });

  const data = await res.json();
  return { users: data.documents };
};

export default Home;
