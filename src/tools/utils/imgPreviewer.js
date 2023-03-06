export default imgPreview = (img) => {
  const imgPreviewdiv = document.createElement("div");
  const imgel = document.createElement("img");
  if (img.nodeType === 1) {//参数为图片元素
    imgel.src = img.src
  } else {
    imgel.src = img;
  }
  imgPreviewdiv.classList.add("preview-container");
  /* 脱离文档流 */
  imgPreviewdiv.style.position = "fixed";
  imgPreviewdiv.style.inset = 0;
  /* 背景 */
  imgPreviewdiv.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  /*预览图片居中显示*/
  imgPreviewdiv.style.display = "flex";
  imgPreviewdiv.style.justifyContent = "center";
  imgPreviewdiv.style.alignItems = "center";
  imgPreviewdiv.style.userSelect = "none";
  /* 滚轮控制大小 */
  imgPreviewdiv.onwheel = (e) => {
    let width = getComputedStyle(imgel).width.slice(0, -2);
    let height = getComputedStyle(imgel).height.slice(0, -2);
    if (e.deltaY > 0) {
      imgel.style.width = parseInt(width) * 0.8 + "px";
      imgel.style.height = parseInt(height) * 0.8 + "px";
    } else if (e.deltaY < 0) {
      imgel.style.width = parseInt(width) * 1.2 + "px";
      imgel.style.height = parseInt(height) * 1.2 + "px";
    }
  };
  /* 点击取消预览 */
  imgPreviewdiv.onclick = () => {
    imgPreviewdiv.remove();
  };

  /* 图片大小限制 */
  imgel.style.maxHeight = "90%";
  imgel.style.maxWidth = "90%";
  imgel.style.minHeight = "30%";
  imgel.style.minWidth = "30%";
  imgel.style.objectFit = "contain";

  imgPreviewdiv.appendChild(imgel);
  document.body.appendChild(imgPreviewdiv);
};