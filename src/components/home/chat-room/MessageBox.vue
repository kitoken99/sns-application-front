<template>
  <q-chat-message
    :name="sender.name"
    :text="message.body"
    :sent="message.user_id === user.id"
    :text-color="message.user_id == user.id ? 'black' : 'white'"
    :bg-color="message.user_id == user.id ? 'light-green' : 'gray'"
    :stamp="formattedCreatedAt"
  >
    <template v-slot:avatar>
      <div
        :class="{
          'q-ml-sm': message.user_id === user.id,
          'q-mr-sm': message.user_id !== user.id,
        }"
      >
        <AvatarIcon :image="sender.image" size="40px" />
      </div>
    </template>
  </q-chat-message>
</template>
<script>
import { defineComponent, computed } from "vue";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "MessageBox",
  props: {
    message: {
      default: [],
    },
    user: {
      required: true,
    },
    sender: {
      required: true,
    },
  },
  components: { AvatarIcon },
  setup(props) {
    const formattedCreatedAt = computed(() => {
      const createdAt = new Date(props.message.created_at);
      const formattedTime = createdAt.toLocaleTimeString("ja-JP", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formattedTime;
    });

    return {
      formattedCreatedAt,
    };
  },
});
</script>
