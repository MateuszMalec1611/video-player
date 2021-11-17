import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import { signInUser } from './User.services';
import { ProviderValue, UserActions, UserActionTypes, UserState } from './User.types';

export const UserContext = createContext({} as ProviderValue);

const initialState: UserState = {
    authorizationToken: {
        Token: null,
        TokenExpires: null,
    },
    user: {
        FullName: '',
        id: null,
        UserName: '',
    },
    loading: false,
};

const reducer = (state: UserState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                authorizationToken: action.payload.authorizationToken,
                user: action.payload.user,
            };
        case UserActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload ?? false,
            };
        default:
            return state;
    }
};

const UserProvider: React.FC = ({ children }) => {
    const [userState, userDispatch] = useReducer(reducer, initialState);

    const handleSignInUser = useCallback(async () => {
        try {
            userDispatch({ type: UserActionTypes.SET_LOADING, payload: true });

            const user = await signInUser();

            userDispatch({
                type: UserActionTypes.SET_USER,
                payload: { authorizationToken: user.AuthorizationToken, user: user.User },
            });
        } catch (err: any) {
            console.log(err);
        } finally {
            userDispatch({ type: UserActionTypes.SET_LOADING });
        }
    }, []);

    useEffect(() => {
        handleSignInUser();
    }, [handleSignInUser]);

    return (
        <UserContext.Provider value={{ userState, userDispatch }}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
