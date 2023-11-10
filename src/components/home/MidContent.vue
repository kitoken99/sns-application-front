<template>
  <div style="width: 350px; height: 100%; background-color: white;">
    <div
      v-show="store.getters['state/getIsShowMiddleContent']"
      class="mid-content"
    >

      <MidMain />
    </div>
    <AddProfile
      v-show="store.getters['state/getIsShowAddProfile']"
      class="mid-content"
    />
    <SettingPage
      v-show="store.getters['state/getIsShowSetting']"
      class="mid-content"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import MidMain from "./mid-contents/MidMain.vue";
import AddProfile from "./mid-contents/AddProfile.vue";
import SettingPage from "./mid-contents/SettingPage.vue";
export default defineComponent({
  name: "MidContent",
  components: {  MidMain, AddProfile, SettingPage },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
<style>
.mid-content {
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
