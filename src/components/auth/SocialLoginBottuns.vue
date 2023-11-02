<template>
  <div class="sns">
    <ul>
      <li><FacebookBottun size="50px" /></li>
      <li><GoogleBottun size="50px" /></li>
      <li><LineBottun size="50px" /></li>
    </ul>
  </div>
</template>
<script>
import LineBottun from "src/components/sns-btn/LineBottun.vue";
import GoogleBottun from "src/components/sns-btn/GoogleBottun.vue";
import FacebookBottun from "src/components/sns-btn/FacebookBottun.vue";
export default {
  name: "SocialLoginBottuns",
  components: { LineBottun, GoogleBottun, FacebookBottun },
};
</script>

<style>
ul {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
li {
  list-style: none;
  display: inline-block;
}
.sns {
  border-top: 1px solid gray;
}
</style>
