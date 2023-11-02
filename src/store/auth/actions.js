export function saveToken({ commit }, token) {
  commit("saveToken", token);
}

export function removeToken({ commit }) {
  commit("removeToken");
}
