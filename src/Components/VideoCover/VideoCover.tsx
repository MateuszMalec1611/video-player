import { CardContent } from '@mui/material';
import { Video } from 'src/store/Viedos/Videos.types';
import * as S from './styles';

interface VideoCoverProps {
    video: Video;
}

const VideoCover: React.FC<VideoCoverProps> = ({ video }) => {
    const { Title } = video;

    const imageUrl = video.Images.find(img => img.ImageTypeCode === 'FRAME');

    return (
        <S.GameCard>
            <S.Image component="img" height="160" image={imageUrl?.Url} alt={Title} />
            <CardContent>
                <S.Title>{Title}</S.Title>
            </CardContent>
        </S.GameCard>
    );
};

export default VideoCover;
