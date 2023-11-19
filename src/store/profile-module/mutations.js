//セット
export function setProfiles(state, profiles) {
  state.profiles = profiles;
}
export function setMainProfileId(state, user_id) {
  Object.values(state.profiles[user_id]).forEach((profile) => {
    if (profile.is_main) state.main_profile_id = profile.id;
  });
}
export function setCurrentProfileId(state, profile_id) {
  state.current_profile_id = profile_id;
}
export function setBirthday(state, user){
  if(user.birthday){
    Object.values(state.profiles[user.id]).forEach(profile => {
      profile.birthday = user.birthday
    })
  }else{
    Object.values(state.profiles[user.id]).forEach(profile => {
      profile.birthday = null;
      profile.show_birthday = false;
    })
  }
}
export function setFocusedUserId(state, user_id) {
  state.focused_user_id = user_id;
}
export function setFocusedProfileId(state, profile_id) {
  state.focused_profile_id = profile_id;
}

//追加
export function addProfile(state, profile) {
  if(!state.profiles[profile.user_id])state.profiles[profile.user_id]={}
  state.profiles[profile.user_id][profile.id] = profile;
}
export function addProfiles(state, profiles) {
  Object.values(profiles).forEach((profile) => {
    if (!state.profiles[profile.user_id]) state.profiles[profile.user_id] = {};
    state.profiles[profile.user_id][profile.id] = profile;
  });
}

//再登録
export function permitionUpdated(state, data){
  state.profiles[data.user_id]=data.profiles;
}

//初期化
export function resetProfile(state) {
  state.profiles = null;
  state.main_profile_id = null;
  state.current_profile_id = null;
  state.focused_user_id= null;
  state.focused_profile_id= null;
}

