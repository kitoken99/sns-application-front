<template>
  <q-btn round>
    <AvatarIcon :image="image" :size="size" />
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "AvatarBottun",
  components: { AvatarIcon },
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
});
</script>
<style></style>
