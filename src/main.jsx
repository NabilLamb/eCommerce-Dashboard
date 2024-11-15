// src/main.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './components/ThemeContext/ThemeContext'; 
import { AuthProvider } from './components/AuthContext/AuthContext'; 
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);


