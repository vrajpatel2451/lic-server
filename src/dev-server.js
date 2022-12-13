import { MainServer } from "./app"

export const devServer = () =>{
    const server = new MainServer();
    server.runServer();
}