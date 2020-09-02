import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { EditorState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Map } from "immutable";
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = editorState => setEditorState(editorState);
  return (
    <div className="editor">
      <div>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-arrows-move"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"
          />
        </svg>
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
