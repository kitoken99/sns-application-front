<template>
  <form @submit.prevent="onSubmit" class="q-mx-auto q-gutter-y-md q-mt-lg">
    <q-input filled v-model="user.name" label="name" style="width: 300px" />
    <q-input filled v-model="user.email" label="email" style="width: 300px" />
    <div class="q-pa-md">
      <q-date v-model="user.birthday" />
      <div class="q-py-md row justify-end">
        <q-btn
          push
          color="primary"
          label="Reset"
          @click="resetBirthday()"
          style="width: 100px"
        />
      </div>
    </div>
    <div style="text-align: center">
      <q-btn
        type="submit"
        :loading="submitting"
        label="Update"
        class="q-mt-md"
        color="primary"
        style="width: 250px"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </form>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "UpdateUser",
  setup() {
    const store = useStore();
    const user = ref(store.getters["user/getUser"]);
    const submitting = ref(false);
    const resetBirthday = () => {
      user.value.birthday = null;
    };
    const onSubmit = () => {
      submitting.value = true;
      store.dispatch("user/updateUser", {
        name: user.value.name,
        email: user.value.email,
        birthday: user.value.birthday,
      });
      submitting.value = false;
    };
    onMounted(() => {
      store.dispatch("user/fetchUser").then(() => {
        user.value = store.getters["user/getUser"];
      });
    });
    return {
      user,
      store,
      submitting,
      resetBirthday,
      onSubmit,
    };
  },
});
</script>
<style></style>
