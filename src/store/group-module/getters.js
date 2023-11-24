export function getGroups(state) {
  const response = [];
  Object.values(state.groups).forEach((group) => {
    response.push(group);
  });
  return response;
}
export function getCurrentGroups(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  const response = [];
  Object.values(state.groups).forEach((group) => {
    if (group.profile_ids.includes(profile_id)) {
      if (group.state == "joined") response.push(group);
    }
  });
  return response;
}
export function getUnAcceptedGroups(state, getters, rootState) {
  const response = [];
  Object.values(state.groups).forEach((group) => {
    if (group.state == "invited") response.push(group);
  });
  return response;
}
export function getFocusedGroup(state, getters, rootState) {
  return state.groups[state.focused_group_id];
}
