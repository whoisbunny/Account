import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();
const ForgotPass = () => {
  const dispatch = useDispatch();
  const {message , isSuccess} = useSelector((state)=> state.auth)
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {

    
  };

  if (isSuccess === true && message){
setTimeout(() => {
  navigate(`/forgot-password-verify?${data?.email}`);
}, 500);
  }
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <Textinput
          name="email"
          label="email"
          placeholder="Enter your email address"
          type="email"
          register={register}
          error={errors.email}
          className="h-[48px]"
        />

        <button className="btn btn-dark block w-full text-center">
          Send recovery email
        </button>
      </form>
    );
};

export default ForgotPass;
