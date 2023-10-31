const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  User :{
    type :  mongoose.Schema.Types.ObjectId,
    required :true,
    ref : "user"
  },
  date:{
    type:  Date
  },
  productIdData: { 
    type: JSON,
    require: true
  },
  Clientinfo:{
    type:JSON,
    require:true
  }
  
});

 

const Invoice = mongoose.model('invoices', invoiceSchema);

module.exports = Invoice;