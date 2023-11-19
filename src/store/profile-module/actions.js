import axios from "axios";
export async function fetchProfiles({ commit, state, rootGetters }) {
  await axios
    .get(process.env.API + "/api/profiles", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setProfiles", response.data);
      commit("setMainProfileId", rootGetters['user/getUserId']);
      commit("setCurrentProfileId", state.main_profile_id);
      commit("setFocusedUserId", rootGetters['user/getUserId']);
      commit("setFocusedProfileId", state.main_profile_id);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function createProfile(
  { commit, rootGetters },
  { file, name, account_type, caption }
) {
  await axios
    .post(
      process.env.API + "/api/profile",
      {
        account_type: account_type,
        name: name,
        caption: caption,
        image: file,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      commit("addProfile", response.data);
      commit("friendship/addFriendshipForProfile", response.data.id, { root: true });
      commit("group/addGroupsForProfile", response.data.id, { root: true });
      commit("setCurrentProfileId", response.data.id);
      commit("state/switchMiddleContent", "main", { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function updateProfile(
  { commit, rootGetters },
  { file, show_birthday, name, account_type, caption }
) {
  try {
    if (!caption) caption = "";
    const formData = new FormData();
    formData.append("id", rootGetters["profile/getCurrentProfileId"]);
    formData.append("account_type", account_type);
    formData.append("show_birthday", show_birthday);
    formData.append("name", name);
    formData.append("caption", caption);
    formData.append("image", file);
    const response = await axios.post(
      process.env.API +
        "/api/profile/" +
        rootGetters["profile/getCurrentProfileId"],
      formData,
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    commit("addProfile", response.data);
    return response.status;
  } catch (error) {
    console.error(error);
  }
}


export function setCurrentProfileId({ commit }, id) {
  commit("setCurrentProfileId", id);
}
export function setFocusedUser(
  { commit, rootGetters },
  { user_id, profile_id, isShow }
) {
  commit("setFocusedUserId", user_id);
  commit("setFocusedProfileId", profile_id);
  commit("state/switchProfilePanel", "profile", { root: true });
  if (isShow) {
    commit("state/showProfile", null, { root: true });
  }
}


export async function findProfile({ commit, rootGetters }, { email }) {
  commit("state/switchProfilePanel", "loading", { root: true });
  await axios
    .get(process.env.API + "/api/profile", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
      params: {
        email: email,
      },
    })
    .then((response) => {
      commit("addProfile", response.data);
      commit("setFocusedUserId", response.data.user_id);
      commit("setFocusedProfileId", response.data.id);
      commit("state/switchProfilePanel", "profile", { root: true });
    })
    .catch((error) => {
      commit("state/switchProfilePanel", "find_profile", { root: true });
      console.log(error);
    });
}


export async function getImage({ commit, getters, rootGetters }, { image }) {
  try {
    const response = await axios.get(process.env.API + "/api/profile/image", {
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
export async function profileUpdated(
  { commit },
  { data }
) {
    commit("addProfile", data.profile);
}
export async function permitionUpdated(
  { commit, getters, rootGetters },
  data
) {
  commit("permitionUpdated", data);
}
