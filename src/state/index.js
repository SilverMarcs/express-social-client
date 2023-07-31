import { createSlice } from "@reduxjs/toolkit";

// global states
const initialState = {
  mode: "dark",
  user: null,
  token: null,
  posts: [],
};

// createSlice() is a function that takes in an object of reducers, a name, and an initial state, and automatically generates action creators and action types that correspond to the reducers and state.
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 'functions' to update the states
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        // console.error("User friends not found");
        state.user.friends = [];
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts.reverse();
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post; // If a matching post is found, it returns the updated post from the action (action.payload.post), replacing the old post in the new updatedPosts array. If no matching post is found, it simply returns the original post, which is then included in the updatedPosts array.
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
