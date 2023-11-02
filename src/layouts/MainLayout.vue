<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        class="bg-light-green window-height window-width row justify-center items-center"
      >
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
})
</script>

