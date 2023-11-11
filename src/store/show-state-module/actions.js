export function initState({ commit }) {
  commit("initState");
}
export function switchIsAuthorized({ commit }, state) {
  commit("switchIsAuthorized", state);
}
export function switchIsFetched({ commit }, state) {
  commit("switchIsFetched", state);
}

//middleContent
export function showMiddleContent({ commit }, profile_id) {
  commit("switchMiddleContent", "main");
  commit("switchMainContent", "main");
  commit("switchProfilePanel", "form");
  commit("profile/setCurrentProfileId", profile_id, { root: true });
}
export function showSetting({ commit }) {
  commit("switchMiddleContent", "setting");
  commit("switchMainContent", "main");
  commit("switchProfilePanel", "form");
}
export function showAddProfile({ commit }) {
  commit("switchMiddleContent", "addProfile");
  commit("switchMainContent", "main");
  commit("switchProfilePanel", "form");
}

//mainContent
export function showAddFriend({ commit }) {
  commit("switchMainContent", "addFriend");
  commit("switchProfilePanel", "form");
}
export function showAddGroup({ commit }) {
  commit("switchMainContent", "addGroup");
  commit("switchProfilePanel", "form");
}


//profilePanel
export function switchProfilePanel({ commit }, state) {
  commit("switchProfilePanel", state);
}
