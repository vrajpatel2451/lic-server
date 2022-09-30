import MeiliSearch from "meilisearch";
import { Client } from "../models/client.model";
import {v4 as uuidv4} from 'uuid'

class SearchHelper {
    #client;
    constructor(){
    this.#client = new MeiliSearch({
            host: 'http://127.0.0.1:7700',
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