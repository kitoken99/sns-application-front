export function setFriendship(state, friendship) {
  state.friendship = friendship;
}

//追加
export function addFriendshipForProfile(state, id) {
  state.friendship[id] = {};
}
export function addFriend(state, { data, profile_id }) {
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








export function acceptFriend(state, friend_id) {
  Object.values(state.friendship).forEach(friendships => {
    if(friendships[friend_id]) friendships[friend_id].state = "accepted"
  })
}


export function featuredProfile(state, { user_id, profile_id }) {
  Object.values(state.friendship).forEach((value) => {
    if(value[user_id])
    value[user_id]["profile_id"] = profile_id;
  });
}
export function permitProfile(state, {list, user_id}) {
  const main_profile_id = Object.keys(list)[0];
  const friendship = state.friendship[main_profile_id][user_id];
  Object.keys(list).forEach((key) => {
    if (key == main_profile_id) {
    } else if (list[key] == true) {
      state.friendship[key][user_id] = friendship;
    } else {
      delete state.friendship[key][user_id];
    }
  });
}
