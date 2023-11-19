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
export async function groupCreated({ commit, rootState }, data) {
  commit("profile/addProfiles", data.profiles, {root: true});

  commit("addGroup", {
    group: data.group,
    profile_id: rootState.profile.main_profile_id,
  });
  commit("room/addRoom", data.room, {root: true});
}
