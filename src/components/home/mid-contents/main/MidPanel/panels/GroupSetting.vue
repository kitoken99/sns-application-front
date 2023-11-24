<template>
  <q-scroll-area>
    <div
      class="column justify-center q-gutter-y-lg q-mx-auto"
      style="width: 265px"
    >
      <div class="text-center q-gutter-y-md q-mx-auto q-mt-lg">
        <div class="q-mx-auto" style="width: 8em; height: 8em">
          <q-btn style="width: 8em; height: 8em; border-radius: 50%">
            <label>
              <input type="file" @change="onImageUploaded" />
              <AvatarIcon
                v-if="preview == null"
                :image="group.image"
                size="8em"
              />
              <q-avatar v-if="preview != null" size="8em">
                <img :src="preview" />
              </q-avatar>
            </label>
          </q-btn>
        </div>

        <q-input
          filled
          v-model="group.name"
          label="name"
          style="width: 200px"
          class="q-mx-auto"
        />
        <div style="width: 200px" class="q-mx-auto">
          <q-input
            label="caption"
            v-model="group.caption"
            filled
            type="textarea"
            style="width: 200px"
          />
        </div>
        <q-btn
          push
          color="primary"
          label="Update Group"
          @click="onSubmit()"
          style="width: 200px"
        />
      </div>
      <div class="q-gutter-y-md q-mx-auto q-mt-lg">
        <p class="text-h6">Select Featured Profile</p>
        <p class="text-grey">Selected profile will be shown in this group</p>
        <div class="item-list q-mx-auto">
          <div
            v-for="profile in Object.values(
              store.getters['profile/getMyProfiles']
            )"
            v-bind:key="profile.id"
          >
            <q-item
              v-ripple
              clickable
              :active="
                profile.id === selected_profile_id ||
                profile.id === store.getters['profile/getMainProfileId']
              "
              @click="setSelectedProfileId(profile.id)"
              active-class="selected-item"
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
        <div class="q-mt-md q-px-md text-center">
          <q-btn
            push
            color="primary"
            label="Selected"
            style="width: 200px"
            @click="onSelected()"
          />
        </div>
      </div>
      <div class="q-gutter-y-md q-mt-lg">
        <p class="text-h6">Invite your friends</p>
        <q-scroll-area
          :style="{
            height: `${Math.min(500, verticalSize)}px`,
            width: '200px',
          }"
          class="q-mx-auto"
          ref="scrollArea"
        >
          <div
            v-for="friend in store.getters['friendship/getFriendsForGroup']"
            v-bind:key="friend.id"
            style="width: 200px"
          >
            <q-item
              v-ripple
              clickable
              :active="selected_friend_list[friend.user_id]"
              @click="switchSelectedFriend(friend.user_id)"
              active-class="selected-item"
            >
              <q-item-section avatar>
                <AvatarIcon :image="friend.image" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ friend.name }}</q-item-label>
              </q-item-section>
              <Transition>
                <q-item-section avatar>
                  <q-checkbox
                    v-model="selected_friend_list[friend.user_id]"
                    checked-icon="check"
                    unchecked-icon="none"
                    indeterminate-icon="none"
                  />
                </q-item-section>
              </Transition>
            </q-item>
          </div>
        </q-scroll-area>
        <div class="q-mt-md q-px-md text-center">
          <q-btn
            push
            color="primary"
            label="Selected"
            style="width: 200px"
            @click="onSelectedFriends()"
          />
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>
<script>
import { defineComponent, ref, watch, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "GroupSetting",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const file = ref(null);
    const preview = ref(null);
    const scrollArea = ref();
    const group = ref({ ...store.getters["group/getFocusedGroup"] });
    const selected_profile_id = ref(null);
    const selected_friend_list = ref([]);
    const verticalSize = ref(0);
    const setSelectedProfileId = (id) => {
      selected_profile_id.value = id;
    };
    const switchSelectedFriend = (id) => {
      selected_friend_list.value[id] = !selected_friend_list.value[id];
    };
    onMounted(() => {
      verticalSize.value = scrollArea.value.getScroll().verticalSize;
      console.log(scrollArea.value.getScroll());
      nextTick(() => {
        console.log(scrollArea.value.getScroll());
        console.log(scrollArea.value.getScroll().verticalSize);
      });
      console.log(scrollArea.value);
    });
    watch(
      () => store.getters["group/getFocusedGroup"],
      () => {
        group.value = { ...store.getters["group/getFocusedGroup"] };
        selected_profile_id.value = group.value.profile_ids[1];
        preview.value = null;
      }
    );
    watch(
      () => store.getters["friendship/getFriendsForGroup"],
      () => {
        const list = {};
        store.getters["friendship/getFriendsForGroup"].forEach((friend) => {
          list[friend.user_id] = false;
        });
        selected_friend_list.value = list;
      }
    );
    const onImageUploaded = (e) => {
      file.value = e.target.files[0];
      createImage(file.value);
    };
    const createImage = (image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        preview.value = reader.result;
      };
    };
    const onSubmit = async () => {
      const status = await store.dispatch("group/updateGroup", {
        file: file.value,
        name: group.value.name,
        caption: group.value.caption,
      });
      if (status == "200") {
        $q.notify({
          progress: true,
          color: "primary",
          message: "updated successfully",
          icon: "check",
        });
      } else {
        $q.notify({
          type: "negative",
          message: "failed to update",
        });
      }
    };
    const onSelected = async () => {
      store.dispatch("group/switchProfile", selected_profile_id.value);
    };
    const onSelectedFriends = async () => {
      const ids = [];
      Object.keys(selected_friend_list.value).forEach((key) => {
        if (selected_friend_list.value[key]) ids.push(key);
      });
      store.dispatch("group/inviteFriends", ids);
    };
    return {
      store,
      group,
      preview,
      file,
      selected_profile_id,
      selected_friend_list,
      scrollArea,
      verticalSize,
      onSelected,
      setSelectedProfileId,
      switchSelectedFriend,
      onSubmit,
      onSelectedFriends,
      onImageUploaded,
    };
  },
});
</script>
<style lang="scss">
.item-list {
  width: 200px;
}
.selected-item {
  color: black;
  background: $blue-1;
}
</style>
