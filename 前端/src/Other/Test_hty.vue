<template>
  <div class="markdown-editor">
    <div class="left-panel">
      <MarkdownOutline :headings="outlineHeadings"/>
    </div>
    <div class="right-panel">
      <v-md-editor v-model="markdownContent"/>
    </div>
  </div>
</template>

<script>
import {VMdEditor} from 'v-md-editor';

export default {
  components: {
    VMdEditor,

  },
  data() {
    return {
      markdownContent: '# Title\n\n## Section 1\n\nContent...',
    };
  },
  computed: {
    outlineHeadings() {
      // 提取目录信息逻辑，返回一个标题数组
    },
  },
};
</script>

<style>
.markdown-editor {
  display: flex;
  width: 100%;
}

.left-panel {
  flex: 1;
  padding: 16px;
  background-color: #f0f0f0;
}

.right-panel {
  flex: 3;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
}
</style>
