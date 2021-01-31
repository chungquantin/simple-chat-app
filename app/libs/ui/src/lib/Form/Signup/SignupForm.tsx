import { useMutation } from '@apollo/client';
import { Modal, TextField, Button } from '@material-ui/core';
import { SIGN_UP } from 'libs/ui/src/core/user/schema';
import React from 'react';
import {
  AlignItem,
  FlexBox,
  FlexDirection,
  FlexJustify,
} from '../../FlexBox/FlexBox';

const SignupForm: React.FC<any> = ({ handleClose, open }) => {
  const [signupError, setSignupError] = React.useState(null);
  const [input, setInput] = React.useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [signup, { error }] = useMutation(SIGN_UP);
  const handleSubmit = async () => {
    console.log(error);
    await signup({ variables: input })
      .then((res) => {
        if (!res.data.login) {
          setSignupError(null);
          handleClose();
        }
      })
      .catch(() => setSignupError('There was something wrong!'));
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
            value={input.firstName}
            onChange={(e) => setInput({ ...input, firstName: e.target.value })}
            error={!!signupError}
            helperText={signupError}
          />
          <TextField
            id="lName"
            label="Last Name"
            value={input.lastName}
            onChange={(e) => setInput({ ...input, lastName: e.target.value })}
            error={!!signupError}
          />
          <TextField
            id="email"
            label="Email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            error={!!signupError}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            error={!!signupError}
          />
          <FlexBox
            justify={FlexJustify.spaceBetween}
            direction={FlexDirection.row}
            style={{ marginTop: '20px' }}
          >
            <Button variant="contained" onClick={handleClose} color="primary">
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
            >
              Sign Up
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default SignupForm;
