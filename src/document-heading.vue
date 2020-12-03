<template>
  <component :is="`h${currentLevel}`">
    <slot />
  </component>
</template>

<script>
export default {
  name: "DocumentHeading",
  inject: {
    section: {
      default: null,
    },
  },
  props: {
    level: [String, Number],
  },
  computed: {
    currentLevel () {
      let result = 1;
      let parentLevel = null;

      if (this.section && this.section.level) {
        parentLevel = this.section.level;
      }

      if (this.level) {
        if (typeof this.level === "string" && (this.level.startsWith("+") || this.level.startsWith("-"))) {
          result = (parentLevel || 1) + parseInt(this.level);
        } else {
          result = parseInt(this.level);
        }
      } else {
        if (parentLevel) {
          result = parentLevel;
        } else {
          result = 1;
        }
      }

      return Math.max(1, Math.min(result, 6));
    },
  },
};
</script>
