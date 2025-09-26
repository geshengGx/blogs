<template>
  <div class="utterances-container">
    <div ref="commentContainer" id="comment-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

// 定义组件属性
const props = defineProps({
  repo: {
    type: String,
    required: true,
    validator: value => value.split("/").length === 2
  },
  issueTerm: {
    type: String,
    default: "pathname",
    validator: value => ["pathname", "url", "title", "og:title", "issue-number"].includes(value)
  },
  label: {
    type: String,
    default: "comment"
  },
  theme: {
    type: String,
    default: "preferred-color-scheme",
    validator: value =>
      ["github-light", "github-dark", "preferred-color-scheme", "github-dark-orange", "icy-dark", "dark-blue", "photon-dark"].includes(value)
  },
  issueNumber: {
    type: Number,
    default: null
  }
});

const commentContainer = ref(null);
let utterancesScript = null;

// 创建Utterances脚本
const createUtterancesScript = () => {
  if (!commentContainer.value) return;

  // 清除现有脚本
  if (utterancesScript) {
    commentContainer.value.innerHTML = "";
  }

  utterancesScript = document.createElement("script");
  utterancesScript.src = "https://utteranc.es/client.js";
  utterancesScript.async = true;
  utterancesScript.crossOrigin = "anonymous";
  utterancesScript.setAttribute("repo", props.repo);
  utterancesScript.setAttribute("issue-term", props.issueTerm);
  utterancesScript.setAttribute("label", props.label);
  utterancesScript.setAttribute("theme", props.theme);

  // 如果指定了issue number，设置该属性
  if (props.issueNumber) {
    utterancesScript.setAttribute("issue-number", props.issueNumber.toString());
  }

  commentContainer.value.appendChild(utterancesScript);
};

// 处理消息事件以实现自适应高度
const handleMessage = event => {
  if (event.origin !== "https://utteranc.es") return;

  const data = event.data;
  if (data && data.type === "resize" && data.height) {
    const iframe = commentContainer.value?.querySelector("iframe");
    if (iframe) {
      iframe.style.height = `${data.height}px`;
    }
  }
};

onMounted(() => {
  createUtterancesScript();
  window.addEventListener("message", handleMessage);
});

onUnmounted(() => {
  if (commentContainer.value) {
    commentContainer.value.innerHTML = "";
  }
  window.removeEventListener("message", handleMessage);
});

// 监听属性变化
watch(
  () => [props.repo, props.issueTerm, props.theme, props.issueNumber],
  () => {
    createUtterancesScript();
  }
);
</script>

<style scoped>
.utterances-container {
  margin: 2rem 0;
  width: 100%;
}
</style>
