import { useAddAlbumsMutation, useDeleteAlbumsMutation, useFetchAlbumsQuery } from "../store";
import { useFetchUsersByIdQuery } from "../store";
import React from "react";
import { Button } from "@mui/material";
import CustomAlbumModal from "./CustomAlbumModal";
import Album from "./Album";


const AlbumList = ({ user }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAlbumAdd = (album) => {
        addAlbum(album);
        handleClose();
    };

    const [addAlbum, result] = useAddAlbumsMutation();
    const { data, isFetching, isError } = useFetchAlbumsQuery(user);
    const userId = data && data[0] ? data[0].userId : null;

    const { data: userData, isFetching: isUserFetching, isError: isUserError } = useFetchUsersByIdQuery(userId, { skip: !userId });


    let content;
    if (isFetching) {
        content = "Yükleniyor...";
    } else if (isError) {
        content = "Hata var...";
    } else {
        content = data.map((album) => (
            <Album album={album} key={album.id} />
        ));
    }


    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {userId && userData && !isUserFetching && <h2 style={{ fontSize: "19px" }}>{userData[0].name} Albümü</h2>}
                <Button variant="outlined" color="primary" onClick={handleOpen}>
                    Albüm Ekle
                </Button>
            </div>

            <div >
                {!isUserFetching && content}
            </div>
            <CustomAlbumModal
                open={open}
                handleClose={handleClose}
                handleAlbumAdd={handleAlbumAdd}
                id={userId}
            />
        </div >
    )
}

export default AlbumList