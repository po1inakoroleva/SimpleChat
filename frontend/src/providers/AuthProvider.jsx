import React, {
  useMemo, useState, createContext, useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes.js';
import { actions as loadingStatusActions } from '../slices/loadingStatusSlice.js';

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser);

  const context = useMemo(() => {
    const logIn = async (userData) => {
      const response = await axios.post(routes.login(), userData);
      const { data } = response;
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
    };

    const logOut = () => {
      localStorage.removeItem('user');
      dispatch(loadingStatusActions.unload());
      setUser(null);
    };

    const getUserName = () => (user?.username ? user.username : null);

    const getAuthHeader = () => (user?.token ? { Authorization: `Bearer ${user.token}` } : {});

    const loggedIn = !!user;

    return ({
      logIn, logOut, loggedIn, getUserName, getAuthHeader,
    });
  }, [dispatch, user]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext, useAuth };
