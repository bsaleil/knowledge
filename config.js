
const Config = {
  // Mongodb url
  db_url: "mongodb://localhost:27017",
  // If dump_on_start is true, the db will be dumped every time the app is started
  dump_on_start: true,
  // Location of the dumps
  dump_path: "~/.local/share/knowledge-dumps/"
};

module.exports = Config;
