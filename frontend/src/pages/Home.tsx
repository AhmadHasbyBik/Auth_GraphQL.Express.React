import React from "react";
import { useUsersQuery } from "../gql/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery({fetchPolicy: 'network-only'})

  if(!data){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>Users:</div>
      <ul>
        {data.users.map( x => {
          return (
            <li key={x.id}> {x.id}, {x.username}, {x.email}</li>
          )
        })}
      </ul>
    </div>
  );
};
