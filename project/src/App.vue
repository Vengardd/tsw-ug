<template>
  <div id="app">
    <Navbar/>
    <div class="content-page">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
    components: {
        Navbar
    }
};
</script>

<style lang="scss" scoped>
.content-page {
  height: 100%;
  width: 100%;
  position: fixed;
}
</style>
