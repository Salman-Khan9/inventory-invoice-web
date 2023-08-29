const multer = require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
  
    cb(null, new Date().toISOString().replace(/:/g,"-")+ "-"+file.originalname )
  }
})
//filefilter which file can be accepted
function fileFilter (req, file, cb) {

  if(file.mimetype==="image/jpg"||
  file.mimetype==="image/png"||
  file.mimetype==="image/jpeg"  
  ){
    cb(null, true)
  }else{
    cb(null, false)
  }
    
    }
    //file size formatter
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
    
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        const base = 1024;
        const log = Math.floor(Math.log(bytes) / Math.log(base));
        const size = (bytes / Math.pow(base, log)).toFixed(2);
    
        return `${size} ${units[log]}`;
    }
    
   
  

const upload = multer({ storage,fileFilter })
module.exports = {upload,formatFileSize}