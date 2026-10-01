// #region imports
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Rooms } from './pages/Rooms/Rooms';
import { ChatRoom } from './pages/ChatRoom/ChatRoom';

// #endregion

export function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/rooms" element={<Rooms />}>
          <Route path=":roomId" element={<ChatRoom />} />
        </Route>
      </Routes>
    </>
  );
}
