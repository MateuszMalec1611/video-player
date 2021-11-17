export type ProviderValue = {
    userState: UserState;
    userDispatch: (action: UserActions) => void;
};

export interface UserState {
    authorizationToken: AuthorizationToken;
    user: User;
    loading: boolean;
}

export interface SignInApiResponse {
    AuthorizationToken: AuthorizationToken;
    User: User;
    status: number;
}

export type User = {
    FullName: string;
    id: number | null;
    UserName: string;
};

export type AuthorizationToken = {
    Token: string | null;
    TokenExpires: string | null;
};

export type SetUser = {
    type: UserActionTypes.SET_USER;
    payload: {
        authorizationToken: AuthorizationToken;
        user: User;
    };
};

export type SetLoading = {
    type: UserActionTypes.SET_LOADING;
    payload?: boolean;
};

export type UserActions = SetUser | SetLoading;

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    SET_LOADING = 'SET_LOADING',
}
