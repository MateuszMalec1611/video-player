import React, { createContext, useCallback, useReducer } from 'react';
import { signInUser } from './User.services';
import { ProviderValue, UserActions, UserActionTypes, UserState } from './User.types';
import axios from 'axios';

export const UserContext = createContext({} as ProviderValue);

const initialState: UserState = {
    authorization: undefined,
    user: undefined,
    loading: false,
};

const reducer = (state: UserState, action: UserActions) => {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return {
                ...state,
                authorization: {
                    isAuthorized: action.payload.authorization!.isAuthorized,
                    TokenExpires: action.payload.authorization!.TokenExpires,
                },
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
        } catch (err: any) {
            console.log(err);
        } finally {
            userDispatch({ type: UserActionTypes.SET_LOADING });
        }
    }, []);

    return (
        <UserContext.Provider value={{ userState, userDispatch, handleSignInUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
