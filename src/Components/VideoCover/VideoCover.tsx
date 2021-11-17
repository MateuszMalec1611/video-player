import { useNavigate } from 'react-router';
import { CardContent } from '@mui/material';
import { Video } from 'src/store/Viedos/Videos.types';
import * as S from './styles';

interface VideoCoverProps {
    video: Video;
}

const VideoCover: React.FC<VideoCoverProps> = ({ video }) => {
    const navigate = useNavigate();
    const { Title } = video;
    const imageUrl = video.Images.find(img => img.ImageTypeCode === 'FRAME');

    const handleRedirect = () => navigate(`/video-detail/${video.Id}`, { replace: true });

    return (
        <S.GameCard onClick={handleRedirect}>
            <S.Image component="img" height="160" image={imageUrl?.Url} alt={`${Title} image`} />
            <CardContent>
                <S.Title>{Title}</S.Title>
            </CardContent>
        </S.GameCard>
    );
};

export default VideoCover;
