import AlbumList from "./AlbumList";
import { GoTrash } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import { useDeleteUsersMutation } from "../store";
import { useReducer } from "react";
import { CircularProgress } from "@mui/material";


const User = ({ user }) => {

  const [deleteUsers, { isLoading, isError }] = useDeleteUsersMutation(); // İkinci öğe genellikle durum bilgilerini içerir

  const handleRemoveUser = (user) => {
    console.log(deleteUsers)
    deleteUsers(user);
  }

  const header = (
    <div className="headerMain">
      <button onClick={() => handleRemoveUser(user)} style={{ cursor: "pointer" }}>
        {isLoading ? (<CircularProgress size={"20px"} />) : (<GoTrash />)}
      </button>
      <h2>{user.name}</h2>
    </div>
  )

  return <div>
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel >
  </div>;
};

export default User;
