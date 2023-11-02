<template>
  <q-scroll-area :thumb-style="thumbStyle" class="q-pa-md">
    <div v-for="(message, index) in store.getter" v-bind:key="message.id">
      <q-chat-message
        v-if="shouldDisplayDate(message, index)"
        :label="formatDate(message.created_at)"
      />
      <MessageBox
        :message="message"
        :user="user"
        :sender="members[message.user_id]"
      />
    </div>
  </q-scroll-area>
</template>
<script>
import { ref, defineComponent, onMounted, watch } from "vue";
import { useStore } from "vuex";
import MessageBox from "src/components/home/MessageBox.vue";
import ChatForm from "src/components/main/chat-room/ChatForm.vue";
export default defineComponent({
  name: "ChatScrollArea",
  components: {},
  setup() {
    const store = useStore();

    const shouldDisplayDate = (message, index) => {
      if (index == 0) {
        return true;
      }
      const prevMessage = messages.value[index - 1]; // `this` を削除
      const timeDifference = 60 * 60 * 1000 * 24; // 1時間（ミリ秒単位）
      const messageTime = new Date(message.created_at).getTime();
      const prevMessageTime = new Date(prevMessage.created_at).getTime();
      return messageTime - prevMessageTime >= timeDifference;
    };
    const formatDate = (date) => {
      // 日付フォーマットを行うロジックを実装
      const formattedDate = new Date(date).toLocaleDateString();
      return formattedDate;
    };

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
