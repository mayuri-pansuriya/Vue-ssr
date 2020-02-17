<template>
  <div class="autocomplete" v-click-outside="outsideClick">
    <input
      type="text"
      v-model="search"
      @input="debounceOnChange"
      :isFromLanding="isFromLanding"
      class="formControl"
      :readonly="isReadonly"
      placeholder=" "
    />
    <label class="fieldFloating__label">Location</label>
    <ul v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { debounce } from "../../utils/debounce";
const config = require("../../config").get(process.env.NODE_ENV);

export default {
  name: "autocomplete",
  props: ["locationData", "isFromLanding", "isReadonly"],
  watch: {
    locationData(value) {
      this.search = value;
    }
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      items: []
    };
  },
  created() {
    if (this.locationData) {
      this.search = this.locationData;
    }
  },
  methods: {
    debounceOnChange: debounce(function() {
      this.handleLocationChange();
    }, 800),
    handleLocationChange() {
      if (!this.isFromLanding) {
        this.$emit("getLocation", this.search);
      }

      if (this.search == "") {
        this.isOpen = false;
      } else {
        const proxyURL = "https://cors-anywhere.herokuapp.com/";
        axios
          .get(
            `${proxyURL}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=` +
              this.search +
              `&key=${config.GOOGLE_API_KEY}&sessiontoken=1234567890&types=(cities)&country=IN`
          )
          .then(response => {
            this.results = response.data["predictions"].map(function(item) {
              return item["description"];
            });
          });
        this.isOpen = true;
      }
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit("getLocation", this.search);
    },
    outsideClick() {
      this.isOpen = false;
    }
  }
};
</script>
<style>
.autocomplete {
  position: relative;
}

.fieldFloating .autocomplete-results {
  padding: 0;
  margin: 0;
  overflow: auto;
  max-height: 200px;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 9;
  border-radius: 4px;
  margin-top: 12px;
  padding: 8px 0;
  background: #fff;
}

.autocomplete-result {
  font-size: 14px;
  color: #000000;
  line-height: 17px;
  list-style: none;
  text-align: left;
  padding: 8px 20px;
  cursor: pointer;
}

.autocomplete-result:hover {
  font-family: "Inter-SemiBold";
  background-color: rgba(38, 140, 171, 0.08);
  font-weight: bold;
  color: #28485e;
}
</style>
