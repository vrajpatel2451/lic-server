import MeiliSearch from "meilisearch";

const client = new MeiliSearch({
  host: "http://127.0.0.1:7700/",
  apiKey:'MADHAV_SEARCH'
});

const indexSearch = client.getIndex("madhav_client_search");

export default indexSearch;