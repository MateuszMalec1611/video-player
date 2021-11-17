import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Loader from 'src/Components/Loader/Loader';
import { useUser } from 'src/useUser';
import * as S from './styles';

const SplashScreen = () => {
    const navigate = useNavigate();
    const {
        userState: {
            loading,
            authorizationToken: { Token },
        },
    } = useUser();

    useEffect(() => {
        if (Token) {
            const timeOut = setTimeout(() => {
                navigate('/', { replace: true });
            }, 1000);

            return () => clearTimeout(timeOut);
        }
    }, [navigate, Token]);

    return (
        <S.Container>
            <S.Title>Video Player</S.Title>
            {loading && <Loader />}
            {!loading && Token && <S.Info>Successfully logged in</S.Info>}
            <S.HeroImage />
            <S.Shadow />
        </S.Container>
    );
};

export default SplashScreen;
