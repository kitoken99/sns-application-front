// Rooms
export function rooms(state, getters, rootState, rootGetters) {
  const rooms = {};
  const profiles = rootState.profile.profiles;
  const friendships = rootState.friendship.friendship;
  Object.values(friendships).forEach((friendship) => {
    if (/^blocked/.test(friendship.state)) return;
    const profile = profiles[friendship.user_id][friendship.profile_id];
    const last_message = {
      body: "",
      name: "",
    };
    if (friendship.last_message) {
      const user_id = friendship.last_message.user_id;
      let profile_id = "";
      if (rootGetters["user/getUserId"] == user_id) {
        profile_id = rootState.profile.current_profile_id;
      } else {
        profile_id = friendship.profile_id;
      }
      last_message.body = friendship.last_message.body;
      last_message.name = profiles[user_id][profile_id].name;
    }
    rooms[friendship.room_id] = {
      caption: profile.caption,
      image: profile.image,
      last_message: last_message,
      last_updated_at: friendship.last_updated_at,
      members: {
        [rootGetters["user/getUserId"]]: null,
        [profile.user_id]: profile.id,
      },
      name: profile.name,
      not_read: friendship.not_read,
      friendship_id: friendship.user_id,
      profile_ids: friendship.profile_ids,
      room_id: friendship.room_id,
    };
  });
  const groups = rootState.group.groups;
  Object.values(groups).forEach((group) => {
    const { id, ...others } = group;
    rooms[group.room_id] = others;
    rooms[group.room_id]["group_id"] = id;
  });
  return rooms;
}
export function getRooms(state, getters) {
  const rooms = Object.values(getters.rooms);
  rooms.sort((a, b) => {
    const dateA = new Date(a.last_updated_at);
    const dateB = new Date(b.last_updated_at);
    return dateB - dateA;
  });
  return rooms;
}
export function getCurrentRooms(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  const rooms = Object.values(getters.rooms).filter((room) =>
    Object.values(room.profile_ids).includes(profile_id)
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
  if (!getters.rooms[state.current_room_id]) {
    return {
      messages: null,
      members: {},
    };
  }
  //メンバー処理
  const members_info = getters.rooms[state.current_room_id].members;
  const members = {};
  Object.keys(members_info).forEach((user_id) => {
    if (members_info[user_id]) {
      members[user_id] =
        rootState.profile.profiles[user_id][members_info[user_id]];
    } else {
      members[user_id] =
        rootState.profile.profiles[user_id][
          rootState.profile.current_profile_id
        ];
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
