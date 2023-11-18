import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your user state
interface VideoState {
  currentVideo: any; // replace 'any' with the actual type of currentUser
  loading: boolean;
  error: boolean;
}

// Define the initial state with the type
const initialState: VideoState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    }
  },
});

// Export the types for actions
export type VideoActions =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFailure>

// Export the actions and reducer
export const { fetchStart, fetchSuccess, fetchFailure } =
  videoSlice.actions;
export default videoSlice.reducer;