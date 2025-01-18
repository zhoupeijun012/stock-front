<template>
  <div class="exit-icon" :style="{
    backgroundImage: `url(${closeIcon})`,
  }" v-if="inFull" @click="close" :title="closeTitle"></div>
  <div class="full-icon" v-else @click="open" :title="openTitle" :style="{
    backgroundImage: `url(${openIcon})`,
  }"></div>

</template>
<script lang="js">
export default {
  props: {
    openTitle: {
      type: String,
      default: ''
    },
    openIcon: {
      type: String,
      default: ''
    },
    closeIcon: {
      type: String,
      default: ''
    }, closeTitle: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      inFull: false
    }
  },
  methods: {
    open() {
      this.inFull = true;
      this.$emit('open');

    },
    close() {
      this.inFull = false;
      this.$emit('close');
    }
  }
}
</script>
<style lang="less" scoped>
.full-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-size: 100% 100%;
  margin-top: 10px;
  cursor: pointer;
}

.exit-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  background-size: 100% 100%;
  margin-top: 10px;
  cursor: pointer;
}
</style>
