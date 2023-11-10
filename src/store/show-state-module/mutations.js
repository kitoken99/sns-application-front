export function initState(state){
  state.middleContent="main"
  state.mainContent="main"
  state.findUserPanelState= "form";
}
export function switchIsAuthorized(state, toggle) {
  state.isAuthorized = toggle;
}
export function switchIsFetched(state, toggle) {
  state.isFetched = toggle;
}


export function switchMiddleContent(state, toggle) {
  state.middleContent=toggle;
}
export function switchMainContent(state, toggle) {
  state.mainContent=toggle;
}
export function switchFindUserPanelState(state, findUserState) {
  state.findUserPanelState = findUserState;
}
