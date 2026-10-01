
import { Outlet, useNavigate, useParams } from 'react-router';
import { roomService } from '../services/roomService';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import './RoomList.scss'
import { useState } from 'react';
import { socket } from '../socket';
import { useAuth } from './AuthProvider';
export const RoomList = ({ myRooms,  antRooms }) => {
  const {currentUser} = useAuth();
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previousRoomId, setPreviousRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { roomId } = useParams();

  const renameRoom = async (event:React.FormEvent) => {
    try {
        setLoading(true)
    await roomService.renameRoom(editingId, input, currentUser.id);
    setEditingId(null);
    setInput('');
  } catch (error) {
    console.error(error);

  }finally{setLoading(false)}
  }

  const deleteRoom = async (roomId:string) => {
    try {

      await roomService.deleteRoom(roomId, currentUser.id)
      navigate('/rooms');

    } catch (error) {
      console.error(error)
    }
  }
  const navigate = useNavigate()

  const openRoom = (roomId: string) => {

  if (previousRoomId) {
    socket.emit("leaveRoom", previousRoomId);
  }

  socket.emit("joinRoom", roomId);
  setPreviousRoomId(roomId);
  navigate(`/rooms/${roomId}`);
}


  return (<>
    <div className='boxList'>
 { myRooms.length>0 && <div className = 'myRooms'>
    <h1>My Rooms:</h1>
    <ul className="roomsBox">
      {myRooms.map(room => (
        <li className="roomsItem" key={room.id}

         >
          {editingId !== room.id ? (
            <><span
            className="roomName"
            onClick={() => {
              setInput('')
              setEditingId(room.id)
              }}>{room.name}</span>
<div>
            <button  className={`roomsVisite ${
    room.id === Number(roomId) ? 'active' : ''
  }`}
                  onClick={() => {
                    openRoom(room.id)
                   setEditingId(null)
                }
            }> {room.id === Number(roomId)?<FaLockOpen/>:<FaLock/>}</button>

                <button className="roomsDelete "
                onClick={() => {deleteRoom(room.id)


                }
            }><AiFillDelete/></button>
              </div></>) :
            (<input className='inputRename'
              value={input}
              onChange={(event) => {

              setInput(event.target.value)
              }} />
            )
          }


          {editingId === room.id && <div className="roomActions">
            <button className="roomsButton back"
              onClick={() => {
                setEditingId(null)
                setInput('')
              }
            }>X</button>
            <button className="roomsButton edit"
              onClick={renameRoom}
             disabled ={input.trim().length===0||loading}
            >Rename</button>

          </div>}
        </li>
      ))}
    </ul>
   </div>}
<Outlet />

      {antRooms.length > 0 && <div className='questRooms'>

     <h1>Quest rooms:</h1>
    <ul className="roomsBox">
      {antRooms.map(room => (
        <li className="roomsItem" key={room.id}>
          <span className="roomName">{room.name}</span>
         <button
  className={`roomsVisite ${
    room.id === Number(roomId) ? 'active' : ''
  }`}
  onClick={() => openRoom(room.id)}
>{room.id === Number(roomId)?<FaLockOpen/>:<FaLock/>}</button>
        </li>
      ))}
    </ul>
   </div>}

 </div></>
);


}
