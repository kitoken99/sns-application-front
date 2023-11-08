<template>
  <div style="display: flex; flex-direction: column; height: 100vh">
    <div class="chat-scroll-area">
      <q-scroll-area
        :thumb-style="thumbStyle"
        class="q-pa-md"
        style="height: 100%"
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
    </div>
    <div>
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, watch } from "vue";
import { useStore } from "vuex";

import MessageBox from "./chat-room/MessageBox.vue";
import ChatForm from "./chat-room/ChatForm.vue";
export default defineComponent({
  name: "ChatRoom",
  components: { MessageBox, ChatForm },

  setup() {
    const store = useStore();
    const room = ref(store.getters["room/getCurrentRoom"]);

    watch(
      () => store.getters["room/getCurrentRoom"],
      () => {
        room.value = store.getters["room/getCurrentRoom"];
      }
    );

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

    return {
      store,
      room,
      formatDate,
      shouldDisplayDate,
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
</style>
