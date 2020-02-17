<template>
  <div>
    <gmap-map
      ref="gmap"
      :center="{lat:markers[0].latitude, lng:markers[0].longitude}"
      :zoom="5"
      :style="styleData"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="{lat:m.latitude, lng:m.longitude}"
        @click="toggleInfoWindow(m,index)"
      ></gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>
<script>
export default {
  name: "GoogleMap",
  props: {
    markers: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    styleData: {
      type: String,
      default: "width:100%;  height: 100vh;"
    }
  },
  data() {
    return {
      //a default center for the map
      center: { lat: 52.51195, lng: 6.089625 },
      map: null,
      infoContent: "",
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
      }
    };
  },
  mounted() {
    //set bounds of the map
    this.$refs.gmap.$mapPromise.then(map => {
      // eslint-disable-next-line no-undef
      const bounds = new google.maps.LatLngBounds();
      for (let m of this.markers) {
        bounds.extend(m.position);
      }
      map.fitBounds(bounds);
    });
  },
  methods: {
    toggleInfoWindow: function(marker, idx) {
      let position = { lat: marker.latitude, lng: marker.longitude };
      this.infoWindowPos = position;
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function(marker) {
      console.log(marker, "====");
      return `<div class="card">
  <div class="card-image">
    
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">${marker.location}</p>
      </div>
    </div>
    <div class="content">
      $ ${marker.price}
      <br>
    </div>
  </div>
</div>`;
    }
  }
};
</script>