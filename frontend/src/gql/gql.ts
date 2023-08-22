/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Check {\n  checkIDWithJWT\n}": types.CheckDocument,
    "query ExampleQuery {\n  hello\n}": types.ExampleQueryDocument,
    "query Identify {\n  identify {\n    id\n    username\n    email\n  }\n}": types.IdentifyDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation SignIn($password: String!, $email: String!) {\n  signIn(password: $password, email: $email) {\n    success\n    message\n    accessToken\n    user {\n      id\n      username\n      email\n    }\n  }\n}": types.SignInDocument,
    "mutation SignUp($password: String!, $email: String!, $username: String!) {\n  signUp(password: $password, email: $email, username: $username) {\n    success\n    message\n  }\n}": types.SignUpDocument,
    "query Users {\n  users {\n    id\n    username\n    email\n  }\n}": types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Check {\n  checkIDWithJWT\n}"): (typeof documents)["query Check {\n  checkIDWithJWT\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ExampleQuery {\n  hello\n}"): (typeof documents)["query ExampleQuery {\n  hello\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Identify {\n  identify {\n    id\n    username\n    email\n  }\n}"): (typeof documents)["query Identify {\n  identify {\n    id\n    username\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignIn($password: String!, $email: String!) {\n  signIn(password: $password, email: $email) {\n    success\n    message\n    accessToken\n    user {\n      id\n      username\n      email\n    }\n  }\n}"): (typeof documents)["mutation SignIn($password: String!, $email: String!) {\n  signIn(password: $password, email: $email) {\n    success\n    message\n    accessToken\n    user {\n      id\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignUp($password: String!, $email: String!, $username: String!) {\n  signUp(password: $password, email: $email, username: $username) {\n    success\n    message\n  }\n}"): (typeof documents)["mutation SignUp($password: String!, $email: String!, $username: String!) {\n  signUp(password: $password, email: $email, username: $username) {\n    success\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Users {\n  users {\n    id\n    username\n    email\n  }\n}"): (typeof documents)["query Users {\n  users {\n    id\n    username\n    email\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;