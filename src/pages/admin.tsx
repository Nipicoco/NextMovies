import { useState, useEffect } from "react";
import styles from "@/styles/Users.module.css";
import router from "next/router";

interface User {
  _id: string;
  username: string;
  password: string;
}

interface Props {
  users: User[];
}

const Users = ({ users }: Props) => {
  const [loadedUsers, setLoadedUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername !== "admin") {
      alert("You are not authorized to view this page");
      router.push("/login");
    }
  }, []);

  const handleUsers = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const url =
      "https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/find";
    const payload = {
      collection: "users",
      database: "movies",
      dataSource: "nextjs",
      filter: {},
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

    const data = await res.json();
    const users = data.documents;

    setLoadedUsers(users);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = loadedUsers && loadedUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.userlist}>
        <div>
          <button onClick={handleUsers} className={styles.button}>
            Get Users
          </button>
          <div>
            <div>
              <h1>Users</h1>
              <div>
                <input
                  type="text"
                  placeholder="Search by username"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                />
              </div>
            </div>
            <div>
              <table className={styles.formgroup}>
                <tbody>
                {filteredUsers && filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                  </tr>
                ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
