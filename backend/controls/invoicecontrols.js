const Invoice = require("../models/invoicemodel");
const Prodcut = require("../models/productmodel");
const pdfMake = require('pdfmake/build/pdfmake');
const pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const createinvoice = async (req,res)=>{
    try {
        const bodyData = Object.values(req.body);
       const productIds = bodyData.map((data) => data.id);
       const clientinfo = bodyData.map((data) => [data.clintinfo]);
       
        const dataPromises = bodyData.map((data) => {
           return Prodcut.findByIdAndUpdate(data.id, {$inc: {quantity : -data.quantity}});
           
        })
        
        
        await Promise.all(dataPromises) 
        const products = await Prodcut.find({_id: { $in: productIds}})
        const info = clientinfo[0][0]
        const clientname = info.clientname
        const address = info.address
        const email = info.email
        const contact = info.contactnumber
        const invoicenumber = info.invoicenumber
        const newinfo = [{clientname:clientname,address:address,email:email,invoicenumber:invoicenumber,contact:contact}]
        const newinvoice = await Invoice.create({User:req.user.id,date:Date.now(),productIdData:bodyData,Clientinfo:newinfo});

      
        const docDefinition = {
          content: [
           
        { text: 'Address :- Gulbahar no 4 ', style: 'subheader' },
        { text: 'contact :- 091****** ', style: 'subheader' },
        

        
        {
            table: {
              widths: ['auto', 'auto','auto','auto','auto'],
              body: [
                [ 'Quantity','finalprice','INnumber','ICnumber','Ordernumber'],
                ...bodyData.map((item)=>[item.quantity,item.finalprice,item.INnumber,item.ICnumber,item.ordernumber])
              ],
            },
          },
        { text: 'Items:', style: 'subheader' },
        
        //Add other sections as needed
      ],
      styles: {
        header: { fontSize: 28, bold: true, margin: [190, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
        tableHeader: { bold: true, fontSize: 13, color: 'black' },
        
        header1: { fontSize: 38, bold: true, margin: [170, 0, 0, 10] },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBuffer((buffer) => {
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice_${10}.pdf`,
        'Content-Length': buffer.length,
      });
      res.end(Buffer.from(buffer, 'binary'));
    });
      } catch (error) {
        console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Failed to generate PDF' });
      }
}
const invoicehistory = async (req,res)=>{
  try {
    const response = await Invoice.find({User:req.user.id}) 
     res.status(200).json(response)
  } catch (error) {
    res.status(400).json("Invoice not found")
  }

}

module.exports = {createinvoice,invoicehistory}