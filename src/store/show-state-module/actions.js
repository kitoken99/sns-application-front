export function initState({commit}){
  commit('initState');
}
export function switchIsAuthorized({commit}, state){
  commit('switchIsAuthorized', state);
}
export function switchIsFetched({commit}, state){
  commit('switchIsFetched', state);
}

//middleContent
export function showMiddleContent({ commit }, profile_id) {
  commit("switchMiddleContent", "main")
  commit("switchMainContent", "main")
  commit("switchFindUserPanelState", "form");
  commit("profile/setCurrentProfileId", profile_id, { root: true });
}
export function showSetting({ commit }) {
  commit ("switchMiddleContent", "setting")
  commit("switchMainContent", "main")
  commit("switchFindUserPanelState", "form");
}
export function showAddProfile({ commit }) {
  commit ("switchMiddleContent", "addProfile")
  commit("switchMainContent", "main")
  commit("switchFindUserPanelState", "form");
}


//mainContent
export function showAddFriend({ commit }) {
  commit("switchMainContent", "addFriend")
  commit("switchFindUserPanelState", "form");
}
export function showAddGroup({ commit }) {
  commit("switchMainContent", "addGroup")
  commit("switchFindUserPanelState", "form");
}


export function switchFindUserPanelState({ commit }, findUserState) {
  commit("switchFindUserPanelState", findUserState);
}
