export function setGroups(state, groups) {
  state.groups = groups;
}
export function addGroupsForProfile(state, id) {
  state.groups[id] = {};
}
export function addGroup(state, { group, profile_id }) {
  console.log(group)
    state.groups[profile_id][group.id] = group;
}
