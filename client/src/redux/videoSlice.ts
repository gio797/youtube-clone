import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your user state
interface VideoState {
  currentUser: any; // replace 'any' with the actual type of currentUser
  loading: boolean;
  error: boolean;
}

// Define the initial state with the type
const initialState: VideoState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

// Export the types for actions
export type VideoActions =
  | ReturnType<typeof loginStart>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof logout>;

// Export the actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout } =
  videoSlice.actions;
export default videoSlice.reducer;