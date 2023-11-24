import axios from "axios";

//表示ルーム選択時
export async function setCurrentRoomId({ commit, getters, rootGetters }, id) {
  if (id == rootGetters["room/getCurrentRoomId"]) return;
  commit("setCurrentRoomId", id);
  await axios
    .get(process.env.API + "/api/room/" + id + "/messages", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setMessages", response.data);
      const rooms = getters["rooms"];
      if (rooms[rootGetters["room/getCurrentRoomId"]]["friendship_id"]) {
        commit(
          "friendship/readContent",
          rooms[rootGetters["room/getCurrentRoomId"]]["friendship_id"],
          { root: true }
        );
      }
      if (rooms[rootGetters["room/getCurrentRoomId"]]["group_id"]) {
        commit(
          "group/readContent",
          rooms[rootGetters["room/getCurrentRoomId"]]["group_id"],
          { root: true }
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//メッセージ送信時
export function addMessage({ commit, getters, rootGetters }, { message }) {
  if (!message) return;
  const newMessage = {
    body: message,
    room_id: rootGetters["room/getCurrentRoomId"],
    user_id: rootGetters["user/getUserId"],
    created_at: new Date().toISOString(),
  };
  commit("setNewMessage", newMessage);
  const rooms = getters["rooms"];
  if (rooms[rootGetters["room/getCurrentRoomId"]]["friendship_id"])
    commit(
      "friendship/changeLastMessage",
      {
        message: newMessage,
        id: rooms[rootGetters["room/getCurrentRoomId"]]["friendship_id"],
      },
      { root: true }
    );
  if (rooms[rootGetters["room/getCurrentRoomId"]]["group_id"])
    commit(
      "group/changeLastMessage",
      {
        message: newMessage,
        id: rooms[rootGetters["room/getCurrentRoomId"]]["group_id"],
      },
      { root: true }
    );
}
export async function postMessage({ commit, rootGetters }, { message }) {
  if (!message) return;
  await axios
    .post(
      process.env.API +
        "/api/room/" +
        rootGetters["room/getCurrentRoomId"] +
        "/message",
      {
        body: message,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {})
    .catch((error) => {
      console.log(error);
    });
}

//メッセージ受信時
export async function messageRecieved(
  { commit, getters, rootGetters },
  { data }
) {
  const rooms = getters["rooms"];
  console.log(data);
  console.log(rooms[data.room_id]);
  if (rooms[data.room_id]["friendship_id"]) {
    commit(
      "friendship/changeLastMessage",
      { message: data, id: rooms[data.room_id]["friendship_id"] },
      { root: true }
    );
    if (getters.getCurrentRoomId !== data.room_id)
      commit("friendship/addNotRead", rooms[data.room_id]["friendship_id"], {
        root: true,
      });
  }

  if (rooms[data.room_id]["group_id"]) {
    commit(
      "group/changeLastMessage",
      { message: data, id: rooms[data.room_id]["group_id"] },
      { root: true }
    );
    if (getters.getCurrentRoomId !== data.room_id)
      commit("group/addNotRead", rooms[data.room_id]["group_id"], {
        root: true,
      });
  }

  if (
    getters.getCurrentRoomId === data.room_id &&
    rootGetters["user/getUserId"] != data.user_id
  ) {
    commit("addMessage", data);
    await axios
      .post(
        process.env.API + "/api/message/read",
        {
          id: data.id,
        },
        {
          headers: {
            Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }
}
