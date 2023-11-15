import axios from "axios";
export async function fetchProfiles({ commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/user/profiles", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setProfiles", response.data);
      commit("setCurrentProfileId", parseInt(Object.keys(response.data)[0]));
      commit("room/setFocusedUserId", Object.values(response.data)[0].user_id, {
        root: true,
      });
      commit(
        "room/setFocusedProfileId",
        parseInt(Object.keys(response.data)[0]),
        { root: true }
      );
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
      commit("room/addProfile", response.data, { root: true });
      commit("room/addFriendshipForProfile", response.data.id, { root: true });
      commit("room/addGroupsForProfile", response.data.id, { root: true });
      commit("setCurrentProfileId", response.data.id);
      commit("state/switchMiddleContent", "main", { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
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
      console.log(response.data);
      commit("room/addProfile", response.data, { root: true });
      commit("room/setFocusedUserId", response.data.user_id, {
        root: true,
      });
      commit("room/setFocusedProfileId", response.data.id, {
        root: true,
      });

      commit("state/switchProfilePanel", "profile", { root: true });
    })
    .catch((error) => {
      commit("state/switchProfilePanel", "find_profile", { root: true });
      console.log(error);
    });
}

export function setCurrentProfileId({ commit }, id) {
  commit("setCurrentProfileId", id);
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
    commit("room/addProfile", response.data, { root: true });
    commit("setCurrentProfileId", response.data.id);
    return response.status;
  } catch (error) {
    console.error(error);
  }
}
