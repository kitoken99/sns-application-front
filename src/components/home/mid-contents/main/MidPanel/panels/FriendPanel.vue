<template>
  <q-scroll-area>
    <q-expansion-item style="max-width: 318px">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="group" color="grey-4" text-color="white" />
        </q-item-section>
        <q-item-section> Groups</q-item-section>
        <q-item-section side>
          <div class="row items-center">
            {{ store.getters["group/getCurrentGroups"].length }}
          </div>
        </q-item-section>
      </template>
      <q-card style="max-width: 318px">
        <q-card-section>
          <div
            v-for="(group, index) in store.getters['group/getCurrentGroups']"
            v-bind:key="group.id"
          >
            <MemberBar :member="group" @click="onGroup(group)" />
            <q-separator
              v-if="index < store.getters['group/getCurrentGroups'].length"
              inset="item"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item style="max-width: 318px">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="group" color="grey-4" text-color="white" />
        </q-item-section>
        <q-item-section> Unaccepted Groups</q-item-section>
        <q-item-section side>
          <div class="row items-center">
            {{ store.getters["group/getUnAcceptedGroups"].length }}
          </div>
        </q-item-section>
      </template>
      <q-card style="max-width: 318px">
        <q-card-section>
          <div
            v-for="(group, index) in store.getters['group/getUnAcceptedGroups']"
            v-bind:key="group.id"
          >
            <MemberBar :member="group" @click="onGroup(group)" />
            <q-separator
              v-if="index < store.getters['group/getUnAcceptedGroups'].length"
              inset="item"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item style="max-width: 318px">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="person" color="grey-4" text-color="white" />
        </q-item-section>
        <q-item-section> Friends</q-item-section>
        <q-item-section side>
          <div class="row items-center">
            {{ store.getters["friendship/getCurrentFriends"].length }}
          </div>
        </q-item-section>
      </template>
      <q-card style="max-width: 318px">
        <q-card-section>
          <div
            v-for="(friend, index) in store.getters[
              'friendship/getCurrentFriends'
            ]"
            v-bind:key="friend.id"
          >
            <MemberBar :member="friend" @click="onAvatar(friend)" />
            <q-separator
              v-if="
                index < store.getters['friendship/getCurrentFriends'].length
              "
              inset="item"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item style="max-width: 318px">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="person" color="grey-4" text-color="white" />
        </q-item-section>
        <q-item-section> Unaccepted friends</q-item-section>
        <q-item-section side>
          <div class="row items-center">
            {{ store.getters["friendship/getUnAcceptedFriends"].length }}
          </div>
        </q-item-section>
      </template>
      <q-card style="max-width: 318px">
        <q-card-section>
          <div
            v-for="(friend, index) in store.getters[
              'friendship/getUnAcceptedFriends'
            ]"
            v-bind:key="friend.id"
          >
            <MemberBar :member="friend" @click="onAvatar(friend)" />
            <q-separator
              v-if="
                index < store.getters['friendship/getUnAcceptedFriends'].length
              "
              inset="item"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-scroll-area>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import MemberBar from "./bars/MemberBar.vue";
export default defineComponent({
  name: "FriendPanel",
  components: {
    MemberBar,
  },
  setup() {
    const store = useStore();
    const onGroup = (group) => {
      store.dispatch("group/setFocusedGroup", {
        group_id: group.id,
        isShow: true,
      });
    };
    const onAvatar = (profile) => {
      store.dispatch("profile/setFocusedUser", {
        user_id: profile.user_id,
        profile_id: profile.id,
        isShow: true,
      });
    };
    return {
      onAvatar,
      onGroup,
      store,
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    };
  },
});
</script>
<style></style>
