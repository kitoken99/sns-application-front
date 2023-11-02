<template>
  <div class="column">
    <div class="row">
      <h5 class="text-h5 text-white q-my-sm">Register</h5>
    </div>
    <div class="row">
      <q-card square bordered class="q-pa-md shadow-1">
        <q-card-section class="column">
          <RegisterForm />
        </q-card-section>
        <q-card-section>
          <SocialLoginBottuns />
        </q-card-section>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">
            Already reigistered?
            <router-link to="/login">Log in with your account</router-link>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import RegisterForm from "src/components/auth/RegisterForm.vue";
import SocialLoginBottuns from "src/components/auth/SocialLoginBottuns.vue";
export default {
  name: "RegisterPage",
  components: { RegisterForm, SocialLoginBottuns },
};
</script>
<style>
.q-card {
  width: 360px;
}
</style>
