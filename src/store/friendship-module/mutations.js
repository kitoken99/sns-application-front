export function setFriendship(state, friendship) {
  state.friendship = friendship;
}

//リアルタイム更新
export function addFriend(state, friendship) {
  state.friendship[friendship.user_id] = friendship;
}
export function switchState(state, { friend_id, status }) {
  state.friendship[friend_id].state = status;
}

//表示設定
export function featuredProfile(state, { user_id, profile_id }) {
  console.log(profile_id);
  state.friendship[user_id].profile_id = profile_id;
}
export function permitProfile(state, { list, user_id }) {
  const main_profile_id = Object.keys(list)[0];
  state.friendship[user_id].profile_ids = [];
  Object.keys(list).forEach((key) => {
    if (list[key] == true) {
      state.friendship[user_id].profile_ids.push(parseInt(key));
    }
  });
  console.log(state.friendship[user_id].profile_ids);
}

//リアルタイム更新
export function deleteProfile(state, profile_id) {
  Object.values(state.friendship).forEach((friendship) => {
    let index = friendship.profile_ids.indexOf(profile_id);
    if (index !== -1) {
      friendship.profile_ids.splice(index, 1);
    }
  });
}
export function deletedProfile(
  state,
  { user_id, profile_id, main_profile_id }
) {
  if (state.friendship[user_id].profile_id == profile_id) {
    state.friendship[user_id].profile_id = main_profile_id;
  }
}
export function readContent(state, id) {
  state.friendship[id].not_read = 0;
}
export function changeLastMessage(state, { message, id }) {
  state.friendship[id].last_message = message;
  state.friendship[id]["last_updated_at"] = message.created_at;
}
export function addNotRead(state, id) {
  if (state.friendship[id]) {
    state.friendship[id].not_read++;
  }
}
export function resetFriendship(state){
  state.friendship={}
}
