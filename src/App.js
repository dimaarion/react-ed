import React, { useState, useEffect,Component } from "react";
import PropTypes from 'prop-types';
import { render } from "react-dom";
import { EditorState, RichUtils, Modifier } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Map } from "immutable";
import Move from "./Move";
import Full from "./Full";
import "./bootstrap.css";
import "./tolbar.css";
import "./editor.css";

function App() {
  const [moveFull, setMoveFull] = useState(true);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = editorState => setEditorState(editorState);
 
 

  return (
    <div className="editor">
      <div onClick={() => setMoveFull(moveFull === false ? true : false)}>
        {moveFull === true ? (
          <div className="move">
            <Move />
          </div>
        ) : (
          <div className="full">
            <Full />
          </div>
        )}
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
            
            alt: { present: true, mandatory: true, className: "image" },
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: false,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: true,
            defaultSize: {
              height: "auto",
              width: "auto"
            }
          }
        }}
      />
    </div>
  );
}

export default App;
