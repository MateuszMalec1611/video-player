import { createContext, useReducer } from 'react';
import { VideosActions, VideosState, ProviderValue, VideosActionTypes } from './Videos.types';

export const VideosContext = createContext({} as ProviderValue);

const initialState: VideosState = {
    videos: undefined,
    videoListTotalItems: undefined,
    videoDetail: undefined,
    videoPlayer: undefined,
    loading: false,
};

const reducer = (state: VideosState, action: VideosActions) => {
    switch (action.type) {
        case VideosActionTypes.SET_VIDEOS:
            if (state.videos?.[action.payload.videosListId]) {
                return {
                    ...state,
                    videos: {
                        ...state.videos,
                        [action.payload.videosListId]: [
                            ...state.videos?.[action.payload.videosListId],
                            ...action.payload.videosToSet,
                        ],
                    },
                };
            }
            return {
                ...state,
                videos: {
                    ...state.videos,
                    [action.payload.videosListId]: action.payload.videosToSet,
                },
                videoListTotalItems: {
                    ...state.videoListTotalItems,
                    [action.payload.videosListId]: action.payload.totalCount,
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
