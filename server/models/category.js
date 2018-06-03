module.exports = mongoose.model('Category', new mongoose.Schema({
    name: String
}));//Alla filer i en applikation är ett objekt, här skapar vi en "model för tabell"