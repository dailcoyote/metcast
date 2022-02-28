<template>
  <div class="box">
    <div id="location_block" class="row">
      <img :src="icons.location" width="20" height="20" class="pointer" />
      <span>{{ title }}</span>
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
  <!-- Change Location Modal -->
  <Modal v-show="isChangeLocationModalVisible" :zindex="666" :minify="true">
    <template v-slot:header>
      <span>Change Location?</span>
    </template>

    <template v-slot:body>
      <div id="switch-location-form">
        <button type="button" class="action-btn" @click="() => {}">
          Use My Current Location
        </button>
        <button type="button" class="action-btn mt-2" @click="showSearchModal">
          Select location manually
        </button>
        <button
          type="button"
          class="rollback-btn mt-2"
          @click="closeChangeLocationModal"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>
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
      <div class="settings-location-section box row w100 px-15p">
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
      <div class="settings-unit-divider">
        <span>Location</span>
      </div>
      <div class="settings-unit-section">
        <div class="box row w100">
          <div class="w50">
            <span class="settings-unit-section__title">Current Location</span>
          </div>
          <div class="w50 justify-end">
            <span
              class="settings-unit-section__location pointer"
              @click="showChangeLocationModal"
            >
              {{ tempLocation }}
            </span>
          </div>
        </div>
      </div>
      <div class="settings-unit-divider">
        <span>Measure Units</span>
      </div>
      <form id="measures-form" v-if="displayMeasuresForm">
        <template
          v-for="(unitKey, j) in Object.keys(measureUnitsForm)"
          :key="j"
        >
          <div class="settings-unit-section border-bottom">
            <div class="box row w100">
              <div class="w50 box center">
                <span class="settings-unit-section__title">{{
                  measureUnitsForm[unitKey].title
                }}</span>
              </div>
              <div class="w50 justify-end">
                <Switch
                  :leftLabelSwitcher="
                    measureUnitsForm[unitKey].leftLabelSwitcher
                  "
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
        <button type="button" @click="applySettings">Apply Settings</button>
      </form>
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

const { TemperatureUnits, WindSpeedUnits, PressureUnits } = WeatherComposition;

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
    registerSettingsChangesFunc: Function,
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
    return {
      icons: {
        location,
        settings,
        grayClose,
        redClose,
      },
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
      isChangeLocationModalVisible: false,
      isSearchModalVisible: false,
      isSettingsModalVisible: false,
      displayMeasuresForm: false,
      selectedDetailLocation: undefined,
      locationDetailList: new Array(),
    };
  },
  computed: {
    title() {
      return this.defaultSettings?.location.replace(",", ", ");
    },
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
    isSettingsModalVisible(toggle) {
      if (toggle) {
        this.displayMeasuresForm = true;
      } else {
        this.displayMeasuresForm = false;
      }
    },
  },
  methods: {
    showChangeLocationModal() {
      this.isChangeLocationModalVisible = true;
    },
    closeChangeLocationModal() {
      this.isChangeLocationModalVisible = false;
    },
    showSettingsModal() {
      this.isSettingsModalVisible = true;
    },
    applySettings() {
      const { location, coord } = this.selectedDetailLocation || {};
      this.registerSettingsChangesFunc({
        location: location || this.defaultSettings.location,
        coord,
        temp: this.measureUnitsForm.temp.selected,
        wind: this.measureUnitsForm.wind.selected,
        pressure: this.measureUnitsForm.pressure.selected,
      });
      this.isSettingsModalVisible = false;
    },
    closeSettingsModal() {
      this.selectedDetailLocation = undefined;
      this.measureUnitsForm.temp.selected =
        this.defaultSettings.temp || TemperatureUnits.Celsius;
      this.measureUnitsForm.wind.selected =
        this.defaultSettings.windSpeed || WindSpeedUnits.MeterPerSec;
      this.measureUnitsForm.pressure.selected =
        this.defaultSettings.pressure || PressureUnits.Pascal;
      this.isSettingsModalVisible = false;
    },
    onLocationSelected(detail) {
      this.selectedDetailLocation = detail;
      this.searchTerm = "";
      this.closeSearchModal();
    },
    onMeasureChanged(unit, active) {
      console.log("measure changed", active);
      this.measureUnitsForm[unit].selected = active;
    },
    showSearchModal() {
      this.closeChangeLocationModal();
      this.isSearchModalVisible = true;
    },
    closeSearchModal() {
      this.isSearchModalVisible = false;
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

.border-bottom {
  border-bottom: 1px solid #a8abb4;
}

ul {
  list-style-type: none;
}

li {
  padding: 10px 25px 10px 25px;
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

.settings-location-section > div > h4 {
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */

  color: #000000;
}

.settings-location-section > div > button {
  border: none;
  display: block;
  background: transparent;
  padding: 0;
  outline: none;
  cursor: pointer;
  transition: 0.1s;
}

.settings-unit-section {
  padding: 16px 25px;
}

.settings-unit-section__title {
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  color: #000000;
}

.settings-unit-section__location {
  font-weight: 800;
  font-size: 14px;
  line-height: 21px;
  text-align: right;
  text-transform: uppercase;

  color: #2196f3;
}

.settings-unit-divider {
  background: #eceef2;
  padding: 9px 25px;
}

.settings-unit-divider > span {
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #a8abb4;
}

#measures-form > button {
  width: 325px;
  height: 50px;
  position: absolute;
  margin-top: 16px;
  margin-left: 25px;
  margin-right: 25px;
  /* padding: 16px 25px; */

  background: #0084d0;
  border: none;
  border-radius: 9px;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  /* identical to box height */

  text-align: center;

  color: #ffffff;
  cursor: pointer;
}

#switch-location-form {
  padding: 15px;
}

#switch-location-form > button {
  width: 330px;
  position: relative;
  background: transparent;

  font-size: 18px;
  line-height: 21px;

  text-align: center;
  cursor: pointer;
}

#switch-location-form > .action-btn {
  height: 50px;
  border: 1px solid #2196f3;
  box-sizing: border-box;
  border-radius: 9px;
  font-weight: 600;
  color: #2196f3;
}

#switch-location-form > .rollback-btn {
  border: none;
  font-weight: normal;
  color: #ff0c0c;
  margin-top: 22px;
}
</style>
