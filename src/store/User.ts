import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import UserService from "../services/UserService";

interface ILoginPayload {
    email: string;
    password: string;
}

export const login = createAsyncThunk(
  "login",
  async (payload: ILoginPayload) => await UserService.login(payload)
) as any;

export const getUserConvos = createAsyncThunk(
    "userConvos",
    async (id : string) => await UserService.getUserConvos(id)
) as any;

export const getUserProfile = createAsyncThunk("getCustomerData", async () => {
  return UserService.getUserProfile();
});

const slice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, UserService.store.login.pending);
    builder.addCase(login.fulfilled, UserService.store.login.fulfilled);
    builder.addCase(login.rejected, UserService.store.login.rejected);

    builder.addCase(
      getUserProfile.fulfilled,
      UserService.store.getProfileData.fulfilled
    );
    builder.addCase(
      getUserProfile.rejected,
      UserService.store.getProfileData.rejected
    );

    builder.addCase(
        getUserConvos.fulfilled,
        UserService.store.getUserConvos.fulfilled
    );
    builder.addCase(
        getUserConvos.rejected,
        UserService.store.getUserConvos.rejected
    );
  },
});


export default slice.reducer;
