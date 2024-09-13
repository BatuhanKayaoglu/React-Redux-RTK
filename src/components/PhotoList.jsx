import { Button, CircularProgress } from "@mui/material";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Photo from "./Photo";

const PhotoList = (album) => {

    const handlePhotoAdd = () => {
        addPhoto(album);
    };

    const { data, isFetching, isError } = useFetchPhotosQuery(album);
    console.log("Fetched photos data:", data); // Fotoğraflar doğru geliyor mu?
    const [addPhoto, result] = useAddPhotoMutation();



    let content;
    if (isFetching) {
        content = "Yükleniyor...";
    } else if (isError) {
        content = "Hata var...";
    } else {
        content = data.map((photo) => (
            <Photo photo={photo} key={photo.id} />
        ));
    }


    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{album.title} Fotoğrafları</h3>
                <Button variant="outlined" color="primary" onClick={handlePhotoAdd}>
                    {result.isLoading ? <CircularProgress size={"20px"} /> : "Fotoğraf Ekle"}
                </Button>
            </div>
            {content}
        </div>

    )
}

export default PhotoList