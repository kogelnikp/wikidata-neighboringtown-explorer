
export default {

  async getNeighborsFromWikiPage(wikipediaUrl) {
    let result = [];
    
    const wikipediaPageTitle = /[^/]*$/.exec(wikipediaUrl)[0];
    const fetchUrl = `https://de.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&&titles=${wikipediaPageTitle}&origin=*`;
    const content = await fetch(fetchUrl).then(body => body.json());
    const page = content.query.pages[Object.keys(content.query.pages)[0]];
    var pageContent = page.revisions[0]['*'];

    const neighborContent = pageContent.match(/({{\s*Nachbargemeinden[\s\S]*?}})/);
    let neighborStrings = [];
    if (neighborContent && neighborContent.length > 0) {
      const pattern = /\[\[(.*?)\]\]/g;
      let match;
      while ((match = pattern.exec(neighborContent[0])) != null) {
        neighborStrings.push(match[1].split('|')[0]);
      }

      const url = `https://de.wikipedia.org/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&titles=${neighborStrings.join('|')}&formatversion=2&format=json&origin=*`;
      const wikidataContent = await fetch(url)
        .then(body => body.json());
      for(let pageDataObject of wikidataContent.query.pages) {
        if (pageDataObject.pageprops) {
          result.push({key: pageDataObject.pageprops.wikibase_item, label: pageDataObject.title});
        }
      }      
    }
    
    return result;
  }
}