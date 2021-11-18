import { AxiosResponse } from 'axios';
import api from 'src/api';
import { StreamType, Video, VideoDetail, VideoPlayer, VideosListId } from './Videos.types';

export const fetchVideos = async (id: VideosListId) => {
    const response: AxiosResponse<{ Entities: Video[] }> = await api().post('Media/GetMediaList', {
        MediaListId: id,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageNumber: 1,
        PageSize: 15,
    });
    return response.data.Entities ?? [];
};
export const fetchVideoDetail = async (id: number) => {
    const response: AxiosResponse<VideoDetail> = await api().post('Media/GetMedia', {
        MediaId: id,
        IncludeCategories: true,
        IncludePeople: true,
        IncludeImages: true,
        IncludeSimilarMedia: true,
        IncludePurchaseOffers: true,
    });
    return response.data;
};
export const fetchVideoPlayer = async (id: number, streamType: StreamType) => {
    const response: AxiosResponse<VideoPlayer> = await api().post('Media/GetMediaPlayInfo', {
        MediaId: id,
        StreamType: streamType,
    });
    return response.data;
};
