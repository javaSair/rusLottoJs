 let mongoose = require('mongoose');
const Mixed = mongoose.Schema.Types.Mixed;


let schemeLotto = new mongoose.Schema({
   table: {type:Object}
})

mongoose.model('lottoModel', schemeLotto, 'lotto');


// cmd in mongo
// просмотр содержимого коллекции
//db.mongoschemashopaccount.find()
//---------------------------------
// добавить в коллекцию новую запись
// db.mongoschemashopaccount.save({dataName:dataValue})
//---------------------------------
//просмотр списка коллекций
// show collections
//---------------------------------
//просмотр списка баз монго
// show dbs
//---------------------------------
//переключится на конкретную базу монго
// use namedbs
//---------------------------------
//отформатироват красиво вывод
//включить в конец команды .pretty()
//---------------------------------
// добавить в коллекцию поддокумент
// db.nameCollection.update({"searchName":"searchValue"},{$push{poddokumentName:{name:value}}})
//-----------------------------------
// удалить коллекцию
// db.nameCollection.drop()
//удалить запись в коллекции
//db.nameCollection.remove({name:value})
//------------------------------------
//
