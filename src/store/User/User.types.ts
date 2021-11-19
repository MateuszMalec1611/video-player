export type ProviderValue = {
    userState: UserState;
    userDispatch: (action: UserActions) => void;
    handleAnonymousUser: () => Promise<void>;
    userIsAnonymous: boolean;
};

export interface UserState {
    authorization: Authorization;
    user: User;
    loading: boolean;
}
export type User =
    | {
          FullName: string;
          id: number;
          UserName: string;
      }
    | undefined;

export type Authorization =
    | {
          isAuthorized: boolean | undefined;
          TokenExpires: string | undefined;
      }
    | undefined;

export type AuthorizationToken = {
    Token: string;
    TokenExpires: string;
};

export interface SignInApiResponse {
    AuthorizationToken: AuthorizationToken;
    User: User;
    status: number;
}

export type SetUser = {
    type: UserActionTypes.SET_USER;
    payload: {
        authorization: Authorization;
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
