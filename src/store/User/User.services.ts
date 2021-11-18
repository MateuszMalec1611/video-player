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

export const loginUser = async (username: string, password: string) => {
    const { data }: AxiosResponse<SignInApiResponse> = await api().post('Authorization/SignIn/', {
        Username: username,
        Password: password,
        Device: {
            PlatformCode: 'WEB',
            Name: '7a6a86e5-356f-4795-8998-305e1b205531',
        },
    });
    return data;
};
