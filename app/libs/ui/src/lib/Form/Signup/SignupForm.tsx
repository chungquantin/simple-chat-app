import { Modal, TextField, Button } from '@material-ui/core';
import React from 'react';
import {
  AlignItem,
  FlexBox,
  FlexDirection,
  FlexJustify,
} from '../../FlexBox/FlexBox';

const SignupForm: React.FC<any> = ({ handleClose, open }) => {
  const [input, setInput] = React.useState({
    email: '',
    password: '',
    fName: '',
    lName: '',
  });
  const handleSubmit = () => {
    console.log(input);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <FlexBox
        style={{ height: '100%', width: '100%' }}
        justify={FlexJustify.center}
        align={AlignItem.center}
        direction={FlexDirection.column}
      >
        <FlexBox
          justify={FlexJustify.center}
          align={AlignItem.center}
          direction={FlexDirection.column}
          style={{
            width: '400px',
            height: '550px',
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '10px 20px',
          }}
        >
          Signup Form
          <TextField
            id="fName"
            label="First Name"
            value={input.email}
            onChange={(e) => setInput({ ...input, fName: e.target.value })}
          />
          <TextField
            id="lName"
            label="Last Name"
            value={input.email}
            onChange={(e) => setInput({ ...input, lName: e.target.value })}
          />
          <TextField
            id="email"
            label="Email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <TextField
            id="password"
            label="Password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <FlexBox
            justify={FlexJustify.spaceBetween}
            direction={FlexDirection.row}
            style={{ marginTop: '20px' }}
          >
            <Button variant="contained" onClick={handleClose} color="primary">
              Close
            </Button>
            <Button variant="contained" color="secondary">
              Log in
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default SignupForm;
