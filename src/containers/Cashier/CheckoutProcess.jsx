import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCart } from "./actions";
import { ReactComponent as NoCart } from "../../assets/emptycode.svg";
import moment from "moment";
import ConfirmOrderDialog from "./ConfirmOrderDialog";

const CartPriceDetail = ({ title, price }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography fontWeight="bold">{title}</Typography>
      <Typography>&#x20B1;{price.toFixed(2)}</Typography>
    </Box>
  );
};

const CartItem = ({ quantity, name, price }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
        <Typography>{quantity}</Typography>
        <Typography>{name}</Typography>
      </Box>
      <Typography>&#x20B1;{price.toFixed(2)}</Typography>
    </Box>
  );
};

const CheckoutProcess = () => {
  const [cart, setCart] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const { data, error, isValidating, execute } = useGetCart();

  const handleGetCode = async (data) => {
    await execute(data.code);
  };

  const vat = cart.total * 0.12;
  const vatableSale = cart.total - vat;

  const paymentAmount = Number(watch("cash")) || 0;
  const change = paymentAmount < cart.total ? 0 : paymentAmount - cart.total;

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) return console.log(error.message);

      setCart(data);
    })();
  }, [data, error]);

  if (isValidating)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="flex-end" mb="16px" gap="8px">
        <TextField label="Customer Code" size="small" {...register("code")} />
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit(handleGetCode)}
        >
          Enter
        </Button>
      </Box>
      <Container maxWidth="md">
        {Object.keys(cart).length ? (
          <>
            <ConfirmOrderDialog
              onClose={() => setOpenDialog(false)}
              open={openDialog}
              cartId={cart._id}
              paymentAmount={paymentAmount}
            />
            <Box display="flex" flexDirection="column" gap="16px">
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {cart._id.slice(0, 8)}
                </Typography>
                <Typography>
                  {moment(cart.createdAt).format("hh:mm DD/MM/YY")}
                </Typography>
              </Box>
              <Box maxHeight="300px" overflow="auto">
                {cart.products.map((c) => {
                  const price = c.product.price * c.quantity;
                  return (
                    <CartItem
                      name={c.product.name}
                      quantity={c.quantity}
                      price={price}
                    />
                  );
                })}
              </Box>
              <Divider />
              <Box display="flex" flexDirection="column" gap="4px">
                <CartPriceDetail title="Total" price={cart.total} />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold">Cash</Typography>
                  <TextField
                    label="Enter Cash"
                    size="small"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          &#x20B1;
                        </InputAdornment>
                      ),
                    }}
                    {...register("cash", { min: 0 })}
                  />
                </Box>
                <CartPriceDetail title="Change Due" price={change} />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight="bold">Items Purchased</Typography>
                  <Typography>{cart.products.length}</Typography>
                </Box>
                <CartPriceDetail title="Vatable Sale" price={vatableSale} />
                <CartPriceDetail title="VAT (12%)" price={vat} />
              </Box>
            </Box>
            <Box display="flex" mt="24px" justifyContent="flex-end">
              <Button
                variant="contained"
                disabled={paymentAmount < cart.total}
                onClick={() => setOpenDialog(true)}
              >
                {paymentAmount < cart.total
                  ? "Insufficient Amount"
                  : "Complete Order"}
              </Button>
            </Box>
          </>
        ) : (
          <Box
            display="flex"
            mt="24px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <NoCart />
            <Typography variant="h5" mt="16px">
              Empty Cart
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CheckoutProcess;
