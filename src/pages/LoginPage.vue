<template>
  <div class="column">
    <div class="row">
      <h5 class="text-h5 text-white q-my-md">Login</h5>
    </div>
    <div class="row">
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section class="column">
          <LoginForm />
        </q-card-section>
        <q-card-section>
          <SocialLoginBottuns />
        </q-card-section>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">
            Not reigistered?
            <!-- <router-link to="/register">Created an Account</router-link> -->
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import LoginForm from "src/components/auth/LoginForm.vue";
import SocialLoginBottuns from "src/components/auth/SocialLoginBottuns.vue";
export default {
  name: "LoginPage",
  components: { LoginForm, SocialLoginBottuns },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
