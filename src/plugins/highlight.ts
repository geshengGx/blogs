import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import type { App } from "vue";

export default {
  install(app: App) {
    app.directive("highlight", function (el: HTMLElement) {
      // useBR 选项在新版本的 highlight.js 中已被移除
      // hljs.configure({useBR: true});
      let blocks = el.querySelectorAll("pre");
      blocks.forEach((block: Element) => {
        hljs.highlightElement(block as HTMLElement);
      });
    });
  }
};
