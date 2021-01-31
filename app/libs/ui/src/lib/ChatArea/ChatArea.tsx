import React from 'react';
import {
  FlexBox,
  FlexDirection,
  FlexJustify,
  AlignItem,
} from '../FlexBox/FlexBox';
import { Grid, List, TextField, Button, ButtonGroup } from '@material-ui/core';
import { GET_ROOM } from '../../core/room/schema';
import ChatBubble from '../ChatBubble/ChatBubble';
import { Room } from '../../common/type';
import { useMutation, useQuery } from '@apollo/client';
import { Message } from '../../common/type';
// import { Subscription } from 'react-apollo';
import useMessageAdded from '../../core/hooks/useMessageAdded';
import { RoomContext } from '../../state-management/context';
import { ADD_NEW_MESSAGE } from '../../core/chat/schema';
import LoginForm from '../Form/Login/LoginForm';
import SignupForm from '../Form/Signup/SignupForm';
const moment = require('moment');

interface Props {}

export const ChatArea: React.FC<Props> = () => {
  const [openForm, setOpenForm] = React.useState<{
    login: Boolean;
    signup: Boolean;
  }>({
    login: false,
    signup: false,
  });
  const roomContext = React.useContext(RoomContext);
  const currentRoomId = roomContext.roomState.data?.selectedRoom;
  const [message, setMessage] = React.useState('');
  const getRoomQuery = useQuery<{ getRoom: Room }>(GET_ROOM, {
    variables: {
      id: currentRoomId,
    },
  });
  if (getRoomQuery.error) {
    console.log(getRoomQuery.error);
  }
  const newMessagesAdded: Message[] = [];
  const { data } = useMessageAdded(currentRoomId);
  if (data?.newRoomMessageAdded) {
    newMessagesAdded.push({ ...data?.newRoomMessageAdded });
  }

  const [addNewMessage] = useMutation(ADD_NEW_MESSAGE);

  const handleInputFieldChange = (e) => {
    setMessage(e.target.value);
    e.preventDefault();
  };

  const handleSend = async () => {
    await addNewMessage({ variables: { id: currentRoomId, message } }).catch(err=> console.log(err));
  };

  return (
    <FlexBox
      style={{ height: '100%' }}
      justify={FlexJustify.spaceBetween}
      direction={FlexDirection.column}
    >
      <FlexBox
        direction={FlexDirection.row}
        align={AlignItem.center}
        justify={FlexJustify.spaceBetween}
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
        <div>
          <ButtonGroup variant="text" color="default" aria-label="">
            <Button onClick={() => setOpenForm({ ...openForm, login: true })}>
              Login
            </Button>
            <LoginForm
              open={openForm.login}
              handleClose={() => setOpenForm({ ...openForm, login: false })}
            />
            <Button onClick={() => setOpenForm({ ...openForm, signup: true })}>
              Sign up
            </Button>
            <SignupForm
              open={openForm.signup}
              handleClose={() => setOpenForm({ ...openForm, signup: false })}
            />
          </ButtonGroup>
        </div>
      </FlexBox>
      <FlexBox style={{ height: '80vh' }}>
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
      <FlexBox
        style={{ backgroundColor: 'white', height: '10vh' }}
        direction={FlexDirection.column}
        justify={FlexJustify.center}
      >
        <FlexBox
          direction={FlexDirection.row}
          justify={FlexJustify.spaceBetween}
        >
          <TextField
            style={{ width: '100%' }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={handleInputFieldChange}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '0px 5px' }}
            onClick={handleSend}
          >
            Send
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};
