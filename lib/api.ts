import axios from "axios";

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
