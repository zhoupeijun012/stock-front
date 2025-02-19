<template>
    <el-form :inline="true" :model="row" class="demo-form-inline">
        <el-form-item label="上链时间">
            <el-date-picker v-model="row.date" type="date" placeholder="Pick a date" clearable style="width:100%"/>
        </el-form-item>
        <el-form-item label="上链状态">
            <el-select v-model="row.region" placeholder="Activity zone" clearable style="width:100%">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="上链状态">
            <el-select v-model="row.region" placeholder="Activity zone" clearable style="width:100%">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="上链状态">
            <el-select v-model="row.region" placeholder="Activity zone" clearable style="width:100%">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="上链状态">
            <el-select v-model="row.region" placeholder="Activity zone" clearable style="width:100%">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
        <el-form-item label="上链状态">
            <el-select v-model="row.region" placeholder="Activity zone" clearable style="width:100%">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script >
export default {
    data() {
        return {
            row:{}
        }
    },
    methods: {
        onSubmit() {
            return {

            }
        },
        onReset() {
            /// 
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