import React, { Component } from "react";
import JsonPreview from "./JsonPreview";
import JsonDescription from "./JsonDescription";

// Instuments
import { getUniqueID } from "./instruments";
import { Scrollbars } from "react-custom-scrollbars";

// Styles
import Styles from "./objectStyles";

export default class FormatFile extends Component {
  static defaultProps = {
    data: [],
    path: "root",
    depth: 0,
    name: undefined
  };

  constructor(props) {
    super(props);

    if (props.depth === 0) {
      this.state = {
        expandedPaths: {}
      };
      if (props.path === "root") {
        this.state.expandedPaths[props.path] = true;
      } else {
        this.state.expandedPaths[props.path] = false;
      }
    }
  }

  static isExpandable(data) {
    return (
      (typeof data === "object" &&
        data !== null &&
        Object.keys(data).length > 0) ||
      (typeof data === "string" && data.length > 10)
    );
  }

  getExpanded = path => {
    const expandedPaths = this.state.expandedPaths;
    if (typeof expandedPaths[path] !== "undefined") {
      return expandedPaths[path];
    }
    return false;
  };

  setExpanded = (path, expanded) => {
    const expandedPaths = this.state.expandedPaths;
    expandedPaths[path] = expanded;
    this.setState({ expandedPaths: expandedPaths });
  };

  handleClick = () => {
    const { data, depth, path } = this.props;
    if (FormatFile.isExpandable(data)) {
      if (depth > 0) {
        this.props.setExpanded(
          path,
          !this.props.getExpanded(path)
        );
      } else {
        this.setExpanded(path, !this.getExpanded(path));
      }
    }
  };

  render() {
    const { data, name, path, depth } = this.props;

    const setExpanded = depth === 0 ? this.setExpanded : this.props.setExpanded;
    const getExpanded = depth === 0 ? this.getExpanded : this.props.getExpanded;
    const expanded = getExpanded(path);

    const expandGlyph = FormatFile.isExpandable(data)
      ? expanded
        ? "▼"
        : "▶"
      : depth === 0
        ? "" 
        : " ";

    let nestedElemBlock;
    if (expanded && typeof data === "object") {
      let nestedElem = [];
      for (let key in data) {
        const elemValue = data[key];

        if (data.hasOwnProperty(key)) {
          nestedElem.push(
            <FormatFile
              path={`${path}.${key}`}
              depth={depth + 1}
              name={key}
              key={getUniqueID()}
              data={elemValue}
              getExpanded={getExpanded}
              setExpanded={setExpanded}
            />
          );
        }
      }
      nestedElemBlock = (
        <div style={Styles.propertyNodesContainer}>{nestedElem}</div>
      );
    }

    const counter =
      Object.keys(data).length > 1 ? (
        <span style={Styles.counter}>{Object.keys(data).length}</span>
      ) : null;
    return (
      <div style={Styles.base}>
        <span style={Styles.property}>
          <span
            style={{ ...Styles.expandControl, ...Styles.unselectable }}
            onClick={this.handleClick}
          >
            {expandGlyph}
          </span>

          {(() => {
            if (typeof name !== "undefined" && !expanded) {
              return (
                <span>
                  <span style={Styles.name}>{name}: </span>
                  <JsonPreview element={data} />
                </span>
              );
            } else if (typeof data === "string") {
              return (
                <span>
                  <span style={Styles.name}>{name}: </span>
                  <Scrollbars
                    style={Styles.scrollBar}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={200}
                  >
                    <JsonDescription element={data} />
                  </Scrollbars>
                </span>
              );
            } else {
              return (
                <span>
                  {counter}
                  <span>
                    <JsonDescription element={data} />{" "}
                  </span>
                </span>
              );
            }
          })()}
        </span>
        <div className="nestedBlock">{nestedElemBlock}</div>
      </div>
    );
  }
}
