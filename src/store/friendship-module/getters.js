export function getFriends(state, getters, rootState) {
  const profiles = rootState.profile.profiles;
  const friends = [];
  Object.values(state.friendship).forEach((friendship) => {
    if (friendship.state != "deleted" && friendship.state != "blocked") {
      friends.push(profiles[friendship.user_id][friendship.profile_id]);
    }
  });
  return friends;
}
export function getCurrentFriends(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  const profiles = rootState.profile.profiles;
  const friends = [];
  Object.values(state.friendship).forEach((friendship) => {
    if (friendship.profile_ids.includes(profile_id)) {
      if (friendship.state == "accepted") {
        friends.push(profiles[friendship.user_id][friendship.profile_id]);
      }
    }
  });
  return friends;
}
export function getUnAcceptedFriends(state, getters, rootState) {
  const profiles = rootState.profile.profiles;
  const friends = [];
  Object.values(state.friendship).forEach((friendship) => {
    if (friendship.state == "unaccepted") {
      friends.push(profiles[friendship.user_id][friendship.profile_id]);
    }
  });
  return friends;
}
export function getPermittedProfileList(
  state,
  getters,
  rootState,
  rootGetters
) {
  const profiles = rootGetters["profile/getMyProfiles"];
  const friendship = state.friendship[rootState.profile.focused_user_id];
  if(!friendship)return {};
  const list = {};
  Object.values(profiles).forEach((profile) => {
    list[profile.id] = friendship.profile_ids.includes(profile.id);
  });
  return list;
}
