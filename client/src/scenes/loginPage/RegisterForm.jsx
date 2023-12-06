import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    console.log("Form submitted with values:", values);
    try {
      // Your registration logic here

      const savedUserResponse = await fetch(
        "https://serverdeploy-7xbn.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (savedUserResponse.ok) {
        const registeredUserResponse = await savedUserResponse.json();
        console.log("registerednewUser:", registeredUserResponse);
        alert("User registered successfully! Login to access futbolWiki.");
        setLoading(false);
        navigate("/login");
      } else {
        alert("Error while registering!");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);  
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
        <div>
          {loading ? (
            <div className="text-white mt-5 font-medium ">Loading...</div>
          ) : (
            <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
              <Typography
                fontFamily="Ubuntu"
                padding="0rem 0.4rem"
                fontSize="clamp(0.5rem, 1.5rem, 2rem)"
                color="black"
              >
                New User Registration
              </Typography>{" "}
              <br></br>
              <Form>
                <Typography
                  fontFamily="Ubuntu"
                  padding="0rem 0.4rem"
                  fontSize="clamp(0.2rem, 0.8rem, 1.2rem)"
                  color="black"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium "
                    >
                      First Name:
                    </label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-black"
                    >
                      Last Name:
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

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
                    className="bg-green-500 text-black py-2 px-4
                 rounded-md hover:bg-green-600 focus:outline-none focus:ring
                 focus:border-green-700"
                  >
                    Register
                  </Button>
                </Typography>
              </Form>
              <br></br>
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                color="primary"
                className="bg-[#00d5fa] text-white  px-2
             rounded-md text-black focus:outline-none focus:ring"
              >
                LOGIN
              </Button>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
