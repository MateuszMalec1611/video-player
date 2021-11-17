export type ProviderValue = {
    videosState: VideosState;
    videosDispatch: (action: VideosActions) => void;
};

export interface VideosState {
    videos: Video[];
    loading: boolean;
}

export type Video = {
    Title: string;
    Description: string;
    Id: number;
    Guid: string;
    Images: {
        Url: string;
        MediaId: number;
        ImageTypeCode: string;
    }[];
};

export type SetVideos = {
    type: VideosActionTypes.SET_VIDEOS;
    payload: Video[];
};

export type SetLoading = {
    type: VideosActionTypes.SET_LOADING;
    payload?: boolean;
};

export type VideosActions = SetVideos | SetLoading;

export enum VideosActionTypes {
    SET_VIDEOS = 'SET_VIDEOS',
    SET_LOADING = 'SET_LOADING',
}
