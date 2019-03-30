/*
	Create a fake worker thread of IE and other browsers
	Remember: Only pass in primitives, and there is none of the native security happening
	Only Supports Dedicated Web Workers
*/
import {getHTTPObject, isFunction} from "./utils";

// @ts-ignore
Worker = function (scriptFile: any) {
  let self = this;
  let __timer: number = null;
  let __text: any = null;
  let __fileContent: any = null;

  // External methods (worker.METHOD)
  self.onmessage = null;
  self.onerror = null;

  // Child methods
  let onmessage;
  let onerror;

  // Child runs this itself and calls for it's parent to be notified
  const postMessage = function (data: any) {
    if ( isFunction(self.onmessage) ) {
      return self.onmessage({ data });
    }
    return false;
  };

  // Method that starts the threading
  self.postMessage = function (text: any) {
    __text = text;
    __iterate();
    return true;
  };

  // Child can call this method instead of assigning methods directly
  const addEventListener = function (type, callback) {
    switch(type) {
      case 'message':
        onmessage = callback;
        break;
      case 'error':
        onerror = callback;
        break;
    }
  };

  // Parent can call this method instead of assigning methods directly
  self.addEventListener = function (type, callback) {
    switch(type) {
      case 'message':
        self.onmessage = callback;
        break;
      case 'error':
        self.onerror = callback;
        break;
    }
  };

  const __iterate = function () {
    // Execute on a timer so we don't block (well as good as we can get in a single thread)
    __timer = setTimeout(__onIterate, 1);
    return true;
  };

  const __onIterate = function () {
    try {
      if ( isFunction(onmessage) ) {
        onmessage({ data: __text });
      }
      return true;
    } catch (e) {
      if ( isFunction(onerror) ) {
        return onerror(e);
      }
    }
    return false;
  };

  self.terminate = function () {
    clearTimeout(__timer);
    return true;
  };

  const importScripts = function () {
    // Turn arguments from pseudo-array in to array in order to iterate it
    const params = Array.prototype.slice.call(arguments);

    for (let i = 0, j = params.length; i < j; i++) {
      const script = document.createElement('script');
      script.src = params[i];
      script.setAttribute('type', 'text/javascript');
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  };

  const http = getHTTPObject();
  http.open("GET", scriptFile, false);
  http.send(null);

  if (http.readyState == 4) {
    const strResponse = http.responseText;

    if (http.status !== 404 && http.status !== 500) {
      __fileContent = strResponse;
      // IE functions will become delagates of the instance of Worker
      eval(__fileContent);
    }
  }

  return true;
};
