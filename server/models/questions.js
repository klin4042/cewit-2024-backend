var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionsSchema = new Schema({
    text: {type:String, required:true},
    choices: [{type: String, required:true}],
    correctAnswer: {type: String, required: true},
})

QuestionsSchema.virtual('url').get(function(){
    return 'post/questions/_id' + this.id;
})

module.exports = mongoose.model('Questions', QuestionsSchema);