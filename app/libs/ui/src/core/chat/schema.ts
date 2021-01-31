import { gql } from '@apollo/client';

export const NEW_ROOM_MESSAGE_ADDED = gql`
  subscription NewMessageAdded($id: String!) {
    newRoomMessageAdded(data: { roomId: $id }) {
      message
      sender {
        email
        name
        id
      }
      room {
        name
      }
    }
  }
`;

export const ADD_NEW_MESSAGE = gql`
  mutation SendMessage($id: String!, $message: String!) {
    sendMessage(data: { roomId: $id, message: $message }) {
      path
      message
    }
  }
`;
