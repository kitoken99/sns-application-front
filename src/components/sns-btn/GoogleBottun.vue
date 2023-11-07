<template>
  <div class="box" @click="onAuth('google')">
    <img src="~assets/btn_google_light_normal_ios.svg" class="img" />
    <img src="~assets/btn_google_light_focus_ios.svg" class="img" />
    <img src="~assets/btn_google_light_pressed_ios.svg" class="img" />
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "GoogleButton",
  props: {
    size: {
      type: String,
      default: "100px",
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const onAuth = (provider) => {
      store.dispatch("auth/socialAuth", provider);
    };
    return {
      router,
      onAuth,
    };
  },
};
</script>
<style lang="scss" scoped>
.box {
  cursor: pointer;
  height: v-bind(size);
  width: v-bind(size);
  position: ralative;
}
.img {
  height: v-bind(size);
  width: v-bind(size);
  position: absolute;
  visibility: hidden;
}
.img:first-child {
  visibility: visible;
}
.box:hover {
  .img {
    visibility: hidden;
  }
  .img:nth-child(2) {
    visibility: visible;
  }
}
.box:active {
  .img {
    visibility: hidden;
  }
  .img:nth-child(3) {
    visibility: visible;
  }
}
</style>
