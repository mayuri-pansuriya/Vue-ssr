<template>
  <div id="wrapper">
    <div class="loader" v-if="loading"></div>
    <main class="content" v-show="!loading">
      <div class="container-fluid">
        <div class="search__fields search__fields--innerPage">
          <div class="row">
            <div class="col-xl-2 col-md-6">
              <div class="fieldFloating">
                <autocomplete
                  :location-data="location"
                  @getLocation="getLocation"
                  :isFromLanding="false"
                  :isReadonly="true"
                />
              </div>
            </div>
            <div class="col-xl-2 col-md-6" v-click-outside="hideSlider">
              <div class="fieldFloating">
                <input
                  type="text"
                  placeholder=" "
                  v-model="capacity"
                  class="formControl"
                  readonly
                />
                <!-- <vue-slider
                  v-if="isSlider"
                  ref="slider"
                  v-model="capacity"
                  v-bind="options"
                  :max="max"
                  :min="min"
                  class="formControl"
                ></vue-slider> -->
                <label class="fieldFloating__label">Capacity</label>
              </div>
            </div>
            <div class="col-xl-2 col-md-6">
              <div class="fieldFloating" style="pointer-events: none;">
                <datepicker
                  ref="picker"
                  @focusout.native="close"
                  class="formControl"
                  v-model="start_date"
                  @focusin.native="getStartDate"
                ></datepicker>
                <label class="fieldFloating__label">Start Date</label>
              </div>
            </div>
            <div class="col-xl-2 col-md-6" v-click-outside="hideContractLength">
              <div class="fieldFloating">
                <input
                  type="text"
                  placeholder=" "
                  v-model="contractLength"
                  class="formControl"
                  readonly
                />

                <label class="fieldFloating__label">Contract Length</label>
                <ul class="autocomplete-results" style v-if="isContractLength">
                  <li
                    v-for="(contLength, index) in contractLengths"
                    :key="index"
                    class="autocomplete-result"
                    @click="
                      contractLength = contLength['length'];
                      isContractLength = false;
                    "
                  >
                    {{ contLength["length"] | getLength }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-2 col-md-6">
              <div class="fieldFloating">
                <input
                  type="text"
                  placeholder=" "
                  v-model="layoutDesign"
                  class="formControl"
                  readonly
                />
                <label class="fieldFloating__label">Layout Design</label>
                <ul class="autocomplete-results" style v-if="isLayoutDesign">
                  <li class="autocomplete-result" @click="setLayout('Basic')">
                    Basic
                  </li>
                  <li
                    class="autocomplete-result"
                    @click="setLayout('Standard')"
                  >
                    Standard
                  </li>
                  <li class="autocomplete-result" @click="setLayout('Premium')">
                    Premium
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-2 col-md-6">
              <div class="fieldFloating">
                <input type="text" placeholder=" " class="formControl" />
                <label class="fieldFloating__label">More Filters</label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-lg-row flex-column result" v-if="searchData">
          <div class="result__colLeft order-1 order-lg-0">
            <div class="result__grid">
              <div class="result__filter">
                <div
                  @click="getNearBy"
                  class="d-flex align-items-center result__filter__header js-filterToggle"
                >
                  <i class="fas fa-map-marker-alt"></i>3 nearby locations with
                  similar listings
                </div>
                <div class="result__filter__body">
                  <div class="d-flex result__filter__item is-filterSelect">
                    <div class="result__filter__title">Seattle</div>
                    <div class="result__filter__bar">
                      <div class="eProgress">
                        <div
                          class="eProgress__handle"
                          style="left: 55%; width: 233px;"
                        >
                          <span>$1,000</span>
                          <span>$1,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex result__filter__item">
                    <div class="result__filter__title">Bellevue</div>
                    <div class="result__filter__bar">
                      <div class="eProgress">
                        <div
                          class="eProgress__handle"
                          style="left: 35%; width: 233px;"
                        >
                          <span>$800</span>
                          <span>$1,200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex result__filter__item">
                    <div class="result__filter__title">Redmond</div>
                    <div class="result__filter__bar">
                      <div class="eProgress">
                        <div
                          class="eProgress__handle"
                          style="left: 25%; width: 233px;"
                        >
                          <span>$500</span>
                          <span>$1,100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex result__filter__item">
                    <div class="result__filter__title">Issaquah</div>
                    <div class="result__filter__bar">
                      <div class="eProgress">
                        <div
                          class="eProgress__handle"
                          style="left: 5%; width: 203px;"
                        >
                          <span>$300</span>
                          <span>$700</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row"
                v-for="(item, index) in chunkProperties"
                :key="index"
              >
                <div
                  class="col-md-6 clickCursor"
                  @click="getDetail(item[0]['id'])"
                >
                  <div class="result__item">
                    <div class="result__thumb">
                      <button class="btn btn--streetView">
                        <i class="fas fa-street-view"></i>
                      </button>

                      <img
                        :src="`${baseAPI}${item[0].thumbnail_image}`"
                        alt="Property"
                      />
                    </div>
                    <div class="d-flex justify-content-between result__content">
                      <div>
                        <div class="price">${{ item[0]["price"] }}</div>
                        <div>monthly / person</div>
                      </div>
                      <div class="textRight">
                        <div>
                          {{ item[0]["default_contract_length"] }} year contract
                        </div>
                        <div>Basic Layout</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="col-md-6 clickCursor"
                  v-if="item[1]"
                  @click="getDetail(item[1]['id'])"
                >
                  <div class="result__item">
                    <div class="result__thumb">
                      <button class="btn btn--streetView">
                        <i class="fas fa-street-view"></i>
                      </button>
                      <img
                        :src="`${baseAPI}${item[1].thumbnail_image}`"
                        alt="Property"
                      />
                    </div>
                    <div class="d-flex justify-content-between result__content">
                      <div>
                        <div class="price">${{ item[1]["price"] }}</div>
                        <div>monthly / person</div>
                      </div>
                      <div class="textRight">
                        <div>
                          {{ item[1]["default_contract_length"] }} year contract
                        </div>
                        <div>Basic Layout</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="result__colRight">
            <div class="map">
              <google-map
                :markers="properties"
                styleData="width:100%;  height: 100vh;"
              ></google-map>
            </div>
          </div>
        </div>
        <div class="note" v-if="!searchData && !loading">
          <h2 class="note__text">
            We currently don’t have any spaces that fit the criteria you are
            looking for.
          </h2>
          <h3 class="note__help">Get alerted when we find a match.</h3>
        </div>
        <div class="alertFilter" v-if="!searchData && !loading">
          <!-- <div class="alertFilter__item" @click="getSearchByLocation()">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              9 listings in Mercer Island, WA
              <span class="colorGray--darker">(7 miles from Seattle)</span>
            </div>
          </div>-->
          <div class="alertFilter__item" @click="getSearchByDate()">
            <i class="fas fa-calendar-alt"></i>
            <div>
              {{ dateProperties }} listings available in {{ getDateRange() }}
            </div>
          </div>
          <div class="alertFilter__item" @click="getSearchByCapacity()">
            <i class="fas fa-user-alt"></i>
            <div>
              {{ capacityProperties }} listings that accomodate
              {{ capacityRange }} people
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getPropertyBySearch } from "../../api/properties";
import { getContractLengths } from "../../api/contractLengths";
import Datepicker from "vuejs-datepicker";
import autocomplete from "./AutoComplete";
import GoogleMap from "./GoogleMap";
import Vue from "vue";
// import VueSlider from "vue-slider-component";
if (process.browser) {
  const Datepicker = require("vuejs-datepicker").default;
  // const VueSlider = require("vue-slider-component");
  // Vue.component("VueSlider", VueSlider);
  Vue.component("Datepicker", Datepicker);
}
export default {
  name: "ListProperties",
  components: {
    // Datepicker,
    autocomplete,
    // VueSlider,
    GoogleMap
  },
  data() {
    return {
      baseAPI: process.env.VUE_APP_BASE_API + "/images/",
      isSlider: false,
      min: 0,
      max: 500,
      isContractLength: false,
      isLayoutDesign: false,
      contractLength: null,
      searchData: false,
      contractLengths: [],
      layoutDesign: null,
      markers: [],
      places: [],
      currentPlace: null,
      properties: [],
      chunkProperties: [],
      perPage: "",
      prev: "",
      next: "",
      last: "",
      totalData: "",
      totalPage: "",
      current_page: 1,
      map: null,
      infoContent: "",
      loading: true,
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
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
      capacityProperties: 0,
      dateProperties: 0,
      dateRange: null,
      capacityRange: null,
      start_date: this.$router.history.current.query.start_date
        ? new Date(this.$router.history.current.query.start_date)
        : null,
      location: this.$router.history.current.query.location
        ? this.$router.history.current.query.location
        : null,
      capacity: this.$router.history.current.query.capacity
        ? this.$router.history.current.query.capacity
        : null
    };
  },
  filters: {
    getLength(data) {
      if (data == 12) {
        return "1 year";
      }
      if (data > 11) {
        return (
          Math.floor(data / 12) +
          " years " +
          (data % 12 > 0 ? (data % 12) + " months" : "")
        );
      } else return data + " months";
    }
  },
  created() {
    getContractLengths(1, "all").then(res => {
      this.contractLengths = res.data.data;
    });
    let searchData = {
      location: this.location,
      capacity: this.capacity,
      start_date: this.start_date
    };
    if (!this.location || !this.capacity || !this.start_date) {
      this.$notify({
        group: "notify",
        type: "warning",
        text: "please add appropriate search data"
      });
      this.$router.push("/");
    }
    this.searchData = false;
    this.loading = true;
    getPropertyBySearch(searchData).then(res => {
      this.loading = false;
      this.properties = (res.data && res.data.data.data) || [];

      if (this.properties.length > 0) {
        this.searchData = true;
        this.loading = false;
        var index = 0;
        let chunk_size = 2;
        var arrayLength = this.properties.length;
        let myChunk = [];
        for (index = 0; index < arrayLength; index += chunk_size) {
          myChunk = this.properties.slice(index, index + chunk_size);
          // Do something if you want with the group
          this.chunkProperties.push(myChunk);
        }
      } else {
        let resp = res.data.data;
        this.dateRange = resp.dateRange;
        this.dateProperties = resp.dateProperties;
        this.capacityProperties = resp.capacityProperties;
        this.capacityRange = resp.capacityRange;
      }
      this.capacity = this.capacity + " people";
    });
  },
  mounted() {
    var testarray = document.getElementsByClassName("vdp-datepicker");
    if (this.start_date) {
      testarray[0].classList.add("is-open-date");
    } else {
      testarray[0].classList.remove("is-open-date");
    }
  },
  methods: {
    getDateRange() {
      let date = new Date(this.dateRange);
      let year = date.getFullYear();
      let date1 = date.getDate();
      let month = date.getMonth();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return monthNames[month] + " " + year;
    },
    hideSlider() {
      this.isSlider = false;
    },
    hideContractLength() {
      this.isContractLength = false;
    },
    getLocation(location) {
      this.location = location;
    },
    getNearBy() {
      var elementName = document.getElementsByClassName("result__filter");
      elementName[0].classList.toggle("is-filterOpen");
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
    },
    getSearchByLocation() {
      this.location = "Mercer Island, WA";
      this.getLocation("Mercer Island, WA");
    },
    getSearchByDate() {
      // this.searchData = true;
      this.start_date = this.dateRange;
    },
    getSearchByCapacity() {
      this.capacity = this.capacityRange;
    },
    setLength(contLength) {
      this.contractLength = contLength;
      this.isContractLength = false;
    },
    setLayout(layout) {
      this.layoutDesign = layout;
      this.isLayoutDesign = false;
    },
    setPlace(place) {
      this.currentPlace = place;
    },

    getDetail(id) {
      this.$router.push("/detail/" + id);
    }
  }
};
</script>

<style scoped>
.clickCursor {
  cursor: pointer;
}
</style>
