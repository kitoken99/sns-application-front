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
export function setFocusedGroup({ commit }, { group_id, isShow }) {
  commit("setFocusedGroupId", group_id);
  commit("state/switchProfilePanel", "group", { root: true });
  if (isShow) {
    commit("state/showProfile", null, { root: true });
  }
}


//リアルタイム更新
export async function createGroup(
  { commit, rootGetters },
  { file, name, caption, profile_id, ids }
) {
  console.log(profile_id);
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
      commit("addGroup", response.data);
      commit("state/switchMainContent", "main", { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function switchState({ commit, state, rootState, rootGetters }, status) {
  const group_id = state.focused_group_id;
  await axios
    .patch(
      process.env.API + "/api/group/state",
      {
        group_id: group_id,
        state: status
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("switchState", {group_id:group_id, status: status});
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function switchProfile({ commit, state, rootState, rootGetters }) {
  const profile_id = rootState.profile.current_profile_id;
  const group_id = state.focused_group_id;
  await axios
    .patch(
      process.env.API + "/api/group/profile",
      {
        group_id: group_id,
        profile_id: profile_id,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("switchMemberProfile", {
        user_id: rootGetters["user/getUserId"],
        profile_id: profile_id,
        group_id: group_id,
      });
      commit("switchProfile", {
        profile_id: profile_id,
        group_id: group_id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
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
  commit("addGroup", group);
}
export function memberUpdated({ commit }, { group_id, members }) {
  commit("memberUpdated", { group_id: group_id, members: members });
}
export function profileDeleted({ commit }, { user_id, profile_id , main_profile_id }) {
  commit("deletedProfile", {user_id: user_id, profile_id: profile_id, main_profile_id: main_profile_id});
}
