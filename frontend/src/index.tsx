import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { getAccessToken, setAccessToken } from "./accessToken";
import { App } from "./App";
import { onError } from "@apollo/client/link/error";
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, Observable } from '@apollo/client';
import jwtDecode from "jwt-decode" // eslint-disable-next-line
import { TokenRefreshLink } from "apollo-link-token-refresh";

interface DecodedToken {
  exp: number;
}

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((operation) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accesToken",
      isTokenValidOrUndefined: () => {
        return new Promise<boolean>((resolve) => {
          const token = getAccessToken();
      
          if (!token) {
            resolve(true);
            return;
          }
      
          try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const { exp } = decodedToken;
      
            if (Date.now() >= exp * 1000) {
              resolve(false);
            } else {
              resolve(true);
            }
          } catch (error) {
            resolve(false);
          }
        });
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include"
        });
      },
      handleFetch: accessToken => {
        setAccessToken(accessToken)
      },
      handleError: err => {
         console.warn('Your refresh token is invalid. Try to relogin');
         console.error(err);
      }       
    }) as unknown as ApolloLink,
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
    }),
  ]),
  cache
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
