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
  state.current_room = {}
  state.messages = []
  state.current_room_id = current_room_id;
}
export function setMessages(state, messages) {
  state.messages = messages;
}



export function setNewMessage(state, newMessage) {
  state.current_room.push(newMessage);
}

export function readContent(state, id) {
  state.rooms[id].not_read = 0;
}

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
