import { Video, VideoDetail } from 'src/store/Viedos/Videos.types';

export const setCoverImg = (videoDetail: VideoDetail | Video | undefined) =>
    videoDetail?.Images.find(img => img.ImageTypeCode === 'FRAME')?.Url;
