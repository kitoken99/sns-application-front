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
import { useRouter } from "vue-router";
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
    const router = useRouter();
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
      //プロファイル
      channel.bind(
        "App\\Events\\Profile\\ProfileUpdated",
        async function (data) {
          data.profile.image = await store.dispatch("profile/getImage", {
            image: data.profile.image,
          });
          store.dispatch("profile/profileUpdated", { data: data });
        }
      );
      channel.bind(
        "App\\Events\\Profile\\ProfileDeleted",
        async function (data) {
          console.log(data);
          if (data.profile_id == data.main_profile_id) {
            data.profile.image = await store.dispatch("profile/getImage", {
              image: data.profile.image,
            });
            store.dispatch("profile/addProfiles", [data.profile]);
            return;
          }
          store.dispatch("friendship/profileDeleted", {
            user_id: data.user_id,
            profile_id: data.profile_id,
            main_profile_id: data.main_profile_id,
          });
          store.dispatch("group/profileDeleted", {
            user_id: data.user_id,
            profile_id: data.profile_id,
            main_profile_id: data.main_profile_id,
          });
          store.dispatch("profile/profileDeleted", {
            user_id: data.user_id,
            profile_id: data.profile_id,
          });
        }
      );
      //表示設定
      channel.bind(
        "App\\Events\\Permission\\PermissionUpdated",
        async function (data) {
          await Promise.all(
            Object.values(data.profiles).map(async (profile) => {
              profile.image = await store.dispatch("profile/getImage", {
                image: profile.image,
              });
            })
          );
          store.dispatch("profile/addUserProfiles", {
            user_id: data.user_id,
            profiles: data.profiles,
          });
        }
      );
      //フレンド
      channel.bind(
        "App\\Events\\Friendship\\FriendshipCreated",
        async function (data) {
          await Promise.all(
            Object.values(data.profiles).map(async (profile) => {
              profile.image = await store.dispatch("profile/getImage", {
                image: profile.image,
              });
            })
          );
          store.dispatch("friendship/friendshipCreated", data);
        }
      );

      //グループ
      channel.bind("App\\Events\\Group\\GroupCreated", async function (data) {
        data.group.image = await store.dispatch("group/getImage", {
          image: data.group.image,
        });
        await Promise.all(
          Object.values(data.profiles).map(async (profile) => {
            profile.image = await store.dispatch("profile/getImage", {
              image: profile.image,
            });
          })
        );
        store.dispatch("profile/addProfiles", data.profiles);
        store.dispatch("group/addGroup", data.group);
      });
      channel.bind("App\\Events\\Group\\GroupUpdated", async function (data) {
        data.group.image = await store.dispatch("group/getImage", {
          image: data.group.image,
        });
        store.dispatch("group/addGroup", data.group);
      });
      channel.bind("App\\Events\\Group\\MemberUpdated", async function (data) {
        await Promise.all(
          Object.values(data.profiles).map(async (profile) => {
            profile.image = await store.dispatch("profile/getImage", {
              image: profile.image,
            });
          })
        );
        store.dispatch("profile/addUserProfiles", {
          user_id: data.user_id,
          profiles: data.profiles,
        });
        store.dispatch("group/memberUpdated", {
          group_id: data.group_id,
          members: data.members,
        });
      });
      channel.bind("App\\Events\\Group\\MemberInvited", async function (data) {
        await Promise.all(
          Object.values(data.profiles).map(async (profile) => {
            profile.image = await store.dispatch("profile/getImage", {
              image: profile.image,
            });
          })
        );
        store.dispatch("profile/addProfiles", data.profiles);
        store.dispatch("group/memberUpdated", {
          group_id: data.group_id,
          members: data.members,
        });
      });
    };
    const pusherConnect = (room_id) => {
      var channel = pusher.subscribe(`channel-${room_id}`);
      channel.bind("App\\Events\\MessageRecieved", function (data) {
        store.dispatch("room/messageRecieved", { data: data.message });
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
      const status = await store.dispatch("user/fetchUser");
      if(status != 200 && status != 201){
        router.push("/login");
      }
      await store.dispatch("profile/fetchProfiles");
      q.loading.hide();
      store.dispatch("state/switchIsAuthorized", true);
      store.dispatch("friendship/fetchFriendship");
      await store.dispatch("group/fetchGroups");
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
