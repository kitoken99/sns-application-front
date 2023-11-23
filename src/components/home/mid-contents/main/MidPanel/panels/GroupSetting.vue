<template>
  <q-scroll-area>
    <div class="column justify-center q-gutter-y-lg">


      <div class="text-center q-gutter-y-md q-mx-auto q-mt-lg">

        <div class="q-mx-auto" style="width: 8em; height: 8em;">
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
      <div class="text-center">

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
  name: "GroupSetting",
  components: {
    AvatarIcon,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const file = ref(null);
    const preview = ref(null);
    const group = ref({ ...store.getters["group/getFocusedGroup"] });
    watch(
      () => store.getters["group/getFocusedGroup"],
      () => {
        group.value = { ...store.getters["group/getFocusedGroup"] };
        preview.value = null;
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
    return {
      store,
      group,
      preview,
      file,
      onSubmit,
      onImageUploaded,
    };
  },
});
</script>
<style type="text/scss"></style>
