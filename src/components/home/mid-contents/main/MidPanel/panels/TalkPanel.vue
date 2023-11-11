<template>
  <q-scroll-area>
    <div
      v-for="(room, index) in store.getters['room/getCurrentRooms']"
      v-bind:key="room.id"
    >
      <RoomBar
        :name="room.name"
        :image="room.image"
        :last_message="room.last_message"
        :not_read="room.not_read"
        @click="onClick(room.room_id)"
      />
      <q-separator
        v-if="index < store.getters['room/getCurrentRooms'].length"
        inset="item"
      />
    </div>
  </q-scroll-area>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import RoomBar from "./bars/RoomBar.vue";
export default defineComponent({
  name: "TalkPanel",
  components: {
    RoomBar,
  },
  setup() {
    const store = useStore();
    const onClick = (id) => {
      store.dispatch("room/setCurrentRoomId", id );
    };
    return {
      store,
      onClick,
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
