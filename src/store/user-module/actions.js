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
  try{
   const response = await axios
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
      commit("setUser", response.data);
      return response.status
    }
    catch(error) {
      console.log(error);
      return error.response.status

    };
}

export async function updatePassword(
  { commit, rootGetters },
  { previous_password,  new_password, confirm_new_password }
) {
  try{
   const response = await axios
    .patch(
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
    )
      console.log(response.data)
      commit("setUser", response.data.user);
      return response.status
    }
    catch(error) {
      console.log(error);
      return error.response.status

    };
}

export async function deleteAccount({ commit, rootGetters }){
  try{
    const response = await axios
     .delete(
       process.env.API + "/api/user",
       {
         headers: {
           Authorization: `Bearer ${rootGetters["auth/getToken"]}`,
         },
       }
     )
     console.log(response)
     return response.status
     }
     catch(error) {
       console.log(error);
       return error.response.status

     };
}
