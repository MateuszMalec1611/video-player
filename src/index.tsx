import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './store/User/User.context';
import VideosProvider from './store/Viedos/Videos.context';
import { ThemeProvider as MaterialProvider } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import { theme, materialTheme } from './config/theme';
import App from './App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider theme={theme}>
                <MaterialProvider theme={materialTheme}>
                    <UserProvider>
                        <VideosProvider>
                            <App />
                        </VideosProvider>
                    </UserProvider>
                </MaterialProvider>
            </ThemeProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
