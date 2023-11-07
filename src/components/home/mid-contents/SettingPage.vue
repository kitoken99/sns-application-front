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
  setup(){
    return{
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    }
  }
});
</script>
<style></style>
