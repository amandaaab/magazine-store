module.exports = mongoose.model('Product', new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    price: Number,
    vat: Number,
    artnr: {type: String, unique: true}
}));//Alla filer i en applikation är ett objekt, här skapar vi en "model för tabell"