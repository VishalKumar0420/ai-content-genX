"use client";
import React from "react";
import { useFormik } from "formik";
import { Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signUpValidationSchema } from "../validations/validation";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../apis/apiServices";
import toast from "react-hot-toast";
import { loginSuccess } from "../slices/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
        
      dispatch(
        loginSuccess({
          token: data.token,
          userInfo: data.data,
        })
      );
      toast.success("Successfully signed up!");
      navigation("/dashboard");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.errors[0] || "Signup failed. Please try again."
      );

      console.error("Signup Error:", error.message);
    },
  });
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema, 
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      mutate(values);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-custom-radial-gradient px-10">
      <div className="border p-10 shadow-lg rounded-lg bg-white sm:w-1/2 w-full">
        <h1 className="font-bold text-primary mb-4 text-2xl text-center">
          Sign Up
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              Username: <sup className="text-red-600">*</sup>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-3 px-2 border border-1"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="font-thin text-red-500 text-sm">
                {formik.errors.username}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              Email: <sup className="text-red-600">*</sup>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-3 px-2 border border-1"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="font-thin text-red-500 text-sm">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">
              Password: <sup className="text-red-600">*</sup>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="py-3 px-2 border border-1"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="font-thin text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className={`w-full  text-white rounded-md py-3  flex gap-3 items-center justify-center ${(formik.isSubmitting || !formik.isValid || !formik.dirty || isPending)?"bg-[#D0D0D0]":"bg-[#7E5FF9]"}`}
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
          >
            {isPending && <Loader className="animate-spin" />} Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigation("/signin")}
            className="text-primary underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
