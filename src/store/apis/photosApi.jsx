import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = () => new Promise((resolve) => setTimeout(resolve, 1000));

const photosApi = createApi({
    reducerPath: "photos",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause();
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        fetchPhotos: builder.query({
            providesTags: (result, error, { album }) => {
                console.log(album)
                const tags = result.map((photo) => {
                    console.log(photo);
                    return { type: "Photo", id: photo.id }
                })
                tags.push({ type: "AlbumPhoto", id: album.id });
                return tags;
            },
            query: (album) => {
                return {
                    url: "/photos",
                    method: "GET",
                    params: {
                        albumId: album.id
                    }
                };
            },
        }),
        addPhoto: builder.mutation({
            invalidatesTags: (result, error, { album }) => {
                return [{ type: "AlbumPhoto", id: album.id }]
            },

            query: ({ album }) => {
                console.log(album);
                return {
                    url: "/photos",
                    method: "POST",
                    body: {
                        albumId: album.id,
                        url: "https://picsum.photos/150/150"
                    },
                };
            },
        }),
        deletePhoto: builder.mutation({
            invalidatesTags: (result, error, photo) => {
                return [
                    { type: "Photo", id: photo.id }
                ];
            },
            query: (photo) => {
                return {
                    url: `/photos/${photo.id}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useDeletePhotoMutation,
} = photosApi;
export default photosApi;
