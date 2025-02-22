<template>
    <el-form :inline="true" label-width="80px" :model="row" class="demo-form-inline">
        <el-form-item label="股票名称">
            <el-input v-model.trim="row.f14" placeholder="请输入" clearable style="width:100%"/>
        </el-form-item>
        <el-form-item label="股票代码">
            <el-input v-model.trim="row.f12" placeholder="请输入" clearable style="width:100%"/>
        </el-form-item>
    </el-form>
</template>

<script >
const model = {
    f14: '',
    f12: ''
}
export default {
    data() {
        return {
            row: JSON.parse(JSON.stringify(model))
        }
    },
    methods: {
        onSubmit() {
            return {
                ...this.row
            }
        },
        onReset() {
           Object.assign(this.row,model);
        }
    }
}

</script>

<style lang="less" scoped>
.pagination-block {
    display: flex;
    justify-content: flex-end;
    padding: 20px 0;
}
</style>