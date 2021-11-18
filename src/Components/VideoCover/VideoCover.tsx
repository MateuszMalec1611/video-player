import { useNavigate } from 'react-router';
import { CardContent } from '@mui/material';
import { Video } from 'src/store/Viedos/Videos.types';
import * as S from './styles';
import { setCoverImg } from 'src/utils/helpers';

interface VideoCoverProps {
    video: Video;
}

const VideoCover: React.FC<VideoCoverProps> = ({ video }) => {
    const navigate = useNavigate();
    const { Title } = video;

    const handleRedirect = () => navigate(`/video-detail/${video.Id}`, { replace: false });

    return (
        <S.GameCard onClick={handleRedirect}>
            <S.Image
                component="img"
                height="160"
                image={setCoverImg(video)}
                alt={`${Title} image`}
            />
            <CardContent>
                <S.Title>{Title}</S.Title>
            </CardContent>
        </S.GameCard>
    );
};

export default VideoCover;
