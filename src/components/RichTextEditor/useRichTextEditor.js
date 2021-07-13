import { convertToHTML } from "draft-convert";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { useEffect, useState } from "react";

const useRichTextEditor = (blogData, rawData, setRawData) => {

  const insertHtmlToDraft = () => {
    let htmlString = blogData;
    const blocksFromHtml = htmlToDraft(htmlString);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    console.log('alu lelo')
    return EditorState.createWithContent(contentState)
  };

  const [editorState, setEditorState] = useState(() =>
    blogData ? insertHtmlToDraft() : EditorState.createEmpty()
  );
  //   const [rawData, setRawData] = useState("");

  const updateTextDescription = (state) => {
    setEditorState(state);
    let currentContentAsHTML = draftToHtml(
      convertToRaw(state.getCurrentContent())
    );
    // console.log(typeof currentContentAsHTML)
    setRawData(convertImages(currentContentAsHTML));
    // convertImages(currentContentAsHTML)
    // setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(current.description))));
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const imageUploadCallBack = (file) =>
    new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let img = new Image();
      // let url = ''
      reader.onload = function (e) {
        img.src = this.result;
      };
      img.onload = function () {
        // console.log(img.src.length)
        // Zoom the canvas needed for the image (you can also define the canvas tag directly in the DOM, so that the compressed image can be directly displayed without going to base64)
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        // image original size
        var originWidth = img.width;
        var originHeight = img.height;

        // Maximum size limit, you can achieve image compression by setting the width and height
        var maxWidth = 400,
          maxHeight = 500;
        // target size
        var targetWidth = originWidth,
          targetHeight = originHeight;
        // Image size exceeds 300x300 limit
        if (originWidth > maxWidth || originHeight > maxHeight) {
          if (originWidth / originHeight > maxWidth / maxHeight) {
            // wider, size limited by width
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas scales the image
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // clear the canvas
        context.clearRect(0, 0, targetWidth, targetHeight);
        // Image Compression
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        /* The first parameter is the created img object; the second three parameters are the upper left corner coordinates, and the second two are the canvas area width and height */

        /*canvas.toDataURL(mimeType, qualityArgument), mimeType The default value is 'image/png';
         * qualityArgument indicates the quality of the exported image. This parameter is valid only when exported to jpeg and webp formats. The default value is 0.92*/
        var newUrl = canvas.toDataURL("image/jpeg", 0.92); //base64 format
        canvas.remove();
        // console.log(newUrl.length)

        resolve({
          data: {
            link: newUrl,
          },
        });
        // canvas.toBlob((blob)=>{
        //     console.log(blob)
        // // Pass the blob as a parameter to the backend
        // }, 'image/jpeg', 0.92)
      };
    });

  const convertImages = (html) => {
    // const regex =  /<img\s[^>]*?style\s*=\s*['\"]height([^'\"]*?)['\"][^>]*?>/g;
    const regex = /<img\s[^>]*?style\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/gm;
    let m;
    // let imgTag = regex.exec(html)
    // let htmlText = html.replace(regex,`<div style="text-align: center;width: 100%;">`+imgTag+'</div>')
    let htmlText = html;
    while ((m = regex.exec(htmlText)) !== null) {
      if (m.index === regex.lastIndex) regex.lastIndex++;
      let repl = null,
        type = null;
      m.forEach((match, groupIndex) => {
        if (groupIndex == 0) repl = match;
        if (groupIndex == 1) type = match;
        if (repl && type) {
          if (type.includes("none") || !type.includes("none"))
            htmlText = htmlText.replace(
              repl,
              `<div style="text-align: center;width: 100%;">` + repl + "</div>"
            );
          else
            htmlText = htmlText.replace(
              repl,
              `<div style="text-align ${type}; width: 100%;">` + repl + "</div>"
            );
          // console.log(type)
          repl = null;
          type = null;
        }
      });
    }
    return htmlText;
  };

  useEffect(()=>{
    if(blogData){
      setEditorState(insertHtmlToDraft())
    }
  },[blogData])

  return {
    convertImages,
    imageUploadCallBack,
    updateTextDescription,
    createMarkup,
    editorState,
  };
};

export default useRichTextEditor;
