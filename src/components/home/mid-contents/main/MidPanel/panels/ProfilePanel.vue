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
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    };
  },
});
</script>
<style></style>
