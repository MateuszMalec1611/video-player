import { AxiosResponse } from 'axios';
import api from 'src/api';
import { ITEMS_PER_PAGE } from 'src/utils/constants';
import { StreamType, Video, VideoDetail, VideoPlayer, VideosListId } from './Videos.types';

export const fetchVideos = async (id: VideosListId, page = 1) => {
    const response: AxiosResponse<{ Entities: Video[]; TotalCount: number }> = await api().post(
        'Media/GetMediaList',
        {
            MediaListId: id,
            IncludeCategories: false,
            IncludeImages: true,
            IncludeMedia: false,
            PageNumber: page,
            PageSize: ITEMS_PER_PAGE,
        }
    );
    return { videoList: response.data.Entities, totalCount: response.data.TotalCount };
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
