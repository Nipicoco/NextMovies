import { useState } from "react";
import axios from "axios";

export default function Find2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://sa-east-1.aws.data.mongodb-api.com/app/data-oprvr/endpoint/data/v1/action/findOne",
        {
          database: "movies",
          dataSource: "nextjs",
          collection: "users",
          filter: { email: email },
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '* ',
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "api-key":
              "J0cohJmGqJP5pzyqAkk2sXiiUBJcIUUSYqbGubhwPzabRUBtxU4FEARcXmOBCX8U",
            Accept: "application/ejson",
          },
        }
      );
      const result = response.data.document;
      if (result === null) {
        setMessage("Email not found");
      } else if (result.password === password) {
        setMessage("Signed in successfully");
      } else {
        setMessage("Incorrect password");
      }
    } catch (error) {
      setMessage(`Error`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
