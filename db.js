
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

// DB controller class. Responsible for creating and querying the db.
// This is a singleton class module ensuring only one db connection is
// created.
class AppDB {

  // Create db connection in constructor
  constructor(url) {
    this.client = new MongoClient(url);
  }

  // Return mongodb collection with the given name
  async _getCollection(name) {
    const database = await this.client.db('knowledge');
    return await database.collection(name);
  }

  //----------------------------------------------------------------------------
  // Definition

  // Add a new definition with given name and text
  async definitionAdd(name, text) {
    const collection = await this._getCollection('definitions');
    await collection.insertOne({name: name, text: text});
  }

  // Update the definition with given id. Update name and text. Assumes the definition exists
  async definitionEdit(id, name, text) {
    const collection = await this._getCollection('definitions');
    await collection.updateOne({_id: new ObjectId(id) }, {$set: {name: name, text: text }});
  }

  // Return an array with all definitions in db
  async definitionGetAll() {
    const collection = await this._getCollection('definitions');
    const cursor = await collection.find();
    return cursor.toArray();
  }

  // Return the definition with given id. Assumes the definition exists
  async definitionGetOne(id) {
    const collection = await this._getCollection('definitions');
    return await collection.findOne({_id: new ObjectId(id)});
  }

  // Remove the definition with given id. Assumes the definition exists
  async definitionRemove(id) {
    const collection = await this._getCollection('definitions');
    await collection.deleteOne({_id: new ObjectId(id)});
  }

  //----------------------------------------------------------------------------
  // Definition

  // Add a new note with given name and text
  async noteAdd(name, text) {
    const collection = await this._getCollection('notes');
    var result = await collection.insertOne({name: name, text: text});
    return result.insertedId;
  }

  // Update the note with given id. Update name and text. Assumes the note exists
  async noteEdit(id, name, text) {
    const collection = await this._getCollection('notes');
    await collection.updateOne({_id: new ObjectId(id) }, {$set: {name: name, text: text }});
  }

  // Return an array with all notes in db
  async noteGetAll() {
    const collection = await this._getCollection('notes');
    const cursor = await collection.find();
    return cursor.toArray();
  }
  
  // Return the note with given id. Assumes the note exists
  async noteGetOne(id) {
    const collection = await this._getCollection('notes');
    return await collection.findOne({_id: new ObjectId(id)});
  }
  
  // Remove the note with given id. Assumes the note exists
  async noteRemove(id) {
    const collection = await this._getCollection('notes');
    await collection.deleteOne({_id: new ObjectId(id)});
  }
}

module.exports = function (dbUrl) {
  if (!this.db)
    this.db = new AppDB(dbUrl);
  return this.db;
}
