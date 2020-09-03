import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { EditorState, RichUtils, Modifier, ContentBlock } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Map } from "immutable";
import Move from "./Move";
import Full from "./Full";
import ImageRemove from "./ImageRemove";
import CustomOption from "./CustomOption";
import "./bootstrap.css";
import "./tolbar.css";
import "./editor.css";

function App() {
  const [moveFull, setMoveFull] = useState(true);
  const [imageR, setimageR] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = editorState => setEditorState(editorState);
  const contentState = editorState.getCurrentContent();

  useEffect(() => {
    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    var selectedText = currentContentBlock.getText().slice(start, end);
    Object.values(
      document.querySelector(".editor-class").getElementsByTagName("div")
    ).map(
      x =>
        (x.onmouseover = e => {
          e.target.tagName === "IMG"
            ? setimageR(true)
            : "";
        })
    );
     Object.values(
      document.querySelector(".editor-class").getElementsByTagName("div")
    ).map(
      x =>
        (x.onmouseout = e => {
          e.target.tagName === "IMG"
            ? setimageR(false)
            : "";
        })
    );
    //console.log(selectionState)
  }, [editorState]);

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
      {imageR + ''}
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
              width: "100%"
            }
          }
        }}
        toolbarCustomButtons={[<CustomOption />]}
      />
    </div>
  );
}

export default App;
