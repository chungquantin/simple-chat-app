import React from 'react';
import {
  FlexBox,
  FlexDirection,
  FlexJustify,
  AlignItem,
} from '../FlexBox/FlexBox';
import { Grid, TextField, Button, ButtonGroup } from '@material-ui/core';
import { GET_ROOM } from '../../core/room/schema';
import { Room, User } from '../../common/type';
import { useMutation, useQuery } from '@apollo/client';
import { Message } from '../../common/type';
// import { Subscription } from 'react-apollo';
import useMessageAdded from '../../core/hooks/useMessageAdded';
import { RoomContext } from '../../state-management/context';
import { ADD_NEW_MESSAGE } from '../../core/chat/schema';
import LoginForm from '../Form/Login/LoginForm';
import SignupForm from '../Form/Signup/SignupForm';
import { ME } from '../../core/user/schema';
import { ChatBubbleContainer } from '../ChatBubbleContainer/ChatBubbleContainer';
const moment = require('moment');

interface Props {}
export const ChatArea: React.FC<Props> = () => {
  const [roomMessages, setRoomMessages] = React.useState([]);
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
  let roomMessage = getRoomQuery?.data?.getRoom?.messages;
  if (getRoomQuery.error) {
    console.log(getRoomQuery.error);
  }
  const { data } = useMessageAdded(currentRoomId);
  React.useEffect(() => {
    if (data?.newRoomMessageAdded) {
      const newMessage = [
        {
          ...data?.newRoomMessageAdded,
        },
      ];
      setRoomMessages(
        (roomMessage) => (roomMessage = roomMessage?.concat(newMessage) as any)
      );
    }
  }, [data?.newRoomMessageAdded]);

  const [addNewMessage] = useMutation(ADD_NEW_MESSAGE);

  const handleInputFieldChange = (e) => {
    setMessage(e.target.value);
    e.preventDefault();
  };

  const handleSend = async () => {
    await addNewMessage({
      variables: { id: currentRoomId, message },
    }).catch((err) => console.log(err));

    setMessage('');
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
          <ChatBubbleContainer
            loading={getRoomQuery.loading}
            messages={roomMessage?.concat(roomMessages)}
          />
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
            value={message}
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
