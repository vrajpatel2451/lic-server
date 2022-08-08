import express from 'express' 
import cors from 'cors' 
import compression from 'compression';
import {connect,connection} from 'mongoose';
import { mainComposer } from './resolvers';
import { graphqlHTTP } from 'express-graphql';

class MainServer {
     #app;
     #port = parseInt(process.env.PORT) || 3000;
     #mongoUri = parseInt(process.env.MONGODB_URI) || 3000;
     #schema = mainComposer;

     constructor(){
         this.#app = express();
         this.config();
         this.mongo();
         this.routes();
     }

     config = () =>{
       this.#app.set('port', this.#port || 3000);
       this.#app.use(express.json());
       this.#app.use(express.urlencoded({ extended: false }));
       this.#app.use(compression());
       this.#app.use(cors());
     }
     
    extensions = ({ context }) => {
      return {
        runTime: Date.now() - context.startTime,
      };
    };

     routes=()=>{
       this.#app.use("/graphql",graphqlHTTP(()=>{
         return {
           context:{startTime:Date.now()},
           graphiql:true,
           schema: this.#schema,
           extensions: this.extensions, 
         }
       }))
     }
    
    mongo=()=>{
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
            connect(this.#mongoUri || '', {
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
    // const run = async () => {
    //   await connect(this.#mongoUri || '', {
    //     keepAlive: true,
    //   });
    // };
    // run().catch((error) => console.error("mongo error",error));
  }

    runServer = ()=>{
        this.#app.listen(
            this.#app.get('port'),
            ()=>{
              console.log(
                `Server running at http://localhost:${this.#app.get('port')}`
              );
            }
         )
     }
}