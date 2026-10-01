import '../Rooms/Rooms.scss'
import { Navigate} from "react-router"
import { useAuth } from "../../components/AuthProvider.js"
import { RoomList } from "../../components/RoomList.js";
import { useState,useEffect } from 'react';
import { roomService } from "../../services/roomService.js";
import { socket } from "../../socket.js";
import cn from 'classnames';



export const Rooms = () => {
  const [text, setText] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser,logout } = useAuth();

   useEffect(() => {
    const fetchAll = async () => {
      const allRooms = await roomService.getAll();
      setRooms(allRooms);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    socket.on('room:created', (newRoom,) => {
      setRooms(prev => {

        if (prev.some(room => room.id === newRoom.id)) return prev;
        return [...prev, newRoom];
      });
    });

    return () => socket.off('room:created');
  }, []);

  useEffect(() => {
  const handleRename = ({ id, name }) => {
    setRooms(prev =>
      prev.map(room =>
        room.id === id ? { ...room, name } : room
      )
    );
  };

  socket.on('roomRenamed', handleRename);

  return () => socket.off('roomRenamed', handleRename);
}, []);


  useEffect(() => {
    const handleDelete = ({ id }) => {
     setRooms(prev=>prev.filter(room=>room.id!==id))
    }
    socket.on('roomDeleted', handleDelete);

return ()=>socket.off('roomDeleted',handleDelete)  }, [])

  if (!currentUser) {
    return <Navigate to={"/"}/>
  }

  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true)
      await roomService.createRoom(text, currentUser.id)

      setText('');
    } catch { } finally {
      setLoading(false)
        }


 }


  const myRooms = rooms.filter(room=>room.userId===currentUser.id)
  const anotherRooms = rooms.filter(room=>room.userId!==currentUser.id)

  return (<><button className="button"
    onClick={logout}> LogOut</button>
<div className="boxRoom">
    <h1>{`Hello ${currentUser.name}! choose a room, or create your own`}</h1>


     <form
      className="fieldform"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter a room name"
        value={text}
        onChange={event => setText(event.target.value)}
      />
        <button className={cn('buttonCreate', {
        'buttonCreate--disabled': text.trim().length === 0 || loading
      })}
      >CreateRoom</button>
    </form>




    {rooms.length > 0 ? <RoomList

      myRooms={myRooms}
      antRooms={anotherRooms}
    />:<h1>There are no rooms, please create a new one.</h1>}
</div>
  </>)
}
