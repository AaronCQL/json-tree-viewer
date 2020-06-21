<template>
  <div
    class="h-screen w-screen flex flex-row bg-gray-800 font-mono text-gray-100"
  >
    <div class="w-1/2 p-4">
      <textarea
        v-model="editor"
        spellcheck="false"
        class="resize-none h-full w-full border-4 focus:outline-none rounded p-2 bg-gray-900"
        :class="isValidJson ? 'border-green-600' : 'border-red-600'"
      />
    </div>
    <div class="w-1/2 p-4">
      <div
        class="h-full w-full border-4 border-teal-600 rounded p-2 bg-gray-900 overflow-auto"
      >
        <ul class="ml-4">
          <tree-item v-for="item in treeData" :key="item.key" :item="item" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watchEffect } from "vue";

import TreeItem from "./components/TreeItem.vue";
import { makeTree, isValidJsonString } from "./utils/jsonUtils";
import { EXAMPLE_1 } from "./utils/exampleData";

export default {
  components: {
    TreeItem,
  },
  setup() {
    const editor = ref(JSON.stringify(EXAMPLE_1, null, 2));
    const lastValidJsonString = ref("");
    const isValidJson = computed(() => {
      return isValidJsonString(editor.value);
    });

    watchEffect(() => {
      if (isValidJson.value) {
        lastValidJsonString.value = editor.value;
      }
    });

    const treeData = computed(() =>
      makeTree(JSON.parse(lastValidJsonString.value))
    );

    return { editor, treeData, isValidJson };
  },
};
</script>
