import React from 'react';
import { List } from '@material-ui/core';
import ChatBubble from '../ChatBubble/ChatBubble';
import { Message, User } from '../../common/type';
import { useQuery } from '@apollo/client';
import { ME } from '../../core/user/schema';
const moment = require('moment');

interface Props {
  loading: boolean;
  messages: Message[];
}
export const ChatBubbleContainer: React.FC<Props> = ({ loading, messages }) => {
  const { data: currentUser } = useQuery<{ me: Partial<User> }>(ME);

  return (
    <List
      style={{
        height: '100%',
        overflowY: 'auto',
        padding: '10px',
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        messages?.map((message) => (
          <>
            <ChatBubble
              key={message?.id}
              message={message?.message}
              date={`${moment(message?.createdAt).format('DD-MM-YYYY hh:mm')}`}
              senderName={message?.sender?.name}
              me={message?.sender?.id === currentUser?.me?.id}
            />
          </>
        ))
      )}
    </List>
  );
};
