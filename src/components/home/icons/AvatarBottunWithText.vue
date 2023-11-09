<template>
  <div>
    <q-btn round>
      <div class="inline rounded-borders cursor-pointer icon-circle">
        <AvatarIcon :image="image" :size="size" />
        <q-tooltip>
          {{ text }}
        </q-tooltip>
      </div>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "AvatarBottunWithText",
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
    text: {
      type: String,
      required: true,
    },
  },
});
</script>
<style></style>
