<template>
  <li>
    <div
      @click="toggleOpen"
      class="relative"
      :class="{ 'cursor-pointer font-bold hover:bg-gray-800': item.children }"
    >
      <div class="absolute -ml-4" v-if="item.children">
        <span v-if="isOpen">
          &#9662;
        </span>
        <span v-else>
          &#9656;
        </span>
      </div>
      {{ label }}
    </div>
    <ul v-show="isOpen" class="ml-6">
      <tree-item
        v-for="child in item.children"
        :key="child.key"
        :item="child"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import { ref, computed } from "vue";

export default {
  // name must be present (https://vuejs.org/v2/guide/components-edge-cases.html#Recursive-Components)
  name: "TreeItem",
  props: {
    item: Object,
  },
  setup(props) {
    const isOpen = ref(false);

    function toggleOpen() {
      isOpen.value = !isOpen.value;
    }

    const label = computed(() => {
      if (props.item.type === "Array") {
        return `${props.item.key}: [${props.item.children.length}]`;
      } else if (props.item.type === "Object") {
        return `${props.item.key}: {${props.item.children.length}}`;
      } else if (props.item.type === "String") {
        return `${props.item.key}: "${props.item.value}"`;
      }
      return `${props.item.key}: ${props.item.value}`;
    });

    return { isOpen, toggleOpen, label };
  },
};
</script>

<style></style>
