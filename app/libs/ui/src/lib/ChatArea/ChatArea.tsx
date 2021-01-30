import React from 'react';
import {
  FlexBox,
  FlexDirection,
  FlexJustify,
  AlignItem,
} from '../FlexBox/FlexBox';
import { Grid, List } from '@material-ui/core';
import { GET_ROOM } from '../../core/room/schema';
import ChatBubble from '../ChatBubble/ChatBubble';
import { Room } from '../../common/type';
import { useQuery } from '@apollo/client';
import { Message } from '../../common/type';
// import { Subscription } from 'react-apollo';
import useMessageAdded from '../../core/hooks/useMessageAdded';
import { RoomContext } from '../../state-management/context';
const moment = require('moment');

interface Props {}

export const ChatArea: React.FC<Props> = () => {
  const roomContext = React.useContext(RoomContext);
  console.log(roomContext);
  const getRoomQuery = useQuery<{ getRoom: Room }>(GET_ROOM, {
    variables: {
      id: roomContext.roomState.data?.selectedRoom,
    },
  });
  if (getRoomQuery.error) {
    console.log(getRoomQuery.error);
  }
  const newMessagesAdded: Message[] = [];
  const { data } = useMessageAdded(roomContext.roomState.data?.roomId);
  if (data?.newRoomMessageAdded) {
    newMessagesAdded.push({ ...data?.newRoomMessageAdded });
  }

  return (
    <FlexBox
      style={{ height: '100%' }}
      justify={FlexJustify.spaceBetween}
      direction={FlexDirection.column}
    >
      <FlexBox
        direction={FlexDirection.row}
        align={AlignItem.center}
        style={{
          backgroundColor: 'white',
          height: '10vh',
          padding: '0px 20px',
          width: '100%',
        }}
      >
        <div>
          {getRoomQuery.data?.getRoom?.name} 😯{' '}
          {getRoomQuery.data?.getRoom?.members.length} members
        </div>
      </FlexBox>
      <FlexBox style={{ height: '75vh' }}>
        <Grid item xs={12}>
          <List
            style={{
              height: '100%',
              overflowY: 'auto',
              padding: '10px',
            }}
          >
            {getRoomQuery.loading ? (
              <div>Loading...</div>
            ) : (
              getRoomQuery?.data?.getRoom?.messages.map((message) => (
                <>
                  <ChatBubble
                    key={message?.id}
                    message={message?.message}
                    date={`${moment(message?.createdAt).format(
                      'DD-MM-YYYY hh:mm'
                    )}`}
                    senderName={message?.sender.name}
                    me={message?.id === message?.sender.id}
                  />
                </>
              ))
            )}
            {newMessagesAdded.map((message) => (
              <>
                <ChatBubble
                  key={message?.id}
                  message={message?.message}
                  date={`${moment(message?.createdAt).format(
                    'DD-MM-YYYY hh:mm'
                  )}`}
                  senderName={message?.sender.name}
                  me={message?.id === message?.sender.id}
                />
              </>
            ))}
          </List>
        </Grid>
      </FlexBox>
      <FlexBox style={{ backgroundColor: 'white', height: '15vh' }}>
        World
      </FlexBox>
    </FlexBox>
  );
};
