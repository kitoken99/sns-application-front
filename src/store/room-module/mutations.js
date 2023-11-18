//データ初期取得
export function setProfiles(state, profiles) {
  state.profiles = profiles;
}
export function setFriendship(state, friendship) {
  state.friendship = friendship;
}
export function setGroups(state, groups) {
  state.groups = groups;
}
export function setRooms(state, rooms) {
  state.rooms = rooms;
}

//友達追加
export function addProfile(state, profile) {
  if (!state.profiles[profile.user_id]) state.profiles[profile.user_id] = {};
  state.profiles[profile.user_id][profile.id] = profile;
}
export function addProfiles(state, profiles) {
  Object.values(profiles).forEach((profile) => {
    if (!state.profiles[profile.user_id]) state.profiles[profile.user_id] = {};
    state.profiles[profile.user_id][profile.id] = profile;
  });
}
export function addFriendship(state, { data, profile_id }) {
  if (!state.friendship[profile_id]) {
    state.friendship[profile_id] = {};
  }
  const friendship = {
    profile_id: data.profile_id,
    state: data.state,
    room_id: data.room_id,
  };
  state.friendship[profile_id][data.friend_user_id] = friendship;
}
export function addRoom(state, data) {
  if (!state.rooms) {
    state.rooms = {};
  }
  state.rooms[data.room_id] = data;
}
export function acceptFriend(state, friend_id) {
  Object.values(state.friendships).forEach($friendships => {
    if($friendships[friend_id]) $friendship.state = "accepted"
  })
}

//表示プロファイル変更時
export function setFocusedUserId(state, user_id) {
  state.focused_user_id = user_id;
}
export function setFocusedProfileId(state, profile_id) {
  state.focused_profile_id = profile_id;
}

//表示ルーム選択時
export function setCurrentRoomId(state, current_room_id) {
  state.members = {};
  state.messages = null;
  state.current_room_id = current_room_id;
}
export function setMessages(state, messages) {
  state.messages = messages;
}
export function readContent(state, id) {
  state.rooms[id].not_read = 0;
}

//メッセージ送信時
export function setNewMessage(state, newMessage) {
  state.messages.push(newMessage);
}

//メッセージ受信時
export function changeLastMessage(state, data) {
  if (state.rooms[data.message.room_id]) {
    state.rooms[data.message.room_id].last_message = data.message;
    state.rooms[data.message.room_id]["last_updated_at"] =
      data.message.created_at;
  }
}
export function addNotRead(state, data) {
  if (state.rooms[data.message.room_id]) {
    state.rooms[data.message.room_id].not_read++;
  }
}
export function addMessage(state, data) {
  state.messages.push(data.message);
}

//プロファイル追加
export function addFriendshipForProfile(state, id) {
  state.friendship[id] = {};
}
export function addGroupsForProfile(state, id) {
  state.groups[id] = {};
}

//グループ作成時
export function addGroup(state, { group, profile_id }) {
  profile_id.forEach((id) => {
    state.groups[id][group.id] = group;
  });
}

//表示プロファイル変更時
export function featuredProfile(state, { user_id, profile_id }) {
  Object.values(state.friendship).forEach((value) => {
    value[user_id]["profile_id"] = profile_id;
  });
}
export function permitProfile(state, list) {
  const main_profile_id = Object.keys(list)[0];
  const friendship = state.friendship[main_profile_id][state.focused_user_id];
  Object.keys(list).forEach((key) => {
    if (key == main_profile_id) {
    } else if (list[key] == true) {
      state.friendship[key][state.focused_user_id] = friendship;
    } else {
      delete state.friendship[key][state.focused_user_id];
    }
  });
}

export function deleteProfile(state, profile) {
  if (state.profiles[profile.user_id][profile.id])
    delete state.profiles[profile.user_id][profile.id];
}
export function permitionUpdated(state, data){
  state.profiles[data.user_id]=data.profiles;
}
