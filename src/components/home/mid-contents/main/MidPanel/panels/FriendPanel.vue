<template>
  <q-scroll-area>
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="group" color="grey-4" text-color="white" />
        </q-item-section>
        <q-item-section> Groups</q-item-section>
        <q-item-section side>
          <div class="row items-center">
            {{ store.getters["room/getCurrentGroups"].length }}
          </div>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <div
            v-for="(group, index) in store.getters['room/getCurrentGroups']"
            v-bind:key="group.id"
          >
            <MemberBar :member="group" />
            <q-separator
              v-if="index < store.getters['room/getCurrentGroups'].length"
              inset="item"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="person" color="grey-4" text-color="white" />
        </q-item-section>
        <q-item-section> Friends</q-item-section>
        <q-item-section side>
          <div class="row items-center">
            {{ store.getters["room/getCurrentFriends"].length }}
          </div>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <div
            v-for="(friend, index) in store.getters['room/getCurrentFriends']"
            v-bind:key="friend.id"
          >
            <MemberBar :member="friend" />
            <q-separator
              v-if="index < store.getters['room/getCurrentFriends'].length"
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
    return {
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
