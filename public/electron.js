const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

// Set default port for express app
const PORT = process.env.PORT || 3001

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 820,
        minWidth: 1400,
        minHeight: 820,
        center: true,
        icon: "",
        autoHideMenuBar: isDev ? false : true,
        webPreferences:{
            webSecurity: true,
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            sandbox: false,
        },
    });

    mainWindow.maximize();
    mainWindow.show();
    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );

    if(isDev){
      mainWindow.webContents.openDevTools();
    }

    const server = require('../server/server.js');
    // Start express app
    server.listen(PORT, function(req, res, next) {
      console.log(`Server is running on: ${PORT}`)
    })

    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
});
