import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_SERVER_PATH}`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const
