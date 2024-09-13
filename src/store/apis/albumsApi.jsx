import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = () => new Promise((resolve) => setTimeout(resolve, 1000));

const albumsApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause();
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        fetchAlbums: builder.query({
            providesTags: (result, error, user) => {
                const tags = result.map((album) => {
                    return { type: "Album", userId: user.id }
                })
                return [...tags]
            },
            query: (user) => {
                return {
                    url: "/albums",
                    method: "GET",
                    params: {
                        userId: user.id
                    }
                };
            },
        }),
        addAlbums: builder.mutation({
            invalidatesTags: (result, error, data) => {
                console.log("Album", data.albumName),
                    console.log("AlbumUserId", data.id)
                return [{ type: "Album", userId: data.id, title: data.albumName }]
            },

            query: (user) => {
                return {
                    url: "/albums",
                    method: "POST",
                    body: {
                        userId: user.id,
                        title: user.albumName,
                    },
                };
            },
        }),
        deleteAlbums: builder.mutation({
            invalidatesTags: (result, error, album) => {
                return [
                    { type: "Album", userId: album.userId }
                ];
            },
            query: (album) => {
                return {
                    url: `/albums/${album.id}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {
    useFetchAlbumsQuery,
    useAddAlbumsMutation,
    useDeleteAlbumsMutation,
} = albumsApi;
export default albumsApi;
