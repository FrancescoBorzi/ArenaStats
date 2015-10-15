# ArenaStats

This is a simple web application built with [AngularJS](https://angularjs.org/) and [Bootstrap](http://getbootstrap.com) to show statistics about the Arena teams.

It is based on the [TrinityCore JSON RESTful API](https://github.com/ShinDarth/TC-JSON-API/).

![TrinityCore ArenaStats](https://raw.githubusercontent.com/ShinDarth/ArenaStats/master/screenshots/screenshot1.png "TrinityCore ArenaStats")

![TrinityCore ArenaStats](https://raw.githubusercontent.com/ShinDarth/ArenaStats/master/screenshots/screenshot2.png "TrinityCore ArenaStats")

## Installation

The application requires the [TrinityCore JSON RESTful API](https://github.com/ShinDarth/TC-JSON-API/) to access to the **characters** database.

Clone the ArenaStats folder inside your web server directory:

`git clone https://github.com/ShinDarth/ArenaStats.git`

Then copy the file **config.js.dist** to **config.js**, open it and set properly with the path of the API:

`app.api = "../TC-JSON-API/public/index.php/";`

and the name of your server:

`app.serverName = "YourServerName";`

### License

The TrinityCore Server Status is open-sourced software licensed under the [GNU GPL license](https://github.com/ShinDarth/ArenaStats/blob/master/LICENSE).
