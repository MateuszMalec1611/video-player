import { useContext } from 'react';
import { VideosContext } from 'src/store/Viedos/Videos.context';

export const useVideos = () => useContext(VideosContext);
