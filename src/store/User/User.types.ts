export type ProviderValue = {
    userState: UserState;
    userDispatch: (action: UserActions) => void;
    handleSignInUser: () => Promise<void>;
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
          isAuthorized: boolean;
          TokenExpires: string;
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
