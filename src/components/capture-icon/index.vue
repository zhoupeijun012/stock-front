<template>
  <switch-icon
    open-title="截图"
    style="margin-right: 10px; width: 28px; height: 28px"
    :open-icon="require('@/assets/快照.png')"
    close-title="截图"
    :close-icon="require('@/assets/快照.png')"
    @open="capture"
    @close="capture"
  ></switch-icon>
</template>
<script>
import switchIcon from "@/components/switch-icon";
import html2canvas from "html2canvas";
export default {
  components: { switchIcon },
  props: {
    fullDom: String,
  },
  data() {
    return {
      fullScreen: false,
    };
  },
  methods: {
    capture() {
      var element = document.querySelector(this.fullDom);
      html2canvas(element).then((canvas) => {
        canvas.toBlob((blob) => {
          const imgUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = imgUrl;
          a.download = "快照.png";
          a.click();
          window.URL.revokeObjectURL(imgUrl);
        }, "image/png");
      });
    },
  },
};
</script>
