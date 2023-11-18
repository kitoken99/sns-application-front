<template>
  <q-scroll-area>
    <div style="display: flex; align-items: center">
      <div class="text-center q-gutter-y-md q-mx-auto q-mt-lg">
        <div style="width: 8em; height: 8em; margin: 0 auto">
          <q-btn style="width: 8em; height: 8em; border-radius: 50%">
            <label>
              <input type="file" @change="onImageUploaded" />
              <AvatarIcon
                v-if="preview == null"
                :image="profile.image"
                size="8em"
              />
              <q-avatar v-if="preview != null" size="8em">
                <img :src="preview" />
              </q-avatar>
            </label>
          </q-btn>
        </div>

        <div style="margin: 0 28px 0 0">
          <q-toggle
            v-model="profile.show_birthday"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            style="display: inline-block"
            :disable="!profile.birthday"
          />
          {{ profile.birthday }}
          <q-btn
            v-show="!profile.birthday"
            flat
            color="primary"
            label="set your birthday"
            @click="store.dispatch('state/switchMiddleContent', 'setting')"
          />
        </div>
        <q-input
          filled
          v-model="profile.name"
          label="name"
          style="width: 200px"
          class="q-mt-none q-mx-auto"
        />
        <q-input
          filled
          v-model="profile.account_type"
          label="what for?"
          style="width: 200px"
          class="q-mx-auto"
        />
        <div style="width: 200px" class="q-mx-auto">
          <q-input
            label="caption"
            v-model="profile.caption"
            filled
            type="textarea"
            style="width: 200px"
          />
        </div>
        <q-btn
          push
          color="primary"
          label="Update Profile"
          @click="onSubmit()"
          style="width: 200px"
        />
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import AvatarIcon from "src/components/home/icons/AvatarIcon.vue";
export default defineComponent({
  name: "MyProfileSetting",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const file = ref(null);
    const preview = ref(null);
    const profile = ref({ ...store.getters["profile/getCurrentProfile"] });
    if (profile.value.show_birthday == 1) profile.value.show_birthday = true;
    else profile.value.show_birthday = false;
    watch(
      () => store.getters["profile/getCurrentProfile"],
      () => {
        profile.value = { ...store.getters["profile/getCurrentProfile"] };
        if (profile.value.show_birthday == 1)
          profile.value.show_birthday = true;
        else profile.value.show_birthday = false;
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
      const status = await store.dispatch("profile/updateProfile", {
        file: file.value,
        name: profile.value.name,
        show_birthday: profile.value.show_birthday,
        account_type: profile.value.account_type,
        caption: profile.value.caption,
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
    return {
      store,
      profile,
      preview,
      file,
      onSubmit,
      onImageUploaded,
    };
  },
});
</script>
<style type="text/scss"></style>
