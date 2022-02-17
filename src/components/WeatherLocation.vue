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
        <input type="text" placeholder=" " v-model="searchTerm" />
        <button type="reset" @click="clearSearchRef">
          <img :src="icons.grayClose" width="22" height="22" />
        </button>
      </form>
    </template>

    <template v-slot:body>
      <ul>
        <li
          v-for="(location, i) in locationList"
          :key="location.name + i"
          class="pointer hover:bg-gray-light"
        >
          {{ location.name }}, {{ location.country }}
        </li>
      </ul>
    </template>
  </Modal>
</template>

<script>
import { defineComponent, ref } from "vue";

import Modal from "./Modal.vue";
import location from "../assets/location.png";
import settings from "../assets/settings.png";
import grayClose from "../assets/gray_close.png";

export default defineComponent({
  name: "WeatherLocation",
  props: {
    location: String,
    suggestionsFunc: Function,
  },
  components: {
    Modal,
  },
  setup() {
    let searchTerm = ref("");

    return {
      searchTerm,
    };
  },
  data() {
    return {
      icons: {
        location,
        settings,
        grayClose,
      },
      isModalVisible: false,
      locationList: new Array(),
    };
  },
  watch: {
    searchTerm(newTerms) {
      this.clearSearchRef();

      if (newTerms && newTerms.length >= 3) {
        console.log(newTerms);
        let ret = this.suggestionsFunc(newTerms);
        console.log(ret);
        this.locationList = [...ret];
      }
    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    clearSearchRef() {
      this.locationList = [];
    }
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

ul {
  list-style-type: none;
  margin: 0 15px;
}

li {
  margin-bottom: 20px;
  /* font-weight: bold; */
  font-size: 18px;
  line-height: 38px;

  color: #000000;
}

form {
  position: relative;
  width: 350px;
}

form input {
  background: #eceef2;
  width: 100%;
  height: 41px;
  padding: 11px 15px;
  box-sizing: border-box;
  border-radius: 7px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  line-height: 38px;
  /* identical to box height */

  color: #000000;
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
