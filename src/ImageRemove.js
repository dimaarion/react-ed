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
          <label for="width">Email address</label>
          <input
            type="text"
            class="form-control"
            id="width"
           
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}
export default ImageRemove;
