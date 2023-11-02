<template>
  <FriendIndex v-show="store.getters['state/getIsShowRoom']" />

  <AddFriend v-show="store.getters['state/getIsShowAddFriend']" />

  <AddGroup v-show="store.getters['state/getIsShowAddGroup']" />
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import AddFriend from "./MidPanel/AddFriend.vue";
import AddGroup from "./MidPanel/AddGroup.vue";
import FriendIndex from "./MidPanel/FriendIndex.vue";

export default defineComponent({
  name: "MidMain",
  components: { AddFriend, AddGroup, FriendIndex },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
<style></style>
