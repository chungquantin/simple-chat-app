import { useMutation } from '@apollo/client';
import { Modal, TextField, Button } from '@material-ui/core';
import { LOGIN } from 'libs/ui/src/core/user/schema';
import React from 'react';
import {
  AlignItem,
  FlexBox,
  FlexDirection,
  FlexJustify,
} from '../../FlexBox/FlexBox';

const LoginForm: React.FC<any> = ({ handleClose, open }) => {
  const [loginError, setLoginError] = React.useState(null);
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  });
  const [login, { error }] = useMutation(LOGIN);

  const handleSubmit = async () => {
    console.log(error);
    await login({ variables: input })
      .then((res) => {
        if (!res.data.login) {
          setLoginError(null);
          handleClose();
        }
      })
      .catch(() => setLoginError('There was something wrong!'));
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
          Login Form
          <TextField
            error={!!loginError}
            id="email"
            label="Email"
            style={{ marginTop: '20px' }}
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            helperText={loginError}
          />
          <TextField
            error={!!loginError}
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              Log in
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default LoginForm;
