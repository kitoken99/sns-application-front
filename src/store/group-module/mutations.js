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
export function setFocusedGroupId(state, group_id) {
  state.focused_group_id = group_id;
}
export function acceptGroup(state, group_id) {
  Object.values(state.groups).forEach(groups => {
    if(groups[group_id])groups[group_id].state = "accepted"
  })
}
export function switchProfile(state, {user_id, profile_id, group_id}) {
  Object.values(state.groups)[0][group_id]["members"][user_id] = profile_id
  state.groups[profile_id][group_id] = Object.values(state.groups)[0][group_id]
}


//リアルタイム更新
export function memberUpdated(state, {group_id,members}){
  Object.values(state.groups).forEach(groups => {
    if(groups[group_id]) groups[group_id]["members"] = members
  })
}
