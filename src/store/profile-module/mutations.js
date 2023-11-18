export function setProfiles(state, profiles) {
  state.profiles = profiles;
}
export function setMainProfileId(state) {
  Object.values(state.profiles).forEach((profile) => {
    if (profile.is_main) state.main_profile_id = profile.id;
  });
}
export function setCurrentProfileId(state, profile_id) {
  state.current_profile_id = profile_id;
  state.current_profile = state.profiles[state.current_profile_id];
}
export function addProfile(state, profile) {
  state.profiles[profile.id] = profile;
}
export function resetProfile(state) {
  state.profiles = {};
  state.main_profile_id = "";
  state.current_profile_id = "";
  state.current_profile = {};
}
