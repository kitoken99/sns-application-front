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
export async function fetchRooms({commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/rooms", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setRooms", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

//表示ルーム選択時
export async function setCurrentRoomId({ commit, rootGetters }, { id }) {
  commit("setCurrentRoomId", id);
  await axios
    .get(process.env.API + "/api/room/" + id + "/messages", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setMessages", response.data);
      commit("readContent", id);
    })
    .catch((error) => {
      console.log(error);
    });
}

//メッセージ送信時
export async function postMessage({ commit, rootGetters }, { message }) {
  if(!message)return;
  const newMessage = {
    body: message,
    room_id: rootGetters["room/getCurrentRoomId"],
    user_id: rootGetters["user/getUser"].id,
    created_at: new Date().toISOString(),
  };
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
    .then((response) => {

    })
    .catch((error) => {
      console.log(error);
    });
}

//メッセージ受信時
export async function messageRecieved({ commit, getters, rootGetters }, { data }) {
  commit("changeLastMessage", data);
  if(getters.getCurrentRoomId!==data.message.room_id){
    commit('addNotRead', data)
  }else{
    if(rootGetters['user/getUser'].id != data.message.user_id){
      commit('addMessage', data)
      console.log(data.message.id);
      await axios
    .post(
      process.env.API +
        "/api/message/read" ,
      {
        id: data.message.id,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {

    })
    .catch((error) => {
      console.log(error);
    });
    }
  }


}
