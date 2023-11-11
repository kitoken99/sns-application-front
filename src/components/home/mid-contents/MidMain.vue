<template>
  <div class="mid-content">
    <Toolbar />

    <MidPanels />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Toolbar from "./main/ToolBar.vue";
import MidPanels from "./main/MidPanels.vue";
export default defineComponent({
  name: "MidMain",
  components: { Toolbar, MidPanels },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
<style></style>
