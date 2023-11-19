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
export async function featuredProfile({ commit, state, rootState, rootGetters }, id) {
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
export async function permitProfile({ commit, state, rootState, rootGetters }, list) {
  if(list[rootState.profile.main_profile_id]==false)return;
  const friend_id = rootState.profile.focused_user_id
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
      commit("permitProfile", {list:list, user_id: friend_id} );
    })
    .catch((error) => {
      console.log(error);
    });
}



//友達との関係性

export async function addFriend({ commit, state, rootState, rootGetters }) {
  const friend_id = rootState.profile.focused_user_id
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
      const main_profile_id = rootGetters["profile/getMainProfileId"];
      commit("profile/addProfiles", response.data.profiles, {root: true});
      commit("addFriend", {
        data: response.data.friendship,
        profile_id: rootState.profile.main_profile_id,
      });
      commit("room/addRoom", response.data.room, {root: true});
      commit("state/switchMainContent", "main", { root: true });
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function acceptFriend({ commit, state, rootState, rootGetters }) {
  const friend_id = rootState.profile.focused_user_id
  await axios
    .patch(
      process.env.API + "/api/friendship/accept",
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
      commit("acceptFriend", friend_id)
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function blockFriend({ commit, state, rootState, rootGetters }) {
  const friend_id = state.focused_user_id;
  await axios
    .patch(
      process.env.API + "/api/friendship/block",
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
      commit("blockFriend", friend_id)
    })
    .catch((error) => {
      console.log(error);
    });
}


export async function friendshipCreated({ commit, rootState }, data) {
  commit("profile/addProfiles", data.profiles, {root: true});
  commit("addFriend", {
    data: data.friendship,
    profile_id: rootState.profile.main_profile_id,
  });
  commit("room/addRoom", data.room, {root: true});
}
