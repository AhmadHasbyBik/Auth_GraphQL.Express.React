import React, { useState } from "react";
import { IdentifyDocument, IdentifyQuery, useSignInMutation } from "../gql/graphql";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../accessToken";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin] = useSignInMutation();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        try {
          const response = await signin({
            variables: {
              email,
              password
            },
            update: (store, { data }) => {
              if (!data){
                return null
              }
              store.writeQuery<IdentifyQuery>({
                query: IdentifyDocument,
                data: {
                  identify: data.signIn.user
                }                 
              })
            }
          });
        
          console.log(response);

          if (response && response.data){
            setAccessToken(response.data.signIn.accessToken)
          }

          navigate("/")
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }}
    >
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
      <button type="submit">Login</button>
    </form>
  );
};
