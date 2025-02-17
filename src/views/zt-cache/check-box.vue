<template>
    <div class="check-box-warp">
        <div class="check-box-item" style="text-align: center;" v-if="options.length > 0" :class="{ active: full }" @click="switchFull">全部</div>
        <div class="check-box-item" v-for="(option, index) in options" :class="{ active: value.includes(option.value) }"
            :key="'check-box-item-' + index" @click="tagClick(option)">{{ option.label }}<span class="count">（{{ option.count }}只）</span></div>
    </div>
</template>
<script lang="js">
export default {
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: Array,
            default: () => []
        },
    },
    computed: {
        full() {
            if(this.value.length >= this.options.length) {
                this.$emit('full',true);
                return true
            } else {
                this.$emit('full',false);
                return false
            }
        }
    },
    methods: {
        tagClick(row) {
            if (this.value.includes(row.value)) {
                this.value.splice(this.value.indexOf(row.value), 1);
                this.$emit('input', this.value);
            } else {
                this.value.push(row.value)
                this.$emit('input', this.value);
            }
        },
        switchFull() {
            if(this.full) {
                this.$emit('input', []);
            } else {
                this.$emit('input', this.options.map((item)=>item.value));
            }
        }
    }
}
</script>
<style lang="less" scoped>
.check-box-warp {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .check-box-item {
        line-height: 32px;
        height: 32px;
        width: 120px;
        text-align: left;
        padding: 0 4px;
        border-radius: 4px;
        border: 1px solid #e3e4e5;
        margin-bottom: 6px;
        margin-right: 6px;
        cursor: pointer;
        user-select: none;
        font-size: 14px;
        .count {
            color: #f00;
        }
    }
    .active {
        background: #f00;
        color: #fff;
        .count {
            color: #fff;
        }
    }
}
</style>