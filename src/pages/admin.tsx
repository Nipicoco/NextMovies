import { useState, useEffect, SetStateAction } from "react";
import styles from "@/styles/Users.module.css";
import router from "next/router";



const UserList = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [changePasswordUser, setChangePasswordUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
 
  const fetchUsers = async () => {
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

  const handlePasswordClick = async (username: SetStateAction<string>, password: SetStateAction<string>) => {
    const confirmChange = window.confirm(
      `Are you sure you want to change the password for ${username}?`
    );
    if (confirmChange) {
      const url =
        "https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/updateOne";
      const payload = {
        collection: "users",
        database: "movies",
        dataSource: "nextjs",
        filter: { username: username },
        update: { $set: { password: password } },
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
      console.log(data);

      setChangePasswordUser(username);
      setNewPassword(password);
      console.log(data);
      alert("Password changed successfully for " + username);
      fetchUsers();
    }
  };

  const handlePasswordEdit = (event, username, password) => {
    const key = event.which || event.keyCode;
    if (key === 13) {
      const newPassword = event.target.textContent.trim();
      if (newPassword && newPassword !== password) {
        handlePasswordClick(username, newPassword);
      } else {
        event.target.textContent = password;
      }
      event.preventDefault();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername !== "admin") {
      localStorage.removeItem("token");
      router.push("/login");
      setTimeout(() => {
        alert("You are not authorized to view this page");
      }, 500);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.userlist}>
        <div>
          <div>
            <div>
              <h1>Users</h1>
            </div>
            <div>
              <table className={styles.formgroup}>
                <tbody>
                  {loadedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td
                        contentEditable
                        suppressContentEditableWarning
                        onKeyPress={(event) =>
                          handlePasswordEdit(event, user.username, user.password)
                        }
                      >
                        {user.password}
                      </td>
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

export default UserList;
