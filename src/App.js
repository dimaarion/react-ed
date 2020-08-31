import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = editorState => setEditorState(editorState);

  function getSelectorEl(el, newclass) {
    return el.classList.add(newclass);
  }

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        wrapperClassName={"container"}
        toolbarClassName={"container row"}
        editorClassName={"container"}
        toolbar={{
          blockType: {
            inDropdown: false,
            className: "row",
          },
          inline: { inDropdown: false,
          className: "col-sm",
          },
          list: { inDropdown: false,
          className: "col-sm",
           },
          textAlign: { inDropdown: false,
          className: "col-sm", },
          link: { inDropdown: false ,
          className: "col-sm",},
          history: { inDropdown: false,
          className: "col-sm", },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true,
            className: "col-sm" }
          }
        }}
      />
    </div>
  );
}

export default App;
