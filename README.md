A simple script that emulates web worker threads in non compatible browsers.
The code will still be slow (single threaded) but you can keep you code consistent.

Usage:
```
// You must check for compatibility before loading the polyfill
if ( !Worker ) { require('worker-loader'); }
```

Workers can be loaded and used as usual:
```
var worker = new Worker("your_script.js");  

worker.onmessage = function(event) {  
	alert("Got: " + event.data);  
};  

worker.onerror = function(error) {  
	alert("Worker error: " + error);  
};

worker.postMessage("Hello World"); 
```

'addEventListener' methods are also supported:

```
var worker = new Worker("your_script.js");

worker.addEventListener("message", function(event) {  
	alert("Got: " + event.data);  
});

worker.addEventListener("error", function(error) {  
	alert("Worker error: " + error);  
});

worker.postMessage("Hello World");
```

- For more info on worker threads see
https://developer.mozilla.org/En/Using_web_workers

- Originally exported from Google Code (https://code.google.com/p/ie-web-worker/).