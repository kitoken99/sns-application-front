<template>
  <q-scroll-area>
    <div>
      <div class="column items-center q-mb-lg">
        <p class="text-h6">Select Featured Profile</p>
        <p class="text-grey">Selected profile will be shown in this app</p>
        <div class="permitted-profile-list">
          <div
            v-for="profile in Object.values(
              store.getters['profile/getFocusedUser'].profiles
            )"
            v-bind:key="profile.id"
          >
            <q-item
              v-ripple
              clickable
              :active="profile.id === selected_profile_id"
              @click="setSelectedProfileId(profile.id)"
              active-class="selected-profile"
            >
              <q-item-section avatar>
                <AvatarIcon :image="profile.image" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ profile.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div class="q-mt-md q-px-md">
          <q-btn
            push
            color="primary"
            label="Selected"
            style="width: 150px"
            @click="onSelected()"
          />
        </div>
      </div>

      <div class="column items-center">
        <p class="text-h6">Select Permitted Profile</p>
        <p class="text-grey">This Friend can see your selected profile</p>
        <div class="permitted-profile-list">
          <div
            v-for="profile in store.getters['profile/getMyProfiles']"
            v-bind:key="profile.id"
          >
            <q-item
              v-ripple
              :clickable="!profile.is_main "
              :active="permitted_profile_list[profile.id]"
              @click="switchPermittedProfileId(profile.id)"
              active-class="selected-profile"
            >
              <q-item-section avatar>
                <AvatarIcon :image="profile.image" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ profile.name }}</q-item-label>
                <q-item-label caption lines="2">
                  {{ profile.account_type }}
                </q-item-label>
              </q-item-section>
              <Transition>
                <q-item-section avatar>
                  <q-checkbox
                    v-model="permitted_profile_list[profile.id]"
                    checked-icon="check"
                    unchecked-icon="none"
                    indeterminate-icon="none"
                  />
                </q-item-section>
              </Transition>
            </q-item>
          </div>
        </div>
        <div class="q-mt-md q-px-md">
          <q-btn
            push
            color="primary"
            label="Selected"
            style="width: 150px"
            @click="onClick()"
          />
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "FriendSetting",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const permitted_profile_list = ref(
      store.getters["friendship/getPermittedProfileList"]
    );
    const selected_profile_id = ref(
      store.getters["profile/getFocusedUser"].top_profile_id
    );
    const setSelectedProfileId = (id) => {
      selected_profile_id.value = id;
    };
    const switchPermittedProfileId = (id) => {
      if (Object.keys(permitted_profile_list)[0] != id) {
        permitted_profile_list.value[id] = !permitted_profile_list.value[id];
      }
    };
    const onSelected = () => {
      store.dispatch("friendship/featuredProfile", selected_profile_id.value);
    };
    const onClick = () => {
      store.dispatch("friendship/permitProfile", permitted_profile_list.value);
    };
    watch(
      () => ref(store.getters["profile/getFocusedUser"]),
      () => {
        selected_profile_id.value =
          store.getters["profile/getFocusedUser"].top_profile_id;
      }
    );
    watch(
      () => store.getters["friendship/getPermittedProfileList"],
      () => {
        permitted_profile_list.value =
          store.getters["friendship/getPermittedProfileList"];
      }
    );
    return {
      store,
      permitted_profile_list,
      selected_profile_id,
      setSelectedProfileId,
      switchPermittedProfileId,
      onSelected,
      onClick,
    };
  },
});
</script>
<style lang="scss">
.permitted-profile-list {
  width: 250px;
}
.text-grey {
  color: $grey;
}
.selected-profile {
  color: black;
  background: $blue-1;
}
</style>
