import { UserEntity } from "../models/User.entity";
import { createContext, useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext<IValue>({
  user: null,
  login: null,
  logout: null,
});

interface IAuthProvider {
  children: JSX.Element;
}
interface IValue {
  user: UserEntity | unknown;
  login: any;
  logout: any;
}
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useLocalStorage("user", null);
  const history = useHistory();

  // call this function when you want to authenticate the user
  const login = async (data: UserEntity) => {
    setUser(data);
    if (history) history.push("/beranda");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    if (history) history.push("/");
  };

  const value: IValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
