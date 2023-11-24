<template>
  <q-card flat style="max-width: 318px">
    <q-card-section>
      <div class="text-center q-gutter-y-md">
        <AvatarIcon :image="group.image" size="8em" />
        <div>
          <p class="text-h5">{{ group.name }}</p>
        </div>
        <div>
          <q-scroll-area style="height: 7em; width: 200px">
            <div style="overflow-wrap: break-word; width: 200px">
              {{ group.caption }}
            </div>
          </q-scroll-area>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn
        flat
        v-show="group.state == 'joined'"
        @click="store.dispatch('room/setCurrentRoomId', group.room_id)"
        >talk</q-btn
      >
      <q-btn
        flat
        v-show="group.state == 'joined'"
        @click="store.dispatch('state/switchProfilePanel', 'group_setting')"
        >setting</q-btn
      >
      <q-btn
        flat
        v-show="group.state == 'invited'"
        @click="
          () => {
            store.dispatch('group/switchState', 'joined');
            store.dispatch(
              'group/switchProfile',
              store.getters['profile/getCurrentProfileId']
            );
          }
        "
        >join</q-btn
      >
    </q-card-actions>
  </q-card>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "GroupPanel",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const group = ref(store.getters["group/getFocusedGroup"]);
    watch(
      () => ref(store.getters["group/getFocusedGroup"]),
      () => {
        group.value = store.getters["group/getFocusedGroup"];
      }
    );

    return {
      store,
      group,
    };
  },
});
</script>
<style>
.q-card__section--vert {
  padding: 0;
}
</style>
