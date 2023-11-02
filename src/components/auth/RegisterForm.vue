<template>
  <q-form @register.prevent="onRegister" class="q-gutter-sm" ref="formRef">
    <q-input
      square
      filled
      v-model="name"
      type="text"
      label="name"
      lazy-rules
      :rules="nameRules"
    />
    <q-input
      square
      filled
      v-model="email"
      type="email"
      label="email"
      :rules="emailRules"
    />
    <q-input
      square
      filled
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      label="password"
      lazy-rules
      :rules="passwordRules"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      square
      filled
      v-model="c_password"
      :type="isCPwd ? 'password' : 'text'"
      label="password"
      lazy-rules
      :rules="c_passwordRules"
      ><template v-slot:append>
        <q-icon
          :name="isCPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isCPwd = !isCPwd"
        />
      </template>
    </q-input>
    <q-btn
      unelevated
      color="light-green-7"
      size="lg"
      class="full-width"
      label="Register"
      @click="onRegister"
    />
  </q-form>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "RegisterForm",
  setup() {
    const formRef = ref(null);

    const router = useRouter();
    const store = useStore();

    const name = ref(null);
    const nameRules = ref([
      (val) => (val && val.length > 0) || "Name is required",
      (val) => val.length <= 255 || "Please use maximum 255 characters",
    ]);

    const email = ref(null);
    const emailRules = ref([
      (val) => (val && val.length > 0) || "Email is required",
      (val) => val.length <= 255 || "Please use maximum 255 characters",
    ]);

    const password = ref(null);
    const isPwd = ref(true);
    const passwordRules = ref([
      (val) => (val && val.length > 0) || "Password is required",
      (val) => val.length <= 255 || "Please use maximum 255 characters",
      (val) => val.length >= 8 || "Please use minimum 8 characters",
    ]);

    const c_password = ref(null);
    const isCPwd = ref(true);
    const c_passwordRules = ref([
      (val) => (val && val.length > 0) || "Confirm Password is required",
      (val) => val.length <= 255 || "Please use maximum 255 characters",
      (val) => val.length >= 8 || "Please use minimum 8 characters",
      (val) => val == password.value || "Unmatcheed password",
    ]);
    const validationInit = async () => {
      nameRules.value = nameRules.value.slice(0, 2);
      emailRules.value = emailRules.value.slice(0, 2);
      passwordRules.value = passwordRules.value.slice(0, 3);
      c_passwordRules.value = c_passwordRules.value.slice(0, 4);
      const success = await formRef.value.validate();
      if (success) {
        return true;
      } else {
        return false;
      }
    };
    const onRegister = async () => {
      if (await validationInit()) {
        try {
          const response = await axios.post(process.env.API + "/api/register", {
            name: name.value,
            email: email.value,
            password: password.value,
            c_password: c_password.value,
          });

          if (response.status == 201) {
            store.dispatch("auth/saveToken", response.data.data.token);
            // router.push("/home");
          }
        } catch (error) {
          if (error.response.status == 422) {
            const errorMessages = error.response.data.errors;
            if (errorMessages.name) {
              nameRules.value = [
                ...nameRules.value.slice(0, 2),
                () => errorMessages.name[0],
              ];
            }
            if (errorMessages.email) {
              emailRules.value = [
                ...emailRules.value.slice(0, 2),
                () => errorMessages.email[0],
              ];
            }
            if (errorMessages.password) {
              passwordRules.value = [
                ...passwordRules.value.slice(0, 4),
                () => errorMessages.password[0],
              ];
            }
            if (errorMessages.c_password) {
              c_passwordRules.value = [
                ...c_passwordRules.value.slice(0, 3),
                () => errorMessages.c_password[0],
              ];
            }
            formRef.value.validate();
          }
        }
      }
    };

    return {
      formRef,
      name,
      nameRules,

      email,
      emailRules,

      password,
      isPwd,
      passwordRules,

      c_password,
      isCPwd,
      c_passwordRules,

      validationInit,
      onRegister,
    };
  },
};
</script>
<style lang="scss" scoped></style>
