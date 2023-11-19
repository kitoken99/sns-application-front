<template>
  <div v-show="store.getters['state/getIsAuthorized']" class="main-container">
    <div>
      <SideBar />
    </div>
    <div>
      <MidContent />
    </div>
    <div style="flex: 1">
      <ChatRoom />
    </div>
  </div>
</template>
<script>
import { onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import Pusher from "pusher-js";
import SideBar from "src/components/home/SideBar.vue";
import MidContent from "src/components/home/MidContent.vue";
import ChatRoom from "src/components/home/ChatRoom.vue";
export default {
  name: "HomePage",
  components: {
    SideBar,
    MidContent,
    ChatRoom,
  },
  setup() {
    const store = useStore();
    const q = useQuasar();
    var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
      cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    });
    const pusherDisConnect = (room_id) => {
      var channel = pusher.unsubscribe(`channel-${room_id}`);
    };
    const pusherUserConnect = (user_id) => {
      var channel = pusher.subscribe(`user-${user_id}`);
      channel.bind("App\\Events\\ProfileUpdated", async function (data) {
        data.profile.image = await store.dispatch("profile/getImage", {
              image: data.profile.image,
            });
        store.dispatch("profile/profileUpdated", { data: data });
      });
      channel.bind("App\\Events\\PermitionUpdated", async function (data) {
        await Promise.all(
          Object.values(data.profiles).map(async (profile) => {
            profile.image = await store.dispatch("profile/getImage", {
              image: profile.image,
            });
          })
        );
        store.dispatch("profile/permitionUpdated", data);
      });
      channel.bind("App\\Events\\FriendshipCreated", async function (data) {
        data.room.image = await store.dispatch("profile/getImage", {
              image: data.room.image,
            });
        await Promise.all(
          Object.values(data.profiles).map(async (profile) => {
            profile.image = await store.dispatch("profile/getImage", {
              image: profile.image,
            });
          })
        );
        store.dispatch("friendship/friendshipCreated", data);
      });
      channel.bind("App\\Events\\GroupCreated", async function (data) {
        
        data.room.image = await store.dispatch("group/getImage", {
              image: data.room.image,
            });
            
        data.group.image = data.room.image;
        await Promise.all(
          Object.values(data.profiles).map(async (profile) => {
            profile.image = await store.dispatch("profile/getImage", {
              image: profile.image,
            });
          })
        );
        
        store.dispatch("group/groupCreated", data);
      });
      channel.bind("App\\Events\\ProfileDeleted", function (data) {
        store.dispatch("room/profileDeleted", { data: data });
      });
    };
    const pusherConnect = (room_id) => {
      var channel = pusher.subscribe(`channel-${room_id}`);
      channel.bind("App\\Events\\MessageRecieved", function (data) {
        store.dispatch("room/messageRecieved", { data: data });
      });
    };
    watch(
      () => store.getters["room/getRooms"],
      (newVal, oldVal) => {
        oldVal.forEach((value) => {
          pusherDisConnect(value.room_id);
        });
        newVal.forEach((value) => {
          pusherConnect(value.room_id);
        });
      }
    );

    onMounted(async () => {
      store.dispatch("state/initState");
      store.dispatch("user/fetchUser");
      await store.dispatch("profile/fetchProfiles");
      q.loading.hide();
      store.dispatch("state/switchIsAuthorized", true);
      store.dispatch("friendship/fetchFriendship");
      store.dispatch("group/fetchGroups");
      await store.dispatch("room/fetchRooms");
      pusherUserConnect(store.getters["user/getUser"].id);
      store.dispatch("state/switchIsFetched", true);
    });
    q.loading.show({
      message: "Authorizing. Please wait...",
      boxClass: "bg-grey-2 text-grey-9",
      spinnerColor: "primary",
    });
    return {
      store,
    };
  },
};
</script>
<style>
.main-container {
  display: flex;
  max-width: 1000px;
  width: 100%;
}
</style>
