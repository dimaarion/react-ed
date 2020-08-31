import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./bootstrap.css";

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
  function getSelectorEl(el, newclass) {
    return  el.classList.add(newclass);
  }
  useEffect(() => {
   [".rdw-dropdown-wrapper",".rdw-block-wrapper",".rdw-fontsize-wrapper",".rdw-fontfamily-wrapper",".rdw-text-align-dropdown",".rdw-list-dropdown",".rdw-colorpicker-wrapper",".rdw-link-wrapper",".rdw-embedded-wrapper",".rdw-emoji-wrapper",".rdw-image-wrapper",".rdw-remove-wrapper"].map((x)=>getSelectorEl(document.querySelector(x), "col-sm"));
  }, []);

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={"container"}
        toolbarClassName={"container row"}
        editorClassName={"container"}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true }
          }
        }}
      />
    </div>
  );
}

export default App;
