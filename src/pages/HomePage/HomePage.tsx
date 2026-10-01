import '../HomePage/HomePage.scss'
import { useState } from 'react'
import { Navigate } from 'react-router';
import { usePageError } from '../../hooks/ErrorPage.js';
import { authService } from '../../services/authService.js';
import { useAuth } from '../../components/AuthProvider.js';
import cn from 'classnames';
export const HomePage = () => {
  const [name, setName] = useState('');
  const [error, setError] = usePageError('');
  const { currentUser, setCurrentUser} = useAuth();
  const [loading, setLoading] = useState(false);

  const validateName = (name) => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return 'Enter your name';
  }

  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }

  return '';
};
const handleSubmit = async (event: React.FormEvent) => {

  event.preventDefault();
  const validateError = validateName(name);
  if (validateError) {
    setError(validateError);
    return;
  }

  let user = null;
  setLoading(true);

  try {
    user = await authService.login(name);

    if (!user) {
      setError('Login failed');
      return;
    }


    localStorage.setItem(
      'currentUser',
      JSON.stringify({ id: user.id, name: user.name })
    );

    setCurrentUser(user);

  } catch (err: any) {
    setError(err.message || 'Unexpected error');

  } finally {
    setLoading(false);
  }
};



if (currentUser) {
    return <Navigate to={"/rooms"}/>
  }

  return (<><div className='blackDoor'>
<div className='box'>
      <h1>Chat Room</h1>
      <div className='registration'>
  <label htmlFor="name" className="label">
                enter your nickname
              </label>
        <form className = 'form'

onSubmit={handleSubmit}


    >
      <input
        id='name'
        type="text"
        className="input"
        placeholder="Enter  nickname"
        value={name}
        onChange={event => setName(event.target.value)}

          />
    {<p className={cn('error', { 'error--visible': Boolean(error) })}>
  {error || '\u00A0'}
</p>}

 <button
  type="submit"
  className={cn('buttonRegister', {
    'buttonRegister--disabled': Boolean(error) || name.trim().length === 0 || loading,
  })}

>
  Registration
</button>
        </form>


   </div> </div></div></>)
}

