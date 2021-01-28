import { gql } from '@apollo/client';

export const NEW_ROOM_MESSAGE_ADDED = gql`
  subscription NewMessageAdded($id: String) {
    newRoomMessageAdded(data: { roomId: $id }) {
      message
      sender {
        email
        name
      }
      room {
        name
      }
    }
  }
`;
