<template>


  <Column_div>
    <!-- 页头 -->
    <Line_light></Line_light>
    <Yi_yan></Yi_yan>
    <Paper_Survey></Paper_Survey>

    <Line_light></Line_light>
    <Paper_title_show :content="paper_content_list_json.title"></Paper_title_show>
    <div class="hty_markdown_two">
      <!-- 目录 -->
      <div id="tocHty" class="tocHty_css"></div>
      <!-- markdown渲染 -->
      <div id="github_markdown" class="github_markdown_hty">
        <v-md-preview :text="markdown_content"></v-md-preview>
      </div>
    </div>

    <div v-if="foot_show">
      <Line_light></Line_light>
      <Label_footer></Label_footer>
    </div>
  </Column_div>

</template>

<script setup>
import "katex/dist/katex.css";
import {inject, onMounted, onUpdated, provide, ref, watch} from 'vue'
import Label_footer from "../Foot/Label_footer.vue";
import Line_light from "../Beauti/Line_light.vue";
import Paper_title_show from "./Paper_title_show.vue";
import Paper_Survey from "./Paper_Survey.vue";
import Yi_yan from "../Head/Yi_yan.vue";
import Column_div from "../Beauti/Column_div.vue";


const paper_content_list_json = inject('paper_content_list_json')
const markdown_content = ref("")
const foot_show = ref(false)

const api_hty_url = inject('api-hty')


watch(paper_content_list_json, () => {
  document.title = paper_content_list_json._rawValue.title
  markdown_fetch()
})

function markdown_fetch() {
  fetch(`${api_hty_url}/blog/paperGet/` + paper_content_list_json._rawValue.content)
      .then(data => {
        return data.text()
      })
      .then(result => {
        if (markdown_content.value !== result)
          markdown_content.value = result
        // console.log(result)
        foot_show.value = true
      })
}

onMounted(() => {
  toc_HTY_SET()
})


function toc_HTY_SET() {
  var targetParent = document.getElementById("tocHty");
  // 选择目标节点
// 创建一个MutationObserver实例
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      // 检查是否有id为toc_hty的元素被添加到DOM中
      if (mutation.type === 'childList') {
        const elementToMove = document.getElementsByClassName("table-of-contents")[0];
        if (elementToMove) {
          // 在这里可以执行你需要的操作，表示元素已经被渲染
          // console.log('目录出现');
          targetParent.appendChild(elementToMove);
          // 停止观察，因为我们已经实现了目标
          observer.disconnect();
          replaceAttributeWithId("data-v-md-heading", "id")
          replaceDataVmdLineWithHref()
        }
      }
    }
  });

// 开始观察<body>元素的子节点变化
  observer.observe(document.body, {childList: true, subtree: true});


}

function replaceAttributeWithId(attributeName, changeName) {
  // 获取所有带有指定属性名的元素
  const elementsToReplace = document.querySelectorAll('[' + attributeName + ']');

  // 遍历元素并替换属性
  elementsToReplace.forEach(function (element) {
    const attributeValue = element.getAttribute(attributeName);
    element.setAttribute(changeName, attributeValue);
    element.removeAttribute(attributeName);
  });
}

function replaceDataVmdLineWithHref() {
  // 获取所有带有 data-v-md-line 属性的元素
  const elementsToReplace = document.querySelectorAll('[data-v-md-anchor]');

  // 遍历元素并替换属性
  elementsToReplace.forEach(function (element) {
    const dataVmdLineValue = element.getAttribute('data-v-md-anchor');
    element.setAttribute('href', '#' + dataVmdLineValue);
    element.removeAttribute('data-v-md-anchor');
  });
}

</script>

<style scoped>
.hty_markdown_two {
  display: flex;
}

.github_markdown_hty {
  width: 75%;
}

.tocHty_css {
  word-wrap: break-word;
  padding: 0 25px 0 0;

}


@media (max-width: 800px) {
  .hty_markdown_two {
    display: unset;
  }

  .github_markdown_hty {
    width: auto;
  }

  .tocHty_css {
    word-wrap: break-word;
    width: auto;
    padding: 0 20px 0 0;

  }


}
</style>

<style>
.tocHty_css a:hover {
  color: #00aeec;
}

li::marker {
  color: #b71584; /* 标记的颜色 */
}

h1 {
  color: #7781e2;
}

.markdown-body-dark h1 {
  border-bottom: 1px solid #649790 !important;
}

.markdown-body-dark h2 {
  border-bottom: 1px solid #6e8fbc !important;
}

.tocHty_css .table-of-contents .v-md-toc {
  padding: 0 0 0 30px;
}
</style>


