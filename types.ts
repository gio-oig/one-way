import { User, PostType, CityTranslations, City } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface JwtBody {
  id: string;
}

export type NextHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => Promise<void>;

export interface IPost {
  id: number;
  author: User;
  description: string;
  originCity: City & {
    cityTranslations: CityTranslations[];
  };
  destinationCity: City & {
    cityTranslations: CityTranslations[];
  };
  numberOfPeople: number;
  moveOutDate: string;
  type: PostType;
  phone: string;
}

export type ICity = City & {
  name: string;
};

export type NewPost = {
  originCityId: number | string;
  destinationCityId: number | string;
  numberOfPeople: number;
  moveOutDate: Date | null;
  description: string;
  phone: string;
  postType: PostType;
};

export type NewPostForm = Omit<NewPost, "postType"> & {
  postType: PostType | string;
};
