import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Psycopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        theme="theme.palette.background.alt"
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            mb: "1.5rem",
          }}
        >
          You must be a Psycopath to be here
        </Typography>
        <Form />
        <Typography
          sx={{ mt: 2, fontStyle: "italic", fontSize: "14px" }}
          color={theme.palette.neutral.medium}
        >
          Test login credentials - username: tester@tester.com password:
          12345678
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
