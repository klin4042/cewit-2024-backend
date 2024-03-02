var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionsSchema = new Schema({
    text: {type:String, required:true},
})

module.exports = mongoose.model('Questions', QuestionsSchema);