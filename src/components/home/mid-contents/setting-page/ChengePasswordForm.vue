<template>
  <div>
  <p class="text-h6">Change your password</p>
  <form @submit.prevent="onSubmit" class="q-mx-auto q-mb-xl q-gutter-y-md row justify-center">
    <q-input filled v-model="previous_password" :type="isPPwd ? 'password' : 'text'" label="current password" style="width: 290px"  >
    <template v-slot:append>
          <q-icon
            :name="isPPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPPwd = !isPPwd"
          />
        </template>
      </q-input>
    <q-input filled v-model="new_password" :type="isPwd ? 'password' : 'text'" label="new password" style="width: 290px" >
    <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    <q-input filled v-model="confirm_new_password"  :type="isCPwd ? 'password' : 'text'" label="confirm new password" style="width: 290px" >
    <template v-slot:append>
          <q-icon
            :name="isCPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isCPwd = !isCPwd"
          />
        </template>
      </q-input>
    <q-btn
        type="submit"
        :loading="loading"
        :submitted="true"
        label="Update"
        class="q-mt-md"
        color="primary"
        style="width: 290px"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
  </form>
</div>

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
    const isPPwd = ref(true);
    const isPwd = ref(true);
    const isCPwd = ref(true);
    const onSubmit = async() => {
      loading.value = true;
      const status = await store.dispatch("user/updatePassword", {
        previous_password: previous_password.value,
        new_password: new_password.value,
        confirm_new_password: confirm_new_password.value,
      });
      previous_password.value = null;
      new_password.value = null;
      confirm_new_password.value = null;
      loading.value = false;
      if(status=="201"){
        $q.notify({
          progress: true,
          color: 'primary',
          message: 'Create password successfully',
          icon: 'check'
      })
      }else{
        $q.notify({
          type: 'negative',
          message: 'failed to chenge password'
        })
      }
    };
    return {
      previous_password,
      new_password,
      confirm_new_password,
      loading,
      isCPwd,
      isPPwd,
      isPwd,
      onSubmit,
    };
  },
});
</script>
<style></style>
