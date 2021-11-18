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
        userState: { loading, authorization },
        handleSignInUser,
    } = useUser();

    useEffect(() => {
        if (!authorization?.isAuthorized) handleSignInUser();
        if (authorization?.isAuthorized) {
            const timeOut = setTimeout(() => {
                navigate('/', { replace: true });
            }, 1800);
            return () => clearTimeout(timeOut);
        }
    }, [navigate, authorization, handleSignInUser]);

    return (
        <S.Container>
            {!loading && (
                <S.LottieWrapper>
                    <Lottie options={defaultOptions} />
                </S.LottieWrapper>
            )}
            <S.HeroImage />
            <S.Shadow />
        </S.Container>
    );
};

export default SplashScreen;
