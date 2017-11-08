

// cluster pozwala na stworzenie aplikacji clusterowej, a zwłąszcza na sprawdzenie czy 
// obecnie uruchomiona instancja aplikacji jest główną czy forkowaną
var cluster = require('cluster');
var os = require('os');

// jezeli dana instancja cluster'a jest Główną, tworzy forki
if(cluster.isMaster){
// zmienna zawierajaca ilosc CPU dostępnych na komputerze
 const cpus = os.cpus().length;
 console.log(`forking our server for ${cpus} CPUs`);
 // zmienna tablicowa zawierająca obiekty typu Worker
 var clusterArray=[]
 // w tej pętli tworzymy forki naszej aplikacji, i ich obiekty zapisujemy do tablicy
 for(let i=0;i<cpus;i++){
      clusterArray[i]=cluster.fork();
 
    }

 setInterval(()=>{
     var index = Math.floor(Math.random()*(4))
     console.log(`zabijam process o indeksie ${index}`);
     var workerDoUsuniecia =  clusterArray[index];
     
      workerDoUsuniecia.kill();

 },1000)


// co ma się wykonaćjak worker zostanie utworzony, bądz jego status zmieni się na online
cluster.on("online",(worker)=>{
    console.log("created new worker with pid:"+worker.process.pid);
    console.log("number of processes online: " + clusterArray.length);
    console.log("address of "+ worker.process.pid+" in clusterArray is: "+clusterArray.indexOf(worker));
   
});

// co ma sie stac jak worker wyśle jakąś wiadomość do całego clusteru
cluster.on("message",(worker,message,handle)=>{
    
    console.log(message);
});



// co ma się stać gdy worker zostanie wyłączony (np. proces się zcrashuje)
cluster.on("exit",(worker,code,signal)=> {
    clusterArray.splice(clusterArray.indexOf(worker),1);
    console.log(`process ${worker.process.pid} exited with code: ${code} and signal: ${signal}. Crating new process ... `);
    clusterArray.push(cluster.fork());
});
// Po tym elsie określamy co ma się dziać gdy forkujemy naszą aplikację
} else {
    // w tym przypadku wywołuje (uruchamia) skrypt z pliku server.js
    require('./server')
    
 }
 kekekekekekek