import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import CreateProductDialog from "../containers/Admin/CreateProductDialog";
import ProductTable from "../containers/Admin/ProductTable";

const ProductPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <CreateProductDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <Box>
        <Container maxWidth="md">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" fontWeight="bold">
              Products
            </Typography>
            <Button onClick={() => setOpenDialog(true)}>Add Product</Button>
          </Box>
          <ProductTable />
        </Container>
      </Box>
    </>
  );
};

export default ProductPage;
