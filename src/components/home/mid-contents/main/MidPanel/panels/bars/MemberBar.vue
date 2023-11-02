<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <AvatarIcon :image="member.image" size="40px" />
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ member.name }}</q-item-label>
      <q-item-label caption lines="2">
        {{ member.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from "vue";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "MemberBar",
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
  components: {
    AvatarIcon,
  },
});
</script>
<style></style>
