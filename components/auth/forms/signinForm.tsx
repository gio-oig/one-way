import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import { signIn } from "lib/api";

import EmailIcon from "@components/svgs/email";
import OpenEye from "@components/svgs/openEye";
import Link from "next/link";

const initState = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initState,
    onSubmit: async (values) => {
      try {
        const res = await signIn(values);
        localStorage.setItem("TOKEN", res.data.token);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto mt-8 mb-0 max-w-md space-y-4"
    >
      <div className="relative">
        <input
          type="email"
          name="email"
          className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder="Enter email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <span className="absolute inset-y-0 right-4 inline-flex items-center">
          <EmailIcon />
        </span>
      </div>

      <div className="relative">
        <input
          type="password"
          name="password"
          className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
          placeholder="Enter password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <span className="absolute inset-y-0 right-4 inline-flex items-center">
          <OpenEye />
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          No account?
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </p>

        <button
          type="submit"
          className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
