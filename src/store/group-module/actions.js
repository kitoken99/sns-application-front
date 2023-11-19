import axios from "axios";
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

//グループ作成時
export async function createGroup(
  { commit, rootGetters },
  { file, name, caption, profile_id, ids }
) {
  await axios
    .post(
      process.env.API + "/api/group",
      {
        name: name,
        caption: caption,
        image: file,
        profile_id: profile_id,
        ids: ids,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      response.data.profile_id.forEach(id=>{
        commit("addGroup", {
          group: response.data.group,
          profile_id: id,
        });
      })
      commit("room/addRoom", response.data.room, { root: true });
      commit("state/switchMainContent", "main", { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function setFocusedGroup(
  { commit },
  { group_id, isShow }
) {
  commit("setFocusedGroupId", group_id);
  commit("state/switchProfilePanel", "group", { root: true });
  if (isShow) {
    commit("state/showProfile", null, { root: true });
  }
}


//状態変更
export async function acceptGroup({ commit, state, rootState, rootGetters }){
  const group_id = state.focused_group_id;
  await axios
    .patch(
      process.env.API + "/api/group/accept",
      {
        group_id: group_id,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("acceptGroup", group_id)
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function switchProfile({ commit, state, rootState, rootGetters }){
  const profile_id = rootState.profile.current_profile_id;
  const group_id = state.focused_group_id;
  await axios
    .patch(
      process.env.API + "/api/group/profile",
      {
        group_id: group_id,
        profile_id: profile_id
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("switchProfile", {user_id: rootGetters["user/getUserId"], profile_id: profile_id, group_id: group_id});
      const room_id = state.groups[profile_id][group_id].room_id;
      commit("room/switchProfile", {user_id: rootGetters["user/getUserId"], profile_id: profile_id, room_id: room_id}, {root: true})
    })
    .catch((error) => {
      console.log(error);
    });
}

//リアルタイム更新
export async function getImage({ commit, getters, rootGetters }, { image }) {
  try {
    const response = await axios.get(process.env.API + "/api/group/image", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
      params: {
        image: image,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function addGroup({ commit, rootState }, group) {
  commit("addGroup", {
    group: group,
    profile_id: rootState.profile.main_profile_id,
  });
}
export function memberUpdated({ commit }, {group_id, members}) {
  commit("memberUpdated", {"group_id": group_id, "members":members})
}
