import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { EditorState,RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import {Map} from 'immutable';
import "./bootstrap.css";
import "./tolbar.css";

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      // reject(error);
    });
  });
}

function App() {
  const [headerT, setHeaderT] = useState(false);
  const [listClass, setlistClass] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = editorState => setEditorState(editorState);

  function getSelectorEl(el, newclass) {
    return el.classList.add(newclass);
  }

  function bold(){
    return console.log(setEditorState(RichUtils.toggleInlineStyle(editorState,'BOLD')))
  }
  

  return (
    <div className="editor">
    <div onClick = {()=>bold()}>BOLD</div>
    <div onClick = {()=>setEditorState(RichUtils.toggleBlockType(editorState,'H1'))}>TEST</div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={"container"}
        toolbarClassName={"container  toolbar"}
        editorClassName={"container"}
        toolbar={{
          options: [
            "inline",
            "list",
            "blockType",
            "fontSize",
            "fontFamily",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history"
          ],
          blockType: {
            inDropdown: false,
            className: "row"
          },
          inline: { inDropdown: false, className: "row col inline",dropdownClassName:"col" },
          list: { inDropdown: false, className: "row col list" ,dropdownClassName:"col", icon:{className:'ddd'}},
          textAlign: { inDropdown: false, className: "row" },
          link: { inDropdown: false, className: "row" },
          history: { inDropdown: false, className: "row" },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true, className: "row" }
          }
        }}
      
      />
    </div>
  );
}

export default App;
