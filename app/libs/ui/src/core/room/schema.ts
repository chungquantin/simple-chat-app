import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query GetRooms {
    getRooms {
      id
      name
      createdAt
      ownerId
      members {
        id
        email
        name
      }
      messages {
        message
        createdAt
        sender {
          name
          id
          email
        }
      }
    }
  }
`;

export const GET_ROOM = gql`
  query GetRoom($id: String!) {
    getRoom(id: $id) {
      name
      createdAt
      ownerId
      members {
        id
        email
        name
      }
      messages {
        message
        createdAt
        sender {
          name
          email
          id
        }
      }
    }
  }
`;

export const ADD_NEW_ROOM = gql`
  mutation AddNewRoom($name: String!) {
    addNewRoom(data: { name: $name }) {
      path
      message
    }
  }
`;
