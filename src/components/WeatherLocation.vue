<template>
  <div class="box">
    <div id="location_block" class="row">
      <img :src="icons.location" width="20" height="20" class="pointer" />
      <span>{{ defaultSettings.location }}</span>
    </div>
    <div id="settings__block">
      <img
        :src="icons.settings"
        width="24"
        height="24"
        class="pointer"
        @click="showSettingsModal"
      />
    </div>
  </div>
  <!-- Search Modal -->
  <Modal v-show="isSearchModalVisible" @close="closeSearchModal" :zindex="777">
    <template v-slot:header>
      <form id="search-box">
        <input type="text" placeholder=" " v-model="searchTerm" />
        <button type="reset" @click="clearSearchRef">
          <img :src="icons.grayClose" width="22" height="22" />
        </button>
      </form>
    </template>

    <template v-slot:body>
      <ul>
        <li
          v-for="rec in locationDetailList"
          :key="rec.id"
          class="pointer"
          @click="onLocationSelected(rec)"
        >
          <span v-html="rec.htmlFormat"></span>
        </li>
      </ul>
    </template>
  </Modal>
  <!--  Settings Modal -->
  <Modal v-show="isSettingsModalVisible" :zindex="555">
    <template v-slot:header>
      <div class="settings-section box row w100 px-15p">
        <div class="w50">
          <h4 class="settings-title">Settings</h4>
        </div>
        <div class="w50 justify-end">
          <button @click="closeSettingsModal">
            <img :src="icons.redClose" width="22" height="22" />
          </button>
        </div>
      </div>
    </template>

    <template v-slot:body>
      <div class="settings-unit-start">
        <span>Location</span>
      </div>
      <div class="unit-section">
        <div class="box row w100">
          <div class="w50">
            <span class="unit-section_title">Current Location</span>
          </div>
          <div class="w50 justify-end">
            <span
              class="unit-section_location pointer"
              @click="showSearchModal"
            >
              {{ tempLocation }}
            </span>
          </div>
        </div>
      </div>
      <div class="settings-unit-start">
        <span>Measure Units</span>
      </div>
      <template v-for="unitKey in Object.keys(measureUnitsForm)" :key="unitKey">
        <div class="unit-section border-bottom">
          <div class="box row w100">
            <div class="w50 box center">
              <span class="unit-section_title">{{
                measureUnitsForm[unitKey].title
              }}</span>
            </div>
            <div class="w50 justify-end">
              <Switch
                :leftLabelSwitcher="measureUnitsForm[unitKey].leftLabelSwitcher"
                :rightLabelSwitcher="
                  measureUnitsForm[unitKey].rightLabelSwitcher
                "
                :activeSwitcher="
                  measureUnitsForm[unitKey].selected ===
                  measureUnitsForm[unitKey].leftLabelSwitcher
                    ? 'L'
                    : 'R'
                "
                @change="
                  (v) => {
                    onMeasureChanged(unitKey, v);
                  }
                "
              />
            </div>
          </div>
        </div>
      </template>
    </template>
  </Modal>
</template>

<script>
import { defineComponent, ref } from "vue";
import WeatherComposition from "../types/WeatherComposition";

import Modal from "./Modal.vue";
import Switch from "./Switch.vue";
import location from "../assets/location.png";
import settings from "../assets/settings.png";
import grayClose from "../assets/gray_close.png";
import redClose from "../assets/close.png";

export default defineComponent({
  name: "WeatherLocation",
  props: {
    defaultSettings: {
      location: String,
      temp: String,
      wind: String,
      pressure: String,
    },
    applySuggestionsFunc: Function,
  },
  components: {
    Modal,
    Switch,
  },
  setup() {
    let searchTerm = ref("");

    return {
      searchTerm,
    };
  },
  data() {
    const { TemperatureUnits, WindSpeedUnits, PressureUnits } =
      WeatherComposition;
    return {
      icons: {
        location,
        settings,
        grayClose,
        redClose,
      },
      selectedDetailLocation: undefined,
      measureUnitsForm: {
        temp: {
          title: "Temperature",
          leftLabelSwitcher: TemperatureUnits.Celsius,
          rightLabelSwitcher: TemperatureUnits.Fahrenheit,
          selected: this.defaultSettings.temp || TemperatureUnits.Celsius,
        },
        wind: {
          title: "Wind Speed",
          leftLabelSwitcher: WindSpeedUnits.MeterPerSec,
          rightLabelSwitcher: WindSpeedUnits.MilesPerHour,
          selected:
            this.defaultSettings.windSpeed || WindSpeedUnits.MeterPerSec,
        },
        pressure: {
          title: "Pressure",
          leftLabelSwitcher: PressureUnits.MillimetreOfMercury,
          rightLabelSwitcher: PressureUnits.Pascal,
          selected: this.defaultSettings.pressure || PressureUnits.Pascal,
        },
      },
      isSearchModalVisible: false,
      isSettingsModalVisible: false,
      locationDetailList: new Array(),
    };
  },
  computed: {
    tempLocation() {
      return (
        this.selectedDetailLocation?.location || this.defaultSettings.location
      );
    },
  },
  watch: {
    searchTerm(newTerms) {
      this.clearSearchRef();

      if (newTerms && newTerms.length >= 3) {
        this.locationDetailList = [...this.applySuggestionsFunc(newTerms)];
      }
    },
  },
  methods: {
    showSettingsModal() {
      this.isSettingsModalVisible = true;
    },
    closeSettingsModal() {
      this.isSettingsModalVisible = false;
    },
    showSearchModal() {
      this.isSearchModalVisible = true;
    },
    closeSearchModal() {
      this.isSearchModalVisible = false;
    },
    onLocationSelected(detail) {
      this.selectedDetailLocation = detail;
      this.searchTerm = "";
      // this.registerCurrentLocationFunc(location);
      // this.updateForecastWeatherFunc(coord);
      this.closeSearchModal();
    },
    onMeasureChanged(unit, { active }) {
      this.measureUnitsForm[unit].selected = active;
    },
    clearSearchRef() {
      this.locationDetailList = [];
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

.settings-section > div > h4 {
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  color: #000000;
}

.settings-section > div > button {
  border: none;
  display: block;
  background: transparent;
  padding: 0;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
}

.settings-unit-start {
  background: #eceef2;
  padding: 9px 25px;
}

.settings-unit-start > span {
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #a8abb4;
}

.unit-section {
  padding: 16px 25px;
}

.unit-section_title {
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #000000;
}

.unit-section_location {
  font-weight: 800;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  text-transform: uppercase;

  color: #2196f3;
}

.border-bottom {
  border-bottom: 1px solid #a8abb4;
}

ul {
  list-style-type: none;
}

li {
  padding: 10px 15px 10px 15px;
}

ul > li:hover {
  background: #eceef2;
}

ul > li > span {
  font-size: 18px;
  line-height: 38px;
}

#search-box {
  position: relative;
  width: 350px;
}

#search-box > input {
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

#search-box > input:placeholder-shown + button {
  opacity: 0;
  pointer-events: none;
}

#search-box > button {
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
