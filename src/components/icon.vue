<template>
  <span
    class="iconfont"
    :class="`icon-${type}`"
    :style="style"
    @click="$emit('click', $event)"
  ></span>
</template>

<script>
import { pxToRem } from "@/utils";

export default {
  name: "Icon",
  props: {
    type: String,
    size: Number,
    color: String,
  },
  computed: {
    style() {
      const style = {};
      if (this.size) {
        style.fontSize = pxToRem(this.size);
      }
      style.color = this.color;
      return style;
    },
  },
};
</script>

<style lang="scss" scoped></style>
