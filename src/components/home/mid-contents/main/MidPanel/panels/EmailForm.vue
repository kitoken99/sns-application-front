<template>
  <div>
    <h5 class="text-center">Find your friend with email</h5>
    <q-form
      class="q-gutter-y-md column"
      style="max-width: 300px; margin: 0 auto"
    >
      <q-input filled v-model="email" label="email" />

      <q-btn push color="primary" label="find a friend" @click="onClick()" />
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "EmailForm",
  setup() {
    const store = useStore();
    const email = ref(null);
    const onClick = () => {
      store.dispatch("room/findProfile", { email: email.value });
    };
    return {
      email,
      store,
      onClick,
    };
  },
});
</script>
<style type="text/scss"></style>
