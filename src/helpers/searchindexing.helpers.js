import MeiliSearch from "meilisearch";
import { Client } from "../models/client.model";
import {v4 as uuidv4} from 'uuid'

class SearchHelper {
    #client;
    constructor(){
    this.#client = new MeiliSearch({
            host: 'https://admin.madhavinsurance.in',
            apiKey: 'MADHAV_SEARCH',
    });
    }
    async addIndex(clientData){
        const index = this.#client.index('madhav_client_search');
        await index.addDocuments([clientData]);
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



/*

docker run -it --rm \
  -p 7700:7700 \
  -e MEILI_MASTER_KEY='MADHAV_SEARCH'\
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v0.30

*/