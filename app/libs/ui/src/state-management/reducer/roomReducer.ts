import { Reducer } from 'react';
import { Room } from '../../common/type';
import { State } from '../type/commonType';
import { RoomType } from '../type/roomType';

export type RoomState = State<{
  room: null | Room;
  selectedRoom?: string | null;
}>;

export const initialState: RoomState = {
  isLoading: false,
  data: {
    room: null,
    selectedRoom: null,
  },
};

export type RoomReducer = Reducer<Partial<RoomState>, RoomType>;

export const reducer: RoomReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ROOM_SELECTED':
      console.log('ROOM_SELECTED');
      return {
        isLoading: false,
        data: { ...state.data, selectedRoom: action.payload.roomId },
      };
    default:
      break;
  }
};
