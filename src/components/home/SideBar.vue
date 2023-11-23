<template>
  <div class="sidebar q-pt-md">
    <AvatarBottunWithText
      class="q-mb-md"
      v-for="profile in profiles"
      v-bind:key="profile.id"
      :image="profile.image"
      size="50px"
      :text="profile.account_type"
      @click="onClickAvatar(profile)"
    />

    <IconBottunWithText
      class="q-mb-md"
      icon="add"
      text="new profile"
      @click="store.dispatch('state/switchMiddleContent', 'addProfile')"
    />
    <IconBottunWithText
      class="q-mb-md"
      icon="settings"
      text="setting"
      @click="store.dispatch('state/switchMiddleContent', 'setting')"
    />
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import AvatarBottunWithText from "src/components/home/icons/AvatarBottunWithText.vue";
import IconBottunWithText from "src/components/home/icons/IconBottunWithText.vue";
export default defineComponent({
  name: "SideBar",
  components: { AvatarBottunWithText, IconBottunWithText },
  setup() {
    const store = useStore();
    const profiles = ref(store.getters["profile/getMyProfiles"]);
    const onClickAvatar = (profile) => {
      store.dispatch("profile/setFocusedUser", { user_id: profile.user_id, profile_id: profile.id, isShow: false });
      store.dispatch("profile/setCurrentProfileId", profile.id);
      store.dispatch("state/switchMiddleContent", "main");
      store.dispatch("profile/setFocusedUser", {
        user_id: profile.user_id,
        profile_id: profile.id,
      });
    };
    watch(
      () => store.getters["profile/getMyProfiles"],
      (newData) => {
        profiles.value = newData;
      }
    );
    return {
      profiles,
      store,
      onClickAvatar,
    };
  },
});
</script>
<style>
.sidebar {
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: rgb(224, 224, 224);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
