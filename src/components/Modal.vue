<template>
  <div class="modal-backdrop" :style="axisPosition">
    <div
      class="modal"
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
    zindex: Number
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
  align-items: center;
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

.modal-header {
  position: relative;
  padding: 21px 10px;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-body {
  position: relative;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
</style>