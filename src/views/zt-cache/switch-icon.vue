<template>
  <div class="exit-icon" :style="{
    backgroundImage: `url(${closeIcon})`,
  }" v-if="open" @click="switchClose" :title="closeTitle"></div>
  <div class="full-icon" v-else @click="switchOpen" :title="openTitle" :style="{
    backgroundImage: `url(${openIcon})`,
  }"></div>

</template>
<script lang="js">

export default {
  props: {
    open: {
      type: Boolean,
      default: true
    },
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
    }
  },
  methods: {
    switchOpen() {
      this.$emit('open');
    },
    switchClose() {
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
