import './MessageForm.scss'
import { useState } from 'react';
import { messageService } from '../services/messageService.ts';
import { useAuth } from './AuthProvider.tsx';

export const MessageForm = ({ roomId }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          if (text.trim().length > 0) {
            setLoading(true);
            await messageService.sendMessage(text, roomId, currentUser.id);
          }else return
        } catch {
        } finally {
          setText('');
          setLoading(false);
        }
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter a message"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="buttonSend" disabled={text.length === 0 || loading}>
        Send
      </button>
    </form>
  );
};
