import axios from "axios";
const httpInstanceClient = axios.create({
  baseURL: process.env.NEXTAUTH_BACKENDURL,
});

export { httpInstanceClient };
