"use client";

import React, { useMemo, useState } from "react";
import { IPost } from "types";
import { calculateLeftDays } from "utils/functions";

type PostProps = {
  post: IPost;
};

const Post = ({ post }: PostProps) => {
  const {
    author,
    description,
    destinationCity,
    numberOfPeople,
    originCity,
    moveOutDate,
    type,
    phone,
  } = post;
  const [isTruncated, setIsTruncated] = useState(true);
  const [textHeight, setTextHeight] = useState("60px");

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
    setTextHeight(isTruncated ? "auto" : "60px"); // toggle the height
  };

  // const descriptionText = isTruncated
  //   ? description.substring(0, 15)
  //   : description;

  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <div className="px-6 py-4">
        <h2 className="mb-2 font-bold md:text-2xl">
          {originCity.cityTranslations[0].name} →{" "}
          {destinationCity.cityTranslations[0].name}
        </h2>
        <p className="mb-2 text-xs text-gray-600">
          <i className="far fa-user" /> {author.name}
        </p>
        <div
          className={`mb-4 text-base text-gray-700 ${
            isTruncated ? "line-clamp-3" : "line-clamp-none"
          }`}
        >
          {description}
        </div>
        <button onClick={toggleTruncation}>show more</button>
        <p className="mb-2 text-xs text-gray-600">{phone}</p>
        <div className="flex items-center justify-between">
          <p className="mb-2 text-xs text-gray-600">
            <i className="far fa-users" /> {numberOfPeople} people
          </p>
          <p className="mb-2 text-xs text-gray-600">
            <i className="far fa-calendar-alt" /> in{" "}
            {calculateLeftDays(moveOutDate)} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
