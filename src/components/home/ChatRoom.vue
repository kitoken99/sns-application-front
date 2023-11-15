<template>
  <div style="display: flex; flex-direction: column; height: 100vh;width: 100%;">
    <q-card class="chat-scroll-area" flat>
      <q-scroll-area
        :thumb-style="thumbStyle"
        class="q-px-md"
        style="height: 100%; width: 100%;"
        ref="scrollRef"
      >
        <div v-for="(message, index) in room.messages" v-bind:key="message.id">
          <q-chat-message
            v-if="shouldDisplayDate(message, index)"
            :label="formatDate(message.created_at)"
          />
          <MessageBox
            :message="message"
            :user="store.getters['user/getUser']"
            :sender="room.members[message.user_id]"
          />
        </div>
      </q-scroll-area>
      <q-inner-loading
        style="background-color: white"
        :showing="isLoading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
    <div class="row justify-center">
      <q-input
        class="message-input"
        v-model="newMessage"
        bg-color="white"
        outlined
        autogrow
      />
      <q-btn
        class="message-bottun"
        label="送信"
        type="submit"
        color="primary"
        @click="onSubmit"
      />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, watch, nextTick } from "vue";
import { useStore } from "vuex";

import MessageBox from "./chat-room/MessageBox.vue";

export default defineComponent({
  name: "ChatRoom",
  components: { MessageBox },

  setup() {
    const store = useStore();
    const room = ref(store.getters["room/getCurrentRoom"]);
    const newMessage = ref(null);
    const scrollRef = ref();
    const isLoading = ref(false);
    const scrollBottom = () => {
      scrollRef.value.setScrollPercentage("vertical", 1);
      isLoading.value = false;
    };
    const onSubmit = async () => {
      await store.dispatch("room/addMessage", { message: newMessage.value });
      setTimeout(scrollBottom, 110);
      store.dispatch("room/postMessage", { message: newMessage.value });
      newMessage.value = null;
    };
    const shouldDisplayDate = (message, index) => {
      if (index == 0) {
        return true;
      }
      const prevMessage = room.value.messages[index - 1]; // `this` を削除
      const messageDate = new Date(message.created_at).getDate();
      const prevMessageDate = new Date(prevMessage.created_at).getDate();
      return messageDate - prevMessageDate != 0;
    };
    const formatDate = (date) => {
      const formattedDate = new Date(date).toLocaleDateString();
      return formattedDate;
    };

    watch(
      () => store.getters["room/getCurrentRoom"],
      async () => {
        room.value = await store.getters["room/getCurrentRoom"];
        if (isLoading.value && room.value["messages"])
          setTimeout(scrollBottom, 110);
      }
    );
    watch(
      () => store.getters["room/getCurrentRoomId"],
      () => {
        newMessage.value = null;
        if (store.getters["room/getCurrentRoomId"]) isLoading.value = true;
      }
    );

    return {
      store,
      room,
      scrollRef,
      formatDate,
      shouldDisplayDate,
      onSubmit,
      newMessage,
      isLoading,
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

<style>
.chatroom {
  background-color: rgb(144, 234, 144);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.chat-scroll-area {
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: white;
}
.message-form {
  width: 100%;
}
.message-input {
  width: 85%;
}
.message-bottun {
  width: 15%;
}
.q-card {
  border-radius: 0;
}
</style>
