const { spawn } = require('child_process');
const ls = spawn("dir",[],{
  shell: true,
  detached: true,
  
});

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
ls.on('error', (err) => {
    console.log(err);
  });