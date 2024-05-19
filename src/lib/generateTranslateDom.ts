interface response {
  data: any;
}

const generate = (dataArray: Array<response>, dom: any): void => {
  const translated = dataArray[0].data;
  const voiceData = dataArray[1].data;

  console.log(dom);
  // close btn
  let closeBtn = document.createElement("button");

  closeBtn.onclick = () => {
    dom.target.nextSibling.style.display = "none";
  };

  closeBtn.innerText = "X";
  closeBtn.style.backgroundColor = "red";
  closeBtn.style.position = "absolute";
  closeBtn.style.right = "4px";
  closeBtn.style.top = "4px";
  closeBtn.style.borderRadius = "4px";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";

  // the generated dom for translate element
  let innerDiv = document.createElement("div");
  innerDiv.style.padding = "10px";
  innerDiv.style.cursor = "move";
  innerDiv.style.zIndex = "10";
  innerDiv.style.backgroundColor = "#2196F3";
  innerDiv.style.color = "#fff";
  innerDiv.innerText = translated.word;
  innerDiv.appendChild(closeBtn);
  dom.target.nextSibling.childNodes[0].appendChild(innerDiv);

  // generate voice element
  let blob = new Blob([voiceData], { type: "audio/mp3" });
  let url = URL.createObjectURL(blob);
  let audio = new Audio(url);
  audio.controls = true;
  audio.playbackRate = 0.8;

  //   append
  let pTranslate = document.createElement("p");
  pTranslate.innerText = "翻譯：" + translated.translate;
  pTranslate.style.color = "black";
  innerDiv.parentNode!.insertBefore(pTranslate, innerDiv.nextSibling);
  pTranslate.parentNode!.insertBefore(audio, pTranslate.nextSibling);

  //   example
  const pronounce = translated.pronounce || "無提供";
  const definition = translated.definition || "無提供";
  const partOfSpeech = translated.partOfSpeech || "無提供";
  const example = translated.example || "無提供";
  let pPhonetic = document.createElement("p");
  pPhonetic.innerText = "KK音標：" + pronounce;
  pPhonetic.style.color = "black";
  audio.parentNode!.insertBefore(pPhonetic, audio.nextSibling);

  let pPartOfSpeech = document.createElement("p");
  pPartOfSpeech.style.color = "black";
  pPartOfSpeech.innerText = "詞性：" + partOfSpeech;
  pPhonetic.parentNode!.insertBefore(pPartOfSpeech, pPhonetic.nextSibling);

  let pDefinition = document.createElement("p");
  pDefinition.style.color = "black";
  pDefinition.innerText = "定義：" + definition;
  pPhonetic.parentNode!.insertBefore(pDefinition, pPartOfSpeech.nextSibling);

  let pExample = document.createElement("p");
  pExample.style.color = "black";
  pExample.innerText = "例句：" + example;
  pPhonetic.parentNode!.insertBefore(pExample, pDefinition.nextSibling);

  dom.target.nextSibling.style.left = dom.layerX + "px";
  dom.target.nextSibling.style.display = "block";
  dragElement(dom.target.nextSibling, innerDiv);
};

const dragElement = (elmnt: any, header: HTMLDivElement) => {
  let pos1: number = 0,
    pos2: number = 0,
    pos3: number = 0,
    pos4: number = 0;
  const elementDrag = (e: MouseEvent) => {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  };
  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };
  const dragMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
};

export default {
  generate,
};
