export function setGroups(state, groups) {
  state.groups = groups;
}
export function addGroup(state, group) {
  state.groups[group.id] = group;
}
export function setFocusedGroupId(state, group_id) {
  state.focused_group_id = group_id;
}
export function switchState(state, { group_id, status }) {
  state.groups[group_id].state = status;
}
export function switchMemberProfile(state, { user_id, profile_id, group_id }) {
  state.groups[group_id]["members"][user_id] = profile_id;
}
export function switchProfile(state, { profile_id, group_id }) {
  state.groups[group_id]["profile_ids"][1] = profile_id;
}

//リアルタイム更新
export function deleteProfile(state, { user_id, profile_id, main_profile_id }) {
  Object.values(state.groups).forEach((group) => {
    let index = group.profile_ids.indexOf(profile_id);
    if (index !== -1) {
      group.profile_ids.splice(index, 1);
      group.members[user_id] = main_profile_id;
    }
  });
}
export function deletedProfile(
  state,
  { user_id, profile_id, main_profile_id }
) {
  Object.values(state.groups).forEach((group) => {
    if (group.members[user_id] == profile_id)
      group.members[user_id] = main_profile_id;
  });
}
export function memberUpdated(state, { group_id, members }) {
  state.groups[group_id]["members"] = members;
}
export function readContent(state, id) {
  state.groups[id].not_read = 0;
}
export function changeLastMessage(state, { message, id }) {
  state.groups[id]["last_message"] = message;
  state.groups[id]["last_updated_at"] = message.created_at;
}
export function addNotRead(state, id) {
  if (state.groups[id]) {
    state.groups[id].not_read++;
  }
}

