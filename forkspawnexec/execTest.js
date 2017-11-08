// used to run exact shell commands

const {exec} = require('child_process');
exec('node spawnTest.js',(err,stdout,stderr)=> {console.log(stdout)})