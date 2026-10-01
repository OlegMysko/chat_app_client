import { AuthProvider } from './AuthProvider';
import './MessageList.scss'
import cn from 'classnames';
import { useAuth } from './AuthProvider.tsx';
export const MessageList = ({ messages }) => {
 const { currentUser } = useAuth();

  return<>  <ul className='position'>
    {
      messages.map(message => (
     <li
  key={message.data}
  className={cn('messageBox', {
    'messageBox--quest': message.userId === currentUser.id
  })}
>
  <span className='text'>
    {`${message.userName} from ${message.data.slice(0, -5)}`}
  </span>
  <p className='textMessage'>{message.text}</p>
</li>
    ))}
  </ul></>
};
