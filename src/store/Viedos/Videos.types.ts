export type ProviderValue = {
    videosState: VideosState;
    videosDispatch: (action: VideosActions) => void;
};

export interface VideosState {
    videos?: {
        [key: string]: Video[];
    };
    videoDetail?: {
        [key: string]: VideoDetail;
    };
    videoPlayer?: {
        [key: string]: { video: VideoPlayer; streamType: StreamType };
    };
    loading: boolean;
}

export interface Video {
    Title: string;
    Description: string;
    Id: number;
    Guid: string;
    Images: {
        Url: string;
        MediaId: number;
        ImageTypeCode: string;
    }[];
}
export interface VideoDetail extends Video {
    Categories: { CategoryCode: string; CategoryId: number; CategoryName: string }[];
    MediaAgeRestrictionImageUrl: string;
    People: {
        PersonFullName: string;
        PersonId: number;
        PersonRoleCode: string;
    }[];
}

export interface VideoPlayer {
    MediaId: number;
    Title: string;
    Description: string;
    MediaTypeCode: string;
    MediaTypeDisplayName: string;
    StreamId: number;
    Provider: string;
    ContentUrl: string;
}

export type SetVideos = {
    type: VideosActionTypes.SET_VIDEOS;
    payload: { videosToSet: Video[]; videosListId: number };
};

export type SetVideoDetail = {
    type: VideosActionTypes.SET_VIDEO_DETAIL;
    payload: VideoDetail;
};

export type SetVideoPlayer = {
    type: VideosActionTypes.SET_VIDEO_PLAYER;
    payload: { videoPlayer: VideoPlayer; streamType: StreamType };
};

export type SetLoading = {
    type: VideosActionTypes.SET_LOADING;
    payload?: boolean;
};

export type VideosActions = SetVideos | SetVideoDetail | SetVideoPlayer | SetLoading;

export enum VideosActionTypes {
    SET_VIDEOS = 'SET_VIDEOS',
    SET_VIDEO_DETAIL = 'SET_VIDEO_DETAIL',
    SET_VIDEO_PLAYER = 'SET_VIDEO_PLAYER',
    SET_LOADING = 'SET_LOADING',
}
export enum VideosListId {
    HOME = 3,
    LIST2 = 4,
}

export enum StreamType {
    TRIAL = 'TRIAL',
    MAIN = 'MAIN',
}
