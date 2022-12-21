import MeiliSearch from "meilisearch";

const client = new MeiliSearch({
  host: "https://admin.madhavinsurance.in/",
  apiKey:'MADHAV_SEARCH'
});

const indexSearch = client.getIndex("madhav_client_search");

export default indexSearch;