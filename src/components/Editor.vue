<script setup>
import { h, onMounted, ref, reactive, computed } from "vue";
import { Quasar } from "quasar";
import CodeShare from "./CodeShare.vue";
import "../../src/assets/ckeditor.js";
let editorInstance = reactive({});
const editorData = ref("");
const c = h("highlightjs", { code: 'const a = "";' });

onMounted(() => {
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
        "htmlEmbed",
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
    htmlEmbed: {
      showPreviews: true,
      sanitizeHtml: (inputHtml) => {
        // Strip unsafe elements and attributes, e.g.:
        // the `<script>` elements and `on*` attributes.
        console.log(inputHtml);
        return {
          html: inputHtml,
          // true or false depending on whether the sanitizer stripped anything.
          hasChanged: true,
        };
      },
    },
  })
    .then((editor) => {
      // show all avalible plugins
      // console.log(Array.from(editor.ui.componentFactory.names()));
      editorInstance = editor;
    })
    .catch((e) => {
      console.error(e);
    });
});
// const c = computed(() => {
// });
const d = `<highlightjs code="const a = '';"></highlightjs>`;
</script>
<template>
  <component :is="c" />
  <q-btn label="test" @click="test()"></q-btn>
  <div style="color: aliceblue">{{ editorData }}</div>
  <div class="editor"></div>
</template>
<style scoped>
.ck.ck-content h3.category {
  font-family: "Bebas Neue";
  font-size: 20px;
  font-weight: bold;
  color: #d1d1d1;
  letter-spacing: 10px;
  margin: 0;
  padding: 0;
}
</style>
