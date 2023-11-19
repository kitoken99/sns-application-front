export function getGroups(state, getters, rootState) {
  const main_profile_id = rootState.profile.main_profile_id;
  if (!state.groups[main_profile_id]) {
    return [];
  }
  const groups = state.groups[main_profile_id];
  const response = [];
  Object.values(groups).forEach((value) => {
    response.push(value);
  });
  return response;
}
export function getCurrentGroups(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  if (!state.groups[profile_id]) {
    return [];
  }
  const groups = state.groups[profile_id];
  const response = [];
  Object.values(groups).forEach((value) => {
    response.push(value);
  });
  return response;
}
