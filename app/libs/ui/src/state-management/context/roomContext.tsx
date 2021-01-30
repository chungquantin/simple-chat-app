import React from 'react';
import { Room } from '@app/ui';
import { initialState, reducer } from '../reducer/roomReducer';

export const RoomContext = React.createContext(null);

export const RoomProvider = (props) => {
  const [roomState, dispatch] = React.useReducer(reducer, initialState);

  const actions = {
    selectRoom: (room: Room) => {
      console.log('test');
      if (room) {
        dispatch({ type: 'ROOM_SELECTED', payload: room });
      }
    },
  };

  return (
    <RoomContext.Provider
      value={{
        roomState: roomState,
        roomAction: actions,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};
