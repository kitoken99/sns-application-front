export function setProfiles(state, profiles) {
  state.profiles = profiles;
}
export function setCurrentProfileId(state, current_profile_id) {
  state.current_profile_id = current_profile_id;
  state.current_profile = state.profiles[state.current_profile_id];
}
export function addProfile(state, profile) {
  state.profiles[profile.id] = profile;
}

export function setFoundProfile(state, profile) {
  state.found_profile = profile;
}
export function resetFoundProfile(state) {
  state.found_profile = null;
}
