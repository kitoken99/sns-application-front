<template>
  <button @click="emit('onAuth')" class="button">Twitter</button>
</template>
<script>
export default {
  name: "TwitterButton",
  setup(props, { emit }) {
    // setup 関数内で emit を取得
    return {
      emit,
    };
  },
};
</script>
<style lang="scss" scoped>
.button {
  padding-left: 2px;
  padding-right: 2px;
  display: inline-block;
  border: 2px solid rgb(255, 194, 64);
  background: linear-gradient(to bottom, rgb(255, 244, 92), rgb(240, 229, 86));
}
</style>
