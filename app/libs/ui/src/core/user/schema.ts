import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      path
      message
    }
  }
`;

export const SIGN_UP = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      path
      message
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      email
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
