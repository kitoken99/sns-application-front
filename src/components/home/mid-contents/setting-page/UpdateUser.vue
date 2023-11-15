<template>
  <div>
    <p class="text-h6">Your Accont</p>
    <form
      @submit.prevent="onSubmit"
      class="q-mx-auto q-gutter-y-md row justify-center"
    >
      <q-input filled v-model="user.name" label="name" style="width: 290px" />
      <q-input filled v-model="user.email" label="email" style="width: 290px" />
      <div class="q-pt-md" style="width: 290px">
        <q-date v-model="user.birthday" class="q-mx-auto" />
        <div class="q-pt-md row justify-end">
          <q-btn
            push
            class="q-mr-md"
            color="primary"
            label="Reset"
            @click="resetBirthday()"
            style="width: 100px"
          />
        </div>
      </div>
      <div>
        <q-btn
          type="submit"
          :loading="submitting"
          label="Update"
          class="q-mt-md"
          color="primary"
          style="width: 290px"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "UpdateUser",
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const user = ref({ ...store.getters["user/getUser"] });

    const submitting = ref(false);
    const resetBirthday = () => {
      user.value.birthday = null;
    };
    const onSubmit = async () => {
      submitting.value = true;
      let status = await store.dispatch("user/updateUser", {
        name: user.value.name,
        email: user.value.email,
        birthday: user.value.birthday,
      });
      submitting.value = false;
      if (status == 200) {
        $q.notify({
          progress: true,
          color: "primary",
          message: "Updated Successfully",
          icon: "check",
        });
      } else {
        $q.notify({
          type: "negative",
          message: "update failed",
        });
      }
    };
    watch(
      () => store.getters["user/getUser"],
      () => {
        user.value = { ...store.getters["user/getUser"] };
        if (user.value.birthday) {
          user.value.birthday = user.value.birthday.replace(/-/g, "/");
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
