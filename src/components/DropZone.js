import React from 'react'
import DropzoneComponent from 'react-dropzone-component';
import "dropzone/dist/min/dropzone.min.css";
var ReactDOMServer = require('react-dom/server');

let componentConfig = { 
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: false,
    postUrl: 'no-url'
 };

let dropzoneConfig = {
    acceptedFiles: ".jpeg,.jpg,.png,.gif",
    dictDefaultMessage: "Glisser déposer une image",
    autoProcessQueue: false,
    thumbnailHeight: 160,
    maxFilesize: 2,
    maxFiles:1,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview mb-3">
        <div className="d-flex flex-row ">
          <div className="p-0 w-30 position-relative">
            <div className="dz-error-mark">
              <span>
                <i />{" "}
              </span>
            </div>
            <div className="dz-success-mark">
              <span>
                <i />
              </span>
            </div>
            <div className="preview-container">
              {/*  eslint-disable-next-line jsx-a11y/alt-text */}
              <img data-dz-thumbnail className="img-thumbnail border-0" />
              <i className="simple-icon-doc preview-icon" />
            </div>
          </div>
          <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
            <div>
              {" "}
              <span data-dz-name />{" "}
            </div>
            <div className="text-primary text-extra-small" data-dz-size />
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress />
            </div>
            <div className="dz-error-message">
              <span data-dz-errormessage />
            </div>
          </div>
        </div>
        <a href="#/" className="remove" data-dz-remove>
          {" "}
          <i className="glyph-icon simple-icon-trash" />{" "}
        </a>
      </div>
    ),
    headers: { "My-Awesome-Header": "header value" }
  };

const DropZone = ({handleFile, removeFile}) => {
    let eventHandlers = {
            addedfile: (file) => handleFile(file),
            removedfile: (file) => removeFile(file)
        }
    return (
      <>
        <DropzoneComponent 
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={dropzoneConfig}
        />
      </>
    )
}

export default DropZone;
