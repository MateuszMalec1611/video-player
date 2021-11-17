import axios from 'axios';

export const api = () => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_VIDEO_PLAYER_API,
    });

    return instance;
};

export default api;
