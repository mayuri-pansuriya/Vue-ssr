<template>
  <div id="app">
    <p>
      <router-link to="/">Go To Home</router-link>
      <a @click="getdata"> hgasd</a>
      <router-link :to="{ name: 'Foo1', params: { userId: 123 } }"
        >User</router-link
      >
    </p>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    getdata() {
      this.$router.push("/test1/" + 9);
    }
  }
};
</script>
