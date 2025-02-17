<template>
    <div class="summary">
        <div class="summary-item">
            <div class="summary-item-title">板块</div>
            <div class="summary-item-text">家用电器</div>
        </div>
        <div class="summary-item">
            <div class="summary-item-title">概念</div>
            <div class="summary-item-text">机器人，抖音概念</div>
        </div>
        <div class="summary-item">
            <div class="summary-item-title">至今涨幅</div>
            <div class="summary-item-text">24%</div>
        </div>
        <div class="summary-item">
            <div class="summary-item-title">当日涨跌幅</div>
            <div class="summary-item-text">17%</div>
        </div>
    </div>
</template>
<script lang="js">
export default {
    data() {
        return {

        }
    },
    mounted() {

    }
}
</script>
<style lang="less">
.summary {
    height: 100%;
    .summary-item {
        display: flex;
        justify-content: flex-start;
    }
    .summary-item-title {
        width: 100px;
        text-align: left;
    }
    .summary-item-text {
        white-space:normal;
    }
}
</style>