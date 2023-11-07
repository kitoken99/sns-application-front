<template>
  <p class="text-h6">User setting</p>
  <form @submit.prevent="onSubmit" class="q-mx-auto q-mb-xl q-gutter-y-md  row justify-center">
    <q-input filled v-model="user.name" label="name" style="width: 250px" />
    <q-input filled v-model="user.email" label="email" style="width: 250px" />
    <div class="q-pa-sm">
      <q-date v-model="user.birth_day" />
      <div class="q-py-md q-mr-md row justify-end">
        <q-btn
          push
          color="primary"
          label="Reset"
          @click="resetBirthday()"
          style="width: 100px"
        />
      </div>
    </div>
    <div style="text-align: center; ">
      <q-btn
        type="submit"
        :loading="submitting"
        label="Update"
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
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "UserSetting",

  setup() {
    const store = useStore();
    const user = ref({ ...store.getters["user/getUser"] });
    const submitting = ref(false);
    const resetBirthday = () => {
      user.value.birth_day = null;
    };
    const onSubmit = async() => {
      submitting.value = true;
      await store.dispatch("user/updateUser", {
        name: user.value.name,
        email: user.value.email,
        birthday: user.value.birth_day,
      });
      submitting.value = false;
    };
    watch(
      () => store.getters["user/getUser"],
      () => {
        user.value = { ...store.getters["user/getUser"] };
        if(user.value.birth_day){
          user.value.birth_day = user.value.birth_day.replace(/-/g, '/');
        }
      }
    );
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
