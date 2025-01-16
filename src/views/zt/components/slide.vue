<template>
  <div
    class="slide-normal"
    :class="[this.open ? 'open' : 'close', direction]"
    :style="styleSlide"
  >
    <slot></slot>
    <div class="slide-icon" @click.stop="changeStatus"></div>
  </div>
</template>
<script lang="js">
export default {
    props: {
        direction: {
            type: String,
            default: 'left'
        },
        width: {
            type: String,
            default: '40%'
        },
        appendToBody: {
          type: Boolean,
          default: false
        }
    },
    computed: {
        styleSlide() {
            if(['left','right'].includes(this.direction) ) {
                return {
                    width: this.width,
                    position: this.appendToBody ? 'fixed': 'absolute'
                }
            } else {
                return {
                    height: this.width,
                    position: this.appendToBody ? 'fixed': 'absolute'
                }
            }
        }
    },
    data(){
        return {
            open: false
        }
    },
    methods: {
        changeStatus() {
            this.open = !this.open;
        }
    }
}
</script>
<style lang="less" scoped>
.slide-normal {
  position: absolute;
  z-index: 1000;
  background: #fff;
  transition: all 0.4s;
}
.slide-icon {
  position: absolute;
  cursor: pointer;
  background-size: 100% 100%;
}
.left {
  top: 0;
  height: 100%;
  left: 0;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.09);

  .slide-icon {
    right: 0;
    top: 50%;
    width: 30px;
    height: 60px;
    transform: translate(100%, -50%);
  }
  &.open {
    transform: translateX(0);
    .slide-icon {
      background-image: url("~@/assets/left.png");
    }
  }
  &.close {
    transform: translateX(-100%);
    .slide-icon {
      background-image: url("~@/assets/right.png");
    }
  }
}
.right {
  top: 0;
  height: 100%;
  right: 0;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.09);

  .slide-icon {
    left: 0;
    top: 50%;
    width: 30px;
    height: 60px;
    transform: translate(-100%, -50%);
  }
  &.open {
    transform: translateX(0);
    .slide-icon {
      background-image: url("~@/assets/right.png");
    }
  }
  &.close {
    transform: translateX(100%);
    .slide-icon {
      background-image: url("~@/assets/left.png");
    }
  }
}
.bottom {
  bottom: 0;
  width: 100%;
  left: 0;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.09);
  .slide-icon {
    left: 50%;
    top: 0;
    width: 60px;
    height: 30px;
    transform: translate(-50%, -100%);
    transform-origin: center center;
  }
  &.open {
    transform: translateY(0);
    .slide-icon {
      background-image: url("~@/assets/bottom.png");
    }
  }
  &.close {
    transform: translateY(100%);
    .slide-icon {
      background-image: url("~@/assets/top.png");
    }
  }
}
.top {
  top: 0;
  width: 100%;
  left: 0;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.09);
  .slide-icon {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    width: 60px;
    height: 30px;
  }
  &.open {
    transform: translateY(0);
    .slide-icon {
      background-image: url("~@/assets/top.png");
    }
  }
  &.close {
    transform: translateY(-100%);
    .slide-icon {
      background-image: url("~@/assets/bottom.png");
    }
  }
}
</style>
