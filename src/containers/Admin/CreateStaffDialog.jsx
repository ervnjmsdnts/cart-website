import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateStaff } from "./actions";

const CreateStaffDialog = ({ onClose, open }) => {
  const { register, handleSubmit } = useForm();
  const { data, error, isValidating, execute } = useCreateStaff();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await execute({ ...data });
  };

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) return console.log(error.message);

      navigate(0);
    })();
  }, [data, error]);

  return (
    <Dialog onClose={onClose} open={open}>
      <Box
        p="16px"
        width="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="16px"
      >
        <Typography variant="h6" fontWeight="bold">
          Add Staff
        </Typography>
        <TextField label="First Name" {...register("firstName")} />
        <TextField label="Last Name" {...register("lastName")} />
        <TextField label="Username" {...register("username")} />
        <TextField label="Email" {...register("email")} />
        <TextField label="Password" {...register("password")} type="password" />
        <Button
          disabled={isValidating}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateStaffDialog;
