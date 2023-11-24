import axios from "axios";
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

//表示設定
export async function featuredProfile(
  { commit, state, rootState, rootGetters },
  id
) {
  const friend_id = rootState.profile.focused_user_id;
  await axios
    .patch(
      process.env.API + "/api/friendship/feature",
      {
        friend_id: friend_id,
        profile_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("featuredProfile", {
        user_id: friend_id,
        profile_id: id,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function permitProfile(
  { commit, state, rootState, rootGetters },
  list
) {
  list[rootState.profile.main_profile_id] = true;
  const friend_id = rootState.profile.focused_user_id;
  await axios
    .post(
      process.env.API + "/api/friendship/permit",
      {
        friend_id: friend_id,
        list: list,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("permitProfile", { list: list, user_id: friend_id });
    })
    .catch((error) => {
      console.log(error);
    });
}

//リアルタイム更新
export async function addFriend({ commit, state, rootState, rootGetters }) {
  const friend_id = rootState.profile.focused_user_id;
  await axios
    .post(
      process.env.API + "/api/friendship",
      {
        friend_id: friend_id,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("profile/addProfile", response.data.profile, { root: true });
      commit("addFriend", response.data.friendship);
      commit("state/switchMainContent", "main", { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function switchState(
  { commit, state, rootState, rootGetters },
  status
) {
  const friend_id = rootState.profile.focused_user_id;
  await axios
    .patch(
      process.env.API + "/api/friendship/state",
      {
        friend_id: friend_id,
        state: status,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    )
    .then((response) => {
      commit("switchState", { friend_id: friend_id, status: status });
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function friendshipCreated({ commit, rootState }, data) {
  commit("profile/addProfiles", data.profiles, { root: true });
  commit("addFriend", data.friendship);
}
export function profileDeleted(
  { commit },
  { user_id, profile_id, main_profile_id }
) {
  commit("deletedProfile", {
    user_id: user_id,
    profile_id: profile_id,
    main_profile_id: main_profile_id,
  });
}
