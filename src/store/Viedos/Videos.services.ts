import { AxiosResponse } from 'axios';
import api from 'src/api';
import { Video } from './Videos.types';

export const fetchVideos = async (token: string) => {
    const response: AxiosResponse<{ Entities: Video[] }> = await api().post(
        'Media/GetMediaList',
        {
            PageSize: 15,
            PageNumber: 1,
            IncludeCount: true,
            MediaListId: 10,
            IncludeCategories: true,
            IncludeMedia: true,
            IncludeImages: true,
        },
        {
            headers: {
                Authorization: token,
            },
        }
    );

    return response.data.Entities ?? [];
};
