import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  const { numberOfPeople, originCityId, destinationCityId, moveOutDate } =
    req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        authorId: user.id,
        moveOutDate,
        numberOfPeople,
        destinationCityId,
        originCityId,
      },
    });

    return res.json({ message: "post has been created", data: newPost });
  } catch (error) {
    console.log(error, "error");
    return res.status(401).json({ message: "could not create post" });
  }
});
