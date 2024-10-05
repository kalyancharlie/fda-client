import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuth } from "../interfaces/Auth.interface";

interface AuthState {
  vendorAuth: IAuth | null;
  adminAuth: IAuth | null;
}

const initialState: AuthState = {
  vendorAuth: null,
  adminAuth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateVendorAuthState(state, action: PayloadAction<IAuth>) {
      state.vendorAuth = action.payload;
    },
    updateAdminAuthState(state, action: PayloadAction<IAuth>) {
      state.adminAuth = action.payload;
    },
    logoutVendor(state) {
      state.vendorAuth = null;
    },
    logoutAdmin(state) {
      state.adminAuth = null;
    },
  },
});

// Selectors
export const selectVendorAuth = (state: { auth: AuthState }) =>
  state.auth.vendorAuth;
export const selectAdminAuth = (state: { auth: AuthState }) =>
  state.auth.adminAuth;

export const {
  updateVendorAuthState,
  updateAdminAuthState,
  logoutVendor,
  logoutAdmin,
} = authSlice.actions;

export default authSlice.reducer;
