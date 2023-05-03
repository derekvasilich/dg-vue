import { ref } from "vue";
import { authService } from "@/services";
import router from "@/router";
import { session } from "@/constants";

const authorization = ref(null);
const error = ref();

export const useAuth = () => {
  const login = (credentials) => {
    authService
      .login(credentials)
      .then((res) => {
        if (res.data && res.data.token && res.data.type) {
          authorization.value = res.data;
          sessionStorage.setItem(session.JWT_TOKEN, res.data.token);
          sessionStorage.setItem(session.JWT_TYPE, res.data.type);
          router.push({ name: "vehicles" });
        }
      })
      .catch((e) => {
        error.value = {
          status: e.response?.status || e.code,
          message: e.message,
        };
      });
  };

  const logout = () => {
    sessionStorage.removeItem(session.JWT_TOKEN);
    sessionStorage.removeItem(session.JWT_TYPE);
    sessionStorage.clear();
    if (typeof NativeWebInterface !== "undefined") {
      NativeWebInterface.logout();
    } else {
      router.push({ name: "signIn" });
    }
  };

  return {
    login,
    logout,
    error,
    authorization,
  };
};
