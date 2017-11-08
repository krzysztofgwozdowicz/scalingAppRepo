const {fork} = require('child_process');
const forked = fork('forkChild.js');
const forked2 = fork('forkChild.js');
    forked.send("zzz");
    forked2.send("calculate");
forked.on('message',(msg)=>{
    console.log('msg from fork: ', msg);
    forked.send("Ping to fork");
});


forked2.on('message',(msg)=>{
    console.log('msg from fork2: ', msg);
    if(msg!=="Pong"){forked.kill(); }

    
});