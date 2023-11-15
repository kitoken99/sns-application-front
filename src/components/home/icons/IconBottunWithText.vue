<template>
  <div>
    <q-btn round>
      <div class="inline rounded-borders cursor-pointer icon-circle">
        <q-avatar color="grey-4" text-color="black" :icon="icon"  v-if="store.getters['state/getIsFetched']"/>
        <q-skeleton
          v-if="!store.getters['state/getIsFetched']"
          type="QAvatar"
        />
        <q-tooltip> {{ text }} </q-tooltip>
      </div>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
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
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
<style></style>
