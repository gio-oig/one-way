import axios from "axios";
import { ICity, IPost } from "types";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

type ExistingUser = {
  email: string;
  password: string;
};

type BaseResponse = {
  message: string;
};

type SigninResponse = BaseResponse & {
  token: string;
};

export const signup = async (newUser: NewUser) => {
  return await axios.post<BaseResponse>("/api/signup", newUser);
};

export const signIn = async (userData: ExistingUser) => {
  return await axios.post<SigninResponse>("/api/signin", userData);
};

export const fetchPosts = async () => {
  const res = await axios.get<IPost[]>("http://localhost:3000/api/post");
  return res.data;
};

export const fetchCities = async () => {
  const res = await axios.get<ICity[]>("http://localhost:3000/api/post");
  return res.data;
};

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
