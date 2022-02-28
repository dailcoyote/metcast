<template>
  <div :class="['modal-backdrop', !minify && 'center']" :style="axisPosition">
    <div
      :class="['modal', minify && 'minify']"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <header class="modal-header" id="modalTitle">
        <slot name="header">
          <!-- This is the default tile!  -->
        </slot>
      </header>

      <section class="modal-body" id="modalDescription">
        <slot name="body">
          <!-- This is the default body! -->
        </slot>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    zindex: Number,
    minify: {
      type: Boolean,
      default: false
    }
  }, 
  computed: {
    axisPosition() {
      return `z-index: ${this.zindex}`
    }
  }
});
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 100vh;
}

.minify {
  width: 360px;
  height: 252px;
  border-radius: 12px !important;
  margin-top: 74px;
}

.modal-header {
  position: relative;
  padding: 21px 10px;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-around;
}

.modal-body {
  position: relative;
}
</style>