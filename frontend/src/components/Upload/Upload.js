import React from 'react'
import './Upload.css';

const Upload = ({img, ...rest}) => {
  return (
    <div className="upload">
      {img && <img className="upload-preview" src={img} alt="preview"/>}
      <input type="file" {...rest} required/>
    </div>
  )
}

export default Upload
