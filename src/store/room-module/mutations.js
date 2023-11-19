
export function setRooms(state, rooms) {
  state.rooms = rooms;
}
export function addRoom(state, data) {
  if (!state.rooms) {
    state.rooms = {};
  }
  state.rooms[data.room_id] = data;
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






export function deleteProfile(state, profile) {
  if (state.profiles[profile.user_id][profile.id])
    delete state.profiles[profile.user_id][profile.id];
}

