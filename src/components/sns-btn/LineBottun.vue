<template>
  <div class="box" @click="onAuth('line')">
    <div class="mouseover">
      <img src="https://front-ec3xmagbl-kitoken99s-projects.vercel.app/assets/btn_base.png" class="img" />
    </div>
    <img src="src/assets/btn_press.png" class="img" />
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "LineButton",
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
.mouseover {
  position: absolute;
  height: v-bind(size);
  width: v-bind(size);
  border-radius: 20%;
  background-color: #000000;
  display: inline-block;
}
.img:hover {
  opacity: 90%;
}
.box:active {
  .img {
    visibility: hidden;
  }
  .img:last-child {
    visibility: visible;
  }
}
</style>
