import { useContext } from 'react';
import { UserContext } from 'src/store/User/User.context';

export const useUser = () => useContext(UserContext);
