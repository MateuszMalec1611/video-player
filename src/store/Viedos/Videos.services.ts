import { AxiosResponse } from 'axios';
import api from 'src/api';
import { Video } from './Videos.types';

export const fetchVideos = async () => {
    const response: AxiosResponse<{ Entities: Video[] }> = await api().post('Media/GetMediaList', {
        PageSize: 15,
        PageNumber: 1,
        IncludeCount: true,
        MediaListId: 3,
        IncludeCategories: true,
        IncludeMedia: true,
        IncludeImages: true,
    });

    return response.data.Entities ?? [];
};
