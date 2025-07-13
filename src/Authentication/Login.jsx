import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hook/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signUser } = useAuth();
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit = (data) => {
    signUser(data.email, data.password)
      .then((resule) => {
        console.log(resule.user);
        setErrorMsg('')
        navigate('/')
      })
      .catch((error) => {
        setErrorMsg(error.message)
        
      });
    console.log(data);
  };
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto my-20">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label className="block dark:text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            fdprocessedid="utpj7l"
            {...register("email", { required: true })}
          />
          {errorMsg && <p className="text-red-500">Email not match</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label className="block dark:text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            fdprocessedid="c9kqho"
            {...register("password", { required: true })}
          />
          {errorMsg && <p className="text-red-500">Password not match </p>}
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          className="block w-full p-3 cursor-pointer text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
          fdprocessedid="nkflyg"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          fdprocessedid="ea7aqa"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-5 h-5 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
          <p>Login with Google</p>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Don't have an account?
        <Link to="/register" className="underline cursor-pointer text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
