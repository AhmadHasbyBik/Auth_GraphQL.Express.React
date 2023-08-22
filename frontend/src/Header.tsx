import { Link } from "react-router-dom";
import { useIdentifyQuery, useLogoutMutation } from "./gql/graphql";
import { setAccessToken } from "./accessToken";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading } = useIdentifyQuery({ fetchPolicy: "network-only" });
  const [ logout, {client}] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.identify) {
    body = <div>Youre Logged in as "{data.identify.username}"</div>;
  } else {
    body = <div>You've Not Logged in</div>;
  }

  return (
    <header>
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/check">CheckID</Link>
        </div>
        <div>
          {!loading && data && data.identify ? (
          <button
            onClick={async () => {
              await logout();
              setAccessToken("")
              await client.resetStore()
            }}
          >
            Logout
          </button>
          ) : null}
        </div>
      </div>
      {body}
    </header>
  );
};
