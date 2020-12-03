<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script>
export default {
  name: "DocumentSection",
  provide () {
    return {
      section: this.section,
    };
  },
  inject: {
    parentSection: {
      from: "section",
      default: null,
    },
  },
  props: {
    level: [String, Number],
    tag: {
      type: String,
      default: "section",
    },
  },
  computed: {
    currentLevel () {
      let result = 1;
      let parentLevel = null;

      if (this.parentSection && this.parentSection.level) {
        parentLevel = this.parentSection.level;
      }

      if (this.level) {
        if (typeof this.level === "string" && (this.level.startsWith("+") || this.level.startsWith("-"))) {
          result = (parentLevel || 1) + parseInt(this.level);
        } else {
          result = parseInt(this.level);
        }
      } else {
        if (parentLevel) {
          result = parentLevel + 1;
        } else {
          result = 1;
        }
      }

      return Math.max(1, Math.min(result, 6));
    },
    section () {
      return { level: this.currentLevel };
    },
  },
};
</script>
