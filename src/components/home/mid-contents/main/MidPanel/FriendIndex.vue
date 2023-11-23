<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <div style="flex: 1">
      <q-tab-panels v-model="tab" animated style="height: 100%">
        <q-tab-panel name="profile">
          <ProfilePanel
            class="panel"
            v-if="store.getters['state/getProfilePanel'] == 'profile'"
          />
          <GroupPanel
            class="panel"
            v-if="store.getters['state/getProfilePanel'] == 'group'"
          />
          <!-- my profile setting -->
          <MyProfileSetting
            class="panel"
            v-if="store.getters['state/getProfilePanel'] == 'my_setting'"
          />
          <!-- group setting -->
          <GroupSetting
            class="panel"
            v-if="store.getters['state/getProfilePanel'] == 'group_setting'"
          />
          <FriendSetting
            class="panel"
            v-if="store.getters['state/getProfilePanel'] == 'friend_setting'"
          />
          <!-- add friend -->
          <EmailForm
            v-if="store.getters['state/getProfilePanel'] == 'find_profile'"
          />
          <div
            class="text-center loading"
            v-if="store.getters['state/getProfilePanel'] == 'loading'"
          >
            <q-spinner-dots color="primary" size="30%" />
          </div>
        </q-tab-panel>
        <q-tab-panel name="friends">
          <FriendPanel class="panel" />
        </q-tab-panel>
        <q-tab-panel name="talks">
          <TalkPanel class="panel" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <q-separator />
    <div>
      <q-tabs
        v-model="tab"
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
        align="justify"
        narrow-indicator
        switch-indicator
        style="height: 56px"
      >
        <q-tab name="profile" label="profile" />
        <q-tab name="friends" label="friends" />
        <q-tab name="talks" label="talks" />
      </q-tabs>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import ProfilePanel from "./panels/ProfilePanel.vue";
import GroupPanel from "./panels/GroupPanel.vue";
import MyProfileSetting from "./panels/MyProfileSetting.vue";
import FriendSetting from "./panels/FriendSetting.vue";
import EmailForm from "./panels/EmailForm.vue";
import FriendPanel from "./panels/FriendPanel.vue";
import TalkPanel from "./panels/TalkPanel.vue";
import GroupSetting from "./panels/GroupSetting.vue";
export default defineComponent({
  name: "FriendIndex",
  components: {
    FriendPanel,
    GroupPanel,
    MyProfileSetting,
    FriendSetting,
    EmailForm,
    TalkPanel,
    ProfilePanel,
    GroupSetting,
  },
  setup() {
    const store = useStore();
    const tab = ref("friends");
    watch(
      () => ref(store.getters["state/getShowProfile"]),
      () => {
        tab.value = "profile";
      }
    );
    return {
      store,
      tab,
    };
  },
});
</script>
<style>
.panel {
  height: 100%;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
