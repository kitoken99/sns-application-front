<template>
  <div style="display: flex; align-items: center">
    <div class="text-center q-gutter-y-md q-mx-auto">
      <AvatarIcon :image="profile.image" size="8em" />
      <div style="margin: 0 28px 0 0">
        <q-toggle
          v-model="profile.show_barthday"
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
    const profile = ref({ ...store.getters["profile/getCurrentProfile"] });
    if (profile.value.show_barthday == 1) profile.value.show_barthday = true;
    else profile.value.show_barthday = false;
    watch(
      () => store.getters["profile/getCurrentProfile"],
      () => {
        profile.value = { ...store.getters["profile/getCurrentProfile"] };
        if (profile.value.show_barthday == 1)
          profile.value.show_barthday = true;
        else profile.value.show_barthday = false;
      }
    );
    const onSubmit = async () => {
      const status = await store.dispatch(
        "profile/updateProfile",
        profile.value
      );
      if (status == "201") {
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
      profile,
      onSubmit,
    };
  },
});
</script>
<style type="text/scss"></style>
