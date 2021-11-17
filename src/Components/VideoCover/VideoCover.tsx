import { CardContent } from '@mui/material';
import { Video } from 'src/store/Viedos/Videos.types';
import * as S from './styles';

interface VideoCoverProps {
    video: Video;
}

const VideoCover: React.FC<VideoCoverProps> = ({ video }) => {
    const { Title } = video;

    return (
        <S.GameCard>
            {/* <S.Image component="img" height="160" image={``} alt={Title} /> */}
            <CardContent>
                <S.Title>{Title}</S.Title>
            </CardContent>
        </S.GameCard>
    );
};

export default VideoCover;
