<template>
  <div>
    <q-btn round>
      <div class="inline rounded-borders cursor-pointer icon-circle">
        <q-avatar color="white" text-color="white" :icon="icon" />
        <q-tooltip> {{ text }} </q-tooltip>
      </div>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "AvatarBottunWithText",
  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>
<style></style>
