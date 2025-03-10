<template>
  <el-select
    v-model="productForm.sysList"
    v-bind="$attrs"
    v-on="$listeners"
    class="remote-multiple-select"
    v-el-select-loadmore="loadmore"
    :remote-method="codeRemoteMethod"
    :loading="codeLoading"
    @focus="focus"
  >
    <slot name="default" :list="codeOptions"></slot>
  </el-select>
</template>
<script>
export default {
  name: "lazy-select",
  props: {
    requestFunction: {
      type: Function,
      default: () => {},
    },
    defaultAttrs: {
      type: Object,
      default: () => {},
    },
    matchKey: {
      type: String,
      default: "keyword",
    },
  },
  data() {
    return {
      codeLoading: false,
      codeOptions: [],
      keyWord: "", // 存储查询字段
      productForm: { sysList: "" },
      codePage: {
        pageNum: 1,
        pageSize: 20,
      }, // 系统编号分页
    };
  },
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      },
    },
  },
  methods: {
    focus() {
      if (!this.keyWord && this.codeOptions.length <= 0) {
        this.codeRemoteMethod();
      }
    },
    // 懒加载
    loadmore() {
      this.codePage.pageNum++;
      // 大于页码不请求了
      if (this.codePage.pageNum > this.pages) {
        return;
      }
      this.getCodeList();
    },
    // 系统编号远程搜索
    codeRemoteMethod(query) {
      this.keyWord = query || "";
      this.codePage.pageNum = 1;
      this.getCodeList(true);
    },
    getCodeList(flag) {
      let obj = Object.assign({}, this.codePage, this.defaultAttrs);
      if (this.keyWord) {
        obj = Object.assign(obj, {
          filters: {
            [this.matchKey]: this.keyWord,
          },
        });
      }
      if (flag) {
        this.codeOptions = [];
        this.codeLoading = true;
      }
      setTimeout(() => {
        this.requestFunction(obj).then((res) => {
          this.codeLoading = false;
          const { pages, list } = res;
          this.pages = pages;
          this.codeOptions = this.codeOptions.concat(list);
        });
      }, 200);
    },
  },
};
</script>
