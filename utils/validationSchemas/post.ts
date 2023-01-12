import * as Yup from "yup";

const requiredString = Yup.string().required();
const requiredNumber = Yup.number().required();

export const CreatePostSchema = Yup.object().shape({
  originCityId: requiredString,
  destinationCityId: requiredString,
  numberOfPeople: requiredNumber.notOneOf(
    [0],
    "please select number of people"
  ),
  moveOutDate: Yup.date().required(),
  description: requiredString,
  phone: requiredString,
  postType: requiredString,
});
