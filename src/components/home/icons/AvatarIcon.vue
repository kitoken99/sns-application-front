<template>
  <q-avatar v-if="shouldDisplayImage()" :size="size">
    <img :src="'data:image/png;base64,' + image" />
  </q-avatar>
  <q-avatar
    v-if="!shouldDisplayImage()"
    color="primary"
    text-color="white"
    :size="size"
    >{{ initial }}</q-avatar
  >
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AvatarIcon",
  props: {
    image: {
      type: String,
      default: "",
    },
    initial: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const shouldDisplayImage = () => {
      if (props.image == "") {
        return false;
      }
      return true;
    };
    return {
      shouldDisplayImage,
    };
  },
});
</script>
<style></style>
