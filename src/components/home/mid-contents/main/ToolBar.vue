<template>
  <div class="toolbar">
    <q-toolbar>
      <AvatarBottun :image="profile.image" size="50px" />
      <div class="q-pt-sm q-pl-sm">
        <p class="q-ma-none">
          <span class="text-weight-bold text-h5">{{ profile.name }}</span>
          <span class="q-ml-md">{{ profile.account_type }}</span>
        </p>
      </div>
      <q-space />
      <q-btn
        flat
        round
        dense
        icon="group_add"
        @click="store.dispatch('state/showAddGroup')"
      />
      <q-btn
        flat
        round
        dense
        icon="person_add"
        @click="store.dispatch('state/showAddFriend')"
      />
    </q-toolbar>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import AvatarBottun from "src/components/home/icons/AvatarBottun.vue";
export default defineComponent({
  name: "ToolBar",
  components: { AvatarBottun },
  setup() {
    const store = useStore();
    const profile = ref(store.getters["profile/getCurrentProfile"]);
    watch(
      () => store.getters["profile/getCurrentProfile"],
      (newData) => {
        profile.value = newData;
      }
    );
    return {
      store,
      profile,
    };
  },
});
</script>
<style>
.toolbar {
  background-color: rgb(108, 211, 82);
  padding: 10px;
  width: 100%;
}
</style>
