<template>
  <p class="text-h6">Change your password</p>
  <form @submit.prevent="onSubmit" class="q-mx-auto q-mb-xl q-gutter-y-md q-my-lg row justify-center">
    <q-input filled v-model="previous_password" label="current password" style="width: 250px" />
    <q-input filled v-model="new_password" label="new password" style="width: 250px" />
    <q-input filled v-model="confirm_new_password" label="confirm new password" style="width: 250px" />
    <q-btn
        type="submit"
        :loading="loading"
        :submitted="true"
        label="Update"
        class="q-mt-md"
        color="primary"
        style="width: 250px"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
  </form>


</template>

<script>
import { defineComponent, ref} from "vue";
import { useStore } from "vuex";
import { useQuasar } from 'quasar'
export default defineComponent({
  name: "ChangePasswordForm",
  setup() {
    const store = useStore();
    const $q = useQuasar()
    const previous_password = ref(null);
    const new_password = ref(null);
    const confirm_new_password = ref(null);
    const loading = ref(false);
    const onSubmit = async() => {
      loading.value = true;
      const response = await store.dispatch("user/updatePassword", {
        previous_password: previous_password.value,
        new_password: new_password.value,
        confirm_new_password: confirm_new_password.value,
      });
      previous_password.value = null;
      new_password.value = null;
      confirm_new_password.value = null;
      loading.value = false;
      $q.notify({
          progress: true,
          color: 'primary',
          message: 'Changed password successfully',
          icon: 'check'
      })
      if(response.status=="201"){
        store.dispatch("user/setUser", {user: response.data.user});
      }
    };
    return {
      previous_password,
      new_password,
      confirm_new_password,
      loading,
      onSubmit,
    };
  },
});
</script>
<style></style>
