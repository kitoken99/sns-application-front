<template>
  <q-scroll-area :thumb-style="thumbStyle" style="height: 100%; width: 100%">
    <q-stepper
      v-model="step"
      vertical
      header-nav
      color="primary"
      animated
      style="height: 100%; width: 100%"
    >
      <q-step
        :name="1"
        title="Select your profile"
        caption="It will be shown in this group"
        icon="arrow_selector_tool"
        :done="step > 1"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          style="width: 100%; height: 300px"
        >
          <div
            v-for="profile in store.getters['profile/getProfiles']"
            v-bind:key="profile.id"
          >
            <q-item
              v-ripple
              clickable
              :active="profile.id === selected_profile_id"
              @click="setSelectedProfileId(profile.id)"
              active-class="selected-profile"
              class="item-style"
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
            </q-item>
          </div>
        </q-scroll-area>
        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Selected" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        header-nav
        title="Invite your friends"
        icon="group_add"
        :done="step > 2"
      >
        <q-scroll-area
          :thumb-style="thumbStyle"
          style="width: 100%; height: 300px"
        >
          <div
            v-for="friend in store.getters['room/getFriends']"
            v-bind:key="friend.id"
          >
            <q-item
              v-ripple
              clickable
              :active="selected_friend_list[friend.user_id]"
              @click="switchSelectedFriend(friend.user_id)"
              active-class="selected-friend"
              class="item-style"
            >
              <q-item-section avatar>
                <AvatarIcon :image="friend.image" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ friend.name }}</q-item-label>
                <q-item-label caption lines="2">
                  {{ friend.account_type }}
                </q-item-label>
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
        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Invite" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step :name="3" header-nav title="Input group info" icon="edit_note">
        <div
          class="q-pa-md q-mx-auto q-gutter-y-md column"
        >
          <div style="width: 100px; height: 100px; margin: 0 auto">
            <q-btn style="width: 100px; height: 100px; border-radius: 50%">
              <label>
                <input type="file" @change="onImageUploaded" />
                <q-avatar
                  v-if="preview == null"
                  size="100px"
                  font-size="52px"
                  color="grey-3"
                  text-color="white"
                  icon="directions"
                />
                <q-avatar v-if="preview != null" size="100px">
                  <img :src="preview" />
                </q-avatar>
              </label>
            </q-btn>
          </div>
          <q-input filled v-model="name" label="group name" />
          <q-input label="caption" v-model="caption" filled autogrow />
        </div>
        <q-stepper-navigation>
          <q-btn color="primary" label="Create" @click="onCreate"/>
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-scroll-area>
</template>

<script>
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddFriend",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const step = ref(1);
    const selected_profile_id = ref(
      store.getters["profile/getCurrentProfileId"]
    );
    const selected_friend_list = ref([]);
    const name = ref(null);
    const caption = ref(null);
    const file = ref(null);
    const preview = ref(null);
    const setSelectedProfileId = (id) => {
      selected_profile_id.value = id;
    };
    const switchSelectedFriend = (id) => {
      selected_friend_list.value[id] = !selected_friend_list.value[id];
      console.log(selected_friend_list.value);
    };
    watch(
      () => store.getters["room/getFriends"],
      () => {
        const list = {};
        store.getters["room/getFriends"].forEach((friend) => {
          list[friend.user_id] = false;
        });
        selected_friend_list.value = list;
      }
    );
    watch(
      () => store.getters["profile/getCurrentProfileId"],
      () => {
        selected_profile_id.value =
          store.getters["profile/getCurrentProfileId"];
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
    const onCreate = () => {
      const ids = [];
      Object.keys(selected_friend_list.value).forEach(key => {
        if(selected_friend_list.value[key])
          ids.push(key);
      });
      store
        .dispatch("group/createGroup", {
          file: file.value,
          name: name.value,
          caption: caption.value,
          profile_id: selected_profile_id.value,
          ids: ids,
        })
        .then(() => {
          // name.value = null;
          // caption.value = null;
          // file.value = null;
          // preview.value = null;
        });
    };
    return {
      step,
      selected_profile_id,
      selected_friend_list,
      setSelectedProfileId,
      switchSelectedFriend,
      store,
      name,
      caption,
      file,
      preview,
      onImageUploaded,
      onCreate,
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: "0.75",
      },
    };
  },
});
</script>
<style lang="scss">
.selected-profile {
  color: black;
  background: $blue-1;
}
.item-style {
  border-radius: 10px;
}
</style>
