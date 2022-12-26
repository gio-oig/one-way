"use client";
import { createPost, fetcher } from "lib/api";
import { ComponentProps, useState, ReactNode } from "react";
import useSWR from "swr";
import { ICity, NewPost } from "types";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const initialValues: NewPost = {
  originCityId: "",
  destinationCityId: "",
  numberOfPeople: 0,
  moveOutDate: null,
  description: "",
};

const CreatePost = () => {
  const router = useRouter();
  const { data, error } = useSWR<ICity[]>("/api/cities", fetcher);
  // const { data, mutate } = useSWR('/api/user', fetcher)
  const [selectedCity, setSelectedCity] = useState<number[]>([]);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);

      await createPost({
        ...values,
        originCityId: +values.originCityId,
        destinationCityId: +values.destinationCityId,
      });

      router.refresh();
    },
  });

  return (
    <div className="rounded-lg px-6 py-4 shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex">
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
          <Label htmlFor="description" text="Description" />
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full resize-none rounded-md border outline-none"
          ></textarea>
        </div>
        <div>
          <Label htmlFor="moveOutDate" text="pick a trip date" />
          <DatePicker
            className="rounded border"
            minDate={new Date()}
            selected={formik.values.moveOutDate}
            onChange={(date: Date) => formik.setFieldValue("moveOutDate", date)}
          />
        </div>
        <button className="mt-3 border px-3 py-2 text-sm">create post</button>
      </form>
    </div>
  );
};

export default CreatePost;

type LabelProps = {
  text: ReactNode;
} & ComponentProps<"label">;

const Label = ({ className, text, ...rest }: LabelProps) => (
  <label
    className={`mb-1 block text-xs font-medium text-gray-700 ${className}`}
    {...rest}
  >
    {text}
  </label>
);
