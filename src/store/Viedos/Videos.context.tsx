import { createContext, useReducer } from 'react';
import { VideosActions, VideosState, ProviderValue, VideosActionTypes } from './Videos.types';

export const VideosContext = createContext({} as ProviderValue);

const initialState: VideosState = {
    videos: [],
    videoDetail: undefined,
    videoPlayer: undefined,
    loading: false,
    prevVideosListId: undefined,
    prevVideoDetailId: undefined,
    prevVideoPlayer: undefined,
};

const reducer = (state: VideosState, action: VideosActions) => {
    switch (action.type) {
        case VideosActionTypes.SET_VIDEOS:
            return {
                ...state,
                videos: action.payload.videosToSet,
                prevVideosListId: action.payload.videosListId,
            };
        case VideosActionTypes.SET_VIDEO_DETAIL:
            return {
                ...state,
                videoDetail: action.payload,
                prevVideoDetailId: action.payload.Id,
            };
        case VideosActionTypes.SET_VIDEO_PLAYER:
            return {
                ...state,
                videoPlayer: action.payload.videoPlayer,
                prevVideoPlayer: {
                    id: action.payload.videoPlayer.MediaId,
                    streamType: action.payload.streamType,
                },
            };
        case VideosActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload ?? false,
            };
        default:
            return state;
    }
};

const VideosProvider: React.FC = ({ children }) => {
    const [videosState, videosDispatch] = useReducer(reducer, initialState);

    return (
        <VideosContext.Provider value={{ videosState, videosDispatch }}>
            {children}
        </VideosContext.Provider>
    );
};

export default VideosProvider;
