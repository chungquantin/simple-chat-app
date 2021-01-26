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
      }
    }
  }
`;
