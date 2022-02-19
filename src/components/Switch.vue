<template>
  <div class="rocker-switch-container">
    <label class="rocker" @click.prevent="">
      <input type="checkbox" v-model="isChecked" ref="switch" v-bind="$attrs" />
      <span class="switch-left" @click="changeState('L', $event)">
        <span>{{ leftLabelSwitcher }}</span>
      </span>
      <span class="switch-right" @click="changeState('R', $event)">
        <span>{{ rightLabelSwitcher }}</span>
      </span>
    </label>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Switch",
  props: {
    leftLabelSwitcher: String,
    rightLabelSwitcher: String,
    activeSwitcher: String,
  },
  data() {
    return {
      isChecked: this.activeSwitcher === "L" || false,
      selected: this.activeSwitcher
    };
  },
  watch: {
    isChecked(isOn) {
      let state = {
        active: undefined,
      };
      if (isOn) {
        state.active = this.leftLabelSwitcher;
      } else {
        state.active = this.rightLabelSwitcher;
      }
      this.$emit("change", state);
    },
    selected(newCode) {
      console.log(newCode);
      this.$emit('change', newCode === 'L' ? this.leftLabelSwitcher : this.rightLabelSwitcher)
    }
  },
  methods: {
    changeState(selectedSwitcher, event = {}) {
      if (
        (selectedSwitcher === "L" && this.$refs.switch.checked) ||
        (selectedSwitcher === "R" && !this.$refs.switch.checked)
      ) {
        return;
      }
      this.selected = selectedSwitcher;
      this.isChecked = !this.isChecked;
      event.preventDefault();
    },
  },
});
</script>

<style scoped>
.rocker-switch-container {
  display: inline-block;
  --onColor: #0084d0;
  --activeColorLabel: #fff;
  --inactiveColorLabel: #333;
}
.rocker {
  display: inline-block;
  position: relative;
  background: rgba(196, 196, 196, 0.42);
  border-radius: 23px;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: var(--inactiveColorLabel);
  height: 30px;
  padding: 2px 0;
  width: 116px;
  overflow: hidden;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
}
.rocker-switch-container .rocker::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 0;
}
.rocker-switch-container .rocker input {
  opacity: 0;
  width: 0;
  height: 0;
}
.rocker-switch-container .switch-left,
.rocker-switch-container .switch-right {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 26px;
  margin: 2px;
  transition: 0.2s;
  border-radius: 23px;
}
.rocker-switch-container .switch-left {
  bottom: 0;
  background-color: #ddd;
}
.rocker-switch-container .switch-right {
  right: 0em;
  bottom: 0;
  background-color: var(--onColor);
  color: var(--activeColorLabel);
}
.rocker-switch-container input:checked + .switch-left {
  background-color: var(--onColor);
  color: var(--activeColorLabel);
  bottom: 0px;
  width: 54px;
  height: 26px;
  margin: 2px;
}
.rocker-switch-container input:checked + .switch-left + .switch-right {
  background-color: #ddd;
  color: var(--inactiveColorLabel);
}
</style>