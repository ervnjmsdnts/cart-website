import { Delete } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteStaff, useEditStaff, useGetAllStaffs } from "./actions";

const DeleteButton = ({ userId }) => {
  const { data, error, isValidating, execute } = useDeleteStaff();

  const onSubmit = async () => {
    await execute(userId);
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
    <IconButton disabled={isValidating} onClick={onSubmit}>
      <Delete />
    </IconButton>
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
    flex: 1,
  },
  {
    field: "username",
    headerName: "Username",
    editable: true,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email Address",
    editable: true,
    flex: 1,
  },
  {
    field: "password",
    headerName: "Password",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    editable: true,
    flex: 0.5,
  },
  {
    align: "center",
    renderCell: (item) => <DeleteButton userId={item.id} />,
  },
];

const StaffTable = () => {
  const { data, isValidating, mutate } = useGetAllStaffs();

  const { execute } = useEditStaff();

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

  const rows = data?.map((user) => ({
    ...user,
    name: `${user.firstName} ${user.lastName}`,
  }));

  return (
    <Box height="500px">
      <DataGrid
        columns={columns}
        getRowId={(row) => row._id}
        onCellEditCommit={cellEditCommit}
        rows={rows}
        pageSize={10}
      />
    </Box>
  );
};

export default StaffTable;
