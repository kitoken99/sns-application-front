<template>
  <div class="box" @click="onAuth('facebook')">
    <div class="mouseover">
      <img src="~/assets/Facebook_Logo_Primary.png" class="img" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: "FacebookButton",
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
}
.mouseover {
  position: absolute;
  height: v-bind(size);
  width: v-bind(size);
  border-radius: 50%;
  background-color: #000000;
  display: inline-block;
}
.img:hover {
  opacity: 90%;
}
.img:active {
  opacity: 70%;
}
</style>
