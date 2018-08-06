import React, { Component } from "react";

import JsonDescription from "./JsonDescription";
import { getUniqueID } from "./instruments";

// Styles
import Styles from "./objectStyles";

export default class JsonPreview extends Component {
  static defaultProps = {
    maxProperties: 3
  };

  _sortElements = (arr, separateBy) => {
    if (arr.lenght === 0) {
      return [];
    }

    return arr.slice(1).reduce(
      (previousValue, currentValue) => {
        return previousValue.concat([separateBy, currentValue]);
      },
      [arr[0]]
    );
  };

  render() {
    const { element } = this.props;

    if (typeof element === "string" && element.length > 10) {
      const previewElem = element.slice(0, 10);
      return <JsonDescription element={previewElem.concat("...")} />;
    } else if (typeof element !== "object" || element === null) {
      return <JsonDescription element={element} />;
    }

    if (Array.isArray(element)) {
      let ellipsis;
      let arrayList = element;

      if (element.length > this.props.maxProperties - 1) {
        arrayList = element.slice(0, 3);
        ellipsis = <span key={"ellipsis"}>, ...</span>;
      }

      return (
        <span>
          {element.length > 1 ? (
            <span style={Styles.counter}>{element.length}</span>
          ) : null}
          <span>
            [
            {this._sortElements(
              arrayList.map((item, index) => (
                <JsonDescription key={index} element={item} />
              )),
              ", "
            )}
            {ellipsis}]
          </span>
        </span>
      );
    } else if (element instanceof Date) {
      return <span style = {Styles.string}>{element.toSting()}</span>;
    } else {
      let nestedElem = [];
      for (let key in element) {
        let elemValue = element[key];
        let ellipsis;
        if (
          nestedElem.length === this.props.maxProperties - 1 &&
          Object.keys(element).length > this.props.maxProperties
        ) {
          ellipsis = <span key={"ellipsis"}>, ...</span>;
        }

        if (element.hasOwnProperty(key)) {
          if (typeof elemValue === "string" && elemValue.length > 10) {
            elemValue = elemValue.slice(0, 10).concat("...");
          }
          nestedElem.push(
            <span key={getUniqueID()}>
              <span style={Styles.name}>{key}: </span>
              <span>
                <JsonDescription element={elemValue} />
                {ellipsis}
              </span>
            </span>
          );
          if (ellipsis) break;
        }
      }

      return (
        <span>
          <span>
            {nestedElem.length > 1 ? (
              <span style={Styles.counter}>{nestedElem.length}</span>
            ) : null}
            {"{ "}
          </span>
          {this._sortElements(nestedElem, ", ")}
          <span>{" }"}</span>
        </span>
      );
    }
  }
}
