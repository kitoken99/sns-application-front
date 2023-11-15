<template>
  <div v-show="store.getters['state/getIsAuthorized']" class="main-container">

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
      await store.dispatch("room/fetchProfiles");
      store.dispatch("room/fetchFriendship");
      store.dispatch("room/fetchGroups");
      await store.dispatch("room/fetchRooms");
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
