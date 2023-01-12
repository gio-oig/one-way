"use client";
import { createPost, fetcher } from "lib/api";
import { ComponentProps, useState, ReactNode } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ICity, NewPost, NewPostForm } from "types";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import { PostType } from "@prisma/client";
import { CreatePostSchema } from "utils/validationSchemas/post";

import "react-datepicker/dist/react-datepicker.css";

const initialValues: NewPostForm = {
  originCityId: "",
  destinationCityId: "",
  numberOfPeople: 0,
  moveOutDate: null,
  description: "",
  phone: "",
  postType: "",
};

const CreatePost = () => {
  const { data, error } = useSWR<ICity[]>("/api/cities", fetcher);
  const { mutate } = useSWRConfig();
  const [selectedCity, setSelectedCity] = useState<number[]>([]);

  const formik = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: CreatePostSchema,
    onSubmit: async (values) => {
      console.log(values);
      let newPostData = values as NewPost;

      await createPost({
        ...newPostData,
        originCityId: +values.originCityId,
        destinationCityId: +values.destinationCityId,
      });

      mutate("/api/post");
    },
  });
  console.log(formik.errors);
  return (
    <div className="rounded-lg px-6 py-4 shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2">
          <select name="originCityId" onChange={formik.handleChange}>
            <option value="" hidden></option>
            {data?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <select name="destinationCityId" onChange={formik.handleChange}>
            <option value="" hidden></option>

            {data?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label
            htmlFor="numberOfPeople"
            text="Select number of people"
            className="block text-xs font-medium text-gray-700"
          />

          <input
            className="w-full rounded border sm:text-sm"
            type="number"
            name="numberOfPeople"
            value={formik.values.numberOfPeople}
            onChange={formik.handleChange}
          />
          {formik.errors.numberOfPeople && formik.errors.numberOfPeople}
        </div>
        <div>
          <Label htmlFor="description" text="Description" />
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full resize-none rounded-md border outline-none"
          ></textarea>
        </div>
        <div>
          <Label
            htmlFor="phone"
            text="Phone"
            className="block text-xs font-medium text-gray-700"
          />
          <input
            className="w-full rounded border sm:text-sm"
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.errors.phone}
        </div>
        <div>
          <Label htmlFor="moveOutDate" text="pick a trip date" />
          <DatePicker
            className="rounded border"
            minDate={new Date()}
            selected={formik.values.moveOutDate}
            onChange={(date: Date) => formik.setFieldValue("moveOutDate", date)}
          />
          {formik.errors.moveOutDate && formik.errors.moveOutDate}
        </div>
        <div>
          <Label
            text="driver"
            className="inline-block text-xs font-medium text-gray-700"
          >
            <input
              type="radio"
              name="postType"
              value={PostType.DRIVER}
              onChange={formik.handleChange}
            />
          </Label>
          <br />
          <Label
            text="follower"
            className="inline-block text-xs font-medium text-gray-700"
          >
            <input
              type="radio"
              name="postType"
              value={PostType.FOLLOWER}
              onChange={formik.handleChange}
            />
          </Label>
          {formik.errors.postType && formik.errors.postType}
        </div>
        <button className="mt-3 border px-3 py-2 text-sm">create post</button>
      </form>
    </div>
  );
};

export default CreatePost;

type LabelProps = {
  text: ReactNode;
  children?: ReactNode;
} & ComponentProps<"label">;

const Label = ({ className, text, children, ...rest }: LabelProps) => (
  <label
    className={`mb-1 block text-xs font-medium text-gray-700 ${className}`}
    {...rest}
  >
    {children}
    {text}
  </label>
);
