<template>
  <div class="box" @click="onAuth('google')">
    <img src="~assets/btn_google_light_normal_ios.svg" class="img" />
    <img src="~assets/btn_google_light_focus_ios.svg" class="img" />
    <img src="~assets/btn_google_light_pressed_ios.svg" class="img" />
  </div>
</template>
<script>
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "GoogleButton",
  props: {
    size: {
      type: String,
      default: "100px",
    },
  },
  setup(props) {
    const router = useRouter();
    const onAuth = (provider) => {
      axios
        .get(process.env.API + "/api/login/" + provider)
        .then((response) => {
          // ログインが成功したときの処理
          console.log(response.data.data);
          const LoginUrl = response.data.data.redirect_url;
          window.location.href = LoginUrl;
        })
        .catch((error) => {
          console.log(error.responsed);
          // エラーハンドリング
        });
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
