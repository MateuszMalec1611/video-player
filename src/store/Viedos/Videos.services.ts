import { AxiosResponse } from 'axios';
import api from 'src/api';
import { Video } from './Videos.types';

export const fetchVideos = async () => {
    const response: AxiosResponse<{ Entities: Video[] }> = await api().post('Media/GetMediaList', {
        MediaListId: 3,
        IncludeCategories: false,
        IncludeImages: true,
        IncludeMedia: false,
        PageNumber: 1,
        PageSize: 15,
    });

    return response.data.Entities ?? [];
};
