import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomAlbumModal = ({ open, handleClose, handleAlbumAdd, id }) => {
  const [albumName, setAlbumName] = React.useState(""); // Kullanıcı adını saklamak için state

  const handleAddClick = () => {
    console.log("handleAddClick called");
    console.log("setAlbumName", id)
    handleAlbumAdd({ albumName, id });
    setAlbumName(""); // Input alanını temizle
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="customModalMain">
          <p style={{ fontSize: "17px", fontWeight: "400" }}>Album Adı: </p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
          />

          <Button onClick={handleAddClick} variant="contained" >
            Album Ekle
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomAlbumModal;
