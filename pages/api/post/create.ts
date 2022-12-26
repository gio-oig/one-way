import { PostType } from "@prisma/client";
import { validateRoute } from "lib/auth";
import prisma from "lib/prisma";

export default validateRoute(async (req, res, user) => {
  const {
    numberOfPeople,
    originCityId,
    destinationCityId,
    moveOutDate,
    description,
  } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        authorId: user.id,
        moveOutDate,
        numberOfPeople,
        destinationCityId,
        description,
        originCityId,
        type: PostType.DRIVER,
      },
    });

    return res.json({ message: "post has been created", data: newPost });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "could not create post" });
  }
});
