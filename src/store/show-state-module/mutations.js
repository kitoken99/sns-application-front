export function switchIsAuthorized(state, toggle) {
  state.isAuthorized = toggle;
}
export function switchIsFetched(state, toggle) {
  state.isFetched = toggle;
}



export function initMiddleContent(state) {
  state.isShowMiddleContent = false;
  state.isShowSetting = false;
  state.isShowAddProfile = false;
  state.findUserPanelState = "form";
}
export function showMiddleContent(state) {
  state.isShowMiddleContent = true;
}
export function showSetting(state) {
  state.isShowSetting = true;
}
export function showAddProfile(state) {
  state.isShowAddProfile = true;
}

export function initMainContent(state) {
  state.isShowRoom = false;
  state.isShowAddFriend = false;
  state.isShowProfileSetting = false;
  state.isShowAddGroup = false;
  state.findUserPanelState = "form";
}
export function showRoom(state) {
  state.isShowRoom = true;
}
export function showAddFriend(state) {
  state.isShowAddFriend = true;
}
export function showAddGroup(state) {
  state.isShowAddGroup = true;
}
export function showProfileSetting(state) {
  state.isShowProfileSetting = true;
}

export function switchFindUserPanelState(state, findUserState) {
  state.findUserPanelState = findUserState;
}
