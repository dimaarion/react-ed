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
  useEffect(() => {
    document
      .querySelector(".toolbar")
      .appendChild(
        document.body.appendChild(document.createElement("div"))
      ).className = "inlein_list col row";
    const inline = document
      .querySelector(".inlein_list")
      .appendChild(document.querySelector(".inline"))
      .getElementsByTagName("div");
    Object.values(inline).map(x => (x.classList.add = "col"));
    const list = document
      .querySelector(".inlein_list")
      .appendChild(document.querySelector(".list"))
      .getElementsByClassName("rdw-option-wrapper");
    Object.values(list).map(x => (x.className = x.className.replace( /(?:^|\s)rdw-option-wrapper(?!\S)/g , 'col' )));
  }, []);
  return (
    <div className="editor">
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
          list: { inDropdown: false, className: "row col list" ,dropdownClassName:"col"},
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
