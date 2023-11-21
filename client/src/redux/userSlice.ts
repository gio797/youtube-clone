import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your user state
interface UserState {
  currentUser: any; // replace 'any' with the actual type of currentUser
  loading: boolean;
  error: boolean;
}

// Define the initial state with the type
const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
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
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId:string) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    }  
  },
});

// Export the types for actions
export type UserActions =
  | ReturnType<typeof loginStart>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof logout>
  | ReturnType<typeof subscription>;

// Export the actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;