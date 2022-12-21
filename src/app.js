import express from 'express' 
import 'dotenv/config';
import cors from 'cors';
import path from 'path'; 
import compression from 'compression';
import {connect,connection} from 'mongoose';
import AuthRoutes from './routes/auth.routes';
import BranchRoutes from './routes/branch.routes';
import DepartmentRoutes from './routes/department.routes';
import ClientRoutes from './routes/clients.routes';
import TaskRoutes from './routes/task.routes';
import swaggerIgnite from './utils/swagger.util';
import WorkRoleRoutes from './routes/workRoles.routes';
import PolicyRoutes from './routes/polciy.routes';
import MyScheduler from './helpers/schedular.helper';
import SearchHelper from './helpers/searchindexing.helpers';
export class MainServer {
     #app;
     #port = parseInt(process.env.PORT) || 3000;
     #mongoUri = process.env.MONGODB_URI_PROD || 'ab';
     
     constructor(){
       this.#port = parseInt(process.env.PORT) || 3000;
          this.#mongoUri = process.env.MONGODB_URI_PROD || '';
         this.#app = express();
         this.#config();
         this.#mongo();
         this.#routes();
         this.#initSwaggerDocs();
     }

     #config = () =>{
       global.mydir = __dirname
       this.#app.set('port', this.#port || 3000);
       this.#app.use(express.json());
       this.#app.use(express.urlencoded({ extended: false }));
       this.#app.use(compression());
       this.#app.use(cors());
       global.agenda = new MyScheduler().agenda;
       this.#app.use(
        express.static(path.join(__dirname, "./client/dist"))
      );
     }

     #routes=()=>{
      this.#app.use('/static', express.static('uploads'));
      this.#app.use('/api/auth', new AuthRoutes().router);
      this.#app.use('/api/branch', new BranchRoutes().router);
      this.#app.use('/api/department', new DepartmentRoutes().router);
      this.#app.use('/api/client', new ClientRoutes().router);
      this.#app.use('/api/task', new TaskRoutes().router);
      this.#app.use('/api/workrole', new WorkRoleRoutes().router);
      this.#app.use('/api/policy', new PolicyRoutes().router);
      // this.#app.get('/', (req,res)=>{
      //   return res.send('<h1>Lic App</h1>')
      // });
      this.#app.get("*", async(req, res) => {
        try {
          res.sendFile(
            path.join(__dirname, "./client/dist/index.html")
            );
          } catch (error) {
            res.status(200).send('no file')
          }
      });
     }
    
    #mongo=()=>{
        connection.on('connected', () => {
          console.log('Mongo Connection Established');
        });
        connection.on('reconnected', () => {
          console.log('Mongo Connection Reestablished');
        });
        connection.on('disconnected', () => {
          console.log('Mongo Connection Disconnected');
          console.log('Trying to reconnect to Mongo ...');
          setTimeout(() => {
            connect(this.#mongoUri, {
              keepAlive: true,
              socketTimeoutMS: 3000,
              connectTimeoutMS: 3000,
            });
          }, 3000);
        });
        connection.on('close', () => {
          console.log('Mongo Connection Closed');
        });
        connection.on('error', (error) => {
          console.log(`Mongo Connection ERROR: ${error}`);
        });
    const run = async() => {
      await connect(this.#mongoUri, {
        keepAlive: true,
      });
    };
    run().catch((error) => console.error("mongo error",error));
  }

  #initSwaggerDocs() {
    swaggerIgnite(this.#app);
  }

    runServer = ()=>{
      global.agenda.on('ready',()=>{
        this.#app.listen(
          this.#app.get('port'),
          ()=>{
            console.log(
              `Server running at http://localhost:${this.#app.get('port')}`
              );
            }
            )
          })
     }
}



const searchServer = new SearchHelper();
if(process.env.IS_SEARCH_BUILD==="1"){
  connection.on('connected',async()=>{
    console.log('search connected');
    await searchServer.defineIndex();
  });
}
// else{
//   console.log('search connected dev');
  // server.runServer();
// }
// const server = new MainServer();

