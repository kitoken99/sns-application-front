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
    state.rooms[data.message.room_id]["last_updated_at"] = data.message.created_at;
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
export function addFriendshipForProfile(state, id){
  state.friendship[id] = {}
}
export function addGroupsForProfile(state, id){
  state.groups[id] = {}
}


//友達追加
export function addProfile(state, profile) {
  if(!state.profiles[profile.user_id])state.profiles[profile.user_id]={}
  state.profiles[profile.user_id][profile.id] = profile;
}
export function addFriendship(state, {data, main_profile_id}) {
  const friendship = {
    "profile_id": data.friend_profile_id,
    "state": data.state
  }
  state.friendship[data.profile_id][data.friend_user_id] = friendship;
  state.friendship[main_profile_id][data.friend_user_id] = friendship;
}
export function addRoom(state, data) {
    state.rooms[data.room_id] = data;
}
