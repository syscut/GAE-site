<script setup>
import { onMounted, ref, reactive, computed, nextTick } from "vue";
import { Quasar, useQuasar } from "quasar";
import "../../src/assets/ckeditor/ckeditor.js";
const $props = defineProps({
  header: {
    type: Boolean,
    default: false,
  },
  shouldNotGroupWhenFull: {
    type: Boolean,
    default: true,
  },
});
const $emit = defineEmits(["errMsg"]);
const topPx = computed(() => {
  const toolBar = document.querySelector("div.ck-editor__top");
  if (toolBar !== null) {
    toolBar.style.top = $props.header ? "50px" : "0px";
  }
  return $props.header;
});
let editorInstance = reactive({});
const $q = useQuasar();
onMounted(() => {
  ClassicEditor.create(document.querySelector(".editor"), {
    toolbar: {
      // selectAll -> Code; htmlEmbed -> upload;
      items: [
        "selectAll",
        "htmlEmbed",
        "fontSize",
        "fontColor",
        "highlight",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "horizontalLine",
        "removeFormat",
        "sourceEditing",
        "|",
        "heading",
        "alignment",
        "numberedList",
        "bulletedList",
        "insertTable",
        "blockQuote",
        "link",
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
      shouldNotGroupWhenFull: $props.shouldNotGroupWhenFull,
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
      $q.loadingBar.increment(0.7);
      // show all avalible plugins
      // console.log(Array.from(editor.ui.componentFactory.names()));
      editorInstance = editor;
      document.querySelectorAll("button").forEach((el) => {
        if (el.textContent == "Code") {
          el.addEventListener("click", highlightSection, false);
        }
        if (el.textContent == "File Upload") {
          el.addEventListener("click", upload, false);
        }
      });
      let saveBtn = document.createElement("button");
      saveBtn.classList.add("ck", "ck-button", "ck-off");
      saveBtn.type = "button";
      saveBtn.style["font-family"] = "微軟正黑體";
      saveBtn.textContent = "暫存";
      saveBtn.addEventListener("click", save, false);
      document.querySelector("div.ck-toolbar__items").appendChild(saveBtn);
      let newArticleBtn = document.createElement("button");
      newArticleBtn.classList.add("ck", "ck-button", "ck-off");
      newArticleBtn.type = "button";
      newArticleBtn.style["font-family"] = "微軟正黑體";
      newArticleBtn.textContent = "發文";
      newArticleBtn.addEventListener("click", newArticle, false);
      document
        .querySelector("div.ck-toolbar__items")
        .appendChild(newArticleBtn);
      $q.loadingBar.stop();
      console.log("done");
    })
    .catch((e) => {
      $emit("errMsg", e);
      $q.loadingBar.stop();
    });
});
const tmpCode = ref("");
const uploadDialog = ref(false);
// const c = computed(() => {
// });

const test = () => {
  editorInstance.setData(`<p>測試測試測試測試測試測試測試測試</p>
  <p>測試測試測試測試測試測試測試測試</p><p><p>測試測試測試測試測試測試測試測試</p>
測試測試測試測試測試測</p>
<pre>const $props = defineProps({
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
});</pre>
<p>測試測試測試測試測試測試測試測試</p><p>測試測試測試測試測試測試測試測試</p>
<p>測試測試測試測試</p><p>測試測試測試測試測試測試測試測試</p>
  <p>測試測試測試測試測試測試測試測試</p><p>測試測試測試測試測試測試測試測試</p>`);
  // hljs.initLineNumbersOnLoad();
};
const highlightSection = async () => {
  const range = editorInstance.model.document.selection.getFirstRange();
  let selectedText = "";
  let t = "";
  for (const item of range.getItems()) {
    if (item.name === "softBreak") {
      selectedText = selectedText.concat("\n");
    }
    if (item.data) {
      t = t.concat(item.data);
      selectedText = selectedText.concat(
        item.data.replace("<", "&lt;").replace(">", "&gt;")
      );
    }
  }
  if (selectedText !== "") {
    let addSpace = "";
    if (document.querySelector("div.ck-editor__main").textContent.endsWith(t)) {
      addSpace = addSpace.concat("<p></p>");
    }
    tmpCode.value = "<pre><code>" + selectedText + "</code></pre>";
    await nextTick();
    hljs.highlightAll();
    const lighted = document.getElementById("highlightedCode").innerHTML;
    const replace = "Replace_section-" + Math.random().toString(16).slice(2);
    editorInstance.model.change((writer) => {
      editorInstance.model.insertContent(writer.createText(replace), range);
      let highlighted = editorInstance.getData().replace(replace, lighted);
      editorInstance.setData(highlighted + addSpace);
    });
    // editorInstance.editing.view.focus();
  } else {
    $emit("errMsg", "沒有任何選擇文字");
    editorInstance.editing.view.focus();
  }
};
const upload = async () => {
  uploadDialog.value = true;
  editorInstance.editing.view.focus();
};
const save = () => {
  editorInstance.editing.view.focus();
  console.log(editorInstance.getData());
};
const newArticle = () => {
  editorInstance.editing.view.focus();
  console.log("發文");
};
</script>
<template>
  <div id="highlightedCode" v-html="tmpCode" style="display: none"></div>
  <div style="display: none">{{ topPx }}</div>
  <q-btn label="add test data" @click="test()"></q-btn>
  <div class="editor"></div>
  <q-dialog v-model="uploadDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Close icon</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-uploader
          url="http://localhost:4444/upload"
          label="Individual upload"
          multiple
          style="max-width: 300px"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<style scoped></style>
