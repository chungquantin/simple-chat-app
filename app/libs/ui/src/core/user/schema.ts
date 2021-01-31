import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
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
