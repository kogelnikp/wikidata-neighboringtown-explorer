const endpointUrl = 'https://query.wikidata.org/sparql';

export default {
  /**
  * Fetches the municipality object with the given key
  * @param {string} municipalityKey 
  */
  async getMunicipality(municipalityKey) {
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${municipalityKey}.json`;
    return await fetch(url)
      .then(body => body.json())
      .then(j => ({ 
        key: municipalityKey,
        label: j.entities[municipalityKey].labels.de.value,
        wikipediaUrl: j.entities[municipalityKey].sitelinks.dewiki.title
      }));
  },
  /**
   * Lists all wikidata municipalities in the given district
   * @param {string} districtKey 
   */
  async getMunicipalitiesInDistrict(districtKey) {
    const sparqlQuery = `SELECT ?item ?itemLabel
    WHERE 
    {
      ?item p:P131 ?verwaltungseinheit.          
      ?item p:P31 ?gemeinde.
      ?gemeinde ps:P31 wd:Q667509.
      FILTER NOT EXISTS { ?gemeinde pq:P582 ?y }
      ?verwaltungseinheit ps:P131 wd:${districtKey}.
      FILTER NOT EXISTS { ?verwaltungseinheit pq:P582 ?x }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "de". }
    }`;
      return await this.queryWikidata(sparqlQuery)
        .then( body => body.results.bindings.map(m => ({ key: this.extractEntityKey(m.item.value), label: m.itemLabel.value})));
  },
  /**
   * Gets all neighbors of the given municipality
   * @param {string} municipalityKey 
   */
  async getNeighborsOfMunicipality(municipalityKey) {
    const sparqlQuery = `SELECT ?item ?itemLabel 
      WHERE 
      {
        wd:${municipalityKey} wdt:P47 ?item.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "de". }
      }`;
    return await this.queryWikidata(sparqlQuery)
      .then( body => body.results.bindings.map(m => ({ key: this.extractEntityKey(m.item.value), label: m.itemLabel.value})));
  },
  /**
   * Lists all Austrian districts
   */
  async getDistrictsInAustria() {
    const sparqlQuery = `SELECT ?item ?itemLabel 
      WHERE 
      {
        ?item p:P31 ?verwaltungseinheit.
        ?verwaltungseinheit ps:P31 wd:Q871419.
        FILTER NOT EXISTS { ?verwaltungseinheit pq:P582 ?x }
        FILTER NOT EXISTS { ?item wdt:P31 wd:Q667509 }        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "de". }
      }`;
    return await this.queryWikidata(sparqlQuery)
      .then( body => body.results.bindings.map(m => ({ key: this.extractEntityKey(m.item.value), label: m.itemLabel.value})));
  },
  /**
   * Fetches the results of the given sparql query
   * @param {string} sparqlQuery 
   */
  async queryWikidata (sparqlQuery) {
    const config = {
      headers: {
        'Accept': 'application/sparql-results+json'
      }
    }
    const url = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery );
    const body = await fetch(url, config);
    return await body.json();
  },
  extractEntityKey (url) {
    return /[^/]*$/.exec(url)[0]
  }
}
