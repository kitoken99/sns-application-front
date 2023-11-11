<template>
  <q-avatar v-if="store.getters['state/getIsFetched']" :size="size">
    <img :src="'data:image/png;base64,' + image" />
  </q-avatar>
  <q-skeleton
    v-if="!store.getters['state/getIsFetched']"
    type="QAvatar"
    :size="size"
  />
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "AvatarIcon",
  props: {
    image: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
<style></style>
