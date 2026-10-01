
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <AuthProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
  </AuthProvider>

);
