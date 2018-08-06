// Colors
const grey = '#505050';
const orange = '#cc7832';
const red = '#ff0000';
const white = '#ffffff';
const blue = '#6591b4';

export default {
  wrapper: {
    display: 'grid',
    height: '100vh',
    margin: 0,
    placeItems: 'center center'
  },
  app: {
    position: 'relative',
    width: '900px',
    height: '600px',
    border: '3px solid #999',
    padding: '20px',
    color: grey,
    boxShadow: '0px 3px 26px 6px rgba(173,170,173,1)',
    borderRadius: '10px',
  },
  center: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30%',
  },
  name: {
    fontStyle: 'italic',
    color: '#8c6e9c',
  },
  value: {
    null: {
      color: orange,
    },
    undefined: {
      color: red,
    },
    string: {
      color: grey,
    },
    symbol: {
      color: blue,
    },
    number: {
      color: blue,
    },
    boolean: {
      color: orange,
      fontWeight: 'bold'
    },
    function: {
      keyword: {
        color: 'rgb(170, 13, 145)',
        fontStyle: 'italic',
      },
      name: {
        fontStyle: 'italic',
      },
    },
  },
  scrollBar: {
    width: 400, 
    display: 'inline-block',
    verticalAlign: 'top'
  },
  counter: {
    background: '#6591b4',
    color: 'white',
    borderRadius: '100%',
    padding: '0px 4px',
    lineHeight: '15px',
    fontSize: '11px',
    display: 'inline-block',
    verticalAlign: 'text-top'
  },
  overlayStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: white,
    },
  error: {
    border: '1px solid #ff0000',
    background: '#fff0f0',
    color: red,
    width: '900px',
    margin: '0 auto',
    padding: '5px 20px',
  },
    base: {
    fontFamily: 'Menlo, monospace',
    fontSize: '14px',
    lineHeight: '18px',
    cursor: 'default',
  },
  propertyNodesContainer: {
    paddingLeft: '12px',
  },
  unselectable: {
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    OUserSelect: 'none',
    userSelect: 'none',
  },
  expandControl: {
    color: '#6e6e6e',
    fontSize: '10px',
    marginRight: '3px',
    whiteSpace: 'pre',
  },
  property: {
    paddingTop: '2px',
  },  
};