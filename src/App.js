import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Map } from "immutable";
import Move from "./Move";
import Full from "./Full";
import "./bootstrap.css";
import "./tolbar.css";
import "./editor.css";

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
  const [moveFull, setMoveFull] = useState(true)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = editorState => setEditorState(editorState);
  return (
    <div className="editor">
      <div onClick = {()=>setMoveFull(moveFull === false?true:false)}>
       {moveFull === true?<div className = "move"><Move/></div>:<div className = "full"><Full/></div>}
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: [
            "inline",
            "list",
            "fontSize",
            "fontFamily",
            "textAlign",
            "blockType",
            "link",
            "embedded",
            "image",
            "history"
          ],
          blockType: {
            inDropdown: false,
            className: "blockType",
            options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"]
          },
          inline: {
            inDropdown: false,
            className: "inline"
          },
          list: {
            inDropdown: false,
            className: "list"
          },
          textAlign: {
            inDropdown: false,
            className: "textAlign"
          },
          link: {
            inDropdown: false,
            className: "link"
          },
          history: {
            inDropdown: false,
            className: "history"
          },
          fontSize: {
            className: "fontSize"
          },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana"
            ],
            className: "fontFamily",
            component: undefined,
            dropdownClassName: undefined
          },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true, className: "image" }
          }
        }}
      />
    </div>
  );
}

export default App;
