<template>
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
</template>
<script>
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "ChatForm",
  setup() {
    const store = useStore();
    const newMessage = ref(null);
    const onSubmit = () => {
      store.dispatch("room/postMessage", { message: newMessage.value });

      newMessage.value = null;
    };

    return {
      newMessage,
      onSubmit,
    };
  },
});
</script>

<style></style>
