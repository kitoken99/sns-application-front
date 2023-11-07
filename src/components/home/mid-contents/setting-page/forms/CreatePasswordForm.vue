<template>
  <p class="text-h6">Create your password</p>
  <form @submit.prevent="onSubmit" class="q-mx-auto q-mb-xl q-gutter-y-md q-my-lg row justify-center">
    <q-input filled v-model="new_password" label="new password" style="width: 250px" />
    <q-input filled v-model="confirm_new_password" label="confirm new password" style="width: 250px" />
    <q-btn
        type="submit"
        :loading="loading"
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
  name: "CreatePasswordForm",
  setup() {
    const store = useStore();
    const new_password = ref(null);
    const $q = useQuasar()
    const confirm_new_password = ref(null);
    const loading = ref(false);
    const onSubmit = async() => {
      loading.value = true;
      const response = await store.dispatch("user/updatePassword", {
        new_password: new_password.value,
        confirm_new_password: confirm_new_password.value,
      });
      loading.value = false;
      new_password.value = null;
      confirm_new_password.value = null;
      $q.notify({
          progress: true,
          color: 'primary',
          message: 'Create password successfully',
          icon: 'check'
      })
      if(response.status=="201"){
        store.dispatch("user/setUser", {user: response.data.user});
      }

    };
    return {
      new_password,
      confirm_new_password,
      loading,
      onSubmit,
    };
  },
});
</script>
<style></style>
