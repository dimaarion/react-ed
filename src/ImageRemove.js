import React from "react";

function ImageRemove(props) {
  return (
    <div
      className="image_remove"
      style={{
        marginLeft: props.mouseImg.x + 20 + "px",
        marginTop: props.mouseImg.y - 100 + "px"
      }}
    >
      <div>
      <h3>Редактирование</h3> 
      <h3>изображения</h3>
        <div className="form-group">
          <label htmlFor="width">Email address</label>
          <input
            type="text"
            className="form-control"
            id="width"
           
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}
export default ImageRemove;
