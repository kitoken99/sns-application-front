<template>
  <q-card flat>
    <q-card-section>
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="light-green"
        navigation
        padding
        arrows
        style="height: 100%"
      >
        <q-carousel-slide
          v-for="profile in Object.values(profiles)"
          v-bind:key="profile.id"
          :name="profile.id"
          class="column no-wrap flex-center"
        >
          <div class="text-center q-gutter-y-md">
            <AvatarIcon :image="profile.image" size="8em" />
            <div>
              <p class="text-h5">{{ profile.name }}</p>
            </div>
            <div>
              <p>
                <span v-show="profile.show_barthday">{{
                  profile.birthday
                }}</span>
              </p>
            </div>
            <div>
              <q-scroll-area style="height: 7em; width: 200px">
                <div style="overflow-wrap: break-word; width: 200px">
                  {{ profile.caption }}
                </div>
              </q-scroll-area>
            </div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn
        flat
        v-show="details.state == 'mine'"
        @click="onMyProfileSetting(slide)"
        >setting</q-btn
      >
      <q-btn flat v-show="details.state == 'accepted'">talk</q-btn>
      <q-btn flat v-show="details.state == 'unaccepted'|| details.state === 'not_friend'" @click="store.dispatch('room/addFriend')">add</q-btn>
      <q-btn
        flat
        v-show="details.state === 'unaccepted' || details.state === 'accepted'"
        >block</q-btn
      >
      <q-btn flat v-show="details.state === 'blocked'">unblock</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "ProfilePanel",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const profiles = ref(store.getters["room/getFocusedUser"].profiles);
    const slide = ref(store.getters["room/getFocusedUser"].top_profile_id);
    const details = ref(store.getters["room/getFocusedUser"].details);
    watch(
      () => ref(store.getters["room/getFocusedUser"]),
      () => {
        profiles.value = store.getters["room/getFocusedUser"].profiles;
        slide.value = store.getters["room/getFocusedUser"].top_profile_id;
        details.value = store.getters["room/getFocusedUser"].details;
      }
    );
    const onMyProfileSetting = (id) => {
      store.dispatch("profile/setCurrentProfileId", id);
      store.dispatch("state/switchProfilePanel", "my_setting");
    };

    return {
      store,
      profiles,
      slide,
      details,
      onMyProfileSetting,
    };
  },
});
</script>
<style>
.q-card__section--vert {
  padding: 0;
}
</style>
