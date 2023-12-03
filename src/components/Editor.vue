<script setup>
import { onMounted, ref, reactive, computed, nextTick } from "vue";
import { Quasar } from "quasar";
import "../../src/assets/ckeditor.js";
let editorInstance = reactive({});
const editorData = ref("");
const tmpCode = ref("");
const test = () => {
  hljs.initLineNumbersOnLoad();
};
const con = async () => {
  tmpCode.value =
    "<pre><code>" + window.getSelection().toString() + "</code></pre>";
  await nextTick();
  hljs.highlightAll();

  editorInstance.setData(document.getElementById("highlightedCode").innerHTML);
  //   editorInstance.setData(`<pre><code>const $props = defineProps({
  //   width: {
  //     type: Number,
  //     default: 0,
  //   },
  //   height: {
  //     type: Number,
  //     default: 0,
  //   },
  //   header: {
  //     type: Boolean,
  //     default: true,
  //   },
  // });</code></pre>`);

  // document.querySelectorAll("pre code").forEach((el) => {
  //   hljs.highlightElement(el);
  // });

  // hljs.initLineNumbersOnLoad();
  // document.querySelectorAll("p.code").forEach((el) => {
  //   // console.log(el);
  //   if (el.getAttribute("data-highlighted") !== "yes") {
  //     hljs.highlightElement(el);
  //   }
  // });
};
onMounted(() => {
  hljs.highlightAll();
  ClassicEditor.create(document.querySelector(".editor"), {
    toolbar: {
      items: [
        "heading",
        "|",
        "fontSize",
        "fontColor",
        "highlight",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "horizontalLine",
        "removeFormat",
        "|",
        "selectAll",
        "alignment",
        "numberedList",
        "bulletedList",
        "insertTable",
        "blockQuote",
        "link",
        "sourceEditing",
        {
          label: "image",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/></svg>',
          items: [
            "toggleImageCaption",
            "resizeImage:original",
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "imageStyle:alignBlockLeft",
            "imageStyle:alignBlockRight",
          ],
        },
        {
          label: "table",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M20,6v14H6v2h14c1.1,0,2-0.9,2-2V6H20z"/><path d="M16,2H4C2.9,2,2,2.9,2,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C18,2.9,17.1,2,16,2z M9,16H4v-5h5V16z M16,16h-5v-5h5 V16z M16,9H4V4h12V9z"/></g></g></svg>',
          items: [
            "toggleTableCaption",
            "tableCellProperties",
            "tableProperties",
          ],
        },
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
  })
    .then((editor) => {
      // show all avalible plugins
      // console.log(Array.from(editor.ui.componentFactory.names()));
      editorInstance = editor;
      document.querySelectorAll("button").forEach((el) => {
        if (el.textContent == "Code") {
          el.addEventListener("click", con, false);
        }
      });
    })
    .catch((e) => {
      console.error(e);
    });
});
// const c = computed(() => {
// });
const code = `const $props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
  header: {
    type: Boolean,
    default: true,
  },
});`;
</script>
<template>
  <div id="highlightedCode" v-html="tmpCode"></div>
  <q-btn label="test" @click="test()"></q-btn>
  <div style="color: aliceblue">{{ editorData }}</div>
  <div class="editor"></div>
</template>
<style scoped>
button.custom-button:hover {
  background-color: red !important;
}
</style>
