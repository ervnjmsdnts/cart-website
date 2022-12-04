import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCompleteCheckout } from "./actions";

const ConfirmOrderDialog = ({ onClose, open, paymentAmount, cartId }) => {
  const { data, error, isValidating, execute } = useCompleteCheckout();

  console.log({ cartId, paymentAmount });

  const onSubmit = async () => {
    await execute(cartId, { paymentAmount });
  };

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) return console.log(error.message);

      console.log({ data });

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
          Complete Order
        </Typography>
        <Typography textAlign="center">
          Are you sure you want to complete the customer&apos;s order?
        </Typography>
        <Box
          display="flex"
          gap="16px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            disabled={isValidating}
          >
            Back
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={isValidating}
            onClick={onSubmit}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmOrderDialog;
