<template>
  <FriendIndex v-show="store.getters['state/getMainContent'] == 'main'" />

  <AddGroup v-show="store.getters['state/getMainContent'] == 'add_group'" />
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import AddGroup from "./MidPanel/AddGroup.vue";
import FriendIndex from "./MidPanel/FriendIndex.vue";
export default defineComponent({
  name: "MidMain",
  components: { AddGroup, FriendIndex },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
<style></style>
