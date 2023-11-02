<template>
  <q-scroll-area> </q-scroll-area>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "ProfilePanel",
  setup() {
    const store = useStore();
    const room = ref(store.getters["p/getFoundProfile"]);
    return {
      store,
    };
  },
});
</script>
<style></style>
