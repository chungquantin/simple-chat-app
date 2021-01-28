import { useSubscription } from '@apollo/client';
import { NEW_ROOM_MESSAGE_ADDED } from '../chat/schema';

const useMessageAdded = (roomId: string) => {
  const args = useSubscription(NEW_ROOM_MESSAGE_ADDED, {
    variables: { id: roomId },
  });

  return args;
};

export default useMessageAdded;
