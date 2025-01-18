<template>
    <div class="sc-table">
        <div class="header-warp">
            <div class="header-item" v-for="(headerItem, index) in cloumns" :key="'header-item-' + index">
                {{ headerItem.title }}
            </div>
        </div>
        <div class="content-warp">
            <div class="header-row" v-for="(tableItem, index) in tableData" :key="'header-row-' + index"
                :style="options.row && options.row.style ? (options.row.style(tableItem)) : {}">
                <div class="table-row" v-for="(headerItem, index) in cloumns" :key="'table-row-' + index"
                    :title="headerItem.title" :style="{
                        textAlign: headerItem.align ? headerItem.align : 'center',
                        color: headerItem.color ? (typeof headerItem.color == 'function' ? headerItem.color(tableItem) : headerItem.color) : '#000',
                    }">
                    {{ headerItem.formatter ? headerItem.formatter(tableItem) : tableItem[headerItem.prop] }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="js">
export default {
    props: {
        cloumns: {
            type: Array,
            default: () => []
        },
        tableData: {
            type: Array,
            default: () => []
        },
        options: {
            type: Object,
            default: () => { }
        }
    }
}
</script>

<style lang="less" scoped>
.sc-table {
    border: 1px solid #e3e4e5;
    width: 100%;
    min-height: 100%;
}

.header-warp,
.header-row {
    display: flex;
    flex-direction: row;

    .header-item,
    .table-row {
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        flex: 1;
        border: 1px solid #e3e4e5;
        cursor: pointer;
        flex-wrap: wrap;
    }

    .table-row {
        box-sizing: border-box;
        padding: 0 4px;
    }

    .table-slot {
        width: 100%;
    }
}

.header-row {
    &:hover {
        background: #e3e4e5;
    }
}
</style>
