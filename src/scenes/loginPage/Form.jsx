import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.string().required("Picture is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login"; // convenience var
  const isRegister = pageType === "register"; // convenience var

  const [isLoading, setIsLoading] = useState(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const register = async (values, onSubmitProps) => {
    const { picture, ...rest } = values; // Destructure picture from values
    const formData = new FormData();
    for (let value in rest) {
      formData.append(value, rest[value]);
    }
    if (picture) {
      formData.append("picture", picture); // Add the image file to the form data
    }

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    setIsLoading(true);
    const loggedInResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();

    if (
      loggedIn &&
      loggedIn.msg !== "User not found" &&
      loggedIn.msg !== "Invalid credentials"
    ) {
      setIncorrectLogin(false);
      dispatch(
        // sending payload to the state. see reference
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
      onSubmitProps.resetForm();
    } else {
      setIsLoading(false);
      setIncorrectLogin(true);
      onSubmitProps.resetForm();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        // the different props/properties that Formik gives us.
        values, // the values of the fields. whatever is in the initialValues.
        errors,
        touched,
        handleChange,
        handleBlur, // onBlur is when you click out of the field
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              // targetting any div right below the Box
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4", // if moile then span 4, else undefined. this is an override of the span 2 below
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  } // this means that if the field has been touched and there is an error, then it will show the error.
                  helperText={touched.firstName && errors.firstName} // different from error because this will show the error message below the field
                  sx={{
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)} // this means that if the field has been touched and there is an error, then it will show the error.
                  helperText={touched.lastName && errors.lastName} // different from error because this will show the error message below the field
                  sx={{
                    gridColumn: "span 2",
                  }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)} // this means that if the field has been touched and there is an error, then it will show the error.
                  helperText={touched.location && errors.location} // different from error because this will show the error message below the field
                  sx={{
                    gridColumn: "span 4", // spane 4 because they take up their own full line
                  }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  } // this means that if the field has been touched and there is an error, then it will show the error.
                  helperText={touched.occupation && errors.occupation} // different from error because this will show the error message below the field
                  sx={{
                    gridColumn: "span 4", // spane 4 because they take up their own full line
                  }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles={[".jpg", ".png", ".jpeg"]}
                    multiple={false}
                    maxSize={3145728} // 3 MB in bytes
                    onDropRejected={(fileRejections) => {
                      setFieldValue(
                        "errorMessage",
                        "File size exceeds the maximum limit of 3 MB!"
                      );
                    }}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]); // picture is the name of the field we set earlier
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()} // it passes the getRootProps from dropzone to its immediate next div
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            {/* login + register is the same until here. next is just login */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)} // this means that if the field has been touched and there is an error, then it will show the error.
              helperText={touched.email && errors.email} // different from error because this will show the error message below the field
              sx={{
                gridColumn: "span 4", // spane 4 because they take up their own full line
              }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)} // this means that if the field has been touched and there is an error, then it will show the error.
              helperText={touched.password && errors.password} // different from error because this will show the error message below the field
              sx={{
                gridColumn: "span 4", // spane 4 because they take up their own full line
              }}
            />
          </Box>
          <Typography
            color="error"
            sx={{
              textAlign: "center",
              mt: "1rem",
            }}
          >
            {incorrectLogin && isLogin && "Incorrect email or password"}
          </Typography>
          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main, // change this later TODO
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="secondary" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                setIncorrectLogin(false);
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light, // try changing this later TODO: palette.primary.light
                },
              }}
            >
              {isLogin ? "Sign up here" : "Login here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
