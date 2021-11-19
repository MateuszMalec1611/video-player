import { AxiosResponse } from 'axios';
import api from 'src/api';
import { anonymousUserDevice, userDevice } from 'src/utils/constants';
import { SignInApiResponse } from './User.types';

export const signInAnonymousUser = async () => {
    const { data }: AxiosResponse<SignInApiResponse> = await api().post('Authorization/SignIn/', {
        Device: anonymousUserDevice,
    });
    return data;
};

export const signInUser = async (username: string, password: string) => {
    const { data }: AxiosResponse<SignInApiResponse> = await api().post('Authorization/SignIn/', {
        Username: username,
        Password: password,
        Device: userDevice,
    });
    return data;
};
