<template>
  <AvatarIcon :image="user.image" :initial="user.name" size="12em" />
  <div>
    {{ user.name }}
  </div>
  <div v-show="user.show_barthday">
    {{ user.birthday }}
  </div>
  <div>
    {{ user.caption }}
  </div>
  <q-btn push color="primary" label="add" @click="addFriend()" />
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "UserProfile",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const user = ref(store.getters["profile/getFoundProfile"]);
    const addFriend = () => {
      store.dispatch("friend/addFriend");
    };
    return {
      user,
      addFriend,
    };
  },
});
</script>
<style type="text/scss"></style>
