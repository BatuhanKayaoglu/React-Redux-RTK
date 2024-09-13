import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import usersApi from "./apis/usersApi";
import albumsApi from "./apis/albumsApi";
import photosApi from "./apis/photosApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware).concat(albumsApi.middleware).concat(photosApi.middleware),
});

setupListeners(store.dispatch);

export {
  useFetchUsersQuery,
  useFetchUsersByIdQuery,
  useAddUsersMutation,
  useDeleteUsersMutation,
} from "./apis/usersApi";

export {
  useFetchAlbumsQuery,
  useAddAlbumsMutation,
  useDeleteAlbumsMutation,
} from "./apis/albumsApi";

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} from "./apis/photosApi";