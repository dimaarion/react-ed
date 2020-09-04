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
        <div className="form-group">
          <label htmlFor="width">Ширина</label>
          <input
            type="text"
            className="form-control"
            id="width"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Высота</label>
          <input
            type="text"
            className="form-control"
            id="height"
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
