export function initState({commit}){
  commit('initState');
}
export function switchIsAuthorized({commit}, state){
  commit('switchIsAuthorized', state);
}
export function switchIsFetched({commit}, state){
  commit('switchIsFetched', state);
}




export function showMiddleContent({ commit }, profile_id) {
  commit("initMainContent");
  commit("initMiddleContent");
  commit("profile/setCurrentProfileId", profile_id, { root: true });
  commit("showRoom");
  commit("showMiddleContent");
}
export function showSetting({ commit }) {
  commit("initMainContent");
  commit("initMiddleContent");
  commit("showSetting");
}
export function showAddProfile({ commit }) {
  commit("initMainContent");
  commit("initMiddleContent");
  commit("showAddProfile");
}
export function showAddFriend({ commit }) {
  commit("initMainContent");
  commit("showAddFriend");
  commit("switchFindUserPanelState", "form");
}
export function showAddGroup({ commit }) {
  commit("initMainContent");
  commit("showAddGroup");
  // commit("switchFindUserPanelState", "form");
}
export function switchFindUserPanelState({ commit }, findUserState) {
  commit("switchFindUserPanelState", findUserState);
}
