import React from 'react';
import { initialState, reducer } from '../reducer/roomReducer';

export const RoomContext = React.createContext(null);

export const RoomProvider = (props) => {
  const [roomState, dispatch] = React.useReducer(reducer, initialState);

  const actions = {
    selectRoom: (id: string) => {
      console.log(`SelectRoom: ${id}`);
      if (id) {
        dispatch({ type: 'ROOM_SELECTED', payload: { roomId: id } });
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
