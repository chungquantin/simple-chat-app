import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Grid, TextField, Button } from '@material-ui/core';
import './app.scss';
import {
  Rooms,
  FlexBox,
  FlexDirection,
  FlexJustify,
  ChatArea,
  AlignItem,
  ADD_NEW_ROOM,
} from '@app/ui';
import { useMutation } from '@apollo/client';
// import { Picker } from 'emoji-mart';

export function App() {
  // const handleEmojiSelect = (e: Event) => {
  //   console.log(e);
  // };
  const [roomName, setRoomName] = React.useState('');
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const [addNewRoom] = useMutation(ADD_NEW_ROOM);
  const handleSubmit = () => {
    addNewRoom({ variables: { name: roomName } }).catch((err) =>
      window.alert('You must login first')
    );
  };

  return (
    <Grid container spacing={0} style={{ minHeight: '100vh' }}>
      <Grid item={true} xs={12} lg={3}>
        <FlexBox direction={FlexDirection.column} style={{ padding: '20px' }}>
          <FlexBox
            direction={FlexDirection.row}
            justify={FlexJustify.spaceBetween}
            align={AlignItem.center}
          >
            <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Rooms</div>
            <FlexBox
              direction={FlexDirection.row}
              justify={FlexJustify.spaceBetween}
              align={AlignItem.center}
            >
              <TextField
                size="small"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={roomName}
                onChange={handleRoomNameChange}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '10px' }}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </FlexBox>
          </FlexBox>
          <div
            style={{
              height: '1px',
              backgroundColor: 'lightgray',
              margin: '15px 0px ',
            }}
          />
          <Rooms />
        </FlexBox>
      </Grid>
      <Grid
        item={true}
        xs={12}
        lg={9}
        style={{ backgroundColor: 'rgb(242, 242, 242)' }}
      >
        <ChatArea />
      </Grid>
    </Grid>
  );
}

export default App;
