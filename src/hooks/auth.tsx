import { IUser } from "@/models/user";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { api } from "@/libs/fetch";

type AuthContent = {
  user?: IUser;
  login: (data: { username: string; password: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContent | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = _useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function _useAuth() {
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUser(JSON.parse(user));
  }, []);

  function login(data: { username: string; password: string }) {
    api
      .post("/api/login", data)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        router.push("/employee");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setUser(undefined);
    router.push("/");
  }

  return { user, login, logout };
}
