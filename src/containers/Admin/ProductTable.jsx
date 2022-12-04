import { Delete, Download } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct, useEditProduct, useGetAllProducts } from "./actions";
import QRCode from "qrcode";

const ActionButtons = ({ productId, name, price }) => {
  const { data, error, isValidating, execute } = useDeleteProduct();
  const [QRSrc, setQRSrc] = useState("");

  const onSubmit = async () => {
    await execute(productId);
  };

  const downloadQR = async () => {
    const src = await QRCode.toDataURL(
      `${JSON.stringify({ _id: productId, name, price })}`
    );
    const link = document.createElement("a");
    link.download = `${name}-qr.png`;
    link.href = src;
    link.click();
  };

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!data && !error) return;
      if (error) return console.log(error.message);

      navigate(0);
    })();
  }, [data, error]);

  return (
    <Box display="flex" gap="8px" alignItems="center">
      <IconButton onClick={onSubmit} isValidating={isValidating}>
        <Delete />
      </IconButton>
      <IconButton onClick={downloadQR}>
        <Download />
      </IconButton>
    </Box>
  );
};

const columns = [
  {
    field: "id",
    hide: true,
  },
  {
    field: "name",
    headerName: "Name",
    editable: true,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Price",
    editable: true,
    flex: 1,
  },
  {
    align: "center",
    renderCell: (item) => (
      <ActionButtons
        productId={item.id}
        name={item.row.name}
        price={item.row.price}
      />
    ),
  },
];

const ProductTable = () => {
  const { data, isValidating, mutate } = useGetAllProducts();

  const { execute } = useEditProduct();

  const cellEditCommit = useCallback(
    async (params) => {
      await execute(params.id, { [params.field]: params.value });
      return mutate();
    },
    [mutate, execute]
  );

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
    <Box height="500px">
      <DataGrid
        columns={columns}
        getRowId={(row) => row._id}
        onCellEditCommit={cellEditCommit}
        rows={data}
        pageSize={10}
      />
    </Box>
  );
};

export default ProductTable;
