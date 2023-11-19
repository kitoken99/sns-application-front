
//Rooms
export function getRooms(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  const rooms = Object.values(state.rooms).filter((room) =>
    Object.values(room.profile_id).includes(profile_id)
  );
  rooms.sort((a, b) => {
    const dateA = new Date(a.last_updated_at);
    const dateB = new Date(b.last_updated_at);
    return dateB - dateA;
  });
  return rooms;
}
export function getCurrentRooms(state, getters, rootState, rootGetters) {
  const profile_id = rootState.profile.current_profile_id;
  const rooms = Object.values(state.rooms).filter((room) =>
    Object.values(room.profile_id).includes(profile_id)
  );
  rooms.sort((a, b) => {
    const dateA = new Date(a.last_updated_at);
    const dateB = new Date(b.last_updated_at);
    return dateB - dateA;
  });
  return rooms;
}

//Room
export function getCurrentRoomId(state) {
  return state.current_room_id;
}
export function getCurrentRoom(state, getters, rootState) {
  if (!state.rooms[state.current_room_id]) {
    return {
      messages: null,
      members: {},
    };
  }
  //メンバー処理
  const members_info = state.rooms[state.current_room_id].members;
  const members = {};
  Object.keys(members_info).forEach((user_id) => {
    if (members_info[user_id]){
      members[user_id] = rootState.profile.profiles[user_id][members_info[user_id]];
    }


    else {
      if (rootState.friendship.friendship[rootState.profile.current_profile_id][user_id]) {
        members[user_id] =
          rootState.profile.profiles[user_id][
            rootState.friendship.friendship[rootState.profile.current_profile_id][
              user_id
            ].profile_id
          ];
      } else {
        members[user_id] =
          rootState.profile.profiles[user_id][rootState.profile.current_profile_id];
      }
    }
  });
  //メッセージ処理
  const messages = [];
  let message_id = 0;
  const time_differense = 1;
  const isDateDifferent = (message) => {
    const m_second_for_day = 1000 * 60 * 60 * 24;
    const prevMessage = messages[message_id - 1]; // `this` を削除
    const messageDate = Math.floor(
      new Date(message.created_at).getTime() / m_second_for_day
    );
    const prevMessageDate = Math.floor(
      new Date(prevMessage.created_at).getTime() / m_second_for_day
    );
    return messageDate - prevMessageDate == 0;
  };
  const isTimeDifferent = (message) => {
    const m_second_for_min = 1000 * 60;
    const prevMessage = messages[message_id - 1]; // `this` を削除
    const messageDate = Math.floor(
      new Date(message.created_at).getTime() / m_second_for_min
    );
    const prevMessageDate = Math.floor(
      new Date(prevMessage.created_at).getTime() / m_second_for_min
    );
    return messageDate - prevMessageDate < time_differense;
  };
  if (state.messages == null) {
    return {
      messages: null,
      members: members,
    };
  }
  Object.keys(state.messages).forEach((key) => {
    if (
      key != 0 &&
      messages[message_id - 1]["user_id"] == state.messages[key]["user_id"]
    ) {
      if (isDateDifferent(state.messages[key])) {
        if (isTimeDifferent(state.messages[key])) {
          messages[message_id - 1].body.push(state.messages[key].body);
          return;
        }
      }
    }
    const message = {
      user_id: state.messages[key].user_id,
      body: [],
      created_at: state.messages[key].created_at,
    };
    message["body"].push(state.messages[key].body);
    messages.push(message);
    message_id++;
  });
  const response = {
    messages: messages,
    members: members,
  };
  return response;
}

//friendship

