import { Alert, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from 'src/Components/Loader/Loader';
import Title from 'src/Components/Title/Title';
import { useUser } from 'src/hooks/useUser';
import { loginUser } from 'src/store/User/User.services';
import { UserActionTypes } from 'src/store/User/User.types';
import * as S from './styles';

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('test@bsgroup.eu');
    const [password, setPassword] = useState('Test12!@');
    const { userDispatch } = useUser();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        if (username.trim() === '' && password.trim() === '') return;
        try {
            setLoading(true);
            const user = await loginUser(username, password);

            if (user.AuthorizationToken) {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${user.AuthorizationToken.Token}`;
            }

            userDispatch({
                type: UserActionTypes.SET_USER,
                payload: {
                    user: user.User,
                    authorization: {
                        isAuthorized: true,
                        TokenExpires: user.AuthorizationToken.TokenExpires,
                    },
                },
            });
            setOnSuccess(true);
        } catch (err: any) {
            if (err.response?.status === 401) {
                setError(err.response?.data.Message);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (onSuccess) navigate('/', { replace: true });
    }, [navigate, onSuccess]);

    const handleUsernameValue = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(target.value);
    const handlePasswordValue = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(target.value);

    return (
        <>
            <Title>Login</Title>
            <S.FormBox>
                <Stack onSubmit={handleLogin} component="form" spacing={2}>
                    <TextField
                        label="Username"
                        onChange={handleUsernameValue}
                        value={username}
                        variant="filled"
                        size="small"
                        autoComplete="true"
                    />
                    <TextField
                        label="Password"
                        onChange={handlePasswordValue}
                        value={password}
                        variant="filled"
                        size="small"
                        type="password"
                        autoComplete="true"
                    />
                    {loading ? (
                        <Loader />
                    ) : (
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    )}
                    {!!error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </S.FormBox>
        </>
    );
};

export default Auth;
