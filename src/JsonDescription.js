import React, { Component } from 'react';

// Styles
import Styles from './objectStyles';


export default class JsonDescription extends Component {
   _sortElements = (arr, separateBy) => {
    if(arr.lenght === 0) {
      return []
    } 

    return arr.slice(1).reduce((previousValue, currentValue) => {
       return previousValue.concat([separateBy,currentValue])
    }, [arr[0]]);

  }

  render() {
    const { element } = this.props;

    switch (typeof element) {
      case 'number':
        return (<span style = { Styles.value.number }>{ element }</span>);
      case 'string':
        return (<span style = { Styles.value.string }>"{ element }"</span>);
      case 'underfined':
        return (<span style = { Styles.value.underfined }>underfined</span>);
      case 'boolean': 
        return (<span style = { Styles.value.boolean }>{String(element)}</span>)  
      case 'object':
        if (element === null)  {
          return (<span>null</span>)
        }
        if (element instanceof Date ) {
          return (<span style = { Styles.value.string }>{ element.toString() }</span>)
        }

        if ( Array.isArray(element) ) {
          return (<span>[...]</span>);
        }
        else {
          return (<span>{'{...}'}</span>)
        }
      case 'function':
        return (<span>
                  <span style={Styles.value.function.keyword}>function</span>
                  <span style={Styles.value.function.name}>&nbsp;{element.name}()</span>
                </span>);
      case 'symbol':
        return (<span style={Styles.value.symbol}>Symbol()</span>)  
      default: 
        return (<span></span>); 
    }
  }
}