
var Config = require('./config');
var DB = require('./db')(Config.db_url); // DB needs to be required first
var express = require('express');
var routesDefinition = require('./routes/definition');
var routesNote = require('./routes/note');
var exec = require("child_process").exec;

function dumpDb() {
  var exportString = Config.dump_path + "/knowledge-db-dump-epoch-" + Date.now() + ".dump";
  exec("mongodump --quiet --db=knowledge -o " + exportString, function(error, stdout, stderr) {
    if (error || stderr) {
      console.log("Error: Cannot generate db backup.");
      process.exit(); // Exit to be sure the user is aware that backups are failing
    }
  });
}

// Dump DB on app start if needed
if (Config.dump_on_start)
  dumpDb();

// Setup express app
var app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());

// Add root route
app.get('/', function(req, res){
  res.redirect('/definition');
});

// Add sub-routes from external files
app.use('/definition', routesDefinition);
app.use('/note', routesNote);

app.listen(3000, function (err) {
  if (err) {
    console.log("Cannot start server on port 3000");
    process.exit();
  }
});
