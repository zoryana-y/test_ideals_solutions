import React, { Component } from "react";
import FormatFile from "./FormatFile";

// Instruments
import Dropzone from "react-dropzone";
import { Scrollbars } from "react-custom-scrollbars";

// Styles
import Styles from "./objectStyles";

export default class App extends Component {
  state = {
    allowMultileFiles: false,
    value: {},
    jsonError: "",
    accept: "application/json",
    dropzoneActive: false
  };

  _validateJson = json => {
    try {
      JSON.parse(json);
      this.setState({ jsonError: false });
    } catch (e) {
      this.setState({ jsonError: e.message, value: {} });
      return false;
    }
    return true;
  };

  _onDragEnter = () => {
    this.setState({
      dropzoneActive: true
    });
  };

  _onDragLeave = () => {
    this.setState({
      dropzoneActive: false
    });
  };

  _onFileDrop = e => {
    this.setState({
      dropzoneActive: false
    });

    if (window.FileReader) {
      const file = e[0];
      const reader = new FileReader();

      reader.onload = r => {
        if (this._validateJson(r.target.result)) {
          this.setState({ value: JSON.parse(r.target.result) });
        }
      };

      reader.readAsText(file);
    }
  };

  render() {
    const {
      allowMultileFiles,
      value,
      accept,
      dropzoneActive,
      jsonError
    } = this.state;

    return (
      <div style = {Styles.wrapper}>
        <Dropzone
          style={{ position: "relative" }}
          accept={accept}
          multiple={allowMultileFiles}
          disableClick={true}
          onDrop={this._onFileDrop}
          onDragEnter={this._onDragEnter}
          onDragLeave = {this._onDragLeave}
        >
          {dropzoneActive && (
            <div style={Styles.overlayStyle}>Drop file...</div>
          )}

          <div style={Styles.app}>
            <Scrollbars style={{ height: 600 }}>
              {Object.keys(value).length ? 
                <FormatFile data={value} />
               : 
                <div style={Styles.center}>Ready for JSON</div>
              }
            </Scrollbars>
          </div>
        </Dropzone>
        {jsonError ? <div style={Styles.error}>{jsonError}</div> : null}
      </div>
    );
  }
}

