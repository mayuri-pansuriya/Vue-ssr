<template>
  <div class="search">
    <div class="container">
      <h1 class="search__heading">
        Making office space truly agile for tech companies
      </h1>
      <p class="search__subText">
        See how we provide the all-inclusive office space solution so that you
        can focus on growing your company.
      </p>
      <div class="search__fields">
        <div class="row no-gutters">
          <div class="col-md-4">
            <div class="search__field fieldFloating">
              <autocomplete
                @getLocation="getLocation"
                :isFromLanding="true"
                :isReadonly="false"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="search__field fieldFloating"
              v-click-outside="outsideClick"
            >
              <input
                type="number"
                max="500"
                min="1"
                placeholder=" "
                v-model="capacity"
                class="formControl validate_number"
                @click="isSlider = !isSlider"
              />
              <vue-slider
                v-if="isSlider"
                ref="slider"
                v-model="capacity"
                v-bind="options"
                :max="max"
                :min="min"
                class="formControl"
              ></vue-slider>
              <label class="fieldFloating__label">Capacity</label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="search__field fieldFloating">
              <datepicker
                ref="picker"
                @focusout.native="close"
                class="formControl"
                v-model="start_date"
                @focusin.native="getStartDate"
                :disabledDates="disabledDates"
              ></datepicker>
              <label class="fieldFloating__label">Start Date</label>
            </div>
          </div>
        </div>
      </div>
      <div class="search__bottom">
        <div class="row no-gutters">
          <div class="col-md-4">
            <button
              class="btn btn--blue w100"
              type="button"
              title="Get Started"
              @click="exploreSpace"
            >
              Get Started
            </button>
          </div>
          <div class="col-md-8">
            <div class="search__result">
              <span class="colorWhite">25</span> spaces starting at
              <span class="colorWhite">$1,134</span> monthly per person
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import autocomplete from "./AutoComplete";
import Vue from "vue";
import { getToken } from "../../utils/auth";
if (process.browser) {
  const Datepicker = require("vuejs-datepicker").default;
  const VueSlider = require("vue-slider-component");
  Vue.component("VueSlider", VueSlider);
  Vue.component("Datepicker", Datepicker);
}
export default {
  name: "Dashboard",
  components: {
    autocomplete
  },
  data() {
    return {
      capacity: null,
      min: 0,
      max: 500,
      start_date: null,
      location: null,
      isSlider: false,
      options: {
        dotSize: 14,
        width: "auto",
        height: 4,
        contained: false,
        direction: "ltr",
        data: null,
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        clickable: true,
        duration: 0.5,
        adsorb: false,
        lazy: false,
        tooltip: "focus",
        tooltipPlacement: "top",
        tooltipFormatter: void 0,
        useKeyboard: false,
        enableCross: true,
        fixed: false,
        minRange: void 0,
        maxRange: void 0,
        order: true,
        marks: false,
        dotOptions: void 0,
        process: true,
        dotStyle: void 0,
        railStyle: void 0,
        processStyle: void 0,
        tooltipStyle: void 0,
        stepStyle: void 0,
        stepActiveStyle: void 0,
        labelStyle: void 0,
        labelActiveStyle: void 0
      },
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      weekdays: ["M", "T", "W", "T", "F", "S", "S"]
    };
  },
  mounted() {
    var testarray = document.getElementsByClassName("vdp-datepicker");
    if (this.start_date) {
      testarray[0].classList.add("is-open-date");
    } else {
      testarray[0].classList.remove("is-open-date");
    }

    document
      .querySelector(".validate_number")
      .addEventListener("keypress", function(evt) {
        if (
          (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
          evt.which > 57
        ) {
          evt.preventDefault();
        }
      });
  },
  methods: {
    // onChange() {
    //   if (this.capacity > 500) {
    //     alert("you can select upto 500");
    //   }
    // },
    outsideClick() {
      this.isSlider = false;
    },
    removeClasss() {
      var body = document.body;
      body.classList.remove("is-modalOpen");
    },
    exploreSpace() {
      // if (!getToken()) {
      //   this.location = "";
      //   this.capacity = "";
      //   this.start_date = "";
      //   alert("please login first");
      // } else {
      if (
        !this.location == "" &&
        !this.capacity == "" &&
        !this.start_date == ""
      ) {
        if (this.start_date) {
          let year = this.start_date.getFullYear();
          let date = this.start_date.getDate();
          let month = this.start_date.getMonth() + 1;

          let startDate = year + "-" + month + "-" + date;

          this.$router.push({
            path: "list",
            query: {
              location: this.location,
              capacity: this.capacity,
              start_date: startDate
            }
          });
        }
        // } else {
        //   alert("please fill up data");
        // }
      }
    },
    getLocation(location) {
      this.location = location;
    },
    getStartDate() {
      var testarray = document.getElementsByClassName("vdp-datepicker");
      if (!this.$refs.picker.isOpen) {
        testarray[0].classList.add("is-open-date");
      } else {
        testarray[0].classList.remove("is-open-date");
      }
    },
    close() {
      var testarray = document.getElementsByClassName("vdp-datepicker");
      if (!this.$refs.picker.isOpen && !this.start_date) {
        testarray[0].classList.remove("is-open-date");
      } else {
        testarray[0].classList.add("is-open-date");
      }
    }
  }
};
</script>
