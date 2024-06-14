import { SignupInput } from "@partiksingh/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token ", jwt);
      if (jwt) {
        window.alert("welcome bro");
      }
      navigate("/blogs");
    } catch (error) {
      console.log();
    }
  }
  return (
    <div className="h-screen w-3/6 justify-center ml-36 flex flex-col ">
      <div className="text-center">
        <div className=" text-3xl font-bold ">Create an account</div>
        <div className="text-md  font-light">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            className="underline pl-2"
            to={type === "signup" ? "signin" : "signup"}
          >
            login
          </Link>
          <div className="w-full mt-3">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your username"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Username"
              placeholder="exmaple@email.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="*********"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="text-white mt-4 bg-gray-800 hover:bg-gray-900 w-full focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
  return (
    <div>
      <label className="text-left block mb-2 text-md font-medium text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 border mb-2  border-gray-300 w-full text-gray-900 text-left text-md rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
