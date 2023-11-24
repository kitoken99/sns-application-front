import axios from "axios";
export async function fetchUser({ commit, rootGetters }) {
  try{
  await axios
    .get(process.env.API + "/api/user", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
     commit("setUser", response.data);
     return response.status;
  }catch{error => {
    return error.response.status
  }};
}

export async function updateUser(
  { commit, rootGetters },
  { name, email, birthday }
) {
  try {
    const response = await axios.patch(
      process.env.API + "/api/user",
      {
        name: name,
        email: email,
        birthday: birthday,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    );
    commit("setUser", response.data);
    commit("profile/setBirthday", response.data, { root: true });
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}

export async function updatePassword(
  { commit, rootGetters },
  { previous_password, new_password, confirm_new_password }
) {
  try {
    const response = await axios.patch(
      process.env.API + "/api/user/password",
      {
        previous_password: previous_password,
        new_password: new_password,
        confirm_new_password: confirm_new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}

export async function deleteAccount({ commit, rootGetters }) {
  try {
    const response = await axios.delete(process.env.API + "/api/user", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    });
    commit("user/resetUser", null, { root: true });
    commit("profile/resetProfile", null, { root: true });
    commit("friendship/resetFriendship", null, { root: true });
    commit("group/resetGroup", null, { root: true });
    commit("room/resetRoom", null, { root: true });
    return response.status;
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
}
