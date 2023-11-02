import axios from "axios";
export async function fetchProfiles({ commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/my-profiles", {
      headers: {
        Authorization: `Bearer ${rootGetters.getToken}`,
      },
    })
    .then((response) => {
      commit("setProfiles", response.data);
      commit("setCurrentProfileId", Object.keys(response.data)[0]);
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
          Authorization: `Bearer ${rootGetters.getToken}`,
          "content-type": "multipart/form-data",
        },
      }
    )
    .then((response) => {
      commit("addProfile", response.data);
      commit("setCurrentProfileId", response.data.id);
      commit("state/initMiddleContent", null, { root: true });
      commit("state/showMiddleContent", null, { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function findProfile({ commit, rootGetters }, { email }) {
  commit("state/switchFindUserPanelState", "loading", { root: true });
  await axios
    .get(process.env.API + "/api/profile", {
      headers: {
        Authorization: `Bearer ${rootGetters.getToken}`,
      },
      params: {
        email: email,
      },
    })
    .then((response) => {
      commit("setFoundProfile", response.data);
      commit("state/switchFindUserPanelState", "found", { root: true });
    })
    .catch((error) => {
      commit("state/switchFindUserPanelState", "form", { root: true });
      console.log(error);
    });
}
