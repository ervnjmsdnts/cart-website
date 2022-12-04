import { Box, Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import CreateStaffDialog from "../containers/Admin/CreateStaffDialog";
import StaffTable from "../containers/Admin/StaffTable";

const StaffPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
      <CreateStaffDialog
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
              Staffs
            </Typography>
            <Button onClick={() => setOpenDialog(true)}>Add Staff</Button>
          </Box>
          <StaffTable />
        </Container>
      </Box>
    </>
  );
};

export default StaffPage;
