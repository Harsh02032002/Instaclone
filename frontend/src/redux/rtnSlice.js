import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
  name: "realTimeNotification",
  initialState: {
    likeNotification: [], // Like/Dislike ke liye
    messageNotification: {}, // { userId: count } -> unread messages count
  },
  reducers: {
    // ✅ Likes handle karne ke liye
    setLikeNotification: (state, action) => {
      if (action.payload.type === "like") {
        state.likeNotification.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likeNotification = state.likeNotification.filter(
          (item) => item.userId !== action.payload.userId
        );
      }
    },

    // ✅ Jab new message aaye aur chat open na ho
    incrementMessageNotification: (state, action) => {
      const { userId } = action.payload;
      if (!state.messageNotification[userId]) {
        state.messageNotification[userId] = 1;
      } else {
        state.messageNotification[userId] += 1;
      }
    },

    // ✅ Jab user us chat pe click kare -> unread count reset
    clearMessageNotification: (state, action) => {
      const { userId } = action.payload;
      state.messageNotification[userId] = 0;
    },
  },
});

export const {
  setLikeNotification,
  incrementMessageNotification,
  clearMessageNotification,
} = rtnSlice.actions;

export default rtnSlice.reducer;
