<template>
  <div
    class="q-pa-md q-mx-auto q-gutter-y-md column"
    style="width: 300px; margin: 0 auto"
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
            icon="img:src/assets/account_box_FILL0_wght400_GRAD0_opsz24.svg"
          />
          <q-avatar v-if="preview != null" size="100px">
            <img :src="preview" />
          </q-avatar>
        </label>
      </q-btn>
    </div>
    <q-input filled v-model="name" label="name" />
    <q-input filled v-model="account_type" label="what for?" />
    <q-input label="caption" v-model="caption" filled autogrow />
    <q-btn
      push
      color="primary"
      label="Create new Profile"
      @click="onSubmit()"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "AddProfile",
  setup() {
    const name = ref(null);
    const caption = ref(null);
    const account_type = ref(null);
    const file = ref(null);
    const preview = ref(null);
    const store = useStore();
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
    const onSubmit = () => {
      store
        .dispatch("profile/createProfile", {
          file: file.value,
          name: name.value,
          account_type: account_type.value,
          caption: caption.value,
        })
        .then(() => {
          name.value = null;
          caption.value = null;
          account_type.value = null;
          file.value = null;
          preview.value = null;
        });
    };
    return {
      name,
      caption,
      account_type,
      file,
      preview,
      store,
      onImageUploaded,
      onSubmit,
    };
  },
});
</script>
<style>
.add-profile {
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

input[type="file"] {
  display: none;
}
.q-btn {
  padding: 0;
}
</style>
