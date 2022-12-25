"use client";
import { fetcher } from "lib/api";
import { ComponentProps, useState, ReactNode } from "react";
import useSWR from "swr";
import { ICity } from "types";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";

import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  originCity: "",
  destinationCity: "",
  numberOfPeople: "",
  date: null,
  description: "",
};

const CreatePost = () => {
  const { data, error } = useSWR<ICity[]>("/api/cities", fetcher);
  const [selectedCity, setSelectedCity] = useState<number[]>([]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="rounded-lg px-6 py-4 shadow-md">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex">
          <select className="" name="originCity" onChange={formik.handleChange}>
            <option value="" hidden></option>
            {data?.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <select name="destinationCity" onChange={formik.handleChange}>
            <option value="" hidden></option>

            {data?.map((city) => (
              <option key={city.id} value={city.name}>
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
          <Label htmlFor="date" text="pick a trip date" />
          <DatePicker
            className="rounded border"
            minDate={new Date()}
            selected={formik.values.date}
            onChange={(date: Date) => formik.setFieldValue("date", date)}
          />
        </div>
        <button className="border px-3 py-2 text-sm">create post</button>
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
