<template>
    <q-btn
      push
      label="Delete this Profile"
      color="negative"
      style="width: 200px"
      @click="confirm = true"
    >
    </q-btn>
    <q-dialog v-model="confirm" persistent>
      <q-card class="q-pa-md">
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="negative" text-color="white" />
          <div class="q-ml-md">
            <div class="text-weight-bold">Are you sure?</div>
            <div class="text-grey">You can not use this profile anymore</div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete this profile"
            color="negative"
            v-close-popup
            @click="onDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "DeleteProfileBtn",
  setup() {
    const store = useStore();
    const confirm = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const onDelete = async () => {
      const status = await store.dispatch("profile/deleteProfile");
      if (status == "201") {
        $q.notify({
          progress: true,
          color: "primary",
          message: "Create password successfully",
          icon: "check",
        });
      } else {
        $q.notify({
          type: "negative",
          message: "failed to delete profile",
        });
      }
    };
    return {
      confirm,
      onDelete,
    };
  },
});
</script>
<style></style>
