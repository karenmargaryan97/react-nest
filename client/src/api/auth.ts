import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (fields: any) => {
  const data = {
    email: fields.email.toLowerCase(),
    password: fields.password,
  };
  return axios.request({
    url: `${API_URL}/users/login`,
    data,
    method: "POST",
  });
}

export const signup = async (fields: any) => {
  const data = {
    email: fields.email.toLowerCase(),
    password: fields.password,
  };
  return axios.request({
    url: `${API_URL}/users/signup`,
    data,
    method: "POST",
  });
}

export const getUser = async () => {
  return axios.request({
    url: `${API_URL}/users/me`,
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem('token'),
    }
  });
}