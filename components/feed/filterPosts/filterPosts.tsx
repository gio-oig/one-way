"use client";
import { createPost, fetcher, filterPosts, sender } from "lib/api";
import { ComponentProps, useState, ReactNode } from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { ICity, NewPost, NewPostForm } from "types";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import { PostType } from "@prisma/client";

import "react-datepicker/dist/react-datepicker.css";
import useFeed from "../hooks/useFeed";
import { useFilteresStore } from "store/feedFilter";

type FilterPostForm = {
  originCityId: string;
  destinationCityId: string;
  numberOfPeople: string;
  moveOutDate: Date | null;
  postType: PostType | "";
};

const initialValues: FilterPostForm = {
  originCityId: "",
  destinationCityId: "",
  numberOfPeople: "",
  moveOutDate: null,
  postType: "",
};

const FilterPosts = () => {
  const { data, error } = useSWR<ICity[]>("/api/cities", fetcher);
  const { mutate } = useSWRConfig();
  // const { mutate } = useFeed();
  const { setFilters } = useFilteresStore();

  const [selectedCity, setSelectedCity] = useState<number[]>([]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);

      setFilters({
        destinationCityId: values.destinationCityId,
        numberOfPeople: values.numberOfPeople,
        originCityId: values.originCityId,
        postType: values.postType as PostType,
        moveOutDate: values.moveOutDate?.toISOString() || null,
      });
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
        </div>
        <div>
          <Label htmlFor="moveOutDate" text="pick a trip date" />
          <DatePicker
            className="rounded border"
            minDate={new Date()}
            name="moveOutDate"
            selected={formik.values.moveOutDate}
            onChange={(date: Date) => formik.setFieldValue("moveOutDate", date)}
          />
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
        </div>
        <div className="mt-3 flex items-end justify-between">
          <button className=" border px-3 py-2 text-sm">filter</button>
          <p
            className="cursor-pointer text-gray-500"
            onClick={(e) => {
              e.preventDefault();
              formik.resetForm();
            }}
          >
            clear filter
          </p>
        </div>
      </form>
    </div>
  );
};

export default FilterPosts;

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
