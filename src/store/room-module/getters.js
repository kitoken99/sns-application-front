//friends
export function getFriends(state, getters, rootState){
  const main_profile_id = Object.keys(rootState.profile.profiles)[0];
  if(!state.friendship[main_profile_id]){
    return [];
  }
  const friendship = state.friendship[main_profile_id];
  const friends = [];
  Object.keys(friendship).forEach(key =>{
    if(!friendship[key]){
      friends.push(state.profiles[key])
    }else{
      friends.push(state.profiles[key][friendship[key]]);
    }
  });
  return friends;
}
export function getCurrentFriends(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  if(!state.friendship[profile_id]){
    return [];
  }
  const friendship = state.friendship[profile_id];
  const friends = [];
  Object.keys(friendship).forEach(key =>{
    if(!friendship[key]){
      friends.push(state.profiles[key])
    }else{
      friends.push(state.profiles[key][friendship[key]]);
    }
  });
  return friends;
}

//groups
export function getGroups(state, getters, rootState) {
  const main_profile_id = Object.keys(rootState.profile.profiles)[0];
  if(!state.groups[main_profile_id]){
    return [];
  }
  const groups = state.groups[main_profile_id];
  const response = [];
  Object.values(groups).forEach(value =>{
    response.push(value);
  });
  return response;
}
export function getCurrentGroups(state, getters, rootState) {
  const profile_id = rootState.profile.current_profile_id;
  if(!state.groups[profile_id]){
    return [];
  }
  const groups = state.groups[profile_id];
  const response = [];
  Object.values(groups).forEach(value =>{
    response.push(value);
  });
  return response;
}

//Rooms
export function getRooms(state, getters, rootState){
  const profile_id = parseInt(Object.keys(rootState.profile.profiles)[0]);
  if(!state.rooms[profile_id]){
    return [];
  }
  const rooms = Object.values(state.rooms).filter(room =>
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
  if(!state.rooms[rootState.profile.current_profile_id]){
    return [];
  }
  const profile_id = rootState.profile.current_profile_id;
  const rooms = Object.values(state.rooms).filter(room =>
    Object.values(room.profile_id).includes(profile_id)
  );
  rooms.sort((a, b) => {
    const dateA = new Date(a.last_updated_at);
    const dateB = new Date(b.last_updated_at);
    return dateB - dateA;
  });
  return rooms;
}
export function getCurrentRoomId(state) {
  return state.current_room_id;
}


export function getCurrentRoom(state, getters, rootState) {
  const room = state.rooms[state.current_room_id];
  let members = {};
  if(room)members=room.members;
  const response = {
    messages: state.current_room,
    members: members,
  };
  return response;
}

