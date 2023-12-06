import { Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material";
import LoginForm from "./LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

const LoginPage = () => {
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const FullPageBox = styled(Box)({
    height: "100vh",
    width: "100vw",
  });

  return (
    <FullPageBox backgroundColor={dark}>
      <Box>
        <FlexBetween flexDirection={"column"}>
          <Typography
            fontFamily="Young Serif"
            padding="0rem 0.4rem"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color={"white"}
          >
            futbolWiki
          </Typography>
          <br></br>
          <Typography
            fontFamily="Ubuntu"
            padding="0rem 0.4rem"
            fontSize="clamp(0.5rem, 1.5rem, 2rem)"
            color="white"
          >
            Login
          </Typography>
          <LoginForm />
          <br></br>
          <Button
            onClick={handleRegisterClick}
            variant="contained"
            color="primary"
            className="bg-green-500  py-2 px-4
            rounded-md text-black hover:bg-green-600 focus:outline-none focus:ring
            focus:border-green-700"
          >
            Register
          </Button>
        </FlexBetween>
      </Box>
    </FullPageBox>
  );
};

export default LoginPage;
