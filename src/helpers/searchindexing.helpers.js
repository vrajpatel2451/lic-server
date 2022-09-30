import MeiliSearch from "meilisearch";
import { Client } from "../models/client.model";
import {v4 as uuidv4} from 'uuid'

class SearchHelper {
    #client;
    constructor(){
    this.#client = new MeiliSearch({
            host: 'http://https://1f5a-2401-4900-1f3f-7a39-c7f-a46f-5c35-d4fc.in.ngrok.io',
            apiKey: 'MADHAV_SEARCH',
    });
    }
    async addIndex(clientData){
        await this.#client.createIndex(uuidv4(),clientData);
    }
    async defineIndex(){
        try {
            const index = this.#client.index('madhav_client_search');
            const data = await Client.find().populate('contact').populate('branch');
            const res = await index.addDocuments(data);
            console.log(res);
        } catch (error) {
            console.log('err',error);
        }
    }

}

export default SearchHelper;