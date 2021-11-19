import { createContext, useReducer } from 'react';
import { VideosActions, VideosState, ProviderValue, VideosActionTypes } from './Videos.types';

export const VideosContext = createContext({} as ProviderValue);

const initialState: VideosState = {
    videos: undefined,
    videoDetail: undefined,
    videoPlayer: undefined,
    loading: false,
};

const reducer = (state: VideosState, action: VideosActions) => {
    switch (action.type) {
        case VideosActionTypes.SET_VIDEOS:
            return {
                ...state,
                videos: {
                    ...state.videos,
                    [action.payload.videosListId]: action.payload.videosToSet,
                },
            };
        case VideosActionTypes.SET_VIDEO_DETAIL:
            return {
                ...state,
                videoDetail: {
                    ...state.videoDetail,
                    [action.payload.Id]: action.payload,
                },
            };
        case VideosActionTypes.SET_VIDEO_PLAYER:
            return {
                ...state,
                videoPlayer: {
                    ...state.videoPlayer,
                    [action.payload.videoPlayer.MediaId]: {
                        video: action.payload.videoPlayer,
                        streamType: action.payload.streamType,
                    },
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
