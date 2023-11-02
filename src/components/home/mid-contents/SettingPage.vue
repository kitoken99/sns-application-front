<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    class="q-pa-md"
    style="height: 100%; width: 100%"
  >
    <UpdateUser />
  </q-scroll-area>
</template>

<script>
import { defineComponent } from "vue";
import UpdateUser from "./setting-page/UpdateUser.vue";
export default defineComponent({
  name: "SettingPage",
  components: { UpdateUser },
});
</script>
<style></style>
