<template>
  <div class="box">
    <div id="location_block" class="row">
      <img
        :src="icons.location"
        width="20"
        height="20"
        class="pointer"
        @click="showModal"
      />
      <span>{{ location }}</span>
    </div>
    <div id="settings__block">
      <img
        :src="icons.settings"
        width="24"
        height="24"
        class="pointer"
        @click="showModal"
      />
    </div>
  </div>
  <Modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <form>
        <input type="text" placeholder=" " />
        <button type="reset">
          <!-- &times; -->
          <img :src="icons.grayClose" width="22" height="22" />
        </button>
      </form>
    </template>

    <template v-slot:body> This is a new modal body. </template>
  </Modal>
</template>

<script>
import { defineComponent } from "vue";

import Modal from "./Modal.vue";
import location from "../assets/location.png";
import settings from "../assets/settings.png";
import grayClose from "../assets/gray_close.png";

export default defineComponent({
  name: "WeatherLocation",
  props: {
    location: String,
  },
  components: {
    Modal,
  },
  data() {
    return {
      icons: {
        location,
        settings,
        grayClose,
      },
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
});
</script>

<style scoped>
#location_block {
  width: 328px;
  display: flex;
  justify-content: center;
}
#settings__block {
  width: 24px;
}

#location_block > img {
  margin-right: 2px;
}
#location_block > span {
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
}

form {
  position: relative;
  width: 350px;
}

form input {
  background: #eceef2;
  width: 100%;
  height: 41px;
  padding: 11px 26px;
  box-sizing: border-box;
  border-radius: 7px;
  border: none;
}

form input:placeholder-shown + button {
  opacity: 0;
  pointer-events: none;
}

form button {
  position: absolute;
  border: none;
  display: block;
  width: 32px;
  height: 32px;
  line-height: 16px;
  font-size: 12px;
  border-radius: 50%;
  top: 0;
  bottom: 0;
  right: 5px;
  margin: auto;
  background: transparent;
  padding: 0;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
}
</style>
