<template>
  <div class="swiper-content">
    <transition name="show">
      <component :is="currentComp"></component>
    </transition>
    <div class="prev-title swiper-title" v-if="prev" @click="switchPrev">
      {{ prev }}
    </div>
    <div class="next-title swiper-title" v-if="next" @click="switchNext">
      {{ next }}
    </div>
  </div>
</template>
<script lang="js">
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    default: {
      type: Number,
      default: ''
    }
  },
  computed: {
    currentComp() {
      return this.list[this.currentIndex].component
    },
    prev() {
      return this.currentIndex <= 0 ? null : this.list[this.currentIndex - 1].title
    },
    next() {
      return this.currentIndex >= this.list.length - 1 ? null : this.list[this.currentIndex + 1].title
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  created() {
    this.currentIndex = this.default;
  },
  methods: {
    switchNext() {
      this.currentIndex++;
    },
    switchPrev() {
      this.currentIndex--;
    }
  }
}
</script>
<style lang="less" scoped>
.swiper-content {
  width: 100%;
  height: 100%;
  position: relative;
}


.swiper-title {
  position: absolute;
  top: 50%;
  width: 20px;
  word-break: break-all;
  transform: translateY(-50%);
  font-size: 14px;
  background: #f00;
  cursor: pointer;
  user-select: none;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  z-index: 9999;
}

.prev-title {
  left: 0;
  border-radius: 0 10px 10px 0;
}

.next-title {
  right: 0;
  border-radius: 10px 0 0 10px;
}

@keyframes show {
  0% {
    opacity: 0;
    left: 128px;
  }

  100% {
    opacity: 1;
    left: 0;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
    left: 0;
  }

  100% {
    opacity: 0;
    left: -128px;
  }
}

.show-enter-active {
  animation: show .2s;
}

.show-leave-active {
  animation: hide .2s;
}

.show-enter,
.show-leave-to {
  opacity: 0;
}
</style>