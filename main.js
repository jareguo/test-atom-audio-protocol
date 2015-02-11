var Path = require('path');
var Url = require('url');

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  var Protocol = require('protocol');
  Protocol.registerProtocol('library', function(request) {
      var url = decodeURIComponent(request.url);
      var data = Url.parse(url);
      var relativePath = data.hostname;
      if ( data.pathname ) {
          relativePath = Path.join( relativePath, data.pathname );
      }
      var file = Path.join('library', relativePath);
      console.log('requesting', file);
      var result = new Protocol.RequestFileJob(file);
      return result;
  });


  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
