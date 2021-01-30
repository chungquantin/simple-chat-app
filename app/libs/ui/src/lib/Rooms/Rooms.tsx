import { useQuery } from '@apollo/client';
import 'react-chat-elements/dist/main.css';
import React from 'react';
import { GET_ROOMS } from '../../core/room/schema';
import { MeetingList } from 'react-chat-elements';
import { Room } from '../../common/type';
import { RoomContext } from '../../state-management/context';

export const Rooms: React.FC<{}> = () => {
  const { loading, error, data } = useQuery<Room[]>(GET_ROOMS);
  const roomContext = React.useContext(RoomContext);
  const handleClick = (e) => {
    roomContext.roomAction.selectRoom(e.id);
  };

  const handleMeetingClick = () => {
    console.log('Meeting click');
  };

  if (error) {
    console.log(error);
  }
  return (
    <div>
      {loading ? (
        <div>Loading....</div>
      ) : (
        (data as any).getRooms.map((d: Room) => (
          <MeetingList
            className="meeting-list"
            onClick={handleClick}
            onMeetingClick={handleMeetingClick}
            dataSource={[
              {
                id: d.id,
                subject: d.name,
                date: Date.parse(d.createdAt),
                avatars: [
                  {
                    src:
                      'https://miro.medium.com/max/500/1*jABZh1fqdQOC9KIRMx-K4A.png',
                  },
                ],
              },
            ]}
          />
        ))
      )}
    </div>
  );
};
