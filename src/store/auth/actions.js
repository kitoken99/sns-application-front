import axios from "axios";
export function socialAuth({commit}, provider){
  axios
        .get(process.env.API + "/api/login/" + provider)
        .then((response) => {
          const LoginUrl = response.data.redirect_url;
          window.location.href = LoginUrl;
        })
        .catch((error) => {
          console.log(error.response);
        });
}

export function saveToken({ commit }, token) {
  commit("saveToken", token);
}
export function removeToken({ commit }) {
  commit("removeToken");
}
