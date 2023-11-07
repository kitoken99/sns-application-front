<template>
  <q-form @register.prevent="onLogin" class="q-gutter-sm" ref="formRef">
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
    <q-btn
      unelevated
      color="light-green-7"
      size="lg"
      class="full-width"
      label="Login"
      @click="onLogin"
    />
  </q-form>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "LoginForm",
  setup() {
    const formRef = ref(null);

    const router = useRouter();
    const store = useStore();

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

    const validationInit = async () => {
      emailRules.value = emailRules.value.slice(0, 2);
      passwordRules.value = passwordRules.value.slice(0, 3);
      const success = await formRef.value.validate();
      if (success) {
        return true;
      } else {
        return false;
      }
    };
    const onLogin = async () => {
      if (await validationInit()) {
        try {
          const response = await axios.post(process.env.API + "/api/login", {
            email: email.value,
            password: password.value,
          });

          if (response.status == 201) {
            store.dispatch("auth/saveToken", response.data.data.token);
            router.push("/");
            console.log(response.data);
          }
        } catch (error) {
          console.log(error.response.status);
          console.log(error.response);
          if (error.response.status == 422) {
            const errorMessages = error.response.data.errors;
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
          }
          formRef.value.validate();
        }
      }
    };
    return {
      formRef,

      email,
      emailRules,

      password,
      isPwd,
      passwordRules,

      validationInit,
      onLogin,
    };
  },
};
</script>
<style lang="scss" scoped></style>
