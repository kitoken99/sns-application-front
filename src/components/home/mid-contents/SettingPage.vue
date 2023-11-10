<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    class="q-pa-md"
    style="height: 100%; width: 100%"
  >
  <div class="q-my-lg">
  <p class="text-h5 text-weight-bold">User Setting</p>
  <div class="q-gutter-y-xl" >
    <UpdateUser />
    <CreatePasswordForm v-show="store.getters['user/getUser'].auth_type == 'social'"/>
    <ChangePasswordForm v-show="store.getters['user/getUser'].auth_type != 'social'"/>
    <DeleteAccountBtn />
  </div>
</div>
  </q-scroll-area>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import UpdateUser from "./setting-page/UpdateUser.vue";
import CreatePasswordForm from "./setting-page/CreatePasswordForm.vue";
import ChangePasswordForm from "./setting-page/ChengePasswordForm.vue";
import DeleteAccountBtn from "./setting-page/DeleteAccountBtn.vue";
export default defineComponent({
  name: "SettingPage",
  components: { UpdateUser, CreatePasswordForm, ChangePasswordForm, DeleteAccountBtn},
  setup(){
    const store = useStore();

    return{
      store,
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    }
  }
});
</script>
<style></style>
