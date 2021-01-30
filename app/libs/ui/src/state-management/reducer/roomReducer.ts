import { Reducer } from 'react';
import { Room } from '../../common/type';
import { State } from '../type/commonType';
import { RoomType } from '../type/roomType';

export type RoomState = State<{
  room: null | Room;
}>;

export const initialState: RoomState = {
  isLoading: false,
  data: {
    room: null,
  },
};

export type RoomReducer = Reducer<RoomState, RoomType>;

export const reducer: RoomReducer = (state, action) => {
  switch (action.type) {
    case 'ROOM_SELECTED':
      return { isLoading: false };
    default:
      break;
  }
};
