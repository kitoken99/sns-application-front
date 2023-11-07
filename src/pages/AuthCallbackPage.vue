<template>
  <div></div>
</template>

<script>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "AuthCallbackPage",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const q = useQuasar();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.API + "/api/login/" + route.params.provider + "/callback",
          { params: route.query }
        );
        if (response.status == 201) {
          store.dispatch("auth/saveToken", response.data.token);
          q.loading.hide();
          router.push("/");
        }
      } catch (error) {
        q.loading.hide();
        router.push("/login");
      }
    };

    // fetchDataをコンポーネントのsetup内で呼び出す
    q.loading.show({
      message: "Authorizing. Please wait...",
      boxClass: "bg-grey-2 text-grey-9",
      spinnerColor: "primary",
    });
    fetchData();
  },
};
</script>
