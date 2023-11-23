export function getMyProfiles(state, getters, rootState, rootGetters) {
  if (!state.profiles) return {};
  return state.profiles[rootGetters["user/getUserId"]];
}
export function getCurrentProfile(state, getters, rootState, rootGetters) {
  if (!state.profiles) return {};
  return state.profiles[rootGetters["user/getUserId"]][
    state.current_profile_id
  ];
}
export function getFocusedUser(state, getters, rootState, rootGetters) {
  const friendship = rootState.friendship.friendship;
  const details = {
    room_id: "",
    state: "",
  };
  if (rootGetters["user/getUserId"] == state.focused_user_id) {
    details.state = "mine";
  } else if (state.focused_user_id in friendship) {
    details.room_id = friendship[state.focused_user_id].room_id;
    details.state = friendship[state.focused_user_id].state;
  } else {
    details.state = "not_friend";
  }
  const response = {
    profiles: state.profiles[state.focused_user_id],
    top_profile_id: state.focused_profile_id,
    details: details,
  };
  return response;
}

export function getMainProfileId(state) {
  return state.main_profile_id;
}
export function getCurrentProfileId(state) {
  return state.current_profile_id;
}
