const baseRiotApp = new Vue({
  el: '#baseRiotApp',
  data: {
    url: 'euw1.api.riotgames.com',
    userId: '',
    summonerName: 'CrazyFranceBoy',
    route: `lol/summoner/v3/summoners/by-name`,
    runesRoute: `lol/platform/v3/runes/by-summoner`,
    matchesRoute: 'lol/match/v3/matchlists/by-account',
    championRoute: 'lol/static-data/v3/champions',
    championList: [],
    runePages: [],
    matches: [],
    apiKey: 'RGAPI-d7c2bed4-0536-4866-bfa4-88327a93f1c0',
    message: 'WELCOME TO MY PROJECT',
  },
  methods: {
    retrieveSummoner: function() {
      const route = `${this.route}/${this.summonerName}`;
      this.$http.get(`https://${this.url}/${route}?api_key=${this.apiKey}`)
        .then(response => {
          this.userId = JSON.parse(response.bodyText).id;
        })
        .catch(error => console.log(error));
    },
    retrieveRunes: function(){
      const route = `${this.runesRoute}/${this.userId}`;
      this.$http.get(`https://${this.url}/${route}?api_key=${this.apiKey}`)
        .then(response => {
          this.runePages = JSON.parse(response.bodyText).pages;
          console.log(this.runePages);
        })
        .catch(error => console.log(error));
    },
    retrieveMatches: function () {
      const route = `${this.matchesRoute}/${this.userId}`;
      this.championList = this.getChampionList;
      console.log(route);
      this.$http.get(`https://${this.url}/${route}?api_key=${this.apiKey}`)
        .then(response => {
          this.matches = JSON.parse(response.bodyText).matches;
          console.log(this.championList);
        })
        .catch(error => console.log(error));
    },
    getChampionList: function() {
      const route = 'https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=RGAPI-d7c2bed4-0536-4866-bfa4-88327a93f1c0';
      return this.$http.get(route)
        // .then(response => JSON.parse(response));
        .then(response => response);
    }
  },
});
