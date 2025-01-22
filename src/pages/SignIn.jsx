"use client";
import React from "react";
import { useFormik } from "formik";
import { Loader } from "lucide-react";
import { signInValidationSchema } from "../validations/validation";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { signInUser } from "../apis/apiServices";
import { loginSuccess } from "../slices/userSlice";
import toast from "react-hot-toast";

// Validation schema using Yup

const SignIn = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
    
      
      dispatch(
        loginSuccess({
          token: data.token,
          userInfo: data.data,
        })
      );
      toast.success("Successfully signed in!");
      navigation("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      
      toast.error(
        error?.response?.data?.errors[0] || "Login failed. Please try again."
      );
      console.error("Login Error:", error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {

      mutate(values);
    },
  });

  return (
    <div className="flex justify-center items-center h-screen  bg-custom-radial-gradient px-10">
      <div className="border p-10 shadow-lg rounded-lg bg-white  sm:w-1/2 w-full">
        <h1 className="font-bold text-primary mb-4 text-2xl text-center">
          Sign In
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold ">
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
            <label className="text-sm font-semibold ">
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
            className={`w-full  text-white rounded-md py-3  flex gap-3 items-center justify-center ${
              formik.isSubmitting || !formik.isValid || !formik.dirty
                ? "bg-[#D0D0D0]"
                : "bg-[#7E5FF9]"
            }`}
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty || isPending}
          >
            {isPending && <Loader className="animate-spin" />} Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigation("/signup")}
            className="text-primary underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
