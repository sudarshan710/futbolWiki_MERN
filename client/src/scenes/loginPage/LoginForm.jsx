import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    try {
      const savedUserResponse = await fetch(
        "https://serverdeploy-7xbn.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (savedUserResponse.ok) {
        const loggedInUserResponse = await savedUserResponse.json();
        console.log("savedUser:", loggedInUserResponse);
        if (loggedInUserResponse) {
          dispatch(
            setLogin({
              user: loggedInUserResponse.user,
              token: loggedInUserResponse.token,
            })
          );
        }
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
          <Form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <Field
                type="text"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4" // Adjust margin-top as needed
            >
              Login
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
