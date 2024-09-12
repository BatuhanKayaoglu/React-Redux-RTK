import { duration } from "@mui/material";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = () => new Promise((resolve) => setTimeout(resolve, 1000));

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    fetchFn: async (...args) => {
      await pause();
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      providesTags: ["User"],
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
    }),
    addUsers: builder.mutation({
      invalidatesTags: ["User"],
      query: (name) => {
        return {
          url: "/users",
          method: "POST",
          body: {
            name: name,
          },
        };
      },
    }),
    deleteUsers: builder.mutation({
      invalidatesTags: ["User"],
      query: (user) => {
        return {
          url: `/users/${user.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useAddUsersMutation,
  useDeleteUsersMutation,
} = usersApi;
export default usersApi;
