import { AxiosResponse } from 'axios';
import api from 'src/api';
import { SignInApiResponse } from './User.types';

export const signInUser = async () => {
    const { data }: AxiosResponse<SignInApiResponse> = await api().post('Authorization/SignIn/', {
        Device: {
            PlatformCode: 'WEB',
            Name: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
    });
    return data;
};
