<template>
    <div class="stock-cell" :style="cellStyle">
        <div class="stock-header">
            <div class="name">
                {{ data.n }}
            </div>
            <div class="lb">
                首板
            </div>
            <div class="prec">
                10.01%
            </div>
        </div>
        <div class="stock-content">
            <div class="gn">机器人概念</div>
            <div class="ltsz">3000万</div>
        </div>
    </div>
</template>
<script lang="js">
export default {
    props: {
        data: Object,
        showCloumn: {
            type: Array,
            default: () => ['name', 'lb', 'prec']
        }
    },
    data() {
        return {

        }
    },
    computed: {
        cellStyle() {
            if (this.data.zb) {
                return {
                    background: '#ccc'
                }
            }
        },
        textStyle() {
            if (this.data.zb) {
                return {
                    color: 'green'
                }
            } else if (this.data.zdp > 0) {
                return '#f00'
            } else {
                return 'green'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.stock-cell {
    width: 100%;
    font-size: 14px;
    line-height: 18px;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 2px;
    border: 1px solid #e3e4e5;
    border-radius: 4px;
    padding: 4px;
}

.stock-header {
    display: flex;
    justify-content: flex-start;
    .name,
    .lb,
    .prec {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .name {
        width: 42%;
        color: #003398;
    }
    .lb {
        width: 23%;
        color: #ff0000;
        text-align: center;
    }
    .prec {
        width: 35%;
        text-align: right;
        color: #f00;
    }
}

.stock-content {
    display: flex;
    justify-content: flex-start;
    .gn,.ltsz {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .gn {
        flex: 1;
    }
    .ltsz {
        width: 40%;
        text-align: right;
        color: #f00;
    }
}
</style>