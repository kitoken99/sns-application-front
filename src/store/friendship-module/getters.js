export function getFriends(state, getters, rootState) {
  const main_profile_id = rootState.profile.main_profile_id;
  if (!state.friendship[main_profile_id]) {
    return [];
  }
  const friendship = state.friendship[main_profile_id];
  const friends = [];
  Object.keys(friendship).forEach((key) => {
    if (friendship[key].state != "deleted") {
      friends.push(rootState.profile.profiles[key][friendship[key].profile_id]);
    }
  });
  return friends;
}
export function getCurrentFriends(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  if (!state.friendship[profile_id]) {
    return [];
  }
  const friendship = state.friendship[profile_id];
  const friends = [];
  Object.keys(friendship).forEach((key) => {
    if (friendship[key].state == "accepted") {
      friends.push(rootState.profile.profiles[key][friendship[key].profile_id]);
    }
  });
  return friends;
}
export function getUnAcceptedFriends(state, getters, rootState) {
  const profile_id = rootState.profile.main_profile_id;
  if (!state.friendship[profile_id]) {
    return [];
  }
  const friendship = state.friendship[profile_id];
  const friends = [];
  Object.keys(friendship).forEach((key) => {
    if (friendship[key].state == "unaccepted") {
      friends.push(rootState.profile.profiles[key][friendship[key].profile_id]);
    }
  });
  return friends;
}
export function getPermittedProfileList(state, getters, rootState) {
  const list = {};
  Object.keys(state.friendship).forEach((key) => {
    list[key] = state.friendship[key][rootState.profile.focused_user_id] !== undefined;
  });
  return list;
}
