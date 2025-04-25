import { apiSlice } from './apiSlice'

const USERS_URL = '/api/auth'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-email`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useCreateAccountMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
  useLoginMutation,
  useForgotPasswordMutation,
} = usersApiSlice
