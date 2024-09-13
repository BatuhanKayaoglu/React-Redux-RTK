import { useDeleteAlbumsMutation } from "../store";
import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import { CircularProgress } from "@mui/material";
import PhotoList from "./photoList";



const Album = ({ album }) => {

    const [deleteAlbums, { isLoading: deleteIsLoading }] = useDeleteAlbumsMutation(); // İkinci öğe durum bilgilerini içerir

    const handleRemoveAlbum = (album) => {
        deleteAlbums(album);
    }

    const header = (
        <div className="headerMain">
            <button onClick={() => handleRemoveAlbum(album)} style={{ cursor: "pointer" }}>
                {deleteIsLoading ? (<CircularProgress size={"20px"} />) : (<GoTrash />)}
            </button>
            <h2>{album.title}</h2>
        </div>
    )



    return (
        <div>
            <ExpandablePanel header={header}>
                <PhotoList album={album} />
            </ExpandablePanel >
        </div>

    )
}

export default Album