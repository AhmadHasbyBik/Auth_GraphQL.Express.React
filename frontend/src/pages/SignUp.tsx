import React, { useState } from "react";
import { useSignUpMutation } from "../gql/graphql";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup] = useSignUpMutation();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        try {
          const response = await signup({
            variables: {
              username,
              email,
              password
            }
          });
        
          console.log(response);

          navigate("/")
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }}
    >
      <div>
        <input
          value={username}
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
