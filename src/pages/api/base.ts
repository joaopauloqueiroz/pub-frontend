import axios from "axios";
import { getSession } from "next-auth/react";

const httpInstanceServer = async ({
  req,
  options = {},
  useAuthorization = true,
}: any) => {
  const requestId = Date.now();
  const headers = {
    Accept: "application/json",
    "x-request-id": requestId,
  };
  const _http = axios.create({
    baseURL: process.env.NEXTAUTH_BACKENDURL,
    withCredentials: true,
  });

  _http.interceptors.request.use(
    async (config: any) => {
      config.headers = { ...headers };
      if (useAuthorization) {
        const session: any = await getSession({ req });
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  _http.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error?.response?.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
  return _http({ ...options });
};
export default httpInstanceServer;
