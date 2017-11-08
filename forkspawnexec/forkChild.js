var calculate= function(){
    sum=0
    for(var i = 0; i<1e9; i++){sum++;};
return sum;};


process.on('message', (msg)=> {
    console.log("message from PARENT: ", msg)
        if (msg === "calculate"){
           
            var calculatedValue = calculate();
            process.send(calculatedValue);

        }else {
            process.send("Pong");
        }

        })


