import axios from "axios";
//データ初期取得
export async function fetchProfiles({ commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/profiles", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setProfiles", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function fetchFriendship({ commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/friendship", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setFriendship", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function fetchGroups({ commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/groups", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setGroups", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}


export async function setCurrentRoomId({ commit, rootGetters }, { id }) {
  commit("setCurrentRoomId", id);
  await axios
    .get(process.env.API + "/api/room/" + id, {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setCurrentRoom", response.data);
      commit("readContent", id);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function postMessage({ commit, rootGetters }, { message }) {
  console.log(rootGetters["room/getCurrentRoomId"]);
  const newMessage = {
    body: message,
    room_id: rootGetters["room/getCurrentRoomId"],
    user_id: rootGetters["user/getUser"].id,
    created_at: new Date().toISOString(),
  };
  console.log(newMessage);
  commit("setNewMessage", newMessage);
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

export function fetchRooms({commit, state, getters}){
  const rooms = [...state.friends, ...state.groups];
  const response = {};
  rooms.forEach((room) => {
    response[room.room_id] = room;
  })
  commit("setRooms", response);
}

export function messageRecieved({ commit, getters }, { data }) {
  commit("changeLastMessage", data);

  if(getters.getCurrentRoomId!==data.message.room_id){
    commit('addNotRead', data)
  }

}
