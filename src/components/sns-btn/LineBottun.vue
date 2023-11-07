<template>
  <div class="box" @click="onAuth('line')">
    <div class="mouseover">
      <img src="~assets/btn_base.png" class="img" />
    </div>
    <img src="~assets/btn_press.png" class="img" />
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "LineButton",
  props: {
    size: {
      type: String,
      default: "100px",
    },
  },
  setup() {
    const store = useStore();
    const onAuth = (provider) => {
      store.dispatch("auth/socialAuth", provider);
    };
    return {
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
