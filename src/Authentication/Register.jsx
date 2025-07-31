import React, { use, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const Register = () => {
  const { user, creatUser, userProfile, signwithGoogle } = useAuth();
  const [profilePic, setProfilePic] = useState();

  const providerGoogle = new GoogleAuthProvider();
  const navigation = useNavigate();
  const {
    register,

    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    creatUser(email, password)
      .then(async (result) => {
        const profileUpdate = {
          displayName: data.name,
          photoURL: profilePic,
        };
        // profile update
        userProfile(profileUpdate)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        // user info
        const userInfo = {
          email,
          name: data.name,
          bank_account: data.Account,
          salary: parseInt(data.Salary),
          role: data.Role,
          Desiganation: data.Desigation,
          photo: profilePic,
          isVarified: false,
          status: "pending",
        };

       try{
         await axios.post("https://employee-managment-server-three.vercel.app/users",userInfo);
         
         Swal.fire({
           position: "center",
           icon: "success",
           title: "Your successfully registerd",
           showConfirmButton: false,
           timer: 1500,
          });
          navigation("/");
          // console.log('register is done')
       
      }catch(error){
        console.log("error message not register",error.message)

      }
    })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //gogle sign in
  const handleGoogle = () => {
    signwithGoogle(providerGoogle)
      .then(async (result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        };
        await axios.post(
          "https://employee-managment-server-three.vercel.app/social-login",
          userData
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully google-login",
          showConfirmButton: false,
          timer: 1500,
        });
        navigation("/");

        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // upload image handle
  const uploadImagehandle = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);
    const imgeLoadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMG_SECERT_KEY
    }`;
    try {
      const res = await axios.post(imgeLoadUrl, formData);

      if (res.data.success) {
        const imgUrl = res.data.data.url;
        setProfilePic(imgUrl);
      }
    } catch (error) {
      console.log("Image uploade is failed", error.message);
    }
  };

  return (
    <div className="w-full max-w-md p-5 space-y-1 rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto my-5">
      <h1 className="text-4xl font-bold text-center">Creat Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Name
          </label>
          <input
            placeholder="Name"
            type="text"
            className=" w-full px-4 py-3 rounded-md border-2 border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            {...register("name", { required: "name is required" })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Bank Account
          </label>
          <input
            placeholder="Account number"
            type="Number"
            className="border-2 w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            {...register("Account", { required: true })}
          />
          {errors.Account && (
            <p className="text-red-600">Account is required</p>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Salary
          </label>
          <input
            placeholder="Salary"
            type="number"
            className="border-2 w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            {...register("Salary", { required: true })}
          />
          {errors.Salary && <p className="text-red-600">Salary is required</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Photo
          </label>
          <input
            placeholder="Upload your photo"
            type="file"
            className="border-2 w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            onChange={uploadImagehandle}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Role
          </label>
          <select
            className="border-2 w-full px-2 "
            {...register("Role", { required: true })}
          >
            <option value="Employee">Employee</option>
            <option value="Hr">Hr</option>
          </select>
          {errors.Role && <p className="text-red-600">Role is required</p>}
        </div>

        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Desigation
          </label>
          <input
            type="text"
            placeholder="Desigation"
            className="border-2 w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            {...register("Desigation", { required: true })}
          />
          {errors.Desigation && (
            <p className="text-red-500">Desigation is required</p>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border-2 w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            className="border-2 w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: {
                hasUppercase: (value) =>
                  /[A-Z]/.test(value) || `Don't have Capital letter`,
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>_\-]/.test(value) ||
                  `Don't have a special character`,
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-end text-xs dark:text-gray-600">
          <a rel="noopener noreferrer" href="#">
            Forgot Password?
          </a>
        </div>

        <input
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 cursor-pointer"
          type="submit"
          value="Submit"
        />
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 mb-2 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div className="flex justify-center gap-5">
        <button
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-2 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600 cursor-pointer"
          fdprocessedid="ea7aqa"
          onClick={handleGoogle}
        >
          <FcGoogle size={30} />
          <p>Login with Google</p>
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Already have an account?
        <Link to="/login" className="underline cursor-pointer text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
