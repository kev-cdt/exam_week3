import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config/routes.config";

const initialState = {
  user: {
    id: 1,
    email: "alan@turing.dev",
    username: "Alan Turing",
    password: "m38rmF$",
    name: {
      firstname: "Alan",
      lastname: "Turing",
    },
    address: {
      city: "kilcoole",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
    },
    phone: "1-570-236-7033",
  },
  userErrors:"",
};

export const fetchUser = createAsyncThunk(
  "fetchUser",
    async() => {
    try {
      const userFromLocalStorage = localStorage.getItem("userData");
      return userFromLocalStorage
        ? JSON.parse(userFromLocalStorage)
        : initialState.user;
    } catch (error) {
      initialState.userErrors = error
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (user) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/users/1`,
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      initialState.userErrors = error;
    }
  }
);

const userProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateField(state, action) {
      state[action.payload.name] = action.payload.value;
    },
  },
  loading: "idle",
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loadingState = "pending";
        state.user = {};
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingState = "loaded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loadingState = "error";
        state.userErrors = "Oops! Something went wrong when accessing your profile. Please try again later.";
        state.user = {};
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingState = "pending";
        state.user = {};
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingState = "loaded";
      })
      .addCase(updateUser.rejected, (state) => {
        state.loadingState = "error";
        state.userErrors = "Oops! Something went wrong, changes were not applied. Please try again later.";
        state.user = {};
      });
  },
});

export const { updateField } = userProfileSlice.actions;
export default userProfileSlice.reducer;