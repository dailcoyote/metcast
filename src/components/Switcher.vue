<template>
  <div class="switcher__box">
    <div class="box row w100">
      <div :class="['w50 toggle-button justify-center center pointer active']">
        <span>{{ onState.value }}</span>
      </div>
      <div class="w50 toggle-button justify-center center pointer">
        <span>{{ offState.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Switcher",
  props: {
    onState: {
      value: String,
    },
    offState: {
      value: String,
    },
  },
  data() {
    return {
      checked: true,
    };
  },
});
</script>

<style>
.switcher__box {
  height: 30px;
  width: 116px;

  background: rgba(196, 196, 196, 0.42);
  border-radius: 23px;
}

.toggle-button {
  height: 26px;
  margin: 2px;
  background: transparent;
  border: none;
  border-radius: 23px;
}

.toggle-button > span {
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
}

.active {
  background: #2196f3 !important;
}

.active > span {
  color: #ffffff !important;
}
</style>