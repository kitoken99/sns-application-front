<template>
  <q-slide-item @left="onLeft">
    <template v-slot:left v-if="isChecked == false">
      <span v-if="isChecked == false"> Read </span>
      <span v-if="isChecked"> Checked all messages </span>
    </template>

    <q-item clickable v-ripple>
      <q-item-section avatar>
        <AvatarIcon :image="image" size="40px" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{ name }}</q-item-label>
        <q-item-label caption lines="2" v-if="last_message">
          <span class="text-weight-bold">{{ last_message.name }}</span>
          {{ last_message.body }}
        </q-item-label>
      </q-item-section>
      <q-item-section side top v-if="not_read != 0" caption>
        {{ not_read }} new messages
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>
<script>
import { defineComponent, onBeforeUnmount, ref } from "vue";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";

export default defineComponent({
  name: "MemberBar",
  props: {
    name: {
      required: true,
    },
    image: {
      required: true,
    },
    last_message: {
      default: "",
    },
    not_read: {
      required: true,
    },
  },
  components: { AvatarIcon },
  setup() {
    let timer;
    const isChecked = ref(false);
    const finalize = (reset) => {
      timer = setTimeout(() => {
        reset();
        isChecked.value = false;
      }, 100);
    };
    onBeforeUnmount(() => {
      clearTimeout(timer);
    });
    return {
      isChecked,
      onLeft({ reset }) {
        isChecked.value = true;
        finalize(reset);
      },
    };
  },
});
</script>
<style></style>
