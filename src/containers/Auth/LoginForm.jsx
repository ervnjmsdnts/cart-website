import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useLogin } from "./actions";

const InputForm = forwardRef(({ ...rest }, ref) => {
  return <TextField fullWidth ref={ref} {...rest} />;
});

const LoginForm = () => {
  const { register, handleSubmit } = useForm();

  const { login } = useAuth();

  const { data, error, isValidating, execute } = useLogin();

  const onSubmit = async (data) => {
    await execute({ ...data });
  };

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) return console.log(error.message);

      console.log({ data });

      login(data.token, data.user);

      if (data.user.role === "staff") return navigate("/cashier");
      if (data.user.role === "admin") return navigate("/admin/staff");
    })();
  }, [data, error, login, navigate]);

  return (
    <Container maxWidth="sm">
      <Logo style={{ position: "absolute", top: 16, left: 16 }} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        gap="16px"
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            Hi! Welcome Back!
          </Typography>
          <Typography variant="h6">Please enter your credentials</Typography>
        </Box>
        <Box display="flex" width="100%" gap="8px" flexDirection="column">
          <InputForm label="Email Address" {...register("email")} />
          <InputForm
            label="Password"
            type="password"
            {...register("password")}
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          disabled={isValidating}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
