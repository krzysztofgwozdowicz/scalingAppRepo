const http = require('http');
const pid = process.pid;


http.createServer((req,res) => {
    
    res.end(""+ Math.random() , ()=>{
        process.send(`message from process with pid: ${pid}`);
    } );
   

}).listen(8080,()=>{
    console.log('started process: ' + pid);
    
})