import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAuthWithRole } from "../interfaces/Auth.interface";
import { setAuth } from "../utils/auth-utils";

interface AuthState {
  auth: IAuthWithRole | null;
}

const initialState: AuthState = {
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState(state, action: PayloadAction<IAuthWithRole>) {
      setAuth({ ...(action.payload || {}) });
      state.auth = action.payload;
    },
    logout(state) {
      setAuth(null);
      state.auth = null;
    },
  },
});

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth.auth;

export const { updateAuthState, logout } = authSlice.actions;

export default authSlice.reducer;
