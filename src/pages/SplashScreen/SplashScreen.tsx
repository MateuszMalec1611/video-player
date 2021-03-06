import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from 'src/hooks/useUser';
import Lottie from 'react-lottie';
import animationData from 'src/lotties/tickets-animation.json';
import * as S from './styles';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {},
};

const SplashScreen = () => {
    const navigate = useNavigate();
    const {
        userState: { authorization },
        handleAnonymousUser,
    } = useUser();

    useEffect(() => {
        if (!authorization?.isAuthorized) handleAnonymousUser();

        if (authorization?.isAuthorized) navigate('/', { replace: true });
    }, [authorization?.isAuthorized, handleAnonymousUser, navigate]);

    return (
        <S.Container>
            <S.LottieWrapper>
                <Lottie options={defaultOptions} />
            </S.LottieWrapper>
            <S.HeroImage />
            <S.Shadow />
        </S.Container>
    );
};

export default SplashScreen;
