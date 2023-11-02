export function saveToken(state, token) {
  state.token = token;
}
export function removeToken(state) {
  state.token = "";
}
