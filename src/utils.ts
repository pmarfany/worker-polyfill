const isFunction = (f: () => any) => {
  return typeof f === 'function';
};

/* HTTP Request*/
const getHTTPObject = () => {
  let xmlhttp;
  try {
    xmlhttp = new XMLHttpRequest();
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      xmlhttp = false;
    }
  }
  return xmlhttp;
};

export { isFunction, getHTTPObject };
