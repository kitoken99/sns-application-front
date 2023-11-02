import axios from "axios";
export async function fetchUser({ commit, rootGetters }) {
  await axios
    .get(process.env.API + "/api/user", {
      headers: {
        Authorization: `Bearer ${rootGetters.getToken}`,
      },
    })
    .then((response) => {
      commit("setUser", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateUser(
  { commit, rootGetters },
  { name, email, birthday }
) {
  await axios
    .patch(
      process.env.API + "/api/user",
      {
        name: name,
        email: email,
        birthday: birthday,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters.getToken}`,
        },
      }
    )
    .then((response) => {
      commit("setUser", response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
