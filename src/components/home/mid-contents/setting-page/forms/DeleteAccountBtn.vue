<template>
  <p class="text-h6">Delete your account</p>
  <div class="row justify-center q-mb-xl">
    <q-btn
        push
        label="Delete this Account"
        class="q-mt-md"
        color="negative"
        style="width: 250px"
        @click="confirm = true"
      >
      </q-btn>
      <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="priority_high" color="negative" text-color="white" />
          <div class="q-ml-md">
          <div class="text-weight-bold">Are you sure?</div>
          <div class="text-grey">You can not use this account anymore</div>
        </div>
        </q-card-section>
        <q-card-actions align="right">

          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete this account" color="negative" v-close-popup @click="onDelete"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref} from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "DeleteAccountBtn",
  setup() {
    const store = useStore();
    const confirm =  ref(false);
    const onDelete = () => {
      store.dispatch("user/deleteAccount");
    };
    return {
      confirm,
      onDelete,
    };
  },
});
</script>
<style></style>
