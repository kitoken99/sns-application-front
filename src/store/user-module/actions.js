import axios from "axios";
import { useRouter } from "vue-router";
export async function fetchUser({ commit, rootGetters }) {
  const router = useRouter();
  await axios
    .get(process.env.API + "/api/user", {
      headers: {
        Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
      },
    })
    .then((response) => {
      commit("setUser", response.data);
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status==401){
        router.push("/login");
      }
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
          Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
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
