<template>
  <div class="main-container">
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
import Pusher from 'pusher-js';
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

    var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY , {
      cluster: process.env.MIX_PUSHER_APP_CLUSTER
    });

    const pusherDisConnect = (room_id) => {
      var channel = pusher.unsubscribe(`channel-${room_id}`);
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
      await store.dispatch("user/fetchUser");
      store.dispatch("profile/fetchProfiles");
      await store.dispatch("room/fetchProfiles")
      store.dispatch("room/fetchFriendship");
      await store.dispatch("room/fetchGroups");
      store.dispatch("room/fetchRooms")
    });
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
