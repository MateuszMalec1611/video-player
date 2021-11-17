export type ProviderValue = {
    videosState: VideosState;
    videosDispatch: (action: VideosActions) => void;
};

export interface VideosState {
    videos: Video[];
    videoDetail: Video | undefined;
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
    };
}

export type SetVideos = {
    type: VideosActionTypes.SET_VIDEOS;
    payload: Video[];
};

export type SetVideoDetail = {
    type: VideosActionTypes.SET_VIDEO_DETAIL;
    payload: VideoDetail;
};

export type SetLoading = {
    type: VideosActionTypes.SET_LOADING;
    payload?: boolean;
};

export type VideosActions = SetVideos | SetVideoDetail | SetLoading;

export enum VideosActionTypes {
    SET_VIDEOS = 'SET_VIDEOS',
    SET_VIDEO_DETAIL = 'SET_VIDEO_DETAIL',
    SET_LOADING = 'SET_LOADING',
}
