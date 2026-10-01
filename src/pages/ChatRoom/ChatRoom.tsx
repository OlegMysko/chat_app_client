import './ChatRoom.scss';
import { MessageForm } from '../../components/MessageForm.jsx';
import { useState, useEffect } from 'react';
import { MessageList } from '../../components/MessageList.jsx';
import { useNavigate, useParams } from 'react-router';
import { socket } from '../../socket.js';
import { messageService } from '../../services/messageService.js';

export const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      const allMessage = await messageService.getAllRoomMessages(roomId);
      setMessages(allMessage);
    };
    fetchAll();
  }, [roomId]);

  useEffect(() => {
    const handler = message => {
      setMessages(prev => [message, ...prev]);
    };

    socket.on('message:sent', handler);

    return () => {
      socket.off('message:sent', handler);
    };
  }, []);

  useEffect(() => {
    const handleRoomDeleted = ({ id }) => {
      if (Number(roomId) === id) {
        navigate('/rooms');
      }
    };

    socket.on('roomDeleted', handleRoomDeleted);
    return () => socket.off('roomDeleted', handleRoomDeleted);
  }, [roomId]);
  return (
    <>

      <section className="content">
        {roomId && (
         <> <h1>{`Room  open now!`}</h1>
          <MessageForm roomId={roomId} />
          {messages.length > 0 ? <MessageList messages={messages} />:<p>write a first message</p>}
       </> )}  </section>

    </>
  );
};
