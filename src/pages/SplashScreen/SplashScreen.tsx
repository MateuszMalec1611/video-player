import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Loader from 'src/Components/Loader/Loader';
import { useUser } from 'src/hooks/useUser';
import * as S from './styles';

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
            }, 1000);

            return () => clearTimeout(timeOut);
        }
    }, [navigate, authorization, handleSignInUser]);

    return (
        <S.Container>
            <S.Title>Video Player</S.Title>
            {loading && <Loader />}
            {!loading && authorization?.isAuthorized && <S.Info>Successfully logged in</S.Info>}
            <S.HeroImage />
            <S.Shadow />
        </S.Container>
    );
};

export default SplashScreen;
