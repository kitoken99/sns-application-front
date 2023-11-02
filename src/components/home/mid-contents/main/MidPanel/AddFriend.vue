<template>
  <div class="add-frined">
    <q-tab-panels
      v-model="store.getters['state/getFindUserPanelState']"
      style="height: 100%"
    >
      <q-tab-panel name="form">
        <EmailForm />
      </q-tab-panel>
      <q-tab-panel name="loading" class="loading">
        <div class="text-center">
          <q-spinner-dots color="primary" size="30%" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="found">
        <UserProfile />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import EmailForm from "./panels/EmailForm.vue";
import UserProfile from "./panels/UserProfile.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddFriend",
  components: {
    UserProfile,
    EmailForm,
  },
  setup() {
    const email = ref(null);
    const store = useStore();
    return {
      email,
      store,
      
    };
  },
});
</script>
<style type="text/scss">
.add-frined {
  background-color: lightblue;
  height: 100%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
