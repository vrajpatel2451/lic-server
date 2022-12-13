const os = require('os');
const cluster = require('cluster');
const { MainServer } = require('./app');

const prodServer = () => {
    if (cluster.isPrimary) {
        console.log(`Primary ${process.pid} is running`);
      
        const numCPUs = os.cpus().length;
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died`);
          cluster.fork();
        });
    }else{
        const server = new MainServer();
        server.runServer();
        // runAppServer((port)=>{
        //     return ()=>{
        //             console.log(
        //                 `Server running at http://localhost:${port} on process ${process.pid}`
        //             );
        //     }
        // });
    }
}

module.exports = {
    prodServer
}