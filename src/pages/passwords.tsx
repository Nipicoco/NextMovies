import { useState, useEffect } from "react";

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

  const handlePasswordClick = (username) => {
    const confirmChange = window.confirm(
      `Are you sure you want to change the password for ${username}?`
    );
    if (confirmChange) {
      const newPassword = prompt("Enter new password:");
      setChangePasswordUser(username);
      setNewPassword(newPassword);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const url =
      "https://proxymovies.herokuapp.com/https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/updateOne";
    const payload = {
      collection: "users",
      database: "movies",
      dataSource: "nextjs",
      filter: { username: changePasswordUser },
      update: { $set: { password: newPassword } },
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {loadedUsers.map((user) => (
          <li key={user._id} onClick={() => handlePasswordClick(user.username)}>
            {user.username}
          </li>
        ))}
      </ul>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="text"
          id="newPassword"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default UserList;
