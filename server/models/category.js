module.exports = mongoose.model('Category', new mongoose.Schema({
    name: {type: String, required: true},
    id: {type: Number, unique:true, required:true}
}));//Alla filer i en applikation är ett objekt, här skapar vi en "model för tabell"