import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "./actions";

const CreateProductDialog = ({ onClose, open }) => {
  const { register, handleSubmit } = useForm();
  const { data, error, isValidating, execute } = useCreateProduct();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await execute({ name: data.name, price: Number(data.price) });
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
          Add Product
        </Typography>
        <TextField label="Name" {...register("name")} />
        <TextField label="Price" {...register("price")} type="number" />
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

export default CreateProductDialog;
