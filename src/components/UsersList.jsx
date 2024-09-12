import { useFetchUsersQuery, useAddUsersMutation } from "../store";
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import User from "./User";
import CustomModal from "./CustomModal";
import React, { useState } from "react";

const UsersList = () => {
  const { data, isFetching, isError } = useFetchUsersQuery();
  const [addUser, result] = useAddUsersMutation();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUserAdd = (userName) => {
    if (userName) {
      addUser(userName);
      handleClose();
    }
  };

  console.log(data, isFetching, isError);
  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "600px" }} />
    );
  } else if (isError) {
    content = <div>Hata var...</div>;
  } else {
    content = data.map((user) => <User key={user.id} user={user} />);
  }

  return (
    <div>
      <div className="topArrangement">
        <h1 style={{ fonSize: "20px" }}>Kişiler</h1>
        <Button variant="outlined" color="primary" onClick={handleOpen}>
          {result.isLoading ? (
            <CircularProgress size={"25px"} />
          ) : (
            "Kullanıcı Ekle"
          )}
        </Button>
      </div>
      {content}
      <CustomModal
        open={open}
        handleClose={handleClose}
        handleUserAdd={handleUserAdd}
      />
    </div>
  );
};

export default UsersList;
