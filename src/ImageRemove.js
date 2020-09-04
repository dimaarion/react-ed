import React from "react";

function ImageRemove(props) {
  return (
    <div
      className="image_remove"
      style={{
        marginLeft: props.mouseImg.x + 20 + "px",
        marginTop: props.mouseImg.y  + "px"
      }}
    >
      <div>
      <h4>Редактирование</h4> 
      <h4>изображения</h4>
      <div>{props.razmerImg.t.split('/')[props.razmerImg.t.split('/').length - 1]}</div>
        <div className="form-group">
          <label htmlFor="width">Ширина</label>
          <input
            type="text"
            className="form-control"
            id="width"
            defaultValue = {props.razmerImg.w}
            onChange = {(e)=>props.setimgW(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Высота</label>
          <input
            type="text"
            className="form-control"
            id="height"
             defaultValue = {props.razmerImg.h}
               onChange = {(e)=>props.setimgH(e.target.value)}
          />
        </div>
       <div className="form-group">
          <label htmlFor="class">Класс</label>
          <input
            type="text"
            className="form-control"
            id="class"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </div>
    </div>
  );
}
export default ImageRemove;
