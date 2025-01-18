<template>
    <div class="">
        <div>涨停状态</div>
        <check-box :options="ztOptions" :value="ztType" @input="updateZtType" @full="upateZtTypeFull"></check-box>
        <template v-if="ztCountOptions.length > 0">
            <div>连板数量</div>
            <check-box :options="ztCountOptions" :value="ztCount" @input="updateZtCount" @full="upateZtCountFull"></check-box>
        </template>
        <template v-if="ztHyOptions.length > 0">
            <div>行业统计</div>
            <check-box :options="ztHyOptions" :value="ztHy" @input="updateZtHy" @full="upateZtHyFull"></check-box>
        </template>
    </div>
</template>
<script lang="js">
import { mapGetters, mapState, mapMutations } from 'vuex';
import * as STORE_TYPES from '@/store/store_types';
import CheckBox from '@/components/check-box.vue';
export default {
    components: { CheckBox },
    computed: {
        ...mapState('zt', [
            'ztType',
            'ztCount',
            'ztHy'
        ]),
        ...mapGetters('zt', [
            'ztOptions',
            'ztCountOptions',
            'ztHyOptions'
        ])
    },
    methods: {
        ...mapMutations('zt', {
            'updateZtType': STORE_TYPES.UPDATE_ZT_TYPE,
            'updateZtCount': STORE_TYPES.UPDATE_ZT_COUNT,
            'updateZtHy': STORE_TYPES.UPDATE_ZT_HY,
            'upateZtTypeFull': STORE_TYPES.UPDATE_ZT_TYPE_FULL,
            'upateZtCountFull': STORE_TYPES.UPDATE_ZT_COUNT_FULL,
            'upateZtHyFull': STORE_TYPES.UPDATE_ZT_HY_FULL,
        })
    },
    mounted() {

    }
}
</script>