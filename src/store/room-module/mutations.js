//表示ルーム選択時
export function setCurrentRoomId(state, current_room_id) {
  state.members = {};
  state.messages = null;
  state.current_room_id = current_room_id;
}
export function setMessages(state, messages) {
  state.messages = messages;
}

//メッセージ送信時
export function setNewMessage(state, newMessage) {
  state.messages.push(newMessage);
}

//メッセージ受信時
export function addMessage(state, data) {
  state.messages.push(data);
}
