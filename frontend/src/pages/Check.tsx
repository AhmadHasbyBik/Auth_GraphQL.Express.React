import React from "react";
import { useCheckQuery } from "../gql/graphql";

interface Props {}

export const Check: React.FC<Props> = () => {
  const { data, loading, error } = useCheckQuery({
    fetchPolicy: "network-only"
  })

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return <div>{data.checkIDWithJWT}</div>;
};
