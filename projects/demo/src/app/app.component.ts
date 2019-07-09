import { Component, OnInit, ViewChild } from '@angular/core';
import { MarkerInfo } from '@lcu-ide/dynamic-map-common/lib/models/marker-info.model';
import { IndividualMap } from 'projects/common/src/lcu.api';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // FIELDS

  protected maps = this.getRealRepresentationOfMapList();

  // PROPERTIES

  /**
   * The map configuration to pass in to the map instance
   */
  public MapConfig: IndividualMap;

  /**
   * The icon set to pass in that will determine the available icons for the map
   */
  public IconSet: MarkerInfo[]; 

  public SecMaps: Array<IndividualMap> = [
    {
      id: '123',
      title: 'Boulder Bars and Breweries',
      origin: { lat: 40.037757, lng: -105.378324 },
      zoom: 13,
      locationList: [
        { id: '30', title: 'Brewsky\'s', lat: 40.012557, lng: -105.268199, iconName: 'brewery', map_id: '123' },
        { id: '31', title: 'Phat Bar', lat: 40.022657, lng: -105.268199, iconName: 'bar', map_id: '123' },
        { id: '32', title: 'Bar of the Rockies', lat: 40.026757, lng: -105.277199, iconName: 'bar', map_id: '123' },
        { id: '33', title: 'Good brewery', lat: 40.047857, lng: -105.268199, iconName: 'brewery', map_id: '123' },
      ]
    },
    {
      id: '456',
      title: 'Broomfield Restaurants',
      origin: { lat: 40.027757, lng: -105.378324 },
      zoom: 13,
      locationList: [
        { id: '34', title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', map_id: '456' },
        { id: '35', title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', map_id: '456' },
        { id: '36', title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', map_id: '456' },
        { id: '37', title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', map_id: '456' },
        { id: '38', title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', map_id: '456' }
      ]
    }
  ]

  /**
   * Passed to the @Input for panning, generates a random 'pan to' location and zoom level
   */
  public RandomPan: { lat: number, lng: number, zoom: number } = { lat: 40, lng: -105, zoom: 10 }

  // CONSTRUCTORS

  // LIFE CYCLE

  ngOnInit() {
    this.MapConfig = this.maps[1];
    this.SecMaps = this.maps.filter(x => {
      return x.id !== this.MapConfig.id;
    });
    this.MapConfig = {
      id: '789',
      title: 'Boulder - All',
      origin: { lat: 40.037757, lng: -105.278324 },
      zoom: 13,
      locationList: [
        { id: '40', title: 'Favorite UNESCO', lat: 40.011657, lng: -105.288199, iconName: 'UNESCO', map_id: '789', address: '1234 abc court', menu: 'menu.com', reservations: 'reservations.com', starRating: 3 },
        { id: '41', title: 'Nice museum', lat: 40.049757, lng: -105.298199, iconName: 'museum', map_id: '789' },
        { id: '42', title: 'Good lodging', lat: 40.028757, lng: -105.278199, iconName: 'lodging', town: 'Boulder', country: 'USA', state: "CO", phoneNumber: '303-123-4567', instagram: 'www', website: 'www', map_id: '789', address: '1234 abc court', menu: 'menu.com', reservations: 'reservations.com', starRating: 3.5, awards: "Best place to sleep 2019", media: "media.com", generalInfo: "checkout is 11 am", notes: "Try to get a room that over looks the flat Irons.", photos: ["link", "link"] },
        { id: '43', title: 'Nice national park', lat: 40.051657, lng: -105.278199, iconName: 'national park', town: 'Boulder', country: 'USA', phoneNumber: '303-123-4567', instagram: 'www', map_id: '789', address: '1234 abc court', menu: 'menu.com', reservations: 'reservations.com', starRating: 3.25 }
      ]
    };
    this.IconSet = [ // this should be calling a service here
      { iconLookup: 'restaurant', iconName: 'Restaurant', iconUrl: './assets/restaurant.png' },
      { iconLookup: 'UNESCO', iconName: 'UNESCO', iconUrl: './assets/UNESCO.png' },
      { iconLookup: 'museum', iconName: 'Museum', iconUrl: './assets/museum.png' },
      { iconLookup: 'brewery', iconName: 'Brewery', iconUrl: './assets/brewery.png' },
      { iconLookup: 'ski area', iconName: 'Ski Area', iconUrl: './assets/ski area.png' },
      { iconLookup: 'vineyard', iconName: 'Vineyard', iconUrl: './assets/vineyard.png' },
      { iconLookup: 'golf course', iconName: 'Golf Course', iconUrl: './assets/golf course.png' },
      { iconLookup: 'lodging', iconName: 'Lodging', iconUrl: './assets/lodging.png' },
      { iconLookup: 'national park', iconName: 'National Park', iconUrl: './assets/national park.png' },
      { iconLookup: 'bar', iconName: 'Bar', iconUrl: './assets/bar.png' }
    ]
  }

  // API METHODS

  /**
   * 
   * @param map The function run when the map is successfully saved
   */
  public MapSaved(map) {
    console.log('saved map: ', map);
  }

  /**
   * 
   * @param lat The latitude to pan to
   * @param lng The longitude to pan to
   * 
   * Upon clicking, the map will pan to the given location (0,0)
   */
  public GoToRandomLoc() {
    this.RandomPan = { lat: Math.floor(Math.random() * 50), lng: -103, zoom: Math.floor(Math.random() * 50) }
  }

  /**
   * 
   * @param list The new list of active secondary locations
   * 
   * Logs to the console the updated list of active secondary locations
   */
  public ListChanged(list) {
    // console.log('list of secondary locs: ', list);
  }

  /**
   * 
   * @param map The updated version of the primary map
   * 
   * Runs when the primary map is changed
   */
  public PrimMapChanged(map) {
    console.log(map); // this can be a call to save the primary map because the location list has changed
  }

  public GoToRandomMap() {
    this.MapConfig = {
      id: '2',
      title: 'Broomfield Food',
      origin: { lat: 39.923587, lng: -105.087146 },
      zoom: 13,
      locationList: [
        { id: '44', title: 'Steak house', lat: 39.939361, lng: -105.053863, iconName: 'restaurant', map_id: '2' },
        { id: '45', title: 'Inauthentic Hibachi', lat: 39.922598, lng: -105.136252, iconName: 'restaurant', map_id: '2' },
        { id: '46', title: 'Nachito\'s Burritos', lat: 39.931016, lng: -105.131439, iconName: 'restaurant', map_id: '2' },
        { id: '47', title: 'Good brewery', lat: 39.927743, lng: -105.026432, iconName: 'brewery', map_id: '2' },
        { id: '48', title: 'Good bar', lat: 39.938869, lng: -105.082696, iconName: 'bar', map_id: '2' }
      ]
    }
  }

  public LoadSecMaps() {

  }

  public SimulateNewMapSet() {
    this.MapConfig = this.maps[1];
    this.SecMaps = this.maps.filter(x => {
      return x.id !== this.MapConfig.id;
    });
  }

  // HELPERS

  protected getRealRepresentationOfMapList() {
    return [
      {
          "id": "TheSpecialCuratedMap",
          "title": "TheSpecialCuratedMap",
          "origin": {
              "lat": 40.017557,
              "lng": -105.278199
          },
          "zoom": 5,
          "locationList": [
              {
                  "iconName": "bar",
                  "title": "The Bar at the NoMad Hotel",
                  "website": "https://www.thenomadhotel.com/new-york/dining/spaces/the-nomad-bar",
                  "instagram": "@thenomadhotel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-823-9335",
                  "lat": "40.74482",
                  "lng": "-73.98827",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7c9e19bf-8a29-4eae-a5e9-8ecceebeba06"
              },
              {
                  "iconName": "bar",
                  "title": "Anvil Bar & Refuge",
                  "website": "https://www.anvilhouston.com/",
                  "instagram": "@anvilhouston",
                  "town": "Houston",
                  "country": "USA",
                  "phoneNumber": "713-525-9400",
                  "lat": "29.74308",
                  "lng": "-95.39686",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d3ad9c1c-2c43-41b2-bc5f-3884ba904e8c"
              },
              {
                  "iconName": "bar",
                  "title": "Bar Goto",
                  "website": "https://www.bargoto.com/",
                  "instagram": "@bargoto_nyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-5829",
                  "lat": "40.72277",
                  "lng": "-73.98989",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "88f2a3ec-31af-4d65-b29c-a3b4dee381ec"
              },
              {
                  "iconName": "bar",
                  "title": "Maison Premiere",
                  "website": "https://maisonpremiere.com/",
                  "instagram": "@maisonpremiere",
                  "town": "Brooklyn",
                  "country": "USA",
                  "phoneNumber": "401-584-7000",
                  "lat": "40.71425",
                  "lng": "-73.96166",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "447dfb1c-ab2e-4969-a285-bc7d78f6a9c9"
              },
              {
                  "iconName": "bar",
                  "title": "Lost Lake",
                  "website": "http://www.lostlaketiki.com/",
                  "instagram": "@lostlaketiki",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "773-477-5845",
                  "lat": "41.93212",
                  "lng": "-87.70713",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0f0a99dd-b87d-4017-b43b-d8265b74b429"
              },
              {
                  "iconName": "bar",
                  "title": "Cure",
                  "website": "http://www.curenola.com/",
                  "instagram": "@curenola",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-522-5400",
                  "lat": "29.93501",
                  "lng": "-90.10746",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "591b8b97-11ae-40e9-bf40-e8d78d90ecc8"
              },
              {
                  "iconName": "bar",
                  "title": "The Aviary",
                  "website": "https://theaviary.com/site/",
                  "instagram": "@thealineagroup",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.88657",
                  "lng": "-87.65206",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "472c2de6-467b-4c10-a55d-d0cef88ce4b4"
              },
              {
                  "iconName": "brewery",
                  "title": "Foundation Brewing Company",
                  "website": "http://www.foundationbrew.com/",
                  "instagram": "@foundationbrew",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-573-2425",
                  "lat": "43.70294",
                  "lng": "-70.3201",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dc04cdc8-061f-4283-a924-b3938583dc6d"
              },
              {
                  "iconName": "brewery",
                  "title": "Blackberry Farm",
                  "website": "http://www.blackberryfarm.com/brewery/",
                  "instagram": "@blackberryfarm",
                  "town": "Walland",
                  "country": "USA",
                  "phoneNumber": "865-984-8166",
                  "lat": "35.69264",
                  "lng": "-83.86246",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "049bde6f-fc55-4d0e-9093-88c4bc7e9fc3"
              },
              {
                  "iconName": "brewery",
                  "title": "Bunker Brewing Company",
                  "website": "http://www.bunkerbrewingco.com/",
                  "instagram": "@bunkerbrewing",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-747-5307",
                  "lat": "43.65267",
                  "lng": "-70.28369",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9ab7056c-fd59-48dd-983d-e526dd6cc205"
              },
              {
                  "iconName": "brewery",
                  "title": "Two Roads Brewing Company",
                  "website": "https://tworoadsbrewing.com/",
                  "instagram": "@tworoadsbrewing",
                  "town": "Stratford",
                  "country": "USA",
                  "phoneNumber": "203-658-3631",
                  "lat": "41.18567",
                  "lng": "-73.14209",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "313d46db-f1f6-44c9-9ebf-11abe6dcf537"
              },
              {
                  "iconName": "brewery",
                  "title": "Stone Brewing Co",
                  "website": "http://www.stonebrewing.com/",
                  "instagram": "@stonebrewing",
                  "town": "Escondido",
                  "country": "USA",
                  "phoneNumber": "760-448-1234",
                  "lat": "33.1158",
                  "lng": "-117.12001",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4090a6aa-e3b6-4ab6-9653-1bafa84485d9"
              },
              {
                  "iconName": "brewery",
                  "title": "Rogue",
                  "website": "https://www.rogue.com/",
                  "instagram": "@rogueales",
                  "town": "Newport",
                  "country": "USA",
                  "phoneNumber": "575-776-2291",
                  "lat": "44.62022",
                  "lng": "-124.05233",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "532aa477-ec13-45d2-bf78-ad967a91530a"
              },
              {
                  "iconName": "brewery",
                  "title": "Founders Brewing Co",
                  "website": "https://foundersbrewing.com/",
                  "instagram": "@foundersbrewing",
                  "town": "Grand Rapids",
                  "country": "USA",
                  "phoneNumber": "616-943-7373",
                  "lat": "42.95834",
                  "lng": "-85.67419",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5f842bf5-dada-4cf1-8f3b-2ac48ea6013c"
              },
              {
                  "iconName": "brewery",
                  "title": "Ninkasi Brewing",
                  "website": "http://www.ninkasibrewing.com",
                  "instagram": "@ninkasibrewing",
                  "town": "Eugene",
                  "country": "USA",
                  "phoneNumber": "541-347-4380",
                  "lat": "44.05692",
                  "lng": "-123.10958",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "92529775-2f28-4da4-8a24-12b42534f52b"
              },
              {
                  "iconName": "brewery",
                  "title": "Aspen Brewing Company",
                  "website": "http://www.aspenbrewingcompany.com/",
                  "instagram": "@aspenbrewingcompany",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "970-920-3300",
                  "lat": "39.18985",
                  "lng": "-106.81842",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9d04e7f3-9fa4-4918-be2c-f0112cdf3180"
              },
              {
                  "iconName": "brewery",
                  "title": "Banded Horn Brewing Company",
                  "website": "https://www.bandedhorn.com/",
                  "instagram": "@bandedhornbrewing",
                  "town": "Biddeford",
                  "country": "USA",
                  "phoneNumber": "207-613-9471",
                  "lat": "43.49284",
                  "lng": "-70.45275",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7800ae44-9bcd-400f-a432-6528cc64f599"
              },
              {
                  "iconName": "brewery",
                  "title": "Bridge Brew Works",
                  "website": "http://www.bridgebrewworks.com/",
                  "instagram": "@bridgebrewworks",
                  "town": "Fayetteville",
                  "country": "USA",
                  "phoneNumber": "305-534-8800",
                  "lat": "38.0165",
                  "lng": "-81.11368",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "da0e9f27-ad66-4573-a1e5-1fcbe04dd029"
              },
              {
                  "iconName": "brewery",
                  "title": "Bissell Brothers Brewing Company",
                  "website": "https://www.bissellbrothers.com/",
                  "instagram": "@bissellbrothers",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-824-3000",
                  "lat": "43.65141",
                  "lng": "-70.29055",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "351f2caa-6bc6-4046-b41a-98f134d41b6c"
              },
              {
                  "iconName": "brewery",
                  "title": "Against the Grain Brewhouse",
                  "website": "http://www.atgbrewery.com/",
                  "instagram": "@atgbrewery",
                  "town": "Louisville",
                  "country": "USA",
                  "phoneNumber": "502-636-0783",
                  "lat": "38.25548",
                  "lng": "-85.74402",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "223f3b10-4037-4c3f-af80-b98916882e31"
              },
              {
                  "iconName": "brewery",
                  "title": "Half Full Brewery",
                  "website": "http://www.halffullbrewery.com/",
                  "instagram": "@halffullbrewery",
                  "town": "Stamford",
                  "country": "USA",
                  "phoneNumber": "205-939-1400",
                  "lat": "41.0395",
                  "lng": "-73.54992",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4c973cab-c645-42f5-91bd-b520f7465d07"
              },
              {
                  "iconName": "brewery",
                  "title": "Avery Brewing Co",
                  "website": "https://www.averybrewing.com/",
                  "instagram": "@averybrewingco",
                  "town": "Boulder",
                  "country": "USA",
                  "phoneNumber": "303-442-6966",
                  "lat": "40.06255",
                  "lng": "-105.20474",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a4799fb2-fb51-4560-87d5-529faedad66c"
              },
              {
                  "iconName": "brewery",
                  "title": "Lord Hobo Brewing Co",
                  "website": "https://lordhobobrewing.com/",
                  "instagram": "@lordhobobrewing",
                  "town": "Woburn",
                  "country": "USA",
                  "phoneNumber": "786-257-4600",
                  "lat": "42.47609",
                  "lng": "-71.12889",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "417c7981-4e79-48ea-8a04-62c65820a598"
              },
              {
                  "iconName": "brewery",
                  "title": "Allagash Brewing Company",
                  "website": "https://www.allagash.com/",
                  "instagram": "@allagashbrewing",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-967-2321",
                  "lat": "43.70314",
                  "lng": "-70.31769",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5bed7470-dd17-4540-a862-da7525afd9da"
              },
              {
                  "iconName": "brewery",
                  "title": "New Belgium Brewing Company",
                  "website": "http://www.newbelgium.com/brewery",
                  "instagram": "@newbelgium",
                  "town": "Fort Collins",
                  "country": "USA",
                  "phoneNumber": "970-349-2222",
                  "lat": "40.59323",
                  "lng": "-105.0686",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8e91fda3-99ae-4e65-987b-569b99e259b2"
              },
              {
                  "iconName": "brewery",
                  "title": "Maine Beer Company",
                  "website": "https://www.mainebeercompany.com/",
                  "instagram": "@mainebeerco",
                  "town": "Freeport",
                  "country": "USA",
                  "phoneNumber": "207-236-3391",
                  "lat": "43.83913",
                  "lng": "-70.1214",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "690aa803-3a16-4f9a-9a1f-810ad4b5fa6c"
              },
              {
                  "iconName": "brewery",
                  "title": "Dogfish Head Craft Brewing",
                  "website": "https://www.dogfish.com",
                  "instagram": "@dogfishhead",
                  "town": "Milton",
                  "country": "USA",
                  "phoneNumber": "303-440-4324",
                  "lat": "38.77036",
                  "lng": "-75.31083",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c5dc74a0-1808-4704-9268-dcc9ea4e9d5b"
              },
              {
                  "iconName": "brewery",
                  "title": "Brewery Ommegang",
                  "website": "http://www.ommegang.com/",
                  "instagram": "@breweryommegang",
                  "town": "Cooperstown",
                  "country": "USA",
                  "phoneNumber": "612-375-7600",
                  "lat": "42.6268",
                  "lng": "-74.94566",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a3fe972d-5bb1-4b0c-919b-343de08ece6d"
              },
              {
                  "iconName": "brewery",
                  "title": "Odell Brewing Co",
                  "website": "https://www.odellbrewing.com/",
                  "instagram": "@odellbrewing",
                  "town": "Fort Collins",
                  "country": "USA",
                  "phoneNumber": "970-726-5514",
                  "lat": "40.58946",
                  "lng": "-105.06318",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "42a545a3-75e6-4963-8f29-55fb986330e3"
              },
              {
                  "iconName": "brewery",
                  "title": "3 Floyds Brewing Co",
                  "website": "https://www.3floyds.com",
                  "instagram": "@3floydsbrewing",
                  "town": "Munster",
                  "country": "USA",
                  "phoneNumber": "252-208-2433",
                  "lat": "41.53552",
                  "lng": "-87.51681",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3aeb362c-b092-4d86-960e-b9b6d2d76b8f"
              },
              {
                  "iconName": "golf course",
                  "title": "Pinehurst #2",
                  "website": "https://www.pinehurst.com/golf/courses/no-2/",
                  "instagram": "@pinehurstresort",
                  "town": "Pinehurst",
                  "country": "USA",
                  "phoneNumber": "888-333-5405",
                  "lat": "35.19131",
                  "lng": "-79.46349",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e240edff-f985-49dd-90b2-e8d7517da8ea"
              },
              {
                  "iconName": "golf course",
                  "title": "Pinehurst #8",
                  "website": "https://www.pinehurst.com/golf/courses/no-8/",
                  "instagram": "@pinehurstresort",
                  "town": "Pinehurst",
                  "country": "USA",
                  "phoneNumber": "877-545-2124",
                  "lat": "35.21793",
                  "lng": "-79.471",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cab1a6ae-96d5-42f5-8827-31296d16a789"
              },
              {
                  "iconName": "golf course",
                  "title": "TPC Sawgrass",
                  "website": "https://tpc.com/sawgrass/",
                  "instagram": "@tpcsawgrass",
                  "town": "Ponte Vedra",
                  "country": "USA",
                  "phoneNumber": "905-262-8463",
                  "lat": "30.19901",
                  "lng": "-81.39483",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4e261021-d64c-496e-b461-40e9570d7140"
              },
              {
                  "iconName": "golf course",
                  "title": "Torrey Pines South",
                  "website": "http://www.torreypinesgolfcourse.com/index.html",
                  "instagram": "@torreypinesgolf",
                  "town": "La Jolla",
                  "country": "USA",
                  "phoneNumber": "863-428-1000",
                  "lat": "32.9043",
                  "lng": "-117.24448",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "92f0f3e1-d9b5-4d93-9609-b42e846070bf"
              },
              {
                  "iconName": "golf course",
                  "title": "Kauri Cliffs",
                  "website": "https://www.robertsonlodges.com/the-lodges/kauri-cliffs/explore/golf",
                  "instagram": "@kauricliffs",
                  "town": "Matauri Bay",
                  "country": "New Zealand",
                  "phoneNumber": "64-9-407-0060",
                  "lat": "-35.07643",
                  "lng": "173.92248",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2770e820-6efc-4426-9fbb-7150c711067d"
              },
              {
                  "iconName": "golf course",
                  "title": "New South Wales",
                  "website": "https://www.nswgolfclub.com.au/cms/",
                  "instagram": "@nswgolfclub",
                  "town": "La Perouse",
                  "country": "Australia",
                  "phoneNumber": "61-2-9661-4455",
                  "lat": "-33.9912",
                  "lng": "151.24033",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "41dcc37b-cb40-42cf-af3f-ecfbfecc2c1f"
              },
              {
                  "iconName": "golf course",
                  "title": "Pebble Beach",
                  "website": "https://www.pebblebeach.com/golf/pebble-beach-golf-links/",
                  "instagram": "@pebblebeachresorts",
                  "town": "Pebble Beach",
                  "country": "USA",
                  "phoneNumber": "831-667-2200",
                  "lat": "36.56877",
                  "lng": "-121.95061",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ec443d3a-85e5-49e9-8631-cfda3bf6df2d"
              },
              {
                  "iconName": "golf course",
                  "title": "Cape Breton Highlands",
                  "website": "http://www.kelticlodge.ca/golf/",
                  "instagram": "@kelticlodge",
                  "town": "Ingonish Beach",
                  "country": "Canada",
                  "phoneNumber": "904-273-3235",
                  "lat": "46.6557",
                  "lng": "-60.38518",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "08e63a7a-ae12-4fa7-9a0f-3be909493b97"
              },
              {
                  "iconName": "golf course",
                  "title": "Spanish Bay",
                  "website": "https://www.pebblebeach.com/golf/the-links-at-spanish-bay/",
                  "instagram": "@pebblebeachresorts",
                  "town": "Pebble Beach",
                  "country": "USA",
                  "phoneNumber": "831-574-5608",
                  "lat": "36.61239",
                  "lng": "-121.94386",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "047f232a-bf39-483b-b878-c385b70dc8ae"
              },
              {
                  "iconName": "golf course",
                  "title": "Streamsong Blue",
                  "website": "http://www.streamsongresort.com/best-florida-golf/streamsong-blue/",
                  "instagram": "@streamsongresort",
                  "town": "Streamsong",
                  "country": "USA",
                  "phoneNumber": "863-428-1000",
                  "lat": "27.68171",
                  "lng": "-81.93759",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "34414fdf-35b1-4fc2-a76f-1613445d14a3"
              },
              {
                  "iconName": "golf course",
                  "title": "Streamsong Red",
                  "website": "http://www.streamsongresort.com/best-florida-golf/streamsong-red/",
                  "instagram": "@streamsongresort",
                  "town": "Streamsong",
                  "country": "USA",
                  "phoneNumber": "865-984-8166",
                  "lat": "27.6739",
                  "lng": "-81.93333",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c9e474b0-9f36-4d16-aabd-36e149738419"
              },
              {
                  "iconName": "golf course",
                  "title": "Spyglass Hill",
                  "website": "https://www.pebblebeach.com/golf/spyglass-hill-golf-course/",
                  "instagram": "@pebblebeachresorts",
                  "town": "Pebble Beach",
                  "country": "USA",
                  "phoneNumber": "831-574-5609",
                  "lat": "36.5838",
                  "lng": "-121.95581",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "10dd1b93-b8de-48ce-adc4-b4b78f8fc4b7"
              },
              {
                  "iconName": "golf course",
                  "title": "Barnbougie Dunes",
                  "website": "https://barnbougle.com.au/play/the-dunes/",
                  "instagram": "@barnbougle",
                  "town": "Bridport",
                  "country": "Australia",
                  "phoneNumber": "61-3-6356-0094",
                  "lat": "-41.00487",
                  "lng": "147.43783",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "06804f05-5c8d-48c7-bbcc-9eceb3a5821e"
              },
              {
                  "iconName": "golf course",
                  "title": "Cape Kidnappers",
                  "website": "https://www.robertsonlodges.com/the-lodges/cape-kidnappers/explore/golf",
                  "instagram": "@capekidnappers",
                  "town": "Te Awanga",
                  "country": "New Zealand",
                  "phoneNumber": "64-6-873-1018",
                  "lat": "-39.65392",
                  "lng": "177.04215",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8ad93c2e-5538-4250-9351-0a3fbf25ebb2"
              },
              {
                  "iconName": "golf course",
                  "title": "Bandon Dunes",
                  "website": "https://www.bandondunesgolf.com/golf/golf-courses/bandon-dunes",
                  "instagram": "@bandondunesgolf",
                  "town": "Bandon",
                  "country": "USA",
                  "phoneNumber": "541-867-3660",
                  "lat": "43.18862",
                  "lng": "-124.39611",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "218443ba-e7e5-478b-a2da-203b7bd6a0a3"
              },
              {
                  "iconName": "golf course",
                  "title": "Bethpage Black",
                  "website": "https://parks.ny.gov/golf-courses/11/details.aspx",
                  "instagram": "@bethpagegolf",
                  "town": "Farmingdale",
                  "country": "USA",
                  "phoneNumber": "518-891-5674",
                  "lat": "40.74297",
                  "lng": "-73.45453",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "384867ab-e30c-4a7e-a153-022e4446a156"
              },
              {
                  "iconName": "golf course",
                  "title": "Valderrama",
                  "website": "http://www.valderrama.com/en/",
                  "instagram": "@realclubvalderrama",
                  "town": "San Roque",
                  "country": "Spain",
                  "phoneNumber": "34-956-791-200",
                  "lat": "36.28277",
                  "lng": "-5.32701",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2185f2c9-04a3-407e-92b1-1a1d7c1d0e86"
              },
              {
                  "iconName": "golf course",
                  "title": "Banff Springs",
                  "website": "http://www.fairmont.com/banff-springs/golf/",
                  "instagram": "@fairmontbanff",
                  "town": "Banff",
                  "country": "Canada",
                  "phoneNumber": "404-563-7900",
                  "lat": "51.17406",
                  "lng": "-115.53814",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "06455ef1-b1bf-41bb-8481-3c1e233d0b06"
              },
              {
                  "iconName": "golf course",
                  "title": "Kennemer",
                  "website": "http://www.kennemergolf.nl/",
                  "instagram": "@kennemergolf",
                  "town": "Zandvoort",
                  "country": "Netherlands",
                  "phoneNumber": "31-235-712-836",
                  "lat": "52.36971",
                  "lng": "4.55289",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c08749af-637f-41da-ba8c-464a39beadf6"
              },
              {
                  "iconName": "golf course",
                  "title": "Kingston Heath",
                  "website": "http://www.kingstonheath.melbourne/",
                  "instagram": "@kingston_heath",
                  "town": "Cheltenham",
                  "country": "Australia",
                  "phoneNumber": "61-3-8558-2700",
                  "lat": "-37.95579",
                  "lng": "145.08581",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6fba3513-b29a-45ba-95d7-d9f157f25de1"
              },
              {
                  "iconName": "golf course",
                  "title": "Royal Lytham & St Annes",
                  "website": "https://www.royallytham.org/",
                  "instagram": "@rlproshop",
                  "town": "Lytham St Annes",
                  "country": "England",
                  "phoneNumber": "44-012-5372-4206",
                  "lat": "53.74956",
                  "lng": "-3.0178",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8d42c601-b0c5-4e08-b90e-3512cbb042b6"
              },
              {
                  "iconName": "golf course",
                  "title": "Royal Liverpool Hoylake",
                  "website": "http://www.royal-liverpool-golf.com/",
                  "instagram": "@rlgchoylake",
                  "town": "Wirral",
                  "country": "England",
                  "phoneNumber": "44-015-1632-3101",
                  "lat": "53.38739",
                  "lng": "-3.18489",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8802c030-4ebd-4ada-8d61-a0802fb16c4b"
              },
              {
                  "iconName": "golf course",
                  "title": "Fancourt Links",
                  "website": "https://thelinks.fancourt.co.za/",
                  "instagram": "@fancourtsa",
                  "town": "George",
                  "country": "South Africa",
                  "phoneNumber": "27-44-804-0844",
                  "lat": "-33.95116",
                  "lng": "22.40641",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cdb569b4-c58a-4b5a-9252-8b778fac1ad9"
              },
              {
                  "iconName": "golf course",
                  "title": "The Irish  at Whistling Straits",
                  "website": "https://www.americanclubresort.com/golf/whistling-straits/the-irish",
                  "instagram": "@theamericanclub",
                  "town": "Sheboygan",
                  "country": "USA",
                  "phoneNumber": "800-618-5535",
                  "lat": "43.85698",
                  "lng": "-87.73838",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ad073079-4b96-4335-9d5a-5ea8338dcfda"
              },
              {
                  "iconName": "golf course",
                  "title": "Whistling Straits",
                  "website": "https://www.americanclubresort.com/golf/whistling-straits/the-straits",
                  "instagram": "@theamericanclub",
                  "town": "Sheboygan",
                  "country": "USA",
                  "phoneNumber": "801-359-1078",
                  "lat": "43.85104",
                  "lng": "-87.73513",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "613a73f2-2268-4c8e-a3c5-cdb0d99fbfd3"
              },
              {
                  "iconName": "golf course",
                  "title": "Moliets",
                  "website": "http://www.golfmoliets.com/",
                  "instagram": "@golfdemoliets",
                  "town": "Moliets",
                  "country": "France",
                  "phoneNumber": "33-05-58-48-54-65",
                  "lat": "43.84713",
                  "lng": "-1.37713",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dbda65dd-eaeb-4df3-94e4-8f7ed76d80cd"
              },
              {
                  "iconName": "golf course",
                  "title": "Monte Rei",
                  "website": "http://www.monte-rei.com/en/golf/",
                  "instagram": "@montereiresort",
                  "town": "Vila Nova de Cacela",
                  "country": "Portugal",
                  "phoneNumber": "351-281-950-960",
                  "lat": "37.20853",
                  "lng": "-7.54918",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dfe2c13e-3269-4a9f-b125-fc19d0c6e5c7"
              },
              {
                  "iconName": "golf course",
                  "title": "The East Course at Saunton",
                  "website": "https://www.sauntongolf.co.uk/the_east_course",
                  "instagram": "@sauntongolfclub",
                  "town": "Braunton",
                  "country": "England",
                  "phoneNumber": "44-012-7181-2436",
                  "lat": "51.11217",
                  "lng": "-4.20091",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6397f58a-105e-45e3-9aa2-a91948db8af7"
              },
              {
                  "iconName": "lodging",
                  "title": "Abbaye de Talloires",
                  "website": "http://www.abbaye-talloires.com/en",
                  "instagram": "@abbayedetalloires",
                  "town": "Talloires",
                  "country": "France",
                  "phoneNumber": "33-04-50-60-77-33",
                  "lat": "45.84097",
                  "lng": "45.84097",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bf036438-a888-4c6a-bcf6-abcdbeab1a3a"
              },
              {
                  "iconName": "lodging",
                  "title": "Grand Luxor Hotel",
                  "website": "http://www.grandluxorhotels.com/en/",
                  "instagram": "@grandluxorhotel",
                  "town": "Benidorm",
                  "country": "Spain",
                  "phoneNumber": "34-966-816-700",
                  "lat": "38.55805",
                  "lng": "-0.15753",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a1d3810c-4580-4be5-83de-a3cb67fd6e22"
              },
              {
                  "iconName": "lodging",
                  "title": "Hesperia Madrid",
                  "website": "http://www.hesperia-madrid.com/?lang=en",
                  "instagram": "@hotelhesperiamadrid",
                  "town": "Madrid",
                  "country": "Spain",
                  "phoneNumber": "34-912-108-800",
                  "lat": "40.43892",
                  "lng": "-3.6916",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d1b2e4b9-5f37-4e02-a728-ea7fc2c8d4b2"
              },
              {
                  "iconName": "lodging",
                  "title": "Altis Belem Hotel & Spa",
                  "website": "http://www.altishotels.com/EN/HotelAltisBelem/Luxury-Hotel-Lisbon/",
                  "instagram": "@altishotels",
                  "town": "Lisbon",
                  "country": "Portugal",
                  "phoneNumber": "351-210-400-200",
                  "lat": "38.69326",
                  "lng": "38.69326",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "84792d07-e60f-4c87-ba8c-73b446c02d1d"
              },
              {
                  "iconName": "lodging",
                  "title": "Bay of Many Coves",
                  "website": "https://bayofmanycoves.co.nz/",
                  "instagram": "@bayofmanycovesresort",
                  "town": "Queen Charlotte Sound",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-579-9771",
                  "lat": "-41.19268",
                  "lng": "174.15143",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "faaa157f-6709-4514-b29d-a5a3af6a8ecf"
              },
              {
                  "iconName": "lodging",
                  "title": "Blanket Bay",
                  "website": "http://www.blanketbay.com/",
                  "instagram": "@blanket_bay",
                  "town": "Glenorchy",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-441-0115",
                  "lat": "-44.86766",
                  "lng": "168.39205",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e3473b39-91e3-4765-92da-93b775435c57"
              },
              {
                  "iconName": "lodging",
                  "title": "Campo Bahia Hotel",
                  "website": "http://www.campobahia.com/en",
                  "instagram": "@campobahia_hotel",
                  "town": "Santo Andre",
                  "country": "Brazil",
                  "phoneNumber": "55-73-3162-4690",
                  "lat": "-16.24318",
                  "lng": "-39.01116",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e8c1c2c0-eb26-4458-a854-4e20db5b3394"
              },
              {
                  "iconName": "lodging",
                  "title": "Canal House",
                  "website": "http://www.canalhouse.nl/",
                  "instagram": "@canalhouse_nl",
                  "town": "Amsterdam",
                  "country": "Netherlands",
                  "phoneNumber": "31-206-225-182",
                  "lat": "52.37629",
                  "lng": "4.88627",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cc598322-59d5-470f-8b73-8f44e10c4456"
              },
              {
                  "iconName": "lodging",
                  "title": "Cap Rocat",
                  "website": "http://www.caprocat.com/en/index/another-world-luxury-hotel-mallorca.html",
                  "instagram": "@cap_rocat",
                  "town": "Mallorca",
                  "country": "Spain",
                  "phoneNumber": "34-971-747-878",
                  "lat": "39.47608",
                  "lng": "2.72435",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2e392d5e-7c1c-4b96-a253-4efc177cf53d"
              },
              {
                  "iconName": "lodging",
                  "title": "Como The Treasury",
                  "website": "http://www.comohotels.com/thetreasury",
                  "instagram": "@comotreasury",
                  "town": "Perth",
                  "country": "Australia",
                  "phoneNumber": "61-8-6168-7888",
                  "lat": "-31.95565",
                  "lng": "115.86035",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5db79149-66b5-48ce-9a6e-a6a55907f511"
              },
              {
                  "iconName": "lodging",
                  "title": "Dorsia Hotel & Restaurant",
                  "website": "http://www.dorsia.se/en/",
                  "instagram": "@dorsiahotelandrestaurant",
                  "town": "Gothenburg",
                  "country": "Sweden",
                  "phoneNumber": "46-31-790-1000",
                  "lat": "57.7046",
                  "lng": "11.97166",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7847a000-b7fe-4efc-868b-e2e93342564a"
              },
              {
                  "iconName": "lodging",
                  "title": "Ett Hem",
                  "website": "https://www.etthem.se/",
                  "instagram": "@etthemstockholm",
                  "town": "Stockholm",
                  "country": "Sweden",
                  "phoneNumber": "46-8-200-590",
                  "lat": "59.34545",
                  "lng": "18.06766",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "96f4f690-1984-485d-ad71-04d2fbf6efc8"
              },
              {
                  "iconName": "lodging",
                  "title": "Hacienda Zorita Wine Hotel & Spa",
                  "website": "http://www.the-haciendas.com/hacienda-zorita-wine-hotel-spa/bookings.php?lang=en",
                  "instagram": "@hacienda_zorita",
                  "town": "Valverdon",
                  "country": "Spain",
                  "phoneNumber": "34-923-129-400",
                  "lat": "41.04093",
                  "lng": "-5.75879",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "24627673-e30d-4008-9243-15e33cc0d6c0"
              },
              {
                  "iconName": "lodging",
                  "title": "Holbeck Ghyll Country House Hotel",
                  "website": "https://www.holbeckghyll.com/",
                  "instagram": "@holbeck_ghyll",
                  "town": "Windermere",
                  "country": "England",
                  "phoneNumber": "44-015-3943-2375",
                  "lat": "54.41013",
                  "lng": "-2.93948",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "269fcaf0-02a7-4641-8e6c-768d09af76a2"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Bagues",
                  "website": "http://www.hotelbagues.com/",
                  "instagram": "@derby_hotels",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-933-435-000",
                  "lat": "41.38274",
                  "lng": "2.17162",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "27a95c03-6f76-4350-9cd6-686593821899"
              },
              {
                  "iconName": "lodging",
                  "title": "Le Pigonnet",
                  "website": "http://www.hotelpigonnet.com/en/",
                  "instagram": "@lepigonnet",
                  "town": "Aix-en-Provence",
                  "country": "France",
                  "phoneNumber": "33-04-42-59-02-90",
                  "lat": "43.51789",
                  "lng": "5.44203",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "98e1fc41-596c-451a-9804-a2f836fc2036"
              },
              {
                  "iconName": "lodging",
                  "title": "Internacional Design Hotel",
                  "website": "http://www.idesignhotel.com/",
                  "instagram": "@internacionaldesignhotel",
                  "town": "Lisbon",
                  "country": "Portugal",
                  "phoneNumber": "351-213-240-990",
                  "lat": "38.71303",
                  "lng": "-9.13842",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "91a2b32f-da90-4202-9106-fc56599eb253"
              },
              {
                  "iconName": "lodging",
                  "title": "Kokkedal Castle Copenhagen",
                  "website": "http://www.kokkedalslotcopenhagen.dk/en/",
                  "instagram": "@kokkedalslotcopenhagen",
                  "town": "Hoersholm",
                  "country": "Denmark",
                  "phoneNumber": "45-4422-8000",
                  "lat": "55.90251",
                  "lng": "12.51934",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c30ee93c-e1eb-4320-b576-ba4a308c0238"
              },
              {
                  "iconName": "lodging",
                  "title": "Langshott Manor",
                  "website": "http://www.alexanderhotels.co.uk/langshott-manor-luxury-hotel-surrey/",
                  "instagram": "@lm_hotel",
                  "town": "Horley",
                  "country": "England",
                  "phoneNumber": "44-012-9378-6680",
                  "lat": "51.18032",
                  "lng": "-0.14811",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "79722cd9-f47d-4132-ba06-6f900964e58e"
              },
              {
                  "iconName": "lodging",
                  "title": "Les Bories & Spa",
                  "website": "http://www.hotellesbories.com/uk/hotel-luxe-spa-gordes-provence-site-officiel.php",
                  "instagram": "@boriesandspa",
                  "town": "Gordes",
                  "country": "France",
                  "phoneNumber": "33-04-90-72-00-51",
                  "lat": "43.92165",
                  "lng": "5.19361",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "021720d2-73ea-4ca9-bf68-5d3ef9d4164f"
              },
              {
                  "iconName": "lodging",
                  "title": "Lydmar Hotel",
                  "website": "http://www.lydmar.com/",
                  "instagram": "@lydmarhotel",
                  "town": "Stockholm",
                  "country": "Sweden",
                  "phoneNumber": "46-8-223-160",
                  "lat": "59.32898",
                  "lng": "18.07745",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4e821647-b0c7-4597-9a40-c1b9e0ab6e0b"
              },
              {
                  "iconName": "lodging",
                  "title": "Miramonti Boutique Hotel",
                  "website": "http://www.whitelinehotels.com/hotels/italy/south-tyrol/avelengo/miramonti-boutique-hotel",
                  "instagram": "@miramontiboutiquehotel",
                  "town": "Avelengo Merano",
                  "country": "Italy",
                  "phoneNumber": "39-0473-279335",
                  "lat": "46.64996",
                  "lng": "11.20894",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e3d1f0d8-67eb-4569-b20a-b4ff98063d35"
              },
              {
                  "iconName": "lodging",
                  "title": "11 Cadogan Gardens",
                  "website": "https://www.11cadogangardens.com/",
                  "instagram": "@11cadogangardens",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7730-7000",
                  "lat": "51.49369",
                  "lng": "51.49369",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7b344110-4205-4a48-b792-a69fa3fea227"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Palacio de Villapanes",
                  "website": "http://www.palaciovillapanes.com/en/",
                  "instagram": "@palaciovillapanes",
                  "town": "Seville",
                  "country": "Spain",
                  "phoneNumber": "34-954-502-063",
                  "lat": "37.39164",
                  "lng": "-5.98644",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "663c48fb-c1ca-4b3f-b60a-52b6c72565ff"
              },
              {
                  "iconName": "lodging",
                  "title": "Pousada Mosteiro do Crato",
                  "website": "https://www.pousadas.pt/en/hotel/pousada-crato",
                  "instagram": "@pousadasdeportugal",
                  "town": "Crato",
                  "country": "Portugal",
                  "phoneNumber": "351-245-997-210",
                  "lat": "39.30668",
                  "lng": "-7.64814",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6a67d4a4-b6ae-4b12-a31b-695a2d284f1d"
              },
              {
                  "iconName": "lodging",
                  "title": "Pousada Palacio de Estoi",
                  "website": "https://www.pousadas.pt/en/hotel/pousada-estoi",
                  "instagram": "@pousadasdeportugal",
                  "town": "Faro",
                  "country": "Portugal",
                  "phoneNumber": "351-210-407-620",
                  "lat": "37.09664",
                  "lng": "-7.89535",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3206c19b-30d4-47f2-a0dc-c0d32b75632a"
              },
              {
                  "iconName": "lodging",
                  "title": "Quinta da Casa Branca",
                  "website": "http://www.quintacasabranca.com/",
                  "instagram": "@quintacasabranca",
                  "town": "Funchal",
                  "country": "Portugal",
                  "phoneNumber": "351-291-700-770",
                  "lat": "32.64175",
                  "lng": "-16.92715",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c9b4473e-422a-4172-92ed-817bf8cfa3ad"
              },
              {
                  "iconName": "lodging",
                  "title": "Quinta das Lagrimas",
                  "website": "https://www.quintadaslagrimas.pt/en/",
                  "instagram": "@quintadaslagrimas",
                  "town": "Coimbra",
                  "country": "Portugal",
                  "phoneNumber": "351-239-802-380",
                  "lat": "40.19762",
                  "lng": "-8.43269",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "281958c3-4289-4ca4-8733-2499819e0cb4"
              },
              {
                  "iconName": "lodging",
                  "title": "Refinery Hotel New York",
                  "website": "https://www.refineryhotelnewyork.com/",
                  "instagram": "@refineryhotel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "646-774-1234",
                  "lat": "40.7522",
                  "lng": "-73.98537",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6c81f513-16e6-4351-990a-7b74cccedc95"
              },
              {
                  "iconName": "lodging",
                  "title": "Royal Park Hotel Lima",
                  "website": "http://www.royalparkhotel.pe/en/",
                  "instagram": "@royalparkhotellima",
                  "town": "San Isidro",
                  "country": "Peru",
                  "phoneNumber": "51-1-215-1616",
                  "lat": "-12.1042",
                  "lng": "-77.03894",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dd109220-c811-4c49-9eb7-e18a30dd104c"
              },
              {
                  "iconName": "lodging",
                  "title": "The Bath Priory",
                  "website": "http://www.thebathpriory.co.uk/",
                  "instagram": "@brownswordhotels",
                  "town": "Bath",
                  "country": "England",
                  "phoneNumber": "44-012-2533-1922",
                  "lat": "51.39008",
                  "lng": "-2.38245",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f7141a50-752f-49ab-9793-747d61e08d29"
              },
              {
                  "iconName": "lodging",
                  "title": "The Dylan Amsterdam",
                  "website": "https://www.dylanamsterdam.com/",
                  "instagram": "@hotelthedylan",
                  "town": "Amsterdam",
                  "country": "Netherlands",
                  "phoneNumber": "31-205-302-010",
                  "lat": "52.36928",
                  "lng": "4.88401",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9b8341c1-3021-427a-a4f5-d8eedcd92cf4"
              },
              {
                  "iconName": "lodging",
                  "title": "Villa Monte Solare",
                  "website": "https://www.villamontesolare.com/en/",
                  "instagram": "@relaisvillamontesolare",
                  "town": "Panicale",
                  "country": "Italy",
                  "phoneNumber": "39-0758-32376",
                  "lat": "43.00314",
                  "lng": "12.14811",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5fc66647-a5d1-476d-a9ba-9b5e43939739"
              },
              {
                  "iconName": "lodging",
                  "title": "Wentworth Mansion",
                  "website": "https://www.wentworthmansion.com/",
                  "instagram": "@wentworthmansionsc",
                  "town": "Charleston",
                  "country": "USA",
                  "phoneNumber": "844-312-2221",
                  "lat": "32.77991",
                  "lng": "-79.9398",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7612f78e-0bf1-4e1d-a66b-56473e2290ee"
              },
              {
                  "iconName": "lodging",
                  "title": "Winselerhof Country Estate",
                  "website": "https://www.oostwegelcollection.nl/en/winselerhof/home",
                  "instagram": "@winselerhof",
                  "town": "Landgraaf",
                  "country": "Netherlands",
                  "phoneNumber": "31-455-464-343",
                  "lat": "50.87219",
                  "lng": "6.02962",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bb0e8077-efe1-4f42-8bdc-01869a991fba"
              },
              {
                  "iconName": "lodging",
                  "title": "12 Apostles Hotel & Spa",
                  "website": "https://www.12apostleshotel.com/",
                  "instagram": "@12apostleshotel",
                  "town": "Cape Town",
                  "country": "South Africa",
                  "phoneNumber": "27-21-437-9000",
                  "lat": "-33.98352",
                  "lng": "-33.98352",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e8f780d2-44d7-4aa7-995a-14f35c02603e"
              },
              {
                  "iconName": "lodging",
                  "title": "Alpina Dolomites Gardena Health Lodge & Spa",
                  "website": "https://www.lhw.com/hotel/Alpina-Dolomites-Gardena-Health-Lodge-Spa-Alpe-di-Siusi-Seiser-Alm-Italy",
                  "instagram": "@alpinadolomites",
                  "town": "Alpe di Siusi",
                  "country": "Italy",
                  "phoneNumber": "39-0471-796004",
                  "lat": "46.54282",
                  "lng": "46.54282",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "496ea96a-fd98-42cc-a901-bd2242015da8"
              },
              {
                  "iconName": "lodging",
                  "title": "Alvear Palace Hotel",
                  "website": "http://www.alvearpalace.com/en/",
                  "instagram": "@alvearpalace",
                  "town": "Buenos Aires",
                  "country": "Argentina",
                  "phoneNumber": "54-11-4804-7777",
                  "lat": "-34.58778",
                  "lng": "-34.58778",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e32749ca-52e3-47ee-afc0-c0db04523d81"
              },
              {
                  "iconName": "lodging",
                  "title": "Baglioni Hotel Cala del Porto",
                  "website": "http://www.baglionihotels.com/category/punta-ala-en/cala-del-porto-punta-ala-florence-tuscany/",
                  "instagram": "@baglionihotels",
                  "town": "Punta Ala",
                  "country": "Italy",
                  "phoneNumber": "39-0564-955455",
                  "lat": "42.80628",
                  "lng": "10.73798",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fbcacbb3-f0d6-4e74-b241-f8b3624e6b9e"
              },
              {
                  "iconName": "lodging",
                  "title": "Bahia del Duque",
                  "website": "http://www.bahia-duque.com/en",
                  "instagram": "@bahiadelduque",
                  "town": "Tenerife",
                  "country": "Spain",
                  "phoneNumber": "34-922-746-932",
                  "lat": "28.09322",
                  "lng": "-16.74208",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "65e9e6e3-a296-4450-93f3-da15168d04ab"
              },
              {
                  "iconName": "lodging",
                  "title": "Cape Grace",
                  "website": "https://www.capegrace.com/",
                  "instagram": "@capegracehotel",
                  "town": "Cape Town",
                  "country": "South Africa",
                  "phoneNumber": "27-21-410-7100",
                  "lat": "-33.90858",
                  "lng": "18.42043",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f4dfa491-289e-4d26-a572-632f5120dc73"
              },
              {
                  "iconName": "lodging",
                  "title": "Capri Palace Hotel & Spa",
                  "website": "http://www.capripalace.com/en/",
                  "instagram": "@capripalace",
                  "town": "Anacapri",
                  "country": "Italy",
                  "phoneNumber": "39-0819-780111",
                  "lat": "40.5556",
                  "lng": "14.22187",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e0e1abc8-8514-4684-8672-3aa63bbf8bf4"
              },
              {
                  "iconName": "lodging",
                  "title": "El Palace Barcelona",
                  "website": "https://www.hotelpalacebarcelona.com/en/",
                  "instagram": "@elpalacebarcelona",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-935-101-130",
                  "lat": "41.39154",
                  "lng": "2.17158",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "568d4c75-2493-4f69-89ef-35edb7af7bbb"
              },
              {
                  "iconName": "lodging",
                  "title": "Faena Hotel Miami Beach",
                  "website": "http://www.faena.com/miami-beach/",
                  "instagram": "@faena",
                  "town": "Miami Beach",
                  "country": "USA",
                  "phoneNumber": "305-604-1000",
                  "lat": "25.80744",
                  "lng": "-80.12353",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "973d1cf0-4ab1-409a-9d16-2facab4df3cb"
              },
              {
                  "iconName": "lodging",
                  "title": "Fancourt",
                  "website": "https://www.fancourt.co.za/",
                  "instagram": "@fancourtsa",
                  "town": "George",
                  "country": "South Africa",
                  "phoneNumber": "27-44-804-0000",
                  "lat": "-33.95232",
                  "lng": "22.40623",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2301727-609c-4f97-ba29-166235abfd4c"
              },
              {
                  "iconName": "lodging",
                  "title": "Grand Hotel Billia",
                  "website": "http://www.saintvincentresortcasino.it/grandhotelbillia/en/",
                  "instagram": "@saint_vincent_resort_casino",
                  "town": "Saint-Vincent",
                  "country": "Italy",
                  "phoneNumber": "39-0166-5231",
                  "lat": "45.75271",
                  "lng": "7.6407",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e9cded75-6630-4110-aad5-a709eba705cb"
              },
              {
                  "iconName": "lodging",
                  "title": "Grand Hotel Quisisana",
                  "website": "http://www.quisisana.com/",
                  "instagram": "@quisisanacapri",
                  "town": "Capri",
                  "country": "Italy",
                  "phoneNumber": "39-0810-901333",
                  "lat": "40.54957",
                  "lng": "14.24427",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ae16dc5e-3a8c-4552-b0f4-bc5cbbf85b89"
              },
              {
                  "iconName": "lodging",
                  "title": "Grand Hotel Stockholm",
                  "website": "https://www.grandhotel.se/en",
                  "instagram": "@grandhotelstockholm",
                  "town": "Stockholm",
                  "country": "Sweden",
                  "phoneNumber": "46-8-679-3500",
                  "lat": "59.32966",
                  "lng": "18.07545",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8333c01e-f5d4-4bb0-a93d-09d8ccdad91f"
              },
              {
                  "iconName": "lodging",
                  "title": "Gran Hotel La Florida",
                  "website": "http://www.hotellaflorida.com/en/",
                  "instagram": "@granhotellaflorida",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-932-593-000",
                  "lat": "41.42547",
                  "lng": "2.12081",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "84ac0bc2-d46b-445e-8f01-f424ebf3fdb3"
              },
              {
                  "iconName": "lodging",
                  "title": "Gran Hotel Miramar",
                  "website": "http://www.granhotelmiramarmalaga.com/en/",
                  "instagram": "@ghmiramarmalaga",
                  "town": "Malaga",
                  "country": "Spain",
                  "phoneNumber": "34-952-603-000",
                  "lat": "36.7202",
                  "lng": "-4.40754",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "86e9a800-1096-4242-92dd-d85596e81119"
              },
              {
                  "iconName": "lodging",
                  "title": "Gran Melia Colon",
                  "website": "https://www.melia.com/en/hotels/spain/seville/gran-melia-colon/index.html",
                  "instagram": "@granmeliacolon",
                  "town": "Seville",
                  "country": "Spain",
                  "phoneNumber": "34-954-505-599",
                  "lat": "37.39083",
                  "lng": "-5.99868",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "aa5de3f7-a659-437a-a84b-2fffe1b69286"
              },
              {
                  "iconName": "lodging",
                  "title": "Gran Melia Fenix",
                  "website": "https://www.melia.com/en/hotels/spain/madrid/gran-melia-fenix/index.html",
                  "instagram": "@granmeliafenix",
                  "town": "Madrid",
                  "country": "Spain",
                  "phoneNumber": "34-914-316-700",
                  "lat": "40.42641",
                  "lng": "-3.68931",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "266e012a-7414-4a3a-85c6-29387b67acbf"
              },
              {
                  "iconName": "lodging",
                  "title": "Hassler Roma",
                  "website": "http://www.hotelhasslerroma.com/",
                  "instagram": "@hasslerroma",
                  "town": "Rome",
                  "country": "Italy",
                  "phoneNumber": "39-0669-9340",
                  "lat": "41.90602",
                  "lng": "12.48379",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "786f3e0a-eabb-4891-8a9a-b9b825348f01"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Byblos Saint-Tropez",
                  "website": "http://www.byblos.com/en/",
                  "instagram": "@byblossttropez",
                  "town": "Saint-Tropez",
                  "country": "France",
                  "phoneNumber": "33-04-94-56-38-00",
                  "lat": "43.27035",
                  "lng": "6.64375",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1cf38fc6-1de0-4600-8b19-0f4e5057e6b9"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel d'Angleterre",
                  "website": "http://www.dangleterre.com/",
                  "instagram": "@dangleterrecph",
                  "town": "Copenhagen",
                  "country": "Denmark",
                  "phoneNumber": "45-3312-0095",
                  "lat": "55.68055",
                  "lng": "12.58464",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4bf4b866-dfc0-42d9-bb01-81152baeb6de"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Hermitage Monte-Carlo",
                  "website": "http://www.hotelhermitagemontecarlo.com/",
                  "instagram": "@hotelhermitagemc",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-98-06-40-00",
                  "lat": "43.7384",
                  "lng": "7.42654",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d377bbda-c00e-432d-865d-09a4349d0acf"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Il Pellicano",
                  "website": "http://www.pellicanohotels.com/hotel/il-pellicano/",
                  "instagram": "@pellicano_hotels",
                  "town": "Porto Ercole",
                  "country": "Italy",
                  "phoneNumber": "39-0564-858111",
                  "lat": "42.37356",
                  "lng": "11.18827",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "882dc949-9772-4c99-957a-c3f3f166c2bb"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Le K2 Palace",
                  "website": "http://www.lek2palace.com/en/",
                  "instagram": "@lek2courchevel",
                  "town": "Courchevel",
                  "country": "France",
                  "phoneNumber": "33-04-79-40-08-80",
                  "lat": "45.41215",
                  "lng": "6.6388",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "08ec05fc-4a8d-48c7-9125-04b43816dea8"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Okura Amsterdam",
                  "website": "https://www.okura.nl/en/",
                  "instagram": "@hotel_okura_amsterdam",
                  "town": "Amsterdam",
                  "country": "Netherlands",
                  "phoneNumber": "31-206-787-111",
                  "lat": "52.34874",
                  "lng": "4.89388",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "83b7c862-ae01-4c06-931f-c494e06b7880"
              },
              {
                  "iconName": "lodging",
                  "title": "Imperial Hotel, Tokyo",
                  "website": "https://www.imperialhotel.co.jp/e/tokyo/",
                  "instagram": "@imperialhotel_jp_official",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-335-04-1111",
                  "lat": "35.67231",
                  "lng": "139.75824",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8827409e-7a1b-4f00-898c-2f86408b088b"
              },
              {
                  "iconName": "lodging",
                  "title": "JK Place Capri",
                  "website": "http://www.jkcapri.com/",
                  "instagram": "@jkcapri",
                  "town": "Capri",
                  "country": "Italy",
                  "phoneNumber": "39-0818-384001",
                  "lat": "40.55741",
                  "lng": "14.23546",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a4827a23-57b9-4168-ab50-10c4a6f09733"
              },
              {
                  "iconName": "lodging",
                  "title": "JK Place Firenze",
                  "website": "http://www.jkplace.com/en/",
                  "instagram": "@jkplacefirenze",
                  "town": "Florence",
                  "country": "Italy",
                  "phoneNumber": "39-0552-645181",
                  "lat": "43.77292",
                  "lng": "11.2498",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e226beeb-2d51-49ac-ad03-80b60af5ba3b"
              },
              {
                  "iconName": "lodging",
                  "title": "JK Place Roma",
                  "website": "http://www.jkroma.com/en/",
                  "instagram": "@j.k.place_roma",
                  "town": "Rome",
                  "country": "Italy",
                  "phoneNumber": "39-0698-2634",
                  "lat": "41.90441",
                  "lng": "12.47693",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6fed9fea-fec0-4c49-b8fa-87e7afbfe7d4"
              },
              {
                  "iconName": "lodging",
                  "title": "Malibu Beach Inn",
                  "website": "https://www.malibubeachinn.com/",
                  "instagram": "@malibubeachinn",
                  "town": "Malibu",
                  "country": "USA",
                  "phoneNumber": "310-860-7800",
                  "lat": "34.0381",
                  "lng": "-118.67437",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "27ca40f1-1d77-4b05-bf33-8b9a2066fdcc"
              },
              {
                  "iconName": "lodging",
                  "title": "ME Ibiza",
                  "website": "https://www.melia.com/en/hotels/spain/ibiza/me-ibiza/index.html",
                  "instagram": "@meibiza",
                  "town": "Ibiza",
                  "country": "Spain",
                  "phoneNumber": "34-971-330-051",
                  "lat": "38.99193",
                  "lng": "1.56995",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4963a765-9147-40d8-b846-a3b8aa89b8e7"
              },
              {
                  "iconName": "lodging",
                  "title": "Palacio Tangara",
                  "website": "https://www.oetkercollection.com/destinations/palacio-tangara/",
                  "instagram": "@palaciotangara",
                  "town": "Sao Paulo",
                  "country": "Brazil",
                  "phoneNumber": "55-11-4904-4040",
                  "lat": "-23.63221",
                  "lng": "-46.72254",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d6c0481b-2e49-4da5-b5a0-54858cfafc86"
              },
              {
                  "iconName": "lodging",
                  "title": "Palazzo Venart Luxury Hotel",
                  "website": "https://www.palazzovenart.com/en/",
                  "instagram": "@palazzovenart",
                  "town": "Venice",
                  "country": "Italy",
                  "phoneNumber": "39-0415-233784",
                  "lat": "45.44129",
                  "lng": "12.32989",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5af1e118-5f1c-46b0-b9ee-a1a95b4b70a0"
              },
              {
                  "iconName": "lodging",
                  "title": "Ponta dos Ganchos Resort",
                  "website": "http://www.pontadosganchos.com.br/en/",
                  "instagram": "@pontadosganchos",
                  "town": "Governador Celso Ramos",
                  "country": "Brazil",
                  "phoneNumber": "55-48-3262-5000",
                  "lat": "-27.30573",
                  "lng": "-48.55153",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "488fd9db-529d-454b-99bc-32adfb30766d"
              },
              {
                  "iconName": "lodging",
                  "title": "Portrait Firenze",
                  "website": "https://www.lungarnocollection.com/portrait-firenze",
                  "instagram": "@lungarnocollection",
                  "town": "Florence",
                  "country": "Italy",
                  "phoneNumber": "39-0552-7268000",
                  "lat": "43.76878",
                  "lng": "11.25269",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e290e084-1935-4f54-9477-a2b77cc65eb4"
              },
              {
                  "iconName": "lodging",
                  "title": "Portrait Roma",
                  "website": "https://www.lungarnocollection.com/portrait-roma",
                  "instagram": "@lungarnocollection",
                  "town": "Rome",
                  "country": "Italy",
                  "phoneNumber": "39-0669-380742",
                  "lat": "41.90534",
                  "lng": "12.48028",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "69e843e1-903a-458f-8e26-9de0847b109e"
              },
              {
                  "iconName": "lodging",
                  "title": "Seven Pines Resort Ibiza",
                  "website": "http://www.7pines.com/ibiza/en/home.html",
                  "instagram": "@sevenpinesibiza",
                  "town": "Ibiza",
                  "country": "Spain",
                  "phoneNumber": "34-971-195-200",
                  "lat": "38.95154",
                  "lng": "1.22266",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b01649e6-2e36-4a3d-a480-4c1f7b502338"
              },
              {
                  "iconName": "lodging",
                  "title": "The Singular Patagonia, Puerto Bories Hotel",
                  "website": "https://thesingular.com/en/hotel/patagonia",
                  "instagram": "@thesingularhotels",
                  "town": "Puerto Natales",
                  "country": "Chile",
                  "phoneNumber": "56-6-1272-2030",
                  "lat": "-51.69278",
                  "lng": "-72.53357",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "52e4ff7b-228b-43f6-b77f-01b2712d9012"
              },
              {
                  "iconName": "lodging",
                  "title": "The Singular Santiago, Lastarria Hotel",
                  "website": "https://thesingular.com/en/hotel/santiago",
                  "instagram": "@thesingularhotels",
                  "town": "Santiago",
                  "country": "Chile",
                  "phoneNumber": "56-2-2306-8820",
                  "lat": "-33.43722",
                  "lng": "-70.64072",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d286e294-6242-4745-8995-4de443f422b4"
              },
              {
                  "iconName": "lodging",
                  "title": "The Kahala Hotel & Resort",
                  "website": "https://www.kahalaresort.com/",
                  "instagram": "@kahala_resort",
                  "town": "Honolulu",
                  "country": "USA",
                  "phoneNumber": "808-826-9644",
                  "lat": "21.27184",
                  "lng": "-157.77365",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "97a3bc55-6799-468b-9fe8-068d5d17b7f9"
              },
              {
                  "iconName": "lodging",
                  "title": "The Vines Resort & Spa",
                  "website": "http://www.vinesresortandspa.com/",
                  "instagram": "@thevinesresortandspa",
                  "town": "Tunuyan",
                  "country": "Argentina",
                  "phoneNumber": "54-26-1461-3900",
                  "lat": "-33.58922",
                  "lng": "-69.22047",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "46e55ad7-0a31-480f-8bc5-ab4df3059a11"
              },
              {
                  "iconName": "lodging",
                  "title": "Vila Vita Parc Resort & Spa",
                  "website": "https://vilavitaparc.com/en/welcome",
                  "instagram": "@vilavitaparc",
                  "town": "Porches",
                  "country": "Portugal",
                  "phoneNumber": "351-282-310-100",
                  "lat": "37.10144",
                  "lng": "-8.38021",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b52067b4-c2e5-45e2-8af6-dbe61e5334de"
              },
              {
                  "iconName": "lodging",
                  "title": "Wheatleigh",
                  "website": "https://www.wheatleigh.com/",
                  "instagram": "@wheatleighhotel",
                  "town": "Lenox",
                  "country": "USA",
                  "phoneNumber": "413-662-2111",
                  "lat": "42.34132",
                  "lng": "-73.30334",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fbcd65a9-1925-40f9-9e71-67e41f088df6"
              },
              {
                  "iconName": "lodging",
                  "title": "Cavas Wine Lodge",
                  "website": "http://www.cavaswinelodge.com/",
                  "instagram": "@cavaswinelodge",
                  "town": "Lujan de Cuyo",
                  "country": "Argentina",
                  "phoneNumber": "54-26-1456-1748",
                  "lat": "-33.11806",
                  "lng": "-68.92732",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fbfe5771-9b1f-4f43-98d6-26fd92b4f600"
              },
              {
                  "iconName": "lodging",
                  "title": "Eolo",
                  "website": "https://www.eolopatagonia.com/",
                  "instagram": "@eolo_patagonia",
                  "town": "El Calafate",
                  "country": "Argentina",
                  "phoneNumber": "54-29-0249-2042",
                  "lat": "-50.36626",
                  "lng": "-72.57513",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1ab03304-8abd-4126-a127-41c29ed8a7f0"
              },
              {
                  "iconName": "lodging",
                  "title": "Las Balsas",
                  "website": "http://www.lasbalsas.com/en/",
                  "instagram": "@lasbalsas",
                  "town": "Villa La Angostura",
                  "country": "Argentina",
                  "phoneNumber": "54-29-4449-4308",
                  "lat": "-40.77983",
                  "lng": "-71.62924",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9bd90bd1-aa6d-4d16-ab18-551bbc67337e"
              },
              {
                  "iconName": "lodging",
                  "title": "Saint Andreus Gramado",
                  "website": "http://www.saintandrews.com.br/",
                  "instagram": "@hotelsaintandrews",
                  "town": "Gramado",
                  "country": "Brazil",
                  "phoneNumber": "55-54-3295-7700",
                  "lat": "-29.38536",
                  "lng": "-50.86531",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3955222f-1147-4513-8313-8e5014299ce1"
              },
              {
                  "iconName": "lodging",
                  "title": "Auberge Saint-Antoine",
                  "website": "https://saint-antoine.com/en/",
                  "instagram": "@aubergesaintantoine",
                  "town": "Quebec City",
                  "country": "Canada",
                  "phoneNumber": "418-692-3861",
                  "lat": "46.81444",
                  "lng": "-71.20178",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9cab9cb1-053f-443f-aa10-a17a69e50690"
              },
              {
                  "iconName": "lodging",
                  "title": "Clayoquot Wilderness Resort",
                  "website": "https://wildretreat.com/",
                  "instagram": "@clayoquotresort",
                  "town": "Tofino",
                  "country": "Canada",
                  "phoneNumber": "902-285-2600",
                  "lat": "49.36359",
                  "lng": "-125.78038",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c313c52e-6109-467d-88d7-dc118eb8dcdf"
              },
              {
                  "iconName": "lodging",
                  "title": "Post Hotel & Spa",
                  "website": "http://www.posthotel.com/",
                  "instagram": "@post.hotel.lake.louise",
                  "town": "Lake Louise",
                  "country": "Canada",
                  "phoneNumber": "403-762-6801",
                  "lat": "51.42644",
                  "lng": "-116.18128",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a9a57699-f4d1-48f7-90ec-924d4deb6728"
              },
              {
                  "iconName": "lodging",
                  "title": "Sonora Resort",
                  "website": "https://sonoraresort.com/",
                  "instagram": "@sonoraresort",
                  "town": "Sonora Island",
                  "country": "Canada",
                  "phoneNumber": "604-566-8808",
                  "lat": "50.38252",
                  "lng": "-125.15589",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "94ff36a5-3fd8-4cd5-b434-33c0b146b1ea"
              },
              {
                  "iconName": "lodging",
                  "title": "Awasi Patagonia",
                  "website": "http://www.awasipatagonia.com/about/",
                  "instagram": "@awasiexperience",
                  "town": "Torres del Paine",
                  "country": "Chile",
                  "phoneNumber": "56-2-2233-9641",
                  "lat": "-50.91123",
                  "lng": "-72.6395",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "27e558e7-a5da-4fa5-9223-60a8319111e1"
              },
              {
                  "iconName": "lodging",
                  "title": "Awasi Atacama",
                  "website": "http://www.awasiatacama.com/about/",
                  "instagram": "@awasiexperience",
                  "town": "San Pedro de Atacama",
                  "country": "Chile",
                  "phoneNumber": "56-2-2233-9641",
                  "lat": "-22.91445",
                  "lng": "-68.2004",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f57f054a-64f4-41c8-8b56-3cc83c6ecc2b"
              },
              {
                  "iconName": "lodging",
                  "title": "Falsled Kro",
                  "website": "http://www.falsledkro.dk/frontpage",
                  "instagram": "@falsledkro",
                  "town": "Millinge",
                  "country": "Denmark",
                  "phoneNumber": "45-6268-1111",
                  "lat": "55.15294",
                  "lng": "10.14833",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "717db986-c6f3-41b9-80c9-3e910779d42c"
              },
              {
                  "iconName": "lodging",
                  "title": "Hameau Albert 1er",
                  "website": "http://www.hameaualbert.fr/en",
                  "instagram": "@hameau_albert_1er",
                  "town": "Chamonix-Mont-Blanc",
                  "country": "France",
                  "phoneNumber": "33-04-50-53-05-09",
                  "lat": "45.92513",
                  "lng": "6.87369",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "93aad58d-b1b9-41da-a9d7-058ced38a929"
              },
              {
                  "iconName": "lodging",
                  "title": "L'Assiette Champenoise",
                  "website": "https://www.assiettechampenoise.com/en/",
                  "instagram": "@lallement_arnaud",
                  "town": "Tinqueux",
                  "country": "France",
                  "phoneNumber": "33-03-26-84-64-64",
                  "lat": "49.24763",
                  "lng": "4.00396",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a46343e9-c987-4f01-8f8f-bcc8c246988c"
              },
              {
                  "iconName": "lodging",
                  "title": "Chateau de Bagnols",
                  "website": "http://www.chateaudebagnols.com/en",
                  "instagram": "@chateau_de_bagnols",
                  "town": "Bagnols",
                  "country": "France",
                  "phoneNumber": "33-04-74-71-40-00",
                  "lat": "45.91673",
                  "lng": "4.60897",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7619b104-3ce0-4139-8903-4007294a81d5"
              },
              {
                  "iconName": "lodging",
                  "title": "Chateau de Berne",
                  "website": "http://www.chateauberne.com/en/",
                  "instagram": "@chateaudeberne",
                  "town": "Flayosc",
                  "country": "France",
                  "phoneNumber": "33-04-94-60-48-88",
                  "lat": "43.51663",
                  "lng": "6.36627",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "be88eee1-d821-48dd-b33d-29a2c679ae18"
              },
              {
                  "iconName": "lodging",
                  "title": "Georges Blanc Parc & Spa",
                  "website": "http://www.georgesblanc.com/en/village-blanc/our-hotels/georges-blanc-5-star-hotel.html",
                  "instagram": "@georges_blanc_officiel",
                  "town": "Vonnas",
                  "country": "France",
                  "phoneNumber": "33-04-74-50-90-90",
                  "lat": "46.21991",
                  "lng": "4.98987",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "caad5ce9-f725-459e-9500-9755fff43021"
              },
              {
                  "iconName": "lodging",
                  "title": "Abbaye de la Bussiere",
                  "website": "http://www.abbayedelabussiere.fr/en/",
                  "instagram": "@abbaye_de_la_bussiere",
                  "town": "La Bussiere-sur-Ouche",
                  "country": "France",
                  "phoneNumber": "33-03-80-49-02-29",
                  "lat": "47.21568",
                  "lng": "47.21568",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "db0d5f06-d6fd-4b0c-ae5a-714a396b6bc4"
              },
              {
                  "iconName": "lodging",
                  "title": "Chateau de La Chevre d'Or",
                  "website": "http://www.chevredor.com/",
                  "instagram": "@lachevredor",
                  "town": "Eze-Village",
                  "country": "France",
                  "phoneNumber": "33-04-92-10-66-66",
                  "lat": "43.7273",
                  "lng": "7.36186",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "df3c0bf8-49dc-430e-8d59-759737aaa8ab"
              },
              {
                  "iconName": "lodging",
                  "title": "Flocons de Sel",
                  "website": "http://www.floconsdesel.com/en/",
                  "instagram": "@floconsdesel",
                  "town": "Megeve",
                  "country": "France",
                  "phoneNumber": "33-04-50-21-49-99",
                  "lat": "45.83024",
                  "lng": "6.59686",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c6bf536a-1cca-4735-9e08-9645f94f3288"
              },
              {
                  "iconName": "lodging",
                  "title": "Maison Lameloise",
                  "website": "http://www.lameloise.fr/en/",
                  "instagram": "@maisonlameloise",
                  "town": "Chagny",
                  "country": "France",
                  "phoneNumber": "33-03-85-87-65-65",
                  "lat": "46.90793",
                  "lng": "4.75299",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ca87fc03-60cf-4f42-bd8a-d1ed2d4d5a45"
              },
              {
                  "iconName": "lodging",
                  "title": "Hostellerie de Levernois",
                  "website": "http://www.levernois.com/en/",
                  "instagram": "@hostellerie_de_levernois",
                  "town": "Levernois",
                  "country": "France",
                  "phoneNumber": "33-03-80-24-73-58",
                  "lat": "46.99317",
                  "lng": "4.87758",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7d5e1c9b-5ca0-4a8f-99a9-a6aef6f2dba5"
              },
              {
                  "iconName": "lodging",
                  "title": "Le Couvent des Minimes Hotel & Spa L'Occitane",
                  "website": "http://www.couventdesminimes-hotelspa.com/uk/hotel-couvent-des-minimes-site-officiel.php",
                  "instagram": "@hotelcouventdesminimes",
                  "town": "Mane",
                  "country": "France",
                  "phoneNumber": "33-04-92-74-77-77",
                  "lat": "43.9394",
                  "lng": "5.77211",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2a13f6dc-cb88-43b9-9c83-fc373a654f6e"
              },
              {
                  "iconName": "lodging",
                  "title": "Chalet du Mont d'Arbois",
                  "website": "http://www.mont-darbois.fr/hotels/chalet-mont-arbois/default-en.aspx",
                  "instagram": "@domainedumontdarbois",
                  "town": "Megeve",
                  "country": "France",
                  "phoneNumber": "33-04-50-21-25-03",
                  "lat": "45.85673",
                  "lng": "6.62828",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "721aa41f-4401-4c6e-b61f-7a072ac51ef1"
              },
              {
                  "iconName": "lodging",
                  "title": "Saint James Paris",
                  "website": "http://www.saint-james-paris.com/?lang=en",
                  "instagram": "@saintjamesparis",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-44-05-81-81",
                  "lat": "48.87046",
                  "lng": "2.27974",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "df0bb351-64da-4bff-bec3-7e59f58ac3e5"
              },
              {
                  "iconName": "lodging",
                  "title": "Auberge des Templiers",
                  "website": "http://www.lestempliers.com/en/",
                  "instagram": "@aubergedestempliers",
                  "town": "Boismorand",
                  "country": "France",
                  "phoneNumber": "33-02-38-31-80-01",
                  "lat": "47.80033",
                  "lng": "2.7392",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "06188815-8c66-4020-bcc7-fb99a8ff4bc4"
              },
              {
                  "iconName": "lodging",
                  "title": "Rajmahal Palace",
                  "website": "http://www.sujanluxury.com/raj-mahal/index.htm",
                  "instagram": "@sujanluxury",
                  "town": "Rajmahal",
                  "country": "India",
                  "phoneNumber": "91-14-1414-3000",
                  "lat": "25.89635",
                  "lng": "75.46802",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "39fbbbd0-e9bb-4f29-82d4-a5536aef003a"
              },
              {
                  "iconName": "lodging",
                  "title": "Niraamaya Surya Samudra",
                  "website": "http://www.niraamaya.in/kovalam.html",
                  "instagram": "@niraamayaretreats",
                  "town": "Kazhivoor",
                  "country": "India",
                  "phoneNumber": "91-47-1226-7124",
                  "lat": "8.36317",
                  "lng": "77.00721",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8760bf67-6781-4755-ae55-dea207200694"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Borgo San Felice",
                  "website": "http://www.agricolasanfelice.it/en/hotel-borgo-san-felice/",
                  "instagram": "@borgosanfelice",
                  "town": "Castelnuovo Berardegna",
                  "country": "Italy",
                  "phoneNumber": "39-0577-3964",
                  "lat": "43.38835",
                  "lng": "11.45857",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "86b320d3-7506-48b3-8ec8-769985f260c3"
              },
              {
                  "iconName": "lodging",
                  "title": "Da Vittorio",
                  "website": "http://www.davittorio.com/en/",
                  "instagram": "@davittorioristorante",
                  "town": "Brusaporto",
                  "country": "Italy",
                  "phoneNumber": "39-0356-81024",
                  "lat": "45.67497",
                  "lng": "9.76886",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1ddfb884-ebe3-40ca-8119-50cf96a2d3b9"
              },
              {
                  "iconName": "lodging",
                  "title": "Don Alfonso 1890",
                  "website": "http://www.donalfonso.com/home.asp?lingua=ing",
                  "instagram": "@donalfonso1890",
                  "town": "Sant'Agata sui Due Golfi",
                  "country": "Italy",
                  "phoneNumber": "39-0818-780026",
                  "lat": "40.60802",
                  "lng": "14.3738",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cfd141a5-489e-4b96-8159-f2ffe1bbaef9"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Londra Palace",
                  "website": "http://www.londrapalace.com/en/",
                  "instagram": "@londrapalace",
                  "town": "Venice",
                  "country": "Italy",
                  "phoneNumber": "39-0415-200533",
                  "lat": "45.43407",
                  "lng": "12.34344",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7da18e82-8525-4105-b96d-90675de86c2a"
              },
              {
                  "iconName": "lodging",
                  "title": "Petra Segreta Luxury Resort & Spa",
                  "website": "https://www.petrasegretaresort.com/en/",
                  "instagram": "@petrasegretaofficial",
                  "town": "San Pantaleo",
                  "country": "Italy",
                  "phoneNumber": "39-0789-1876461",
                  "lat": "41.05167",
                  "lng": "9.44594",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f2333a41-8255-4ff4-95ef-0e1c8a2b564e"
              },
              {
                  "iconName": "lodging",
                  "title": "Gora Kadan",
                  "website": "http://www.gorakadan.com/index_english.html?mode=pc",
                  "instagram": "@gorakadan",
                  "town": "Hakone",
                  "country": "Japan",
                  "phoneNumber": "81-460-82-3331",
                  "lat": "35.24694",
                  "lng": "139.04849",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "828629cc-3d7d-4d54-b424-1998c04abe4f"
              },
              {
                  "iconName": "lodging",
                  "title": "Tobira Onsen Myojinkan",
                  "website": "http://www.tobira-group.com/myojinkan/",
                  "instagram": "@tobiraonsen.myojinkan",
                  "town": "Matsumoto",
                  "country": "Japan",
                  "phoneNumber": "81-263-31-2301",
                  "lat": "36.1861",
                  "lng": "138.0822",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fffb0098-11ea-483b-a686-20dce2c13a31"
              },
              {
                  "iconName": "lodging",
                  "title": "Uza Terrace Beach Club Villas",
                  "website": "http://www.terrace.co.jp/en/uza/",
                  "instagram": "@theuzaterrace",
                  "town": "Yomitan",
                  "country": "Japan",
                  "phoneNumber": "81-98-921-6111",
                  "lat": "26.43205",
                  "lng": "127.71844",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4dbd8893-d5f0-49b5-8026-c67a72f02797"
              },
              {
                  "iconName": "lodging",
                  "title": "Kasteel Engelenburg",
                  "website": "https://www.relaischateaux.com/us/netherlands/engelenburg-gelderland-brummen",
                  "instagram": "@kasteelengelenburg",
                  "town": "Brummen",
                  "country": "Netherlands",
                  "phoneNumber": "31-575-569-999",
                  "lat": "52.09044",
                  "lng": "6.13458",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e6957157-44ed-4f99-a62f-b9c3a9dcaf9e"
              },
              {
                  "iconName": "lodging",
                  "title": "Huka Lodge",
                  "website": "http://www.hukalodge.co.nz/",
                  "instagram": "@hukalodge",
                  "town": "Taupo",
                  "country": "New Zealand",
                  "phoneNumber": "64-7-378-5791",
                  "lat": "-38.6544",
                  "lng": "176.08602",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b1ffa85e-c366-42e8-b8c1-00b347d5cb80"
              },
              {
                  "iconName": "lodging",
                  "title": "The Lodge at Kauri Cliffs",
                  "website": "http://www.kauricliffs.com/",
                  "instagram": "@kauricliffs",
                  "town": "Matauri Bay",
                  "country": "New Zealand",
                  "phoneNumber": "64-9-407-0010",
                  "lat": "-35.07659",
                  "lng": "173.9226",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0b92c2d9-0068-426c-ac5c-0dfc9fe2a4a7"
              },
              {
                  "iconName": "lodging",
                  "title": "The Farm at Cape Kidnappers",
                  "website": "http://www.capekidnappers.com/",
                  "instagram": "@capekidnappers",
                  "town": "Te Awanga",
                  "country": "New Zealand",
                  "phoneNumber": "64-6-875-1900",
                  "lat": "-39.66744",
                  "lng": "177.03244",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "381d1cb8-da2f-4160-8119-9600b612ce32"
              },
              {
                  "iconName": "lodging",
                  "title": "Matakauri Lodge",
                  "website": "http://www.matakaurilodge.com/",
                  "instagram": "@matakaurilodge",
                  "town": "Queenstown",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-441-1008",
                  "lat": "-45.05972",
                  "lng": "168.58812",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "76afab90-dac3-4c79-905a-f4290a291bf6"
              },
              {
                  "iconName": "lodging",
                  "title": "Otahuna Lodge",
                  "website": "http://www.otahuna.co.nz/",
                  "instagram": "@otahunalodge",
                  "town": "Tai Tapu",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-329-6333",
                  "lat": "-43.65876",
                  "lng": "172.58405",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2c97aaac-1944-4317-a6e7-efa64781ca78"
              },
              {
                  "iconName": "lodging",
                  "title": "Titilaka",
                  "website": "http://www.titilaka.pe/en/",
                  "instagram": "@titilakaperu",
                  "town": "Lake Titicaca",
                  "country": "Peru",
                  "phoneNumber": "51-1-700-5111",
                  "lat": "-15.90214",
                  "lng": "-69.73625",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "107d8471-c602-4591-9993-f8198ff69b59"
              },
              {
                  "iconName": "lodging",
                  "title": "Bela Vista Hotel & Spa",
                  "website": "http://www.hotelbelavista.net/en/bela-vista",
                  "instagram": "@bela_vista_hotel_spa_",
                  "town": "Portimao",
                  "country": "Portugal",
                  "phoneNumber": "351-282-460-280",
                  "lat": "37.11849",
                  "lng": "-8.53764",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "54486526-4008-4733-98d6-125aff110fa7"
              },
              {
                  "iconName": "lodging",
                  "title": "Fortaleza do Guincho",
                  "website": "http://www.fortalezadoguincho.com/en/",
                  "instagram": "@hotel_fortaleza_do_guincho",
                  "town": "Cascais",
                  "country": "Portugal",
                  "phoneNumber": "351-214-870-491",
                  "lat": "38.72825",
                  "lng": "-9.47613",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0d270947-be4f-4da6-a842-d005d4451ee9"
              },
              {
                  "iconName": "lodging",
                  "title": "The Yeatman",
                  "website": "https://www.the-yeatman-hotel.com/en/",
                  "instagram": "@theyeatman",
                  "town": "Gaia",
                  "country": "Portugal",
                  "phoneNumber": "351-220-133-100",
                  "lat": "41.13333",
                  "lng": "-8.613",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "76d6457e-ded6-4fdf-9138-0e886bf8bd21"
              },
              {
                  "iconName": "lodging",
                  "title": "Bushmans Kloof Wilderness Reserve & Wellness Retreat",
                  "website": "https://www.bushmanskloof.co.za/",
                  "instagram": "@bushmanskloof",
                  "town": "Clanwilliam",
                  "country": "South Africa",
                  "phoneNumber": "27-27-482-8200",
                  "lat": "-32.07371",
                  "lng": "19.09515",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cc1d6c7f-988c-4cbf-87b1-a1a9f0cc0f27"
              },
              {
                  "iconName": "lodging",
                  "title": "Ellerman House",
                  "website": "http://www.ellerman.co.za/",
                  "instagram": "@ellermanhousehotel",
                  "town": "Cape Town",
                  "country": "South Africa",
                  "phoneNumber": "27-21-430-3200",
                  "lat": "-33.92903",
                  "lng": "18.37755",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7446d5ae-56eb-4f0e-a5f4-2ca0261ba7fa"
              },
              {
                  "iconName": "lodging",
                  "title": "Esiweni Luxury Safari Lodge",
                  "website": "http://www.esiwenilodge.com/",
                  "instagram": "@esiwenilodge",
                  "town": "Nambiti Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-36-636-9002",
                  "lat": "-28.44063",
                  "lng": "30.01885",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6fabab9e-48ca-43eb-8013-df1ff0b4cc25"
              },
              {
                  "iconName": "lodging",
                  "title": "Camp Jabulani",
                  "website": "http://www.campjabulani.com/",
                  "instagram": "@campjabulani",
                  "town": "Hoedspruit",
                  "country": "South Africa",
                  "phoneNumber": "27-74-137-3286",
                  "lat": "-24.39751",
                  "lng": "31.0977",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9ddc3be1-b19f-4cb0-a4f5-8bd7b8276f67"
              },
              {
                  "iconName": "lodging",
                  "title": "Londolozi Private Game Reserve",
                  "website": "https://www.londolozi.com/en/",
                  "instagram": "@londolozi",
                  "town": "Sabi Sand Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-13-735-5653",
                  "lat": "-24.79619",
                  "lng": "31.50041",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e5257e8f-4786-4ef1-adfe-141a8b5c4616"
              },
              {
                  "iconName": "lodging",
                  "title": "El Castell de Ciutat",
                  "website": "http://www.hotelelcastell.com/en/home",
                  "instagram": "@castelldeciutat",
                  "town": "La Seu d'Urgell",
                  "country": "Spain",
                  "phoneNumber": "34-973-350-000",
                  "lat": "42.3583",
                  "lng": "1.44632",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8754e096-6e43-45a0-baad-5541e694f08a"
              },
              {
                  "iconName": "lodging",
                  "title": "Mirador de Dalt Vila",
                  "website": "http://www.hotelmiradoribiza.com/en",
                  "instagram": "@miradoribiza",
                  "town": "Ibiza",
                  "country": "Spain",
                  "phoneNumber": "34-971-303-045",
                  "lat": "38.90712",
                  "lng": "1.43768",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f9b7acef-c333-48bb-b374-2e224ddeec99"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Orfila",
                  "website": "http://www.hotelorfila.com/",
                  "instagram": "@hotel_orfila",
                  "town": "Madrid",
                  "country": "Spain",
                  "phoneNumber": "34-917-027-770",
                  "lat": "40.42731",
                  "lng": "-3.69321",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7dc22f2b-0e3d-4f22-8e9a-c7f76445bc36"
              },
              {
                  "iconName": "lodging",
                  "title": "Wanakarn Beach Resort & Spa",
                  "website": "http://www.wanakarnresort.com/",
                  "instagram": "@wanakarn.hotel",
                  "town": "Thai Muang",
                  "country": "Thailand",
                  "phoneNumber": "66-76-584-300",
                  "lat": "8.37004",
                  "lng": "98.25626",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "30c81c1e-2156-4258-8151-758336e826c2"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Le Manoir aux Quat'Saisons",
                  "website": "https://www.belmond.com/le-manoir-aux-quat-saisons-oxfordshire/",
                  "instagram": "@belmondlemanoir",
                  "town": "Great Milton",
                  "country": "England",
                  "phoneNumber": "44-018-4427-8881",
                  "lat": "51.71674",
                  "lng": "-1.09155",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "21d32d97-588a-414a-a926-e49edf9e734d"
              },
              {
                  "iconName": "lodging",
                  "title": "Amberley Castle",
                  "website": "http://www.amberleycastle.co.uk/",
                  "instagram": "@brownswordhotels",
                  "town": "Amberley",
                  "country": "England",
                  "phoneNumber": "44-017-9883-1992",
                  "lat": "50.90888",
                  "lng": "-0.54048",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4151a58d-98e2-40e5-be9f-feb172206e3c"
              },
              {
                  "iconName": "lodging",
                  "title": "Cliveden House",
                  "website": "https://www.clivedenhouse.co.uk/",
                  "instagram": "@clivedenhouse",
                  "town": "Taplow",
                  "country": "England",
                  "phoneNumber": "44-016-2866-8561",
                  "lat": "51.55836",
                  "lng": "-0.68828",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9d53cc3f-f56a-421b-93cf-47e894cc26ae"
              },
              {
                  "iconName": "lodging",
                  "title": "Farlam Hall",
                  "website": "http://www.farlamhall.co.uk/",
                  "instagram": "@farlamhall",
                  "town": "Brampton",
                  "country": "England",
                  "phoneNumber": "44-016-9774-6234",
                  "lat": "54.93394",
                  "lng": "-2.67278",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fc905cde-8561-4826-b7f6-e03a613605f3"
              },
              {
                  "iconName": "lodging",
                  "title": "Gidleigh Park",
                  "website": "http://www.gidleigh.co.uk/",
                  "instagram": "@brownswordhotels",
                  "town": "Chagford",
                  "country": "England",
                  "phoneNumber": "44-016-4743-2367",
                  "lat": "50.67673",
                  "lng": "-3.87326",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3f5da5cf-9d5f-4a4c-83ad-a7b7b4646082"
              },
              {
                  "iconName": "lodging",
                  "title": "The Idle Rocks",
                  "website": "http://www.idlerocks.com/",
                  "instagram": "@idlerocks",
                  "town": "St Mawes",
                  "country": "England",
                  "phoneNumber": "44-013-2627-0270",
                  "lat": "50.15912",
                  "lng": "-5.01332",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "61c0a4f1-3bcd-488f-a439-f9f0b01df36b"
              },
              {
                  "iconName": "lodging",
                  "title": "Whatley Manor Hotel & Spa",
                  "website": "http://www.whatleymanor.com/",
                  "instagram": "@whatleymanor",
                  "town": "Malmesbury",
                  "country": "England",
                  "phoneNumber": "44-016-6682-2888",
                  "lat": "51.58358",
                  "lng": "-2.14843",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e8aef344-1158-4521-9c9f-ec3184be0ac9"
              },
              {
                  "iconName": "lodging",
                  "title": "Blackberry Farm",
                  "website": "http://www.blackberryfarm.com/",
                  "instagram": "@blackberryfarm",
                  "town": "Walland",
                  "country": "USA",
                  "phoneNumber": "865-984-8166",
                  "lat": "35.68611",
                  "lng": "-83.86562",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ce7e0b82-3541-4d0b-be3e-642e8250f8e1"
              },
              {
                  "iconName": "lodging",
                  "title": "Camden Harbour Inn",
                  "website": "https://www.camdenharbourinn.com/",
                  "instagram": "@camdenharbourinn",
                  "town": "Camden",
                  "country": "USA",
                  "phoneNumber": "207-370-8187",
                  "lat": "44.20586",
                  "lng": "-69.0616",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d52a99e9-553e-4034-9784-b69065d74874"
              },
              {
                  "iconName": "lodging",
                  "title": "The Home Ranch",
                  "website": "https://www.homeranch.com/",
                  "instagram": "@thehomeranch",
                  "town": "Clark",
                  "country": "USA",
                  "phoneNumber": "970-879-6111",
                  "lat": "40.71575",
                  "lng": "-106.9068",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "68e01913-637a-465a-a784-54a057dda6d8"
              },
              {
                  "iconName": "lodging",
                  "title": "The Little Nell",
                  "website": "https://www.thelittlenell.com/",
                  "instagram": "@thelittlenell",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "970-923-1227",
                  "lat": "39.18638",
                  "lng": "-106.81742",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8da4ae58-865e-4cee-9caf-5fda8e0f5f9c"
              },
              {
                  "iconName": "lodging",
                  "title": "Meadowood Napa Valley",
                  "website": "http://www.meadowood.com/",
                  "instagram": "@meadowoodnapavalley",
                  "town": "St Helena",
                  "country": "USA",
                  "phoneNumber": "707-723-4646",
                  "lat": "38.52255",
                  "lng": "-122.46748",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "89e4b521-f586-4a9f-9761-601bd8fb064a"
              },
              {
                  "iconName": "lodging",
                  "title": "Ocean House",
                  "website": "https://www.oceanhouseri.com/",
                  "instagram": "@oceanhouseri",
                  "town": "Watch Hill",
                  "country": "USA",
                  "phoneNumber": "401-637-7600",
                  "lat": "41.31028",
                  "lng": "-71.85389",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2524d993-e851-414b-adae-bf82bbfe3f97"
              },
              {
                  "iconName": "lodging",
                  "title": "The Point",
                  "website": "http://www.thepointsaranac.com/",
                  "instagram": "@the_pointresort",
                  "town": "Saranac Lake",
                  "country": "USA",
                  "phoneNumber": "541-247-6664",
                  "lat": "44.30372",
                  "lng": "-74.33133",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2189e91-591a-49c2-880f-1609c75cf1b4"
              },
              {
                  "iconName": "lodging",
                  "title": "Auberge du Soleil",
                  "website": "https://aubergedusoleil.aubergeresorts.com/",
                  "instagram": "@aubergedusoleil",
                  "town": "Rutherford",
                  "country": "USA",
                  "phoneNumber": "707-963-4704",
                  "lat": "38.49352",
                  "lng": "-122.40609",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c5d23acb-b343-4794-8a44-948e93295f00"
              },
              {
                  "iconName": "lodging",
                  "title": "The Surrey Hotel",
                  "website": "http://www.thesurrey.com/",
                  "instagram": "@surreyhotelnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-299-3900",
                  "lat": "40.77426",
                  "lng": "-73.96398",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "17967397-5242-4e9b-808e-e7ec14b2050d"
              },
              {
                  "iconName": "lodging",
                  "title": "Triple Creek Ranch",
                  "website": "https://www.triplecreekranch.com/",
                  "instagram": "@triplecreekranch",
                  "town": "Darby",
                  "country": "USA",
                  "phoneNumber": "408-354-4330",
                  "lat": "45.88065",
                  "lng": "-114.20817",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "40dc16d8-d7ee-4556-9ba1-ae5b3703f7ab"
              },
              {
                  "iconName": "lodging",
                  "title": "Weekapaug Inn",
                  "website": "http://www.weekapauginn.com/",
                  "instagram": "@weekapauginn",
                  "town": "Westerly",
                  "country": "USA",
                  "phoneNumber": "403-522-3555",
                  "lat": "41.33052",
                  "lng": "-71.75039",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ddd6fb54-9c41-432c-a834-b0344a14db13"
              },
              {
                  "iconName": "lodging",
                  "title": "The White Barn Inn & Spa",
                  "website": "http://www.whitebarninn.com/",
                  "instagram": "@gracehotels",
                  "town": "Kennebunk Beach",
                  "country": "USA",
                  "phoneNumber": "208-622-2135",
                  "lat": "43.35529",
                  "lng": "-70.47954",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "017e5a36-6554-4e26-87ed-a199f2d60e32"
              },
              {
                  "iconName": "lodging",
                  "title": "Abba Resorts Izu",
                  "website": "http://zagyosoh.com/lang/en/",
                  "instagram": "@abba_resorts_izu_zagyosh",
                  "town": "Ito",
                  "country": "Japan",
                  "phoneNumber": "81-557-53-1170",
                  "lat": "34.86559",
                  "lng": "34.86559",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "467900b9-32b8-41b2-942a-500bb8d356ed"
              },
              {
                  "iconName": "lodging",
                  "title": "Lanson Place Hotel",
                  "website": "http://www.hongkong.lansonplace.com/",
                  "instagram": "@lansonplacehk",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-3477-6888",
                  "lat": "22.27866",
                  "lng": "114.18679",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1f42df7e-41b5-4426-be60-5da6d417df35"
              },
              {
                  "iconName": "lodging",
                  "title": "Naman Retreat",
                  "website": "https://www.namanretreat.com/en/retreat/",
                  "instagram": "@namanretreat",
                  "town": "Ngu Hanh Son",
                  "country": "Vietnam",
                  "phoneNumber": "84-236-395-9888",
                  "lat": "15.9697",
                  "lng": "108.28424",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0a9616d3-5976-4641-b672-279efeaa4a42"
              },
              {
                  "iconName": "lodging",
                  "title": "The Racha",
                  "website": "https://www.theracha.com/",
                  "instagram": "@theracha_phuket",
                  "town": "Ko Racha Yai",
                  "country": "Thailand",
                  "phoneNumber": "66-76-355-455",
                  "lat": "7.60755",
                  "lng": "98.36867",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e4f4117e-7bc7-4cc5-95c4-23741f92efd4"
              },
              {
                  "iconName": "lodging",
                  "title": "Zeavola",
                  "website": "https://www.zeavola.com/",
                  "instagram": "@zeavolaresort",
                  "town": "Ko Phi Phi",
                  "country": "Thailand",
                  "phoneNumber": "66-75-627-000",
                  "lat": "7.77872",
                  "lng": "98.76139",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1ee22cd5-5485-469e-9f46-d03f2734afb2"
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Kapalua Bay",
                  "website": "https://www.montagehotels.com/kapaluabay/",
                  "instagram": "@montagekapalua",
                  "town": "Lahaina",
                  "country": "USA",
                  "phoneNumber": "808-732-8920",
                  "lat": "21.00152",
                  "lng": "-156.6651",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cf507059-e940-40b9-bdc3-695045f4224e"
              },
              {
                  "iconName": "lodging",
                  "title": "Chiltern Firehouse",
                  "website": "http://www.chilternfirehouse.com/",
                  "instagram": "@chilternfirehouse",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7073-7690",
                  "lat": "51.51863",
                  "lng": "-0.15486",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7e932703-8213-41cb-97aa-1ed0dede1fe7"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood CordeValle",
                  "website": "https://www.rosewoodhotels.com/en/cordevalle-northern-california",
                  "instagram": "@rwcordevalle",
                  "town": "San Martin",
                  "country": "USA",
                  "phoneNumber": "413-637-0610",
                  "lat": "37.06758",
                  "lng": "-121.63289",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1386c613-2df1-4896-b984-4f40842217dc"
              },
              {
                  "iconName": "lodging",
                  "title": "Shoreditch House",
                  "website": "https://www.shoreditchhouse.com/",
                  "instagram": "@sohohouse",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7739-5040",
                  "lat": "51.52381",
                  "lng": "-0.07593",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8e887df7-48df-47b7-a9e5-2bfb7fccefc0"
              },
              {
                  "iconName": "lodging",
                  "title": "Aman Summer Palace",
                  "website": "https://www.aman.com/resorts/aman-summer-palace",
                  "instagram": "@amansummerpalace",
                  "town": "Beijing",
                  "country": "China",
                  "phoneNumber": "86-10-5987-9999",
                  "lat": "39.93329",
                  "lng": "39.93329",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4e951a38-70a0-40d8-a639-236d00678823"
              },
              {
                  "iconName": "lodging",
                  "title": "Le Royal Meridien, Chennai",
                  "website": "http://www.starwoodhotels.com/lemeridien/property/overview/index.html?propertyID=1834&SWAQ=958C",
                  "instagram": "@lrmchennai",
                  "town": "Chennai",
                  "country": "India",
                  "phoneNumber": "91-44-2231-4343",
                  "lat": "13.00663",
                  "lng": "80.20555",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bf0e2663-f87b-4f32-ad11-d0369cb042d0"
              },
              {
                  "iconName": "lodging",
                  "title": "Amangiri",
                  "website": "https://www.aman.com/resorts/amangiri",
                  "instagram": "@amangiri",
                  "town": "Canyon Point",
                  "country": "USA",
                  "phoneNumber": "435-940-5700",
                  "lat": "37.01458",
                  "lng": "-111.61128",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a6255705-f7a6-4396-88c5-f9d19d9ac459"
              },
              {
                  "iconName": "lodging",
                  "title": "Fairmont Le Chateau Frontenac",
                  "website": "http://www.fairmont.com/frontenac-quebec/",
                  "instagram": "@fairmontfrontenac",
                  "town": "Quebec City",
                  "country": "Canada",
                  "phoneNumber": "432-729-4362",
                  "lat": "46.81198",
                  "lng": "-71.20502",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "68e3342e-9660-4f90-8eb5-182bc3778e70"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Cape Town",
                  "website": "https://taj.tajhotels.com/en-in/taj-cape-town/",
                  "instagram": "@tajcapetown",
                  "town": "Cape Town",
                  "country": "South Africa",
                  "phoneNumber": "27-21-819-2000",
                  "lat": "-33.92442",
                  "lng": "18.42003",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ca39ce2c-cb51-4e2b-b1f3-76dfba46206a"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel de Crillon, a Rosewood Hotel",
                  "website": "https://www.rosewoodhotels.com/en/hotel-de-crillon",
                  "instagram": "@rwcrillon",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-44-71-15-00",
                  "lat": "48.86761",
                  "lng": "2.3214",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a715edda-72ed-4bb3-b603-78ea9133a6bd"
              },
              {
                  "iconName": "lodging",
                  "title": "Edition, Sanya",
                  "website": "http://www.editionhotels.com/sanya/",
                  "instagram": "@editionhotels",
                  "town": "Sanya",
                  "country": "China",
                  "phoneNumber": "86-898-8835-9999",
                  "lat": "18.36517",
                  "lng": "109.74556",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6b1f546c-6b89-44a8-9ed4-2833beb7fbff"
              },
              {
                  "iconName": "lodging",
                  "title": "Ace Hotel, London",
                  "website": "http://www.acehotel.com/london",
                  "instagram": "@acehotellondon",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7613-9800",
                  "lat": "51.52537",
                  "lng": "51.52537",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dd5a7086-600d-4427-90a8-788a575cb91b"
              },
              {
                  "iconName": "lodging",
                  "title": "Mohonk Mountain House",
                  "website": "https://www.mohonk.com/",
                  "instagram": "@mohonkmountainhouse",
                  "town": "New Paltz",
                  "country": "USA",
                  "phoneNumber": "855-331-7213",
                  "lat": "41.76829",
                  "lng": "-74.15602",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a8dba88b-523b-4da8-93ba-a59280a46fdb"
              },
              {
                  "iconName": "lodging",
                  "title": "Union Station Hotel Nashville",
                  "website": "http://www.unionstationhotelnashville.com/",
                  "instagram": "@unionstationnashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "616-776-1195",
                  "lat": "36.15724",
                  "lng": "-86.78484",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ba0e1024-5ae4-492b-8bbc-a61c104e6626"
              },
              {
                  "iconName": "lodging",
                  "title": "Ace Hotel, Portland",
                  "website": "http://www.acehotel.com/portland",
                  "instagram": "@acehotelportland",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "502-515-0174",
                  "lat": "45.52201",
                  "lng": "45.52201",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e6fad0f0-4472-4c12-a800-2a7d90cb8b41"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Washington, D.C.",
                  "website": "https://www.rosewoodhotels.com/en/washington-dc",
                  "instagram": "@rwwashingtondc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-633-1000",
                  "lat": "38.90399",
                  "lng": "-77.06132",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d7989115-9602-45d8-a443-5edbc007c29b"
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Chicago",
                  "website": "http://www.chicago.peninsula.com/en/default",
                  "instagram": "@thepeninsulachi",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-337-6070",
                  "lat": "41.89617",
                  "lng": "-87.62515",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3dd9ac16-744b-45e7-84f8-c29643e21c81"
              },
              {
                  "iconName": "lodging",
                  "title": "Pier One Sydney Harbour",
                  "website": "https://www.pieronesydneyharbour.com.au/",
                  "instagram": "@pieronesydney",
                  "town": "Sydney",
                  "country": "Australia",
                  "phoneNumber": "61-2-8298-9999",
                  "lat": "-33.85421",
                  "lng": "151.2081",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f59b50cb-928b-4893-97c7-44a97dfcacdf"
              },
              {
                  "iconName": "lodging",
                  "title": "Thompson Seattle",
                  "website": "http://www.thompsonhotels.com/hotels/seattle/thompson-seattle",
                  "instagram": "@thompsonseattle",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-654-3100",
                  "lat": "47.61071",
                  "lng": "-122.34139",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "562c99f9-16a4-4565-9eca-d8787dd2adf7"
              },
              {
                  "iconName": "lodging",
                  "title": "Phulay Bay, a Ritz-Carlton Reserve",
                  "website": "http://www.ritzcarlton.com/en/hotels/phulay-bay",
                  "instagram": "@ritzcarlton",
                  "town": "Nong Thale",
                  "country": "Thailand",
                  "phoneNumber": "66-75-628-111",
                  "lat": "8.08402",
                  "lng": "98.74539",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "244b74cd-d20f-425d-a9ed-2f77b41e32db"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Inn of the Anasazi",
                  "website": "https://www.rosewoodhotels.com/en/inn-of-the-anasazi-santa-fe",
                  "instagram": "@rwinnofanasazi",
                  "town": "Santa Fe",
                  "country": "USA",
                  "phoneNumber": "508-228-2500",
                  "lat": "35.68795",
                  "lng": "-105.93689",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2ef9190d-e101-4603-a65b-fe9c19bdbe73"
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, Chicago",
                  "website": "https://www.sohohousechicago.com/",
                  "instagram": "@sohohouse",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-715-0708",
                  "lat": "41.88375",
                  "lng": "-87.64839",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "814cd143-0720-4790-a350-f3eeb09647c3"
              },
              {
                  "iconName": "lodging",
                  "title": "Amanpuri",
                  "website": "https://www.aman.com/resorts/amanpuri",
                  "instagram": "@amanpuri",
                  "town": "Thalang",
                  "country": "Thailand",
                  "phoneNumber": "66-76-324-333",
                  "lat": "7.98459",
                  "lng": "98.27622",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "21e0935e-7325-4b9a-9967-14811b729455"
              },
              {
                  "iconName": "lodging",
                  "title": "The Press Hotel",
                  "website": "http://www.thepresshotel.com/",
                  "instagram": "@thepresshotel",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-596-0770",
                  "lat": "43.65885",
                  "lng": "-70.25634",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3e1d8883-ddb5-444a-9260-a81770e82cb8"
              },
              {
                  "iconName": "lodging",
                  "title": "Fairmont Monte Carlo",
                  "website": "http://www.fairmont.com/monte-carlo/",
                  "instagram": "@fairmontmc",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-93-50-65-00",
                  "lat": "43.74008",
                  "lng": "7.43",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "eea80415-6313-41ae-b01f-6efaf5ff27f9"
              },
              {
                  "iconName": "lodging",
                  "title": "Chicago Athletic Association Hotel",
                  "website": "http://www.chicagoathletichotel.com/",
                  "instagram": "@chicagoathletichotel",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "845-765-3286",
                  "lat": "41.88166",
                  "lng": "-87.625",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ac9af370-7d6c-466a-ac2a-d15531fb1df1"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Washington",
                  "website": "https://washingtondc.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattdc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "203-335-2010",
                  "lat": "38.90586",
                  "lng": "-77.05103",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7aeeee64-f9b9-43ec-8f08-e2bae3cba61c"
              },
              {
                  "iconName": "lodging",
                  "title": "Austin Motel",
                  "website": "http://www.austinmotel.com/",
                  "instagram": "@austinmotel",
                  "town": "Austin",
                  "country": "USA",
                  "phoneNumber": "512-653-1137",
                  "lat": "30.25158",
                  "lng": "-97.74941",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "987b9ff3-b6c9-45cf-b2d8-5c93324a0554"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, San Francisco",
                  "website": "http://www.stregissanfrancisco.com/",
                  "instagram": "@stregissf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-292-0100",
                  "lat": "37.78594",
                  "lng": "-122.40144",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d7666e5b-5ec0-4b5b-b847-15fce9ef3bc8"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ritz-Carlton, Okinawa",
                  "website": "http://www.ritzcarlton.com/en/hotels/japan/okinawa",
                  "instagram": "@ritzcarlton",
                  "town": "Nago",
                  "country": "Japan",
                  "phoneNumber": "81-980-43-5555",
                  "lat": "26.52804",
                  "lng": "127.93994",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "70530275-6cc6-44d0-af03-c3ff1761127b"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Beaver Creek Resort & Spa",
                  "website": "https://beavercreek.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattbc",
                  "town": "Beaver Creek",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "39.60448",
                  "lng": "-106.51564",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "68558194-203b-46c3-a0d3-4d36a2143c33"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Hotel, Shenzhen",
                  "website": "https://www.fourseasons.com/shenzhen/",
                  "instagram": "@fsshenzhen",
                  "town": "Shenzhen",
                  "country": "China",
                  "phoneNumber": "86-755-8826-8888",
                  "lat": "22.53314",
                  "lng": "114.05794",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "700dfc32-093f-4ce7-bc0d-b1bdcd0c64c1"
              },
              {
                  "iconName": "lodging",
                  "title": "XV Beacon",
                  "website": "http://xvbeacon.com/",
                  "instagram": "@xvbeaconhotel",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-737-0099",
                  "lat": "42.3584",
                  "lng": "-71.06196",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "02038827-ffe4-4cdd-8cf8-3e5010c8222c"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Grand, Kolkata",
                  "website": "https://www.oberoihotels.com/hotels-in-kolkata/",
                  "instagram": "@theoberoigrandkolkata",
                  "town": "Kolkata",
                  "country": "India",
                  "phoneNumber": "91-33-2249-9427",
                  "lat": "22.5612",
                  "lng": "88.3512",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5275fefc-689a-4a61-aa67-3eb7ed00eb98"
              },
              {
                  "iconName": "lodging",
                  "title": "Sofitel Legend Metropole",
                  "website": "http://www.sofitel.com/gb/hotel-1555-sofitel-legend-metropole-hanoi/index.shtml",
                  "instagram": "@metropolehanoi",
                  "town": "Hanoi",
                  "country": "Vietnam",
                  "phoneNumber": "84-243-826-6919",
                  "lat": "21.02548",
                  "lng": "105.85605",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c0d6ab47-b96e-4c9e-ba6f-3d2dccff293c"
              },
              {
                  "iconName": "lodging",
                  "title": "Edson Hill",
                  "website": "http://www.edsonhill.com/",
                  "instagram": "@edsonhillvt",
                  "town": "Stowe",
                  "country": "USA",
                  "phoneNumber": "802-297-4000",
                  "lat": "44.511",
                  "lng": "-72.73463",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "51f8db71-6fae-433f-9e9d-9cb3363b5344"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, New York",
                  "website": "https://newyork.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "647-253-6227",
                  "lat": "40.76537",
                  "lng": "-73.97907",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "32d0ef30-013c-407b-ad8c-88cab9ff6a9b"
              },
              {
                  "iconName": "lodging",
                  "title": "Amangani",
                  "website": "https://www.aman.com/resorts/amangani",
                  "instagram": "@amangani",
                  "town": "Jackson",
                  "country": "USA",
                  "phoneNumber": "310-432-9200",
                  "lat": "43.50405",
                  "lng": "-110.77424",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f763fd6c-50cf-4e65-83f5-04fb1111dbc9"
              },
              {
                  "iconName": "lodging",
                  "title": "Aman Tokyo",
                  "website": "https://www.aman.com/resorts/aman-tokyo",
                  "instagram": "@aman_tokyo",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-352-24-3333",
                  "lat": "35.68541",
                  "lng": "35.68541",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "22851454-c235-4912-934c-d06fde5a0fc2"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ludlow",
                  "website": "http://www.ludlowhotel.com/",
                  "instagram": "@ludlowhotelnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-4411",
                  "lat": "40.72182",
                  "lng": "-73.98735",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3f89bb51-021e-44cf-a3a3-84bb4746eb0d"
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Tokyo",
                  "website": "http://www.tokyo.peninsula.com/en/default",
                  "instagram": "@thepeninsulatokyo",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-362-70-2888",
                  "lat": "35.67474",
                  "lng": "139.76047",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2845b59c-d355-4f9f-83ae-16aa83f875d3"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Chengdu",
                  "website": "http://www.marriott.com/hotels/travel/ctumj-jw-marriott-hotel-chengdu/",
                  "instagram": "@jwmarriotthotels",
                  "town": "Chengdu",
                  "country": "China",
                  "phoneNumber": "86-28-6111-8888",
                  "lat": "30.65681",
                  "lng": "104.07099",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3f291e59-22f6-4cd2-b462-b5cfa6e21c33"
              },
              {
                  "iconName": "lodging",
                  "title": "Electric House",
                  "website": "https://www.electrichouse.com/",
                  "instagram": "@sohohouse",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7908-9696",
                  "lat": "51.51558",
                  "lng": "-0.20488",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "600d1c29-654c-41f7-a5ad-04104824e65d"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Houston",
                  "website": "http://www.stregishoustonhotel.com/",
                  "instagram": "@stregishouston",
                  "town": "Houston",
                  "country": "USA",
                  "phoneNumber": "718-552-2610",
                  "lat": "29.7477",
                  "lng": "-95.4504",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "66e86938-8aa1-4067-8da6-63861476581f"
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, Toronto",
                  "website": "https://www.sohohousetoronto.com/",
                  "instagram": "@sohohouse",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "416-963-6000",
                  "lat": "43.64881",
                  "lng": "-79.38646",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "26d489b7-4a3f-46da-bea3-dbf4271067ae"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Mumbai Sahar",
                  "website": "http://www.marriott.com/hotels/travel/bomsa-jw-marriott-mumbai-sahar/",
                  "instagram": "@jwsahar",
                  "town": "Mumbai",
                  "country": "India",
                  "phoneNumber": "91-22-2853-8888",
                  "lat": "19.10311",
                  "lng": "72.87784",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0dcaa5f2-4b66-476e-8147-c6fec69ce294"
              },
              {
                  "iconName": "lodging",
                  "title": "Six Senses Qing Cheng Mountain",
                  "website": "http://www.sixsenses.com/resorts/qing-cheng-mountain/destination",
                  "instagram": "@sixsensesqingchengmountain",
                  "town": "Chengdu",
                  "country": "China",
                  "phoneNumber": "86-28-8712-6666",
                  "lat": "30.89282",
                  "lng": "103.59141",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1a4935ac-a196-4196-bcc0-ba144545386a"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, New York",
                  "website": "http://www.stregisnewyork.com/",
                  "instagram": "@stregisnewyork",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-777-7773",
                  "lat": "40.76134",
                  "lng": "-73.97452",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "660b02e3-d9d9-4c99-a51f-fdd73836ffc0"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Saigon",
                  "website": "https://saigon.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattsaigon",
                  "town": "Ho Chi Minh City",
                  "country": "Vietnam",
                  "phoneNumber": "84-283-824-1234",
                  "lat": "10.77762",
                  "lng": "106.70331",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9c497a2d-2e65-49f5-b548-6b687d7535e4"
              },
              {
                  "iconName": "lodging",
                  "title": "Qualia",
                  "website": "http://www.qualia.com.au/",
                  "instagram": "@qualiaresort",
                  "town": "Hamilton Island",
                  "country": "Australia",
                  "phoneNumber": "61-7-4948-9222",
                  "lat": "-20.33284",
                  "lng": "148.94764",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a9fec105-ba2b-45b3-88b2-01d7f51e7f32"
              },
              {
                  "iconName": "lodging",
                  "title": "Metropolitan at The 9",
                  "website": "http://www.metropolitancleveland.com/#gref",
                  "instagram": "@the9cle",
                  "town": "Cleveland",
                  "country": "USA",
                  "phoneNumber": "219-922-3565",
                  "lat": "41.49973",
                  "lng": "-81.68578",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "856348ca-3c26-4b33-9969-617407643616"
              },
              {
                  "iconName": "lodging",
                  "title": "Thompson Chicago",
                  "website": "http://www.thompsonhotels.com/hotels/chicago/thompson-chicago",
                  "instagram": "@thompsonchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-280-2660",
                  "lat": "41.90135",
                  "lng": "-87.62741",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "17d9b7ed-c06d-4dad-9817-24c3befad6ec"
              },
              {
                  "iconName": "lodging",
                  "title": "Fogo Island Inn",
                  "website": "http://www.fogoislandinn.ca/",
                  "instagram": "@fogoislandinn",
                  "town": "Joe Batt's Arm",
                  "country": "Canada",
                  "phoneNumber": "713-523-1622",
                  "lat": "49.73071",
                  "lng": "-54.1768",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5aa0ecc5-862d-46f1-a7de-203751e1f92d"
              },
              {
                  "iconName": "lodging",
                  "title": "Langham Place, Ningbo",
                  "website": "http://www.langhamhotels.com/en/langham-place/ningbo/",
                  "instagram": "@langhamhotels",
                  "town": "Ningbo",
                  "country": "China",
                  "phoneNumber": "86-574-8908-9999",
                  "lat": "29.85686",
                  "lng": "121.61923",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f8c090b0-9332-405a-a309-2a1b129c3a12"
              },
              {
                  "iconName": "lodging",
                  "title": "Mandarin Oriental Tokyo",
                  "website": "https://www.mandarinoriental.com/tokyo/nihonbashi/luxury-hotel",
                  "instagram": "@mo_tokyo",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-332-70-8800",
                  "lat": "35.68702",
                  "lng": "139.77306",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e72f1cdf-8a45-43a6-95ef-8728b720204e"
              },
              {
                  "iconName": "lodging",
                  "title": "The Liberty",
                  "website": "http://www.libertyhotel.com/",
                  "instagram": "@liberty_hotel",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-267-9300",
                  "lat": "42.36193",
                  "lng": "-71.06962",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0fe1b617-e4a5-49fb-b114-35b6be43777e"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Lhasa Resort",
                  "website": "http://www.starwoodhotels.com/stregis/property/overview/index.html?propertyID=3129&language=en_US",
                  "instagram": "@stregishotels",
                  "town": "Lhasa",
                  "country": "China",
                  "phoneNumber": "86-89-1680-8888",
                  "lat": "29.64573",
                  "lng": "91.14094",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2e708cb3-5686-4d59-86ed-1e3b79dc931e"
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Beverly Hills",
                  "website": "https://www.montagehotels.com/beverlyhills/",
                  "instagram": "@montagebh",
                  "town": "Beverly Hills",
                  "country": "USA",
                  "phoneNumber": "312-266-2100",
                  "lat": "34.06773",
                  "lng": "-118.39892",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6aca0796-a4cc-44ea-b0ac-5cb889df0c61"
              },
              {
                  "iconName": "lodging",
                  "title": "Langham Place, Haining",
                  "website": "http://www.langhamhotels.com/en/langham-place/haining/",
                  "instagram": "@langhamhotels",
                  "town": "Haining",
                  "country": "China",
                  "phoneNumber": "86-573-8789-7888",
                  "lat": "30.5052",
                  "lng": "120.68535",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "81bf7225-0d60-4640-a625-38dcb384dd61"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Deer Valley",
                  "website": "http://www.stregisdeervalley.com/",
                  "instagram": "@stregisdv",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "443-573-1700",
                  "lat": "40.63806",
                  "lng": "-111.47719",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d0fd507f-c4ea-4e00-b880-eec3f941bb0a"
              },
              {
                  "iconName": "lodging",
                  "title": "1 Hotel South Beach",
                  "website": "https://www.1hotels.com/south-beach?utm_source=google&utm_medium=organic&utm_campaign=GMB",
                  "instagram": "@1hotels",
                  "town": "Miami Beach",
                  "country": "USA",
                  "phoneNumber": "305-993-3300",
                  "lat": "25.79906",
                  "lng": "25.79906",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2922ea8c-cdcc-4b0b-bde0-b2939fd74563"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Chongqing",
                  "website": "http://www.marriott.com/hotels/travel/ckgjw-jw-marriott-hotel-chongqing/",
                  "instagram": "@jwmarriotthotels",
                  "town": "Chongqing",
                  "country": "China",
                  "phoneNumber": "86-23-6379-9999",
                  "lat": "29.5569",
                  "lng": "106.57095",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "66457bbb-468a-457e-890c-dfbfe69af811"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Bengaluru",
                  "website": "http://www.marriott.com/hotels/travel/blrjw-jw-marriott-hotel-bengaluru/",
                  "instagram": "@jwmarriottblr",
                  "town": "Bengaluru",
                  "country": "India",
                  "phoneNumber": "91-80-6718-9999",
                  "lat": "12.97196",
                  "lng": "77.59485",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "262802b6-2ea7-4c5e-bf0c-4e93fcae088d"
              },
              {
                  "iconName": "lodging",
                  "title": "Ace Hotel, Seattle",
                  "website": "http://www.acehotel.com/seattle",
                  "instagram": "@acehotel",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-623-4600",
                  "lat": "47.61438",
                  "lng": "47.61438",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ddb82f0d-a93d-42f5-9e26-4ca9dfb5ee3c"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Plaza Athenee",
                  "website": "https://www.dorchestercollection.com/en/paris/hotel-plaza-athenee/",
                  "instagram": "@plaza_athenee",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-53-67-66-65",
                  "lat": "48.86621",
                  "lng": "2.30417",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4c87b4de-0bae-4ea5-83eb-6f4099300f13"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood London",
                  "website": "https://www.rosewoodhotels.com/en/london",
                  "instagram": "@rosewoodlondon",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7781-8888",
                  "lat": "51.51771",
                  "lng": "-0.11761",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "84074afd-6d58-4b4e-ab70-eb8c5817feab"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ritz-Carlton, Osaka",
                  "website": "http://www.ritzcarlton.com/en/hotels/japan/osaka",
                  "instagram": "@ritzcarlton",
                  "town": "Osaka",
                  "country": "Japan",
                  "phoneNumber": "81-663-43-7000",
                  "lat": "34.69848",
                  "lng": "135.49259",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9a550ea7-a191-4886-873b-24aacd291b59"
              },
              {
                  "iconName": "lodging",
                  "title": "Monterey Tides",
                  "website": "http://www.jdvhotels.com/hotels/california/monterey-hotels/monterey-tides/?utm_source=local&utm_campaign=gmb&utm_medium=organic",
                  "instagram": "@montereytides",
                  "town": "Monterey",
                  "country": "USA",
                  "phoneNumber": "831-574-5607",
                  "lat": "36.61113",
                  "lng": "-121.85892",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d00c96bf-c0bb-4aae-98a6-51a394fd084b"
              },
              {
                  "iconName": "lodging",
                  "title": "Emirates One&Only Wolgan Valley",
                  "website": "https://www.oneandonlyresorts.com/one-and-only-wolgan-valley-australia",
                  "instagram": "@ooresorts",
                  "town": "Wolgan Valley",
                  "country": "Australia",
                  "phoneNumber": "61-2-6350-1800",
                  "lat": "-33.25292",
                  "lng": "150.19564",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "39701d0a-ade9-4cdf-bc95-730121b2413c"
              },
              {
                  "iconName": "lodging",
                  "title": "Metropolitan Bangkok",
                  "website": "https://www.comohotels.com/metropolitanbangkok",
                  "instagram": "@comohotels",
                  "town": "Bangkok",
                  "country": "Thailand",
                  "phoneNumber": "66-26-253-333",
                  "lat": "13.72341",
                  "lng": "100.53945",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "24d4549b-2473-412d-ac24-e373db41a323"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Mansion on Turtle Creek",
                  "website": "https://www.rosewoodhotels.com/en/mansion-on-turtle-creek-dallas",
                  "instagram": "@rwmansionturtlecreek",
                  "town": "Dallas",
                  "country": "USA",
                  "phoneNumber": "215-271-8299",
                  "lat": "32.80411",
                  "lng": "-96.80738",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fe5d5d13-f58f-457a-bf5c-4877dd0b78f5"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Sand Hill",
                  "website": "https://www.rosewoodhotels.com/en/sand-hill-menlo-park",
                  "instagram": "@rwsandhill",
                  "town": "Menlo Park",
                  "country": "USA",
                  "phoneNumber": "707-226-1395",
                  "lat": "37.41954",
                  "lng": "-122.21187",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cbbd049f-b79e-4410-94cb-9f44b56914c2"
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, New York",
                  "website": "https://www.sohohouseny.com/",
                  "instagram": "@sohohouse",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-744-1600",
                  "lat": "40.74058",
                  "lng": "-74.00583",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "21cb62e1-7c3c-479c-8388-d3a7ec6e3aad"
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Laguna Beach",
                  "website": "https://www.montagehotels.com/lagunabeach/",
                  "instagram": "@montagelaguna",
                  "town": "Laguna Beach",
                  "country": "USA",
                  "phoneNumber": "970-221-0524",
                  "lat": "33.51496",
                  "lng": "-117.75716",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "792f690a-f997-4a4c-836a-9ac0c804c16a"
              },
              {
                  "iconName": "lodging",
                  "title": "Aman Le Melezin",
                  "website": "https://www.aman.com/resorts/aman-le-melezin",
                  "instagram": "@amanlemelezin",
                  "town": "Courchevel",
                  "country": "France",
                  "phoneNumber": "33-04-79-08-01-33",
                  "lat": "45.41297",
                  "lng": "45.41297",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6487c9a7-b215-477e-841b-55532a1e1a6d"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Aspen Resort",
                  "website": "https://www.stregisaspen.com/",
                  "instagram": "@stregisaspen",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "970-920-4600",
                  "lat": "39.18691",
                  "lng": "-106.82111",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fd555a06-292d-4a7e-bc81-f1f5daf35ebd"
              },
              {
                  "iconName": "lodging",
                  "title": "The Naka Island",
                  "website": "http://www.nakaislandphuket.com/",
                  "instagram": "@nakaislandphuket",
                  "town": "Thalang",
                  "country": "Thailand",
                  "phoneNumber": "66-76-371-400",
                  "lat": "8.05733",
                  "lng": "98.4584",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ea05678a-1b0d-43f2-af4d-ff60928bff55"
              },
              {
                  "iconName": "lodging",
                  "title": "Bulgari Hotel, Shanghai",
                  "website": "https://www.bulgarihotels.com/en_US/shanghai",
                  "instagram": "@bulgarihotels",
                  "town": "Huangpu",
                  "country": "China",
                  "phoneNumber": "000-000-0000",
                  "lat": "31.2301",
                  "lng": "21.48721",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "09c156e1-ce83-4707-be61-ce4ba55abca7"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Jerome",
                  "website": "https://hoteljerome.aubergeresorts.com/",
                  "instagram": "@hoteljeromeaspen",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "858-581-7171",
                  "lat": "39.19085",
                  "lng": "-106.8195",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "805cf49f-646b-4036-9c75-caed4efc8f20"
              },
              {
                  "iconName": "lodging",
                  "title": "The Langham, Chicago",
                  "website": "http://www.langhamhotels.com/en/the-langham/chicago/",
                  "instagram": "@langhamchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-944-8888",
                  "lat": "41.88862",
                  "lng": "-87.62758",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9962b271-4c17-4c25-a0ba-0579fc8ecf4a"
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Bangkok",
                  "website": "http://www.bangkok.peninsula.com/en/default",
                  "instagram": "@thepeninsulabangkok",
                  "town": "Bangkok",
                  "country": "Thailand",
                  "phoneNumber": "66-20-202-888",
                  "lat": "13.72299",
                  "lng": "100.51139",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "69a65d83-4cd6-4e67-9211-1bedf4516bc0"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Terra, Jackson Hole",
                  "website": "http://www.hotelterrajacksonhole.com/",
                  "instagram": "@hotelterra",
                  "town": "Teton Village",
                  "country": "USA",
                  "phoneNumber": "307-733-2292",
                  "lat": "43.58658",
                  "lng": "-110.829",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "781fc394-2162-4f1b-9a7d-3863b54aa495"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Bengal",
                  "website": "https://taj.tajhotels.com/en-in/taj-bengal-kolkata/",
                  "instagram": "@tajbengal",
                  "town": "Kolkata",
                  "country": "India",
                  "phoneNumber": "91-33-6612-3939",
                  "lat": "22.53767",
                  "lng": "88.33427",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1366bcbc-7561-4c3a-aa15-ed2e17a2dd65"
              },
              {
                  "iconName": "lodging",
                  "title": "The Carlyle, a Rosewood Hotel",
                  "website": "https://www.rosewoodhotels.com/en/the-carlyle-new-york",
                  "instagram": "@thecarlylehotel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-753-4500",
                  "lat": "40.7744",
                  "lng": "-73.96315",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c76ad358-366b-46eb-b54b-147fbd4f05b1"
              },
              {
                  "iconName": "lodging",
                  "title": "Christiania at Vail",
                  "website": "https://www.destinationhotels.com/christiania-vail",
                  "instagram": "@christiania_at_vail",
                  "town": "Vail",
                  "country": "USA",
                  "phoneNumber": "970-498-9070",
                  "lat": "39.63986",
                  "lng": "-106.37221",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9a91363c-2a23-4e93-96e2-15d21217a51a"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Osaka",
                  "website": "http://www.stregisosaka.co.jp/en",
                  "instagram": "@stregisosaka",
                  "town": "Osaka",
                  "country": "Japan",
                  "phoneNumber": "81-662-58-3333",
                  "lat": "34.6832",
                  "lng": "135.50107",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7794db43-7188-4a37-86bd-682aaf18893a"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Tokyo",
                  "website": "https://tokyo.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyatttokyo",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-353-22-1234",
                  "lat": "35.68558",
                  "lng": "139.69071",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "05734c6d-69e7-4b72-acdf-edec94420f0d"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi, Bengaluru",
                  "website": "https://www.oberoihotels.com/hotels-in-bengaluru/",
                  "instagram": "@theoberoibengaluru",
                  "town": "Bengaluru",
                  "country": "India",
                  "phoneNumber": "91-80-2558-5858",
                  "lat": "12.9733",
                  "lng": "77.61803",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f8989568-f5ee-4f9b-85ea-21593fe655d6"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Parq Vancouver",
                  "website": "http://www.marriott.com/hotels/travel/yvrjw-jw-marriott-parq-vancouver/",
                  "instagram": "@jwmarriottvan",
                  "town": "Vancouver",
                  "country": "Canada",
                  "phoneNumber": "604-682-5566",
                  "lat": "49.27514",
                  "lng": "-123.11292",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d4c1c6e3-7c62-4fbe-a00a-d3f0c5e883b8"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Chennai",
                  "website": "https://chennai.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattchenn",
                  "town": "Chennai",
                  "country": "India",
                  "phoneNumber": "91-44-7177-1234",
                  "lat": "13.01082",
                  "lng": "80.22345",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f1812278-1fc5-42e0-a55f-8ee73611baf9"
              },
              {
                  "iconName": "lodging",
                  "title": "Thompson Nashville",
                  "website": "http://www.thompsonhotels.com/hotels/nashville/thompson-nashville",
                  "instagram": "@thompsonnashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "615-726-1001",
                  "lat": "36.15247",
                  "lng": "-86.78403",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0f02aa5e-2fc5-4e00-80c6-191e93155515"
              },
              {
                  "iconName": "lodging",
                  "title": "41",
                  "website": "https://www.41hotel.com/",
                  "instagram": "@41hotel",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7300-0041",
                  "lat": "51.49825",
                  "lng": "51.49825",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "28d913a8-a9e0-4207-9a11-a76b16235686"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel William Gray",
                  "website": "http://www.hotelwilliamgray.com/",
                  "instagram": "@hotelwilliamgray",
                  "town": "Montreal",
                  "country": "Canada",
                  "phoneNumber": "516-249-0700",
                  "lat": "45.50724",
                  "lng": "-73.55339",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d22457c6-23b5-447b-a308-4adf2cdb46e3"
              },
              {
                  "iconName": "lodging",
                  "title": "Soho Beach House",
                  "website": "https://www.sohobeachhouse.com/",
                  "instagram": "@sohohouse",
                  "town": "Miami Beach",
                  "country": "USA",
                  "phoneNumber": "800-403-0206",
                  "lat": "25.81588",
                  "lng": "-80.12208",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1e675b7a-432a-4aae-a034-f6ba478a9f90"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Hotel, Kyoto",
                  "website": "https://www.fourseasons.com/kyoto/",
                  "instagram": "@fskyoto",
                  "town": "Kyoto",
                  "country": "Japan",
                  "phoneNumber": "81-755-41-8288",
                  "lat": "34.98978",
                  "lng": "135.77598",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2f261eaf-798e-495f-9f34-9ec35da71d9b"
              },
              {
                  "iconName": "lodging",
                  "title": "45 Park Lane",
                  "website": "https://www.dorchestercollection.com/en/london/45-park-lane/",
                  "instagram": "@45parklane",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7493-4545",
                  "lat": "51.50647",
                  "lng": "51.50647",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f0a8b87d-a70d-4f6c-9816-cece5f0d7323"
              },
              {
                  "iconName": "lodging",
                  "title": "Langham Place, Xiamen",
                  "website": "http://www.langhamhotels.com/en/langham-place/xiamen/",
                  "instagram": "@langhamhotels",
                  "town": "Xiamen",
                  "country": "China",
                  "phoneNumber": "86-59-2602-9999",
                  "lat": "24.50611",
                  "lng": "118.17831",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a3665334-d352-4e08-8353-64e6bd197c44"
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Palmetto Bluff",
                  "website": "https://www.montagehotels.com/palmettobluff/",
                  "instagram": "@montagepalmettobluff",
                  "town": "Bluffton",
                  "country": "USA",
                  "phoneNumber": "843-853-1886",
                  "lat": "32.204",
                  "lng": "-80.88407",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d864dc80-9800-4f61-9724-6ff12da1a0bd"
              },
              {
                  "iconName": "lodging",
                  "title": "Post Ranch Inn",
                  "website": "http://www.postranchinn.com/",
                  "instagram": "@postranchinn",
                  "town": "Big Sur",
                  "country": "USA",
                  "phoneNumber": "831-667-2331",
                  "lat": "36.23025",
                  "lng": "-121.77181",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ab9f6b84-f85d-4d1c-b5a9-045aba635724"
              },
              {
                  "iconName": "lodging",
                  "title": "Mandarin Oriental Bangkok",
                  "website": "https://www.mandarinoriental.com/bangkok/chao-phraya-river/luxury-hotel",
                  "instagram": "@mo_bangkok",
                  "town": "Bangkok",
                  "country": "Thailand",
                  "phoneNumber": "66-26-599-000",
                  "lat": "13.72397",
                  "lng": "100.51423",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5c28382a-5a02-4d29-94b5-68e7a41eefd0"
              },
              {
                  "iconName": "lodging",
                  "title": "Ventana Inn & Spa",
                  "website": "http://www.ventanainn.com/",
                  "instagram": "@ventana_inn",
                  "town": "Big Sur",
                  "country": "USA",
                  "phoneNumber": "843-577-0025",
                  "lat": "36.22915",
                  "lng": "-121.76035",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3897a567-b9ee-4f37-951e-931187ad8fe4"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Kolkata",
                  "website": "http://www.marriott.com/hotels/travel/ccujw-jw-marriott-hotel-kolkata/",
                  "instagram": "@jwkolkata",
                  "town": "Kolkata",
                  "country": "India",
                  "phoneNumber": "91-33-6633-0000",
                  "lat": "22.54811",
                  "lng": "88.39921",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e59d1972-00fc-4073-814a-f5344ac72331"
              },
              {
                  "iconName": "lodging",
                  "title": "Mandarin Oriental Hong Kong",
                  "website": "https://www.mandarinoriental.com/hong-kong/victoria-harbour/luxury-hotel",
                  "instagram": "@mo_hkg",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2522-0111",
                  "lat": "22.28208",
                  "lng": "114.15939",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "77a2dd66-8c47-4c33-aea3-acfbd1cf69c3"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Hotel, Hangzhou at West Lake",
                  "website": "https://www.fourseasons.com/hangzhou/",
                  "instagram": "@fshangzhou",
                  "town": "Hangzhou",
                  "country": "China",
                  "phoneNumber": "86-571-8829-8888",
                  "lat": "30.25005",
                  "lng": "120.12649",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9bafc3d1-6bf8-46a7-94ca-fc3c4a8472ee"
              },
              {
                  "iconName": "lodging",
                  "title": "L'Apogee Courchevel",
                  "website": "https://www.oetkercollection.com/destinations/lapogee-courchevel/the-hotel/",
                  "instagram": "@lapogeecourchevel",
                  "town": "Courchevel",
                  "country": "France",
                  "phoneNumber": "33-04-79-04-01-04",
                  "lat": "45.41194",
                  "lng": "6.63237",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "85b78409-4823-4717-a8a1-8c5fbc46ea2d"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Hotel, Guangzhou",
                  "website": "https://www.fourseasons.com/guangzhou/",
                  "instagram": "@fsguangzhou",
                  "town": "Guangzhou",
                  "country": "China",
                  "phoneNumber": "86-20-8883-3888",
                  "lat": "23.11776",
                  "lng": "113.32342",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1494fcf7-3999-4e91-b16e-fb1a5b60b071"
              },
              {
                  "iconName": "lodging",
                  "title": "White Elephant Village",
                  "website": "http://www.whiteelephanthotel.com/",
                  "instagram": "@whiteelephantnantucket",
                  "town": "Nantucket",
                  "country": "USA",
                  "phoneNumber": "508-693-6611",
                  "lat": "41.28841",
                  "lng": "-70.09694",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e0486063-2ad6-47a8-8784-e9563257253e"
              },
              {
                  "iconName": "lodging",
                  "title": "The Marker, San Francisco",
                  "website": "http://www.jdvhotels.com/hotels/california/san-francisco-hotels/the-marker-san-francisco/",
                  "instagram": "@themarkersf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-393-9000",
                  "lat": "37.78665",
                  "lng": "-122.4119",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "966371dc-451f-400f-bec6-ce3848e7436e"
              },
              {
                  "iconName": "lodging",
                  "title": "Whitehall",
                  "website": "https://www.whitehallmaine.com/",
                  "instagram": "@whitehallmaine",
                  "town": "Camden",
                  "country": "USA",
                  "phoneNumber": "207-236-4200",
                  "lat": "44.21675",
                  "lng": "-69.05906",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fe63310c-6d4d-4d68-adb9-f44a15cb067a"
              },
              {
                  "iconName": "lodging",
                  "title": "The Dorchester",
                  "website": "https://www.dorchestercollection.com/en/london/the-dorchester/",
                  "instagram": "@thedorchester",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7629-8888",
                  "lat": "51.50702",
                  "lng": "-0.15232",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9cfa26d1-60c0-4c6c-9831-e1d1f7abe56f"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Princeville Resort",
                  "website": "https://www.stregisprinceville.com/",
                  "instagram": "@stregiskauai",
                  "town": "Princeville",
                  "country": "USA",
                  "phoneNumber": "817-332-8451",
                  "lat": "22.22063",
                  "lng": "-159.49707",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ec8a861e-0104-49f4-aa66-14da7f2dd7c8"
              },
              {
                  "iconName": "lodging",
                  "title": "Six Senses Yao Noi",
                  "website": "http://www.sixsenses.com/resorts/yao-noi/destination",
                  "instagram": "@sixsensesyaonoi",
                  "town": "Ko Yao Noi",
                  "country": "Thailand",
                  "phoneNumber": "66-76-418-500",
                  "lat": "8.11975",
                  "lng": "98.62516",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "00d3134e-bb1f-4762-8be2-c8713704eefb"
              },
              {
                  "iconName": "lodging",
                  "title": "Calistoga Ranch",
                  "website": "https://calistogaranch.aubergeresorts.com/",
                  "instagram": "@calistogaranch",
                  "town": "Napa Valley",
                  "country": "USA",
                  "phoneNumber": "707-261-6410",
                  "lat": "38.57976",
                  "lng": "-122.51276",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "eebed2b7-f59c-43f5-9ff4-2e57c978cf27"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Sanya",
                  "website": "https://www.rosewoodhotels.com/en/sanya",
                  "instagram": "@rosewoodhotels",
                  "town": "Sanya",
                  "country": "China",
                  "phoneNumber": "86-898-8871-6666",
                  "lat": "18.32388",
                  "lng": "109.73092",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2e249035-1cf1-4e2b-9b3c-02f1dd5a044a"
              },
              {
                  "iconName": "lodging",
                  "title": "Eagles Nest",
                  "website": "http://www.eaglesnest.co.nz/",
                  "instagram": "@eaglesnestnz",
                  "town": "Russell",
                  "country": "New Zealand",
                  "phoneNumber": "64-9-403-8333",
                  "lat": "-35.25249",
                  "lng": "174.11698",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "483a5075-c76b-4a3e-bc01-15447a194eea"
              },
              {
                  "iconName": "lodging",
                  "title": "Ace Hotel, New Orleans",
                  "website": "http://www.acehotel.com/neworleans",
                  "instagram": "@aceneworleans",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "505-988-3030",
                  "lat": "29.94832",
                  "lng": "29.94832",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "77a643e3-4ac6-4d9f-b961-70eaf6bf7096"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Napasai",
                  "website": "https://www.belmond.com/hotels/asia/thailand/koh-samui/belmond-napasai/",
                  "instagram": "@belmondnapasai",
                  "town": "Ko Samui",
                  "country": "Thailand",
                  "phoneNumber": "66-77-429-200",
                  "lat": "9.58383",
                  "lng": "99.97247",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6dd035f6-0ed0-4405-a4cb-52e711359454"
              },
              {
                  "iconName": "lodging",
                  "title": "Mandarin Oriental Hyde Park London",
                  "website": "https://www.mandarinoriental.com/london/hyde-park/luxury-hotel",
                  "instagram": "@mo_hydepark",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7235-2000",
                  "lat": "51.50214",
                  "lng": "-0.16004",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d18139c8-807c-479a-b768-ae9e53d13348"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Phnom Penh",
                  "website": "https://www.rosewoodhotels.com/en/phnom-penh",
                  "instagram": "@rosewoodphnompenh",
                  "town": "Phnom Penh",
                  "country": "Cambodia",
                  "phoneNumber": "855-23-936-888",
                  "lat": "11.57335",
                  "lng": "104.91946",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "84b09e9e-9421-4ccf-a2fa-d2432c541545"
              },
              {
                  "iconName": "lodging",
                  "title": "Summercamp",
                  "website": "https://www.summercamphotel.com/",
                  "instagram": "@summercamphotel",
                  "town": "Oak Bluffs",
                  "country": "USA",
                  "phoneNumber": "512-441-1157",
                  "lat": "41.4569",
                  "lng": "-70.56017",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0caa9f10-23d4-4a25-b62c-d571a815541c"
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula New York",
                  "website": "http://www.newyork.peninsula.com/en/default",
                  "instagram": "@thepeninsulanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "213-232-6200",
                  "lat": "40.76164",
                  "lng": "-73.97543",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9db2efe6-464b-4829-940f-24d59b4fa782"
              },
              {
                  "iconName": "lodging",
                  "title": "21c Museum Hotel, Louisville",
                  "website": "https://www.21cmuseumhotels.com/louisville/",
                  "instagram": "@21chotels",
                  "town": "Louisville",
                  "country": "USA",
                  "phoneNumber": "502-228-2277",
                  "lat": "38.25678",
                  "lng": "38.25678",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6e0dc740-056e-4fa1-b04e-c263393a40c4"
              },
              {
                  "iconName": "lodging",
                  "title": "Grand-Hotel du Cap-Ferrat, a Four Seasons Hotel",
                  "website": "http://www.fourseasons.com/capferrat/",
                  "instagram": "@fscapferrat",
                  "town": "Saint-Jean-Cap-Ferrat",
                  "country": "France",
                  "phoneNumber": "33-04-93-76-50-50",
                  "lat": "43.67698",
                  "lng": "7.33146",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0fad24a3-eb3d-4c88-a20f-b5f56c0fec68"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Aviara Resort Golf Club & Spa",
                  "website": "https://aviara.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattaviara",
                  "town": "Carlsbad",
                  "country": "USA",
                  "phoneNumber": "773-293-6048",
                  "lat": "33.09923",
                  "lng": "-117.2855",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2ac29677-e0bc-4790-ba77-1ab91337b57a"
              },
              {
                  "iconName": "lodging",
                  "title": "The Langham, Haikou",
                  "website": "http://www.langhamhotels.com/en/the-langham/haikou/",
                  "instagram": "@langhamhotels",
                  "town": "Haikou",
                  "country": "China",
                  "phoneNumber": "86-898-6696-9477",
                  "lat": "20.03002",
                  "lng": "110.315",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "40efdd2d-9ce9-4042-8011-d060e9368614"
              },
              {
                  "iconName": "lodging",
                  "title": "Savoy Hotel",
                  "website": "https://gateway.tajhotels.com/en-in/savoy/",
                  "instagram": "@thegatewayhotels",
                  "town": "Ooty",
                  "country": "India",
                  "phoneNumber": "91-42-3222-5500",
                  "lat": "11.41453",
                  "lng": "76.69366",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c8fe76e2-8b51-4563-8803-b8b62c2c31a8"
              },
              {
                  "iconName": "lodging",
                  "title": "Stein Eriksen Lodge Deer Valley",
                  "website": "http://www.steinlodge.com/",
                  "instagram": "@steinlodge",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-649-8111",
                  "lat": "40.6221",
                  "lng": "-111.49094",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4713e0fd-f9f9-4ab5-9922-f753844b8302"
              },
              {
                  "iconName": "lodging",
                  "title": "Farmhouse Inn",
                  "website": "http://www.farmhouseinn.com/",
                  "instagram": "@farmhouse_inn",
                  "town": "Forestville",
                  "country": "USA",
                  "phoneNumber": "707-942-7022",
                  "lat": "38.48956",
                  "lng": "-122.88367",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "45cb5a74-f390-4fc0-a5a7-27c540199545"
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Beijing",
                  "website": "http://www.beijing.peninsula.com/en/default",
                  "instagram": "@thepeninsulabeijing",
                  "town": "Beijing",
                  "country": "China",
                  "phoneNumber": "86-10-8516-2888",
                  "lat": "39.91534",
                  "lng": "116.41642",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2b21ea4d-faf0-4b2b-b73e-13b6a43cb67e"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Chicago",
                  "website": "https://chicago.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-337-2888",
                  "lat": "41.89711",
                  "lng": "-87.62529",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "66f256a1-b591-4d28-af9b-fe9f19b99517"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Hotel Georgia",
                  "website": "https://www.rosewoodhotels.com/en/hotel-georgia-vancouver",
                  "instagram": "@rwhotelgeorgia",
                  "town": "Vancouver",
                  "country": "Canada",
                  "phoneNumber": "604-967-8950",
                  "lat": "49.28347",
                  "lng": "-123.11903",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3e2c7db6-54f1-486c-bfd7-ca0e372a2d8a"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ritz-Carlton, Beijing",
                  "website": "http://www.ritzcarlton.com/en/hotels/china/beijing",
                  "instagram": "@ritzcarlton",
                  "town": "Beijing",
                  "country": "China",
                  "phoneNumber": "86-10-5908-8888",
                  "lat": "39.91014",
                  "lng": "116.48048",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ddd6e5bb-4533-476a-9620-0a90bd05193c"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Atlanta",
                  "website": "http://www.stregisatlanta.com/",
                  "instagram": "@stregisatl",
                  "town": "Atlanta",
                  "country": "USA",
                  "phoneNumber": "404-733-4400",
                  "lat": "33.8399",
                  "lng": "-84.38255",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cee0445e-6cd4-449f-8ca9-341ab999b214"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Bangkok",
                  "website": "https://bangkok.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattbangkok",
                  "town": "Bangkok",
                  "country": "Thailand",
                  "phoneNumber": "66-20-121-234",
                  "lat": "13.74381",
                  "lng": "100.5474",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b107f823-ca8a-4294-9ee2-bd8e829df366"
              },
              {
                  "iconName": "lodging",
                  "title": "Six Senses Samui",
                  "website": "http://www.sixsenses.com/resorts/samui/destination",
                  "instagram": "@sixsensessamui",
                  "town": "Ko Samui",
                  "country": "Thailand",
                  "phoneNumber": "66-77-245-678",
                  "lat": "9.59146",
                  "lng": "100.06734",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e30e3226-3d94-46ba-86e4-489607f4b8aa"
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Deer Valley",
                  "website": "https://www.montagehotels.com/deervalley/",
                  "instagram": "@montagedeervalley",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-649-1000",
                  "lat": "40.6159",
                  "lng": "-111.51183",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0b2855d5-f4ac-4a58-9616-a32d20d34fca"
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, West Hollywood",
                  "website": "https://www.sohohousewh.com/",
                  "instagram": "@sohohouse",
                  "town": "West Hollywood",
                  "country": "USA",
                  "phoneNumber": "310-551-2888",
                  "lat": "34.08981",
                  "lng": "-118.3928",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "20b465e1-ae39-4c6f-98a8-1a969b02ab73"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Washington DC",
                  "website": "http://www.stregiswashingtondc.com/",
                  "instagram": "@stregisdc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-789-1234",
                  "lat": "38.90208",
                  "lng": "-77.03604",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e17e8deb-c425-40f2-9c74-dd3c8a3fd75e"
              },
              {
                  "iconName": "lodging",
                  "title": "The Saint",
                  "website": "http://www.thesainthotelneworleans.com/",
                  "instagram": "@thesainthotel",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-599-2119",
                  "lat": "29.95519",
                  "lng": "-90.07142",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8bbef3a7-d7cd-4aa8-abd4-aad21ef3a278"
              },
              {
                  "iconName": "lodging",
                  "title": "The Fairmont San Francisco",
                  "website": "http://www.fairmont.com/san-francisco/",
                  "instagram": "@fairmontsanfrancisco",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-775-8500",
                  "lat": "37.79236",
                  "lng": "-122.41056",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3c3fc056-4a6d-4d51-8dc2-c95b6264b4da"
              },
              {
                  "iconName": "lodging",
                  "title": "Tu Tu'tun Lodge",
                  "website": "http://www.tututun.com/",
                  "instagram": "@tututunlodge",
                  "town": "Gold Beach",
                  "country": "USA",
                  "phoneNumber": "541-344-2739",
                  "lat": "42.4758",
                  "lng": "-124.33728",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "062f6a04-f196-4e6b-91dd-858c54a43082"
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Bal Harbour Resort",
                  "website": "http://www.stregisbalharbour.com/",
                  "instagram": "@stregisbalharbour",
                  "town": "Miami Beach",
                  "country": "USA",
                  "phoneNumber": "307-201-6065",
                  "lat": "25.88878",
                  "lng": "-80.12285",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e5b62bd6-2b83-4aba-881a-7403d2f60550"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ritz-Carlton, Tokyo",
                  "website": "http://www.ritzcarlton.com/en/hotels/japan/tokyo",
                  "instagram": "@ritzcarlton",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-334-23-8000",
                  "lat": "35.66583",
                  "lng": "139.73122",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fcfda547-bb92-4295-ad29-5bd6a64e88dc"
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Beverly Hills",
                  "website": "http://www.beverlyhills.peninsula.com/en/default",
                  "instagram": "@thepeninsulabh",
                  "town": "Beverly Hills",
                  "country": "USA",
                  "phoneNumber": "310-651-7777",
                  "lat": "34.06578",
                  "lng": "-118.41056",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1f1965f2-3ab4-4d5e-9f31-8e06c794d7e8"
              },
              {
                  "iconName": "lodging",
                  "title": "Amansara",
                  "website": "https://www.aman.com/resorts/amansara",
                  "instagram": "@amansara_angkor",
                  "town": "Siem Reap",
                  "country": "Cambodia",
                  "phoneNumber": "855-63-760-333",
                  "lat": "13.36497",
                  "lng": "103.86094",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5881a386-2614-46b8-8746-5c6059fb8435"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Buenos Aires Palacio Duhau",
                  "website": "https://buenosaires.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@palacioduhau",
                  "town": "Buenos Aires",
                  "country": "Argentina",
                  "phoneNumber": "54-11-5171-1234",
                  "lat": "-34.58933",
                  "lng": "-58.38643",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "706958ad-295b-4c84-866e-cdb123c6f769"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Copacabana Palace",
                  "website": "https://www.belmond.com/copacabana-palace-rio-de-janeiro/",
                  "instagram": "@belmondcopacabanapalace",
                  "town": "Copacabana",
                  "country": "Brazil",
                  "phoneNumber": "55-21-2548-7070",
                  "lat": "-22.96695",
                  "lng": "-43.17925",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f88bdbea-b15c-4cde-b57f-cb7f7b3916e9"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Rio de Janeiro",
                  "website": "http://www.marriott.com/hotels/travel/riomc-jw-marriott-hotel-rio-de-janeiro/",
                  "instagram": "@jwmarriottrio",
                  "town": "Copacabana",
                  "country": "Brazil",
                  "phoneNumber": "55-21-2545-6500",
                  "lat": "-22.97227",
                  "lng": "-43.1858",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "269ade16-13f2-416a-a2e3-845ce5b548c7"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Miraflores Park",
                  "website": "https://www.belmond.com/miraflores-park-lima/",
                  "instagram": "@belmondmiraflorespark",
                  "town": "Miraflores",
                  "country": "Peru",
                  "phoneNumber": "51-1-610-4000",
                  "lat": "-12.1352",
                  "lng": "-77.02749",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e50c04d2-2a01-4e46-bf24-5061e2227b62"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Paracas",
                  "website": "http://www.hotelparacasresort.com/",
                  "instagram": "@hotelparacas",
                  "town": "Paracas",
                  "country": "Peru",
                  "phoneNumber": "51-5-658-1333",
                  "lat": "-13.83422",
                  "lng": "-76.25031",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e354a09e-b6ee-41d8-ae77-3c54e40b33a8"
              },
              {
                  "iconName": "lodging",
                  "title": "Six Senses Con Dao",
                  "website": "http://www.sixsenses.com/resorts/con-dao/destination",
                  "instagram": "@sixsensescondao",
                  "town": "Con Dao",
                  "country": "Vietnam",
                  "phoneNumber": "84-254-383-1222",
                  "lat": "8.70095",
                  "lng": "106.63386",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4e3dd6ba-b476-401c-9c00-9a12c8ed378c"
              },
              {
                  "iconName": "lodging",
                  "title": "Rambagh Palace",
                  "website": "https://taj.tajhotels.com/en-in/taj-rambagh-palace-jaipur/",
                  "instagram": "@rambaghpalace",
                  "town": "Jaipur",
                  "country": "India",
                  "phoneNumber": "91-14-1238-5700",
                  "lat": "26.89832",
                  "lng": "75.80856",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5eecdaa7-b51a-4024-a576-d10a400a6a06"
              },
              {
                  "iconName": "lodging",
                  "title": "Castillo Hotel Son Vida",
                  "website": "http://www.castillosonvidamallorca.com/en",
                  "instagram": "@castillohotel",
                  "town": "Mallorca",
                  "country": "Spain",
                  "phoneNumber": "34-971-493-493",
                  "lat": "39.59187",
                  "lng": "2.59624",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c3601b01-5f7b-48e2-affa-a153d21ff7e7"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ritz-Carlton, Santiago",
                  "website": "http://www.ritzcarlton.com/en/hotels/santiago",
                  "instagram": "@ritzcarlton",
                  "town": "Santiago",
                  "country": "Chile",
                  "phoneNumber": "56-2-2470-8500",
                  "lat": "-33.41593",
                  "lng": "-70.59513",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b04a6fff-de99-44bd-a5e7-735cf2a411ab"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Hotel Monasterio",
                  "website": "https://www.belmond.com/hotel-monasterio-cusco/",
                  "instagram": "@belmondhotelmonasterio",
                  "town": "Cusco",
                  "country": "Peru",
                  "phoneNumber": "51-8-460-4000",
                  "lat": "-13.5153",
                  "lng": "-71.97694",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "70e426db-c23f-415a-8bec-865e41a6015c"
              },
              {
                  "iconName": "lodging",
                  "title": "Tierra Atacama Boutique Hotel & Spa",
                  "website": "http://www.tierrahotels.com/tierra-atacama-hotel-boutique-amp-spa/",
                  "instagram": "@tierrahotels",
                  "town": "San Pedro de Atacama",
                  "country": "Chile",
                  "phoneNumber": "56-5-5255-5977",
                  "lat": "-22.92278",
                  "lng": "-68.20821",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f60534ae-a3c7-4d77-9492-ff576f8d8636"
              },
              {
                  "iconName": "lodging",
                  "title": "Aman Venice",
                  "website": "https://www.aman.com/resorts/aman-venice",
                  "instagram": "@aman_venice",
                  "town": "Venice",
                  "country": "Italy",
                  "phoneNumber": "39-0412-707333",
                  "lat": "45.43683",
                  "lng": "45.43683",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3b381ae2-07f5-47f8-806e-d427975b5fc6"
              },
              {
                  "iconName": "lodging",
                  "title": "Ca'Sagredo Hotel",
                  "website": "http://www.casagredohotel.com/",
                  "instagram": "@ca_sagredo_venice",
                  "town": "Venice",
                  "country": "Italy",
                  "phoneNumber": "39-0412-413111",
                  "lat": "45.44053",
                  "lng": "12.33437",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c3654b22-355a-4fca-9d00-f5f25c88c003"
              },
              {
                  "iconName": "lodging",
                  "title": "Inkaterra Hacienda Urubamba",
                  "website": "http://www.inkaterra.com/inkaterra/inkaterra-hacienda-urubamba/the-experience/",
                  "instagram": "@inkaterrahotels",
                  "town": "Urubamba",
                  "country": "Peru",
                  "phoneNumber": "51-1-610-0400",
                  "lat": "-13.3223",
                  "lng": "-72.05582",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "abddfc61-b117-4eac-a689-7ec309203ccd"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Sanctuary Lodge",
                  "website": "https://www.belmond.com/sanctuary-lodge-machu-picchu/",
                  "instagram": "@belmondsantuarylodge",
                  "town": "Machu Picchu",
                  "country": "Peru",
                  "phoneNumber": "51-9-848-16956",
                  "lat": "-13.16603",
                  "lng": "-72.54296",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e358ba37-6e89-4b58-b190-54c1c8f83413"
              },
              {
                  "iconName": "lodging",
                  "title": "28 Kothi",
                  "website": "http://www.28kothi.com/",
                  "instagram": "@28kothi",
                  "town": "Jaipur",
                  "country": "India",
                  "phoneNumber": "91-76-6583-4022",
                  "lat": "26.90518",
                  "lng": "26.90518",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9681df0a-9419-4d13-9674-1a3b10e21fa0"
              },
              {
                  "iconName": "lodging",
                  "title": "Wilderness Safaris Rocktail Camp",
                  "website": "http://www.wilderness-safaris.com/camps/rocktail-beach-camp",
                  "instagram": "@wearewilderness",
                  "town": "Nomvunya",
                  "country": "South Africa",
                  "phoneNumber": "27-11-257-5000",
                  "lat": "-27.26313",
                  "lng": "32.76838",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ab3a29fa-5c67-4112-ade4-58d90fd71bb5"
              },
              {
                  "iconName": "lodging",
                  "title": "Mont Rochelle",
                  "website": "http://www.virginlimitededition.com/en/mont-rochelle",
                  "instagram": "@virginlimitededition",
                  "town": "Franschhoek",
                  "country": "South Africa",
                  "phoneNumber": "27-21-876-2770",
                  "lat": "-33.91855",
                  "lng": "19.10883",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ac002e29-5203-4614-8ec7-82a8dd57c2be"
              },
              {
                  "iconName": "lodging",
                  "title": "One&Only Cape Town",
                  "website": "https://www.oneandonlyresorts.com/one-and-only-cape-town-south-africa",
                  "instagram": "@oocapetown",
                  "town": "Cape Town",
                  "country": "South Africa",
                  "phoneNumber": "27-21-431-5888",
                  "lat": "-33.90854",
                  "lng": "18.41647",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "72cd377a-9293-41e3-bc27-9cd4ade28186"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott El Convento Cusco",
                  "website": "http://www.marriott.com/hotels/travel/cuzmc-jw-marriott-el-convento-cusco/",
                  "instagram": "@jwmarriottcusco",
                  "town": "Cusco",
                  "country": "Peru",
                  "phoneNumber": "51-8-458-2200",
                  "lat": "-13.51685",
                  "lng": "-71.97617",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2713a1b6-6055-4ff1-bfd4-e986f5d3f798"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Hotel Macao, Cotai Strip",
                  "website": "https://www.fourseasons.com/macau/",
                  "instagram": "@fsmacau",
                  "town": "Taipa",
                  "country": "China",
                  "phoneNumber": "853-2881-8888",
                  "lat": "22.1464",
                  "lng": "113.56275",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "84d079af-82a8-47f6-bce4-aa96e5b066b9"
              },
              {
                  "iconName": "lodging",
                  "title": "Penha Longa Resort",
                  "website": "http://www.penhalonga.com/",
                  "instagram": "@penhalongaresort",
                  "town": "Sintra",
                  "country": "Portugal",
                  "phoneNumber": "351-219-249-011",
                  "lat": "38.76128",
                  "lng": "-9.3968",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "40d703d4-e8d6-465b-8d15-b18428b66d90"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Reid's Palace",
                  "website": "https://www.belmond.com/reids-palace-madeira/",
                  "instagram": "@belmondreidspalace",
                  "town": "Funchal",
                  "country": "Portugal",
                  "phoneNumber": "351-291-717-171",
                  "lat": "32.64057",
                  "lng": "-16.92399",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ebb7d3e6-0b6a-46ad-b025-4e1a71c27734"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Rajvilas, Jaipur",
                  "website": "https://www.oberoihotels.com/hotels-in-jaipur-rajvilas-resort/",
                  "instagram": "@oberoirajvilasjaipur",
                  "town": "Jaipur",
                  "country": "India",
                  "phoneNumber": "91-14-1268-0101",
                  "lat": "26.87593",
                  "lng": "75.88375",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5d4182e5-2a81-4866-8cf2-7af723cb02ec"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Palacio de Santa Paula",
                  "website": "http://www.marriott.com/hotels/travel/grxpa-hotel-palacio-de-santa-paula-autograph-collection/",
                  "instagram": "@palaciodesantapaulahotel",
                  "town": "Granada",
                  "country": "Spain",
                  "phoneNumber": "34-958-805-740",
                  "lat": "37.1794",
                  "lng": "-3.59965",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8376d448-5d96-4965-b92b-fa1841a7d777"
              },
              {
                  "iconName": "lodging",
                  "title": "Cotton House Hotel",
                  "website": "http://www.hotelcottonhouse.com/",
                  "instagram": "@cottonhousehotel",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-934-505-045",
                  "lat": "41.39187",
                  "lng": "2.17186",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "235f7d47-2d5c-473e-a2b8-6cee665797af"
              },
              {
                  "iconName": "lodging",
                  "title": "Southern Ocean Lodge",
                  "website": "https://southernoceanlodge.com.au/",
                  "instagram": "@southernoceanlodge",
                  "town": "Kingscote",
                  "country": "Australia",
                  "phoneNumber": "61-2-9918-4355",
                  "lat": "-36.01721",
                  "lng": "136.83169",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b71e1059-e3b6-4049-b2a3-2c7f30c6c917"
              },
              {
                  "iconName": "lodging",
                  "title": "Jai Mahal Palace",
                  "website": "https://taj.tajhotels.com/en-in/taj-jai-mahal-palace-jaipur/",
                  "instagram": "@jaimahalpalace",
                  "town": "Jaipur",
                  "country": "India",
                  "phoneNumber": "91-14-1660-1111",
                  "lat": "26.9121",
                  "lng": "75.78517",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "375c673b-1bf3-4b11-bb5a-ae48d5c6fcfd"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Mumbai Juhu",
                  "website": "http://www.marriott.com/hotels/travel/bomjw-jw-marriott-mumbai-juhu/",
                  "instagram": "@jwmarriottjuhu",
                  "town": "Mumbai",
                  "country": "India",
                  "phoneNumber": "91-22-6693-3000",
                  "lat": "19.10216",
                  "lng": "72.82694",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cb19362e-865c-442c-88b4-0b97d1da9a8c"
              },
              {
                  "iconName": "lodging",
                  "title": "The Ritz-Carlton, Kyoto",
                  "website": "http://www.ritzcarlton.com/en/hotels/japan/kyoto",
                  "instagram": "@ritzcarlton",
                  "town": "Kyoto",
                  "country": "Japan",
                  "phoneNumber": "81-757-46-5555",
                  "lat": "35.01376",
                  "lng": "135.77083",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2c4832d2-0a9a-42f6-9c6d-291bcbbcdfe3"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Van Oranje",
                  "website": "https://www.hotelvanoranje.com/",
                  "instagram": "@hotelvanoranje",
                  "town": "Noordwijk",
                  "country": "Netherlands",
                  "phoneNumber": "31-713-676-869",
                  "lat": "52.24709",
                  "lng": "4.43268",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ad97446e-a708-4be1-81f4-f4559a7e4979"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel des Indes",
                  "website": "http://www.hoteldesindesthehague.com/",
                  "instagram": "@hoteldesindesthehague",
                  "town": "The Hague",
                  "country": "Netherlands",
                  "phoneNumber": "31-703-612-345",
                  "lat": "52.0839",
                  "lng": "4.31327",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "de3f9ec4-7dce-4bb5-97b0-1ce2b3644a30"
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Castiglion del Bosco",
                  "website": "https://www.rosewoodhotels.com/en/castiglion-del-bosco",
                  "instagram": "@rwcastigliondelbosco",
                  "town": "Montalcino",
                  "country": "Italy",
                  "phoneNumber": "39-0577-1913001",
                  "lat": "43.08368",
                  "lng": "11.42213",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ff677317-f8e0-4d7d-8b5e-3d7be5f9d8e2"
              },
              {
                  "iconName": "lodging",
                  "title": "Relais Villa d'Amelia",
                  "website": "http://www.villadamelia.com/?lang=en",
                  "instagram": "@villadamelia",
                  "town": "Benevello",
                  "country": "Italy",
                  "phoneNumber": "39-0173-529225",
                  "lat": "44.63459",
                  "lng": "8.11036",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3d6322b4-c36b-48a5-9613-5aff3949cbc7"
              },
              {
                  "iconName": "lodging",
                  "title": "Castello di Casole, a Timbers Resort",
                  "website": "https://www.castellodicasole.com/",
                  "instagram": "@castellodicasole",
                  "town": "Casole d'Elsa",
                  "country": "Italy",
                  "phoneNumber": "39-0577-961501",
                  "lat": "43.32458",
                  "lng": "11.08421",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "97dfc756-9223-4508-9765-24c1ed52af16"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Lima",
                  "website": "http://www.marriott.com/hotels/travel/limdt-jw-marriott-hotel-lima/",
                  "instagram": "@jwmarriottlima",
                  "town": "Miraflores",
                  "country": "Peru",
                  "phoneNumber": "51-1-217-7000",
                  "lat": "-12.13172",
                  "lng": "-77.02938",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e60ec777-b943-4f95-9fd7-55f94d6f4229"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Arts Barcelona",
                  "website": "http://www.ritzcarlton.com/en/hotels/spain/barcelona",
                  "instagram": "@ritzcarlton",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-932-211-000",
                  "lat": "41.3869",
                  "lng": "2.19692",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3ad4f00f-f025-483c-b966-8305fd8a6d5f"
              },
              {
                  "iconName": "lodging",
                  "title": "Vina Vik",
                  "website": "http://www.vinavik.com/",
                  "instagram": "@vikretreats",
                  "town": "San Vincente de Tagua",
                  "country": "Chile",
                  "phoneNumber": "56-9-6193-1754",
                  "lat": "-34.53871",
                  "lng": "-71.23456",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "64030a54-145c-447a-9688-ea5fa729c89f"
              },
              {
                  "iconName": "lodging",
                  "title": "The Leela Ambience, Gurugram",
                  "website": "https://www.theleela.com/en_us/hotels-in-gurugram/the-leela-ambience-hotel-gurugram/",
                  "instagram": "@theleela",
                  "town": "Gurugram",
                  "country": "India",
                  "phoneNumber": "91-12-4442-5444",
                  "lat": "28.50552",
                  "lng": "77.09639",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6212d4f5-40b0-421c-add1-b3f22416c41d"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Nassau Breda",
                  "website": "http://www.hotelnassaubreda.nl/en/",
                  "instagram": "@hotelnassaubreda",
                  "town": "Breda",
                  "country": "Netherlands",
                  "phoneNumber": "31-768-884-921",
                  "lat": "51.58681",
                  "lng": "4.77441",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "61a9317b-68f7-48aa-ae31-4dad0e89ec39"
              },
              {
                  "iconName": "lodging",
                  "title": "Six Senses Ninh Van Bay",
                  "website": "http://www.sixsenses.com/resorts/ninh-van-bay/destination",
                  "instagram": "@sixsensesninhvanbay",
                  "town": "Ninh Hoa",
                  "country": "Vietnam",
                  "phoneNumber": "84-258-352-4268",
                  "lat": "12.35891",
                  "lng": "109.27768",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "38cbc078-a2e1-4c0b-841f-210d29fcfeb9"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Palacio del Carmen",
                  "website": "http://www.marriott.com/hotels/travel/scqak-hotel-palacio-del-carmen-autograph-collection/",
                  "instagram": "@palaciodelcarmenhotel",
                  "town": "Santiago de Compostela",
                  "country": "Spain",
                  "phoneNumber": "34-981-552-444",
                  "lat": "42.88081",
                  "lng": "-8.55308",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0168d5ef-cc78-4d1b-8a65-030f6077baa7"
              },
              {
                  "iconName": "lodging",
                  "title": "Fairmont Jasper Park Lodge",
                  "website": "http://www.fairmont.com/jasper/",
                  "instagram": "@fairmontjpl",
                  "town": "Jasper",
                  "country": "Canada",
                  "phoneNumber": "781-281-0809",
                  "lat": "52.88612",
                  "lng": "-118.05723",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a6b7cbf1-9690-4744-be55-54052559d5a7"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Hotel Caruso",
                  "website": "https://www.belmond.com/hotel-caruso-amalfi-coast/",
                  "instagram": "@belmondhotelcaruso",
                  "town": "Ravello",
                  "country": "Italy",
                  "phoneNumber": "39-0898-58800",
                  "lat": "40.65133",
                  "lng": "14.61298",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "60e72ffc-cb4e-4e25-90fd-87d719562c26"
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, Barcelona",
                  "website": "https://www.sohohousebarcelona.com/en",
                  "instagram": "@sohohouse",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-932-204-600",
                  "lat": "41.37839",
                  "lng": "2.17939",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a601815d-f4eb-4d30-91d8-59766127562f"
              },
              {
                  "iconName": "lodging",
                  "title": "Six Senses Douro Valley",
                  "website": "http://www.sixsenses.com/resorts/douro-valley/destination",
                  "instagram": "@sixsensesdourovalley",
                  "town": "Lamego",
                  "country": "Portugal",
                  "phoneNumber": "351-254-660-600",
                  "lat": "41.14419",
                  "lng": "-7.81224",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1f97ed65-242b-4e30-b831-1d9330383f57"
              },
              {
                  "iconName": "lodging",
                  "title": "Aman-I-Khas",
                  "website": "https://www.aman.com/resorts/aman-i-khas",
                  "instagram": "@aman_i_khas",
                  "town": "Sherpur",
                  "country": "India",
                  "phoneNumber": "91-74-6225-2052",
                  "lat": "26.06363",
                  "lng": "76.44121",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d6918084-64ed-425e-a16f-f6c732eac905"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Vanyavilas, Ranthambhore",
                  "website": "https://www.oberoihotels.com/hotels-in-ranthambhore-vanyavilas-resort/",
                  "instagram": "@theoberoivanyavilas",
                  "town": "Sawai Madhopur",
                  "country": "India",
                  "phoneNumber": "91-74-6222-3999",
                  "lat": "26.02383",
                  "lng": "76.38774",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5cbddc37-0ffe-42fa-b5f6-1413fcdf7f4b"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Splendido Mare",
                  "website": "https://www.belmond.com/hotel-splendido-portofino/",
                  "instagram": "@belmondhotelsplendido",
                  "town": "Portofino",
                  "country": "Italy",
                  "phoneNumber": "39-0185-267801",
                  "lat": "44.30323",
                  "lng": "9.20914",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "862b780b-a188-43b6-aaac-a1d8109448ca"
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel SP34",
                  "website": "http://www.brochner-hotels.com/hotel-sp34/",
                  "instagram": "@brochnerhotels",
                  "town": "Copenhagen",
                  "country": "Denmark",
                  "phoneNumber": "45-3313-3000",
                  "lat": "55.67882",
                  "lng": "12.56709",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1975163e-b8e9-43d0-88bd-ab7e56f4d41c"
              },
              {
                  "iconName": "lodging",
                  "title": "Wildflower Hall, Shimla in the Himalayas",
                  "website": "https://www.oberoihotels.com/hotels-in-shimla-wfh/",
                  "instagram": "@wildflowerhallmashobra",
                  "town": "Charabra",
                  "country": "India",
                  "phoneNumber": "91-17-7264-8585",
                  "lat": "31.11393",
                  "lng": "77.24767",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e96e3cea-567b-424c-aa76-af2f17d9ee6d"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Siem Reap",
                  "website": "https://siemreap.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyatt_siemreap",
                  "town": "Siem Reap",
                  "country": "Cambodia",
                  "phoneNumber": "855-63-211-234",
                  "lat": "13.35842",
                  "lng": "103.85393",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7b16d758-0d05-4d44-b99c-a6360d9d3221"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond La Residencia",
                  "website": "https://www.belmond.com/la-residencia-mallorca/",
                  "instagram": "@belmondlaresidencia",
                  "town": "Mallorca",
                  "country": "Spain",
                  "phoneNumber": "34-971-639-011",
                  "lat": "39.74927",
                  "lng": "2.64913",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "07b95ea1-e988-4f27-8442-1944e70545df"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Amarvilas, Agra",
                  "website": "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/",
                  "instagram": "@oberoiamarvilas",
                  "town": "Agra",
                  "country": "India",
                  "phoneNumber": "91-56-2223-1515",
                  "lat": "27.16799",
                  "lng": "78.04901",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "54edea67-fcea-4ac6-a471-3dca72ab39d5"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Udaivilas, Udaipur",
                  "website": "https://www.oberoihotels.com/hotels-in-udaipur-udaivilas-resort/",
                  "instagram": "@theoberoiudaivilas",
                  "town": "Udaipur",
                  "country": "India",
                  "phoneNumber": "91-29-4243-3300",
                  "lat": "24.57747",
                  "lng": "73.67203",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a2988f34-602c-4305-8dd8-32038539e623"
              },
              {
                  "iconName": "lodging",
                  "title": "Armani Hotel, Milano",
                  "website": "http://www.armanihotelmilano.com/",
                  "instagram": "@armanihotelmilano",
                  "town": "Milan",
                  "country": "Italy",
                  "phoneNumber": "39-0288-838888",
                  "lat": "45.47052",
                  "lng": "9.19301",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f98978fe-287e-47c7-aac9-05335fb7fd33"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Villa Sant'Andrea",
                  "website": "https://www.belmond.com/villa-sant-andrea-taormina-mare/",
                  "instagram": "@belmondvillasantandrea",
                  "town": "Taormina Mare",
                  "country": "Italy",
                  "phoneNumber": "39-0942-6271200",
                  "lat": "37.85414",
                  "lng": "15.30279",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "507030f9-648e-4088-87a9-6cad5b4401eb"
              },
              {
                  "iconName": "lodging",
                  "title": "Bulgari Hotel, Milano",
                  "website": "http://www.bulgarihotels.com/en_US/milan/the-hotel/overview",
                  "instagram": "@bulgarihotels",
                  "town": "Milan",
                  "country": "Italy",
                  "phoneNumber": "39-0280-5805",
                  "lat": "45.47013",
                  "lng": "9.18974",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "574a7ec7-1097-4f4a-b05c-e963bab9bcb0"
              },
              {
                  "iconName": "lodging",
                  "title": "Belmond Grand Hotel Timeo",
                  "website": "https://www.belmond.com/grand-hotel-timeo-taormina/",
                  "instagram": "@belmondgrandhoteltimeo",
                  "town": "Taormina",
                  "country": "Italy",
                  "phoneNumber": "39-0942-6270200",
                  "lat": "37.8524",
                  "lng": "15.29072",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2705b4af-7d27-47e2-8763-0f65b736e8c9"
              },
              {
                  "iconName": "lodging",
                  "title": "Bulgari Hotel, Beijing",
                  "website": "https://www.bulgarihotels.com/en_US/beijing",
                  "instagram": "@bulgarihotels",
                  "town": "Beijing",
                  "country": "China",
                  "phoneNumber": "86-10-8555-8555",
                  "lat": "39.94758",
                  "lng": "116.45216",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "229f8637-3ee8-4940-9a0c-709b1e789844"
              },
              {
                  "iconName": "lodging",
                  "title": "Berkeley River Lodge",
                  "website": "http://www.berkeleyriverlodge.com.au/",
                  "instagram": "@berkeleyriverlodge",
                  "town": "Oombulgurri",
                  "country": "Australia",
                  "phoneNumber": "61-8-9169-1330",
                  "lat": "-14.33566",
                  "lng": "127.77768",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "24852c76-1b86-43ce-a8d2-8b985637698a"
              },
              {
                  "iconName": "lodging",
                  "title": "Convento do Espinheiro",
                  "website": "http://www.conventodoespinheiro.com/en",
                  "instagram": "@conventodoespinheiro",
                  "town": "Evora",
                  "country": "Portugal",
                  "phoneNumber": "351-266-788-200",
                  "lat": "38.601",
                  "lng": "-7.88914",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c3bb836b-0b72-48f7-b935-6f111b745c1d"
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Hotel Chandigarh",
                  "website": "http://www.marriott.com/hotels/travel/ixcjw-jw-marriott-hotel-chandigarh/",
                  "instagram": "@jwmarriottchd",
                  "town": "Chandigarh",
                  "country": "India",
                  "phoneNumber": "91-17-2395-5555",
                  "lat": "30.72664",
                  "lng": "76.76711",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5b861400-b301-45a3-8e81-d55bb2447649"
              },
              {
                  "iconName": "lodging",
                  "title": "Mahua Kothi, a Taj Safari Lodge",
                  "website": "http://www.tajsafaris.com/our_lodges/mahua_kothi/default.php",
                  "instagram": "@tajsafaris",
                  "town": "Bandhavgarh National Park",
                  "country": "India",
                  "phoneNumber": "91-22-6601-1825",
                  "lat": "23.72797",
                  "lng": "81.01408",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d51f14d3-fb6c-4288-9e4e-d7611c9350cf"
              },
              {
                  "iconName": "lodging",
                  "title": "Pashan Garh, a Taj Safari Lodge",
                  "website": "http://www.tajsafaris.com/our_lodges/pashan_garh/default.php",
                  "instagram": "@tajsafaris",
                  "town": "Panna National Park",
                  "country": "India",
                  "phoneNumber": "91-22-6601-1825",
                  "lat": "24.67264",
                  "lng": "80.17798",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "81a93df8-ed8c-456c-a229-0f403879b1d1"
              },
              {
                  "iconName": "lodging",
                  "title": "Tierra Patagonia Hotel & Spa",
                  "website": "http://www.tierrahotels.com/tierra-patagonia-hotel-boutique-amp-spa/",
                  "instagram": "@tierrahotels",
                  "town": "Torres del Paine",
                  "country": "Chile",
                  "phoneNumber": "56-2-2370-5301",
                  "lat": "-51.0358",
                  "lng": "-72.58396",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a40ad8d2-7a29-4f08-a9e1-44c9c532ef2c"
              },
              {
                  "iconName": "lodging",
                  "title": "Villa Mahabhirom",
                  "website": "http://www.villamahabhirom.com/",
                  "instagram": "@villa.mahabhirom",
                  "town": "Chiang Mai",
                  "country": "Thailand",
                  "phoneNumber": "66-53-271-200",
                  "lat": "18.78346",
                  "lng": "98.95659",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "da9b95e9-ed01-40b2-93b5-d8533c08fce9"
              },
              {
                  "iconName": "lodging",
                  "title": "Ulusaba",
                  "website": "http://www.virginlimitededition.com/en/ulusaba",
                  "instagram": "@virginlimitededition",
                  "town": "Sabi Sand Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-325-4405",
                  "lat": "-24.78907",
                  "lng": "31.35592",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c316819b-61ce-4478-a179-f81326df70de"
              },
              {
                  "iconName": "lodging",
                  "title": "Phum Baitang",
                  "website": "http://www.zannierhotels.com/phumbaitang/en/",
                  "instagram": "@zannierhotels",
                  "town": "Siem Reap",
                  "country": "Cambodia",
                  "phoneNumber": "855-63-961-111",
                  "lat": "13.35705",
                  "lng": "103.82729",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "46efd4bd-70c5-4324-86b4-cb769ca4573d"
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Changbaishan",
                  "website": "https://changbaishan.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattchangbaishan",
                  "town": "Changbaishan",
                  "country": "China",
                  "phoneNumber": "86-43-9698-1234",
                  "lat": "42.10814",
                  "lng": "127.51224",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4082031c-4e00-4af0-989f-3987f8bf4f7e"
              },
              {
                  "iconName": "lodging",
                  "title": "Singita Boulders Lodge",
                  "website": "https://singita.com/lodge/singita-boulders-lodge/",
                  "instagram": "@singita_",
                  "town": "Sabi Sand Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-21-683-3424",
                  "lat": "-24.78624",
                  "lng": "31.42899",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "92e11d3d-8ad3-48d4-89d6-700658bbd2df"
              },
              {
                  "iconName": "lodging",
                  "title": "Singita Castleton",
                  "website": "https://singita.com/lodge/singita-castleton/",
                  "instagram": "@singita_",
                  "town": "Sabi Sand Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-21-683-3424",
                  "lat": "-24.83184",
                  "lng": "31.44324",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cf1bde36-f8b6-48c2-8745-e0c7638d8221"
              },
              {
                  "iconName": "lodging",
                  "title": "Singita Ebony Lodge",
                  "website": "https://singita.com/lodge/singita-ebony-lodge/",
                  "instagram": "@singita_",
                  "town": "Sabi Sand Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-21-683-3424",
                  "lat": "-24.78652",
                  "lng": "31.42582",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9e683b58-7600-4950-8823-0a78e9b1dbb5"
              },
              {
                  "iconName": "lodging",
                  "title": "Singita Lebombo Lodge",
                  "website": "https://singita.com/lodge/singita-lebombo-lodge/",
                  "instagram": "@singita_",
                  "town": "Kruger National Park",
                  "country": "South Africa",
                  "phoneNumber": "27-21-683-3424",
                  "lat": "-24.45241",
                  "lng": "31.97771",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3f96fb29-5374-4486-8b75-334c6a2f23c6"
              },
              {
                  "iconName": "lodging",
                  "title": "Singita Sweni Lodge",
                  "website": "https://singita.com/lodge/sweni-lodge/",
                  "instagram": "@singita_",
                  "town": "Kruger National Park",
                  "country": "South Africa",
                  "phoneNumber": "27-21-683-3424",
                  "lat": "-24.45402",
                  "lng": "31.9805",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "37ff6bef-82f3-499f-b845-03dcecfbd16b"
              },
              {
                  "iconName": "lodging",
                  "title": "Baghvan, a Taj Safari Lodge",
                  "website": "https://taj.tajhotels.com/en-in/baghvan-pench-national-park/",
                  "instagram": "@tajsafaris",
                  "town": "Pench National Park",
                  "country": "India",
                  "phoneNumber": "91-22-6601-1825",
                  "lat": "21.73321",
                  "lng": "79.34541",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "69798f1f-8b1c-4010-88b3-fadcb9f9ad61"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Bekal Resort & Spa",
                  "website": "https://taj.tajhotels.com/en-in/taj-bekal-kerala/",
                  "instagram": "@tajhotels",
                  "town": "Kasaragod",
                  "country": "India",
                  "phoneNumber": "91-46-7661-6612",
                  "lat": "12.42304",
                  "lng": "75.01572",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fa4b9d8c-28f3-4429-9129-e3fc75ed239f"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Coromandel",
                  "website": "https://taj.tajhotels.com/en-in/taj-coromandel-chennai/",
                  "instagram": "@tajcoromandel",
                  "town": "Chennai",
                  "country": "India",
                  "phoneNumber": "91-44-6600-2827",
                  "lat": "13.05811",
                  "lng": "80.24728",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "74b39212-35e3-4b07-9e98-f5a92268645d"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Fort Aguada Resort & Spa",
                  "website": "https://taj.tajhotels.com/en-in/taj-fort-aguada-goa/",
                  "instagram": "@tajhotels",
                  "town": "Candolim",
                  "country": "India",
                  "phoneNumber": "91-83-2664-5858",
                  "lat": "15.49744",
                  "lng": "73.76695",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9288f7a4-b9e4-4092-8e17-b1bf070a78bc"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Lake Palace",
                  "website": "https://taj.tajhotels.com/en-in/taj-lake-palace-udaipur/",
                  "instagram": "@tajlakepalace",
                  "town": "Udaipur",
                  "country": "India",
                  "phoneNumber": "91-29-4242-8800",
                  "lat": "24.57533",
                  "lng": "73.68",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ff14169f-7faa-4929-8c74-9414f35a808a"
              },
              {
                  "iconName": "lodging",
                  "title": "Taj Deccan",
                  "website": "https://vivanta.tajhotels.com/en-in/deccan/",
                  "instagram": "@tajdeccan",
                  "town": "Hyderabad",
                  "country": "India",
                  "phoneNumber": "91-40-6652-3939",
                  "lat": "17.4179",
                  "lng": "78.45076",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1fcb7833-67a7-4cb5-9ed0-19ae01b15911"
              },
              {
                  "iconName": "lodging",
                  "title": "Alila Diwa Goa",
                  "website": "https://www.alilahotels.com/diwagoa",
                  "instagram": "@aliladiwagoa",
                  "town": "Majorda",
                  "country": "India",
                  "phoneNumber": "91-83-2274-6800",
                  "lat": "15.30684",
                  "lng": "15.30684",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9984824a-2102-4edf-9526-6dda6942381d"
              },
              {
                  "iconName": "lodging",
                  "title": "Alila Fort Bishangarh",
                  "website": "https://www.alilahotels.com/fortbishangarh",
                  "instagram": "@alilafortbishangarh",
                  "town": "Bishangarh",
                  "country": "India",
                  "phoneNumber": "91-14-2227-6500",
                  "lat": "27.32107",
                  "lng": "27.32107",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fd0cd88d-fc2b-4e36-a1ca-caa37ec70a61"
              },
              {
                  "iconName": "lodging",
                  "title": "Amanbagh",
                  "website": "https://www.aman.com/resorts/amanbagh",
                  "instagram": "@amanbagh",
                  "town": "Ajabgarh",
                  "country": "India",
                  "phoneNumber": "91-14-6522-3333",
                  "lat": "27.16877",
                  "lng": "27.16877",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "865850f4-3213-4137-a263-513e3906d819"
              },
              {
                  "iconName": "lodging",
                  "title": "Amanoi",
                  "website": "https://www.aman.com/resorts/amanoi",
                  "instagram": "@amanoi",
                  "town": "Vinh Hy",
                  "country": "Vietnam",
                  "phoneNumber": "84-259-377-0777",
                  "lat": "11.71006",
                  "lng": "109.19773",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "638863d2-8213-4283-97c7-1a8741d2613e"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Ngala Safari Lodge",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kruger-national-park/andbeyond-ngala-safari-lodge/",
                  "instagram": "@andbeyond",
                  "town": "Ngala Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-24.38133",
                  "lng": "31.32187",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b214cbc3-b4f7-45d5-800c-c3602ca7ed6f"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Ngala Tented Camp",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kruger-national-park/ngala-private-game-reserve/andbeyond-ngala-tented-camp/",
                  "instagram": "@andbeyond",
                  "town": "Ngala Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-24.48024",
                  "lng": "31.37997",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "503e7e45-37fc-46e1-a790-77d3781d4037"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Phinda Forest Lodge",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kwazulu-natal/phinda-private-game-reserve/andbeyond-phinda-forest-lodge/",
                  "instagram": "@andbeyond",
                  "town": "Phinda Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-27.77751",
                  "lng": "32.34935",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ce6e7d93-080e-49ef-8946-c60c5f9887d1"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Phinda Mountain Lodge",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kwazulu-natal/phinda-private-game-reserve/andbeyond-phinda-mountain-lodge/",
                  "instagram": "@andbeyond",
                  "town": "Phinda Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-27.88404",
                  "lng": "32.28328",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7f997e3b-0248-481e-b1df-701e8ee9c300"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Phinda Rock Lodge",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kwazulu-natal/phinda-private-game-reserve/andbeyond-phinda-rock-lodge/",
                  "instagram": "@andbeyond",
                  "town": "Phinda Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-27.87946",
                  "lng": "32.27911",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "35fa1f1d-e318-4e34-8a57-a02a549013a5"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Phinda Vlei Lodge",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kwazulu-natal/phinda-private-game-reserve/andbeyond-phinda-vlei-lodge/",
                  "instagram": "@andbeyond",
                  "town": "Phinda Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-27.78048",
                  "lng": "32.35302",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c3cd5804-898a-4826-bce2-bf9fce3145ec"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Phinda Zuka Lodge",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/kwazulu-natal/phinda-private-game-reserve/andbeyond-phinda-zuka-lodge/",
                  "instagram": "@andbeyond",
                  "town": "Phinda Private Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-27.8358",
                  "lng": "32.24721",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bd485924-8a48-4456-a7c5-c64243ea6a6d"
              },
              {
                  "iconName": "lodging",
                  "title": "andBeyond Kirkman's Kamp",
                  "website": "https://www.andbeyond.com/our-lodges/africa/south-africa/sabi-sand-game-reserve/andbeyond-kirkmans-kamp/",
                  "instagram": "@andbeyond",
                  "town": "Sabi Sand Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-11-809-4300",
                  "lat": "-24.9347",
                  "lng": "31.55956",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f5d72438-8efb-428e-a9a9-2113d33148e1"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Tented Camp, Golden Triangle",
                  "website": "https://www.fourseasons.com/goldentriangle/",
                  "instagram": "@fstentedcamp",
                  "town": "Chiang Saen",
                  "country": "Thailand",
                  "phoneNumber": "66-53-910-200",
                  "lat": "20.37295",
                  "lng": "100.0769",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "487c3eb6-6ad2-4aa3-bf8f-85f942ccbd5e"
              },
              {
                  "iconName": "lodging",
                  "title": "Four Seasons Resort The Nam Hai, Hoi An",
                  "website": "https://www.fourseasons.com/hoian/",
                  "instagram": "@fsnamhai",
                  "town": "Dien Ban",
                  "country": "Vietnam",
                  "phoneNumber": "84-235-394-0000",
                  "lat": "15.92921",
                  "lng": "108.31768",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bfcdd267-05a2-45a4-9d7b-39e280b1de13"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Sukhvilas Resort & Spa, New Chandigarh",
                  "website": "https://www.oberoihotels.com/hotels-in-chandigarh-sukhvilas-resort/",
                  "instagram": "@theoberoisukhvilas",
                  "town": "Palanpur",
                  "country": "India",
                  "phoneNumber": "91-16-0272-0000",
                  "lat": "30.86459",
                  "lng": "76.71407",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7d563991-418c-4e2d-9366-5df255078d6c"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi, New Delhi",
                  "website": "https://www.oberoihotels.com/hotels-in-delhi/",
                  "instagram": "@oberoinewdelhi",
                  "town": "New Delhi",
                  "country": "India",
                  "phoneNumber": "91-11-2436-3030",
                  "lat": "28.59629",
                  "lng": "77.23964",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bbb03366-f1cf-48be-8b2a-17266b4a3ca2"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi, Gurgaon",
                  "website": "https://www.oberoihotels.com/hotels-in-gurgaon/",
                  "instagram": "@theoberoi_gurgaon",
                  "town": "Gurgaon",
                  "country": "India",
                  "phoneNumber": "91-12-4245-1234",
                  "lat": "28.5024",
                  "lng": "77.0885",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3f25f204-183a-48c5-b04b-d651f28cf572"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi, Mumbai",
                  "website": "https://www.oberoihotels.com/hotels-in-mumbai/",
                  "instagram": "@theoberoimumbai",
                  "town": "Mumbai",
                  "country": "India",
                  "phoneNumber": "91-22-6632-5757",
                  "lat": "18.92697",
                  "lng": "72.82044",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5efbfc61-e494-4a2f-84f2-5e60bc701ff4"
              },
              {
                  "iconName": "lodging",
                  "title": "The Oberoi Cecil, Shimla",
                  "website": "https://www.oberoihotels.com/hotels-in-shimla-cecil/",
                  "instagram": "@oberoicecil",
                  "town": "Chaura Maidan",
                  "country": "India",
                  "phoneNumber": "91-17-7280-4848",
                  "lat": "31.10314",
                  "lng": "77.15499",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e91f308f-7714-4920-b3ae-e3855075cf30"
              },
              {
                  "iconName": "lodging",
                  "title": "Shakti",
                  "website": "https://www.shaktihimalaya.com/",
                  "instagram": "@shaktihimalaya",
                  "town": "Leh",
                  "country": "India",
                  "phoneNumber": "91-12-4456-3899",
                  "lat": "34.19886",
                  "lng": "77.33644",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "92635730-6fa9-4eef-ac5b-0812183407fd"
              },
              {
                  "iconName": "lodging",
                  "title": "Tswalu Kalahari",
                  "website": "https://www.tswalu.com/",
                  "instagram": "@tswalu",
                  "town": "Tswalu Game Reserve",
                  "country": "South Africa",
                  "phoneNumber": "27-53-781-9331",
                  "lat": "-27.20178",
                  "lng": "22.46772",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b88b3c0c-2e5a-4f1e-9698-c54bf768c044"
              },
              {
                  "iconName": "museum",
                  "title": "Chinati Foundation",
                  "website": "https://www.chinati.org/",
                  "instagram": "@chinatifoundation",
                  "town": "Marfa",
                  "country": "USA",
                  "phoneNumber": "435-604-1300",
                  "lat": "30.30002",
                  "lng": "-104.02604",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b1498402-0ea2-4866-9b2d-c8030c48b259"
              },
              {
                  "iconName": "museum",
                  "title": "Baltimore Museum of Art",
                  "website": "https://artbma.org/",
                  "instagram": "@baltimoremuseumofart",
                  "town": "Baltimore",
                  "country": "USA",
                  "phoneNumber": "502-217-6300",
                  "lat": "39.32595",
                  "lng": "-76.61938",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d959ee34-549d-4200-870e-c9570b64eaa0"
              },
              {
                  "iconName": "museum",
                  "title": "MASS MoCA",
                  "website": "https://massmoca.org/",
                  "instagram": "@massmoca",
                  "town": "North Adams",
                  "country": "USA",
                  "phoneNumber": "414-224-3200",
                  "lat": "42.70187",
                  "lng": "-73.11519",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8bd982ee-9b4e-4c1a-a91b-b29fcf8b98b5"
              },
              {
                  "iconName": "museum",
                  "title": "High Museum of Art",
                  "website": "https://www.high.org/",
                  "instagram": "@highmuseumofart",
                  "town": "Atlanta",
                  "country": "USA",
                  "phoneNumber": "406-821-4600",
                  "lat": "33.79006",
                  "lng": "-84.38555",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "325b9e41-e628-40ac-9ceb-73b834fe34aa"
              },
              {
                  "iconName": "museum",
                  "title": "Seattle Art Museum",
                  "website": "http://www.seattleartmuseum.org/",
                  "instagram": "@seattleartmuseum",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "207-221-5711",
                  "lat": "47.6073",
                  "lng": "-122.33813",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4b2bc5c3-5f87-4edf-a0b8-ed9928213a44"
              },
              {
                  "iconName": "museum",
                  "title": "Montreal Museum of Fine Arts",
                  "website": "https://www.mbam.qc.ca/en/",
                  "instagram": "@mbamtl",
                  "town": "Montreal",
                  "country": "Canada",
                  "phoneNumber": "514-392-2781",
                  "lat": "45.49852",
                  "lng": "-73.5794",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9193b81b-441f-4e4f-9565-10d7f7d90247"
              },
              {
                  "iconName": "museum",
                  "title": "The Menil Collection",
                  "website": "https://www.menil.org/",
                  "instagram": "@menilcollection",
                  "town": "Houston",
                  "country": "USA",
                  "phoneNumber": "713-840-7600",
                  "lat": "29.73734",
                  "lng": "-95.39851",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "404a178d-9acc-4835-9f6c-9a883a06da5c"
              },
              {
                  "iconName": "museum",
                  "title": "Phillips Collection",
                  "website": "http://www.phillipscollection.org/",
                  "instagram": "@phillipscollection",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-393-0812",
                  "lat": "38.91175",
                  "lng": "-77.04691",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0b3215fc-0e0c-4d1d-af7d-06813e4ca149"
              },
              {
                  "iconName": "museum",
                  "title": "Asian Art Museum",
                  "website": "http://www.asianart.org/",
                  "instagram": "@asianartmuseum",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-685-4860",
                  "lat": "37.78016",
                  "lng": "-122.41619",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c1294ae5-6c64-4b40-a5e4-ff20be8a4485"
              },
              {
                  "iconName": "museum",
                  "title": "Musee Rodin",
                  "website": "http://www.musee-rodin.fr/en",
                  "instagram": "@museerodinparis",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-44-18-61-10",
                  "lat": "48.8553",
                  "lng": "2.31583",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b2461862-4f6a-4f4b-9227-7d430ae40dd4"
              },
              {
                  "iconName": "museum",
                  "title": "The Museum of Contemporary Art",
                  "website": "https://mcachicago.org/",
                  "instagram": "@mcachicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-335-1234",
                  "lat": "41.89722",
                  "lng": "-87.62134",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1b3b0786-a436-425b-83e1-eaa379dd34f8"
              },
              {
                  "iconName": "museum",
                  "title": "The Broad",
                  "website": "https://www.thebroad.org/",
                  "instagram": "@thebroadmuseum",
                  "town": "Los Angeles",
                  "country": "USA",
                  "phoneNumber": "214-559-2100",
                  "lat": "34.05438",
                  "lng": "-118.25064",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7e2ebc62-3a0e-4eeb-90bc-869c3e1d2238"
              },
              {
                  "iconName": "museum",
                  "title": "Isabella Stewart Gardner Museum",
                  "website": "https://www.gardnermuseum.org/",
                  "instagram": "@gardnermuseum",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-661-0505",
                  "lat": "42.33818",
                  "lng": "-71.09912",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c1a962ef-2afc-4c28-b966-afaff7d145f8"
              },
              {
                  "iconName": "museum",
                  "title": "Kimbell Art Museum",
                  "website": "https://www.kimbellart.org/",
                  "instagram": "@kimbellartmuseum",
                  "town": "Fort Worth",
                  "country": "USA",
                  "phoneNumber": "819-681-3000",
                  "lat": "32.74857",
                  "lng": "-97.36492",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cbb90ec9-777a-4f7d-9e88-40b177735b72"
              },
              {
                  "iconName": "museum",
                  "title": "Pulitzer Arts Foundation",
                  "website": "https://pulitzerarts.org/",
                  "instagram": "@pulitzerarts",
                  "town": "St Louis",
                  "country": "USA",
                  "phoneNumber": "323-297-0100",
                  "lat": "38.64021",
                  "lng": "-90.2345",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d53ebc42-49e6-4f1a-a495-297d4adae2d7"
              },
              {
                  "iconName": "museum",
                  "title": "Museum of Fine Arts",
                  "website": "https://www.mfa.org/",
                  "instagram": "@mfaboston",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-542-5200",
                  "lat": "42.33938",
                  "lng": "-71.09404",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b4291f75-6bc1-4f3d-9656-bdfc4d4f5998"
              },
              {
                  "iconName": "museum",
                  "title": "MH de Young Museum",
                  "website": "https://deyoung.famsf.org/",
                  "instagram": "@deyoungmuseum",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-772-5000",
                  "lat": "37.77147",
                  "lng": "-122.46867",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7a0b53fb-b11e-41d7-8351-3126a090bc2c"
              },
              {
                  "iconName": "museum",
                  "title": "Detroit Institute of Arts",
                  "website": "https://www.dia.org/",
                  "instagram": "@diadetroit",
                  "town": "Detroit",
                  "country": "USA",
                  "phoneNumber": "314-754-1850",
                  "lat": "42.35941",
                  "lng": "-83.06457",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4061b218-c6c3-4000-8a53-0794df35a957"
              },
              {
                  "iconName": "museum",
                  "title": "Portland Museum of Art",
                  "website": "https://www.portlandmuseum.org/",
                  "instagram": "@ptldmuseumofart",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-805-1336",
                  "lat": "43.65388",
                  "lng": "-70.26261",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6e3151ca-efd6-411a-9f7d-dc428be4fed0"
              },
              {
                  "iconName": "museum",
                  "title": "Milwaukee Art Museum",
                  "website": "https://mam.org/",
                  "instagram": "@milwaukeeart",
                  "town": "Milwaukee",
                  "country": "USA",
                  "phoneNumber": "415-284-4000",
                  "lat": "43.04007",
                  "lng": "-87.89705",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "717806ca-be15-41a5-b3ff-ac5d1a608710"
              },
              {
                  "iconName": "museum",
                  "title": "Walker Art Center",
                  "website": "https://walkerart.org/",
                  "instagram": "@walkerartcenter",
                  "town": "Minneapolis",
                  "country": "USA",
                  "phoneNumber": "615-226-9442",
                  "lat": "44.96845",
                  "lng": "-93.28919",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "61c4f26d-8cbd-4dc1-9f34-2ab66e2af1db"
              },
              {
                  "iconName": "museum",
                  "title": "Smithsonian American Art Museum",
                  "website": "https://americanart.si.edu/",
                  "instagram": "@americanartmuseum",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-638-2626",
                  "lat": "38.89786",
                  "lng": "-77.02294",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8ca392ac-b764-4411-930f-8345c586a679"
              },
              {
                  "iconName": "museum",
                  "title": "Guggenheim Museum, Bilbao",
                  "website": "https://www.guggenheim-bilbao.eus/en/",
                  "instagram": "@museoguggenheim",
                  "town": "Bilbao",
                  "country": "Spain",
                  "phoneNumber": "34-944-359000",
                  "lat": "43.26867",
                  "lng": "-2.93401",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fd7d9310-0715-406d-8faf-45935416ea09"
              },
              {
                  "iconName": "museum",
                  "title": "Museo Nacional del Prado",
                  "website": "https://www.museodelprado.es/en",
                  "instagram": "@museoprado",
                  "town": "Madrid",
                  "country": "Spain",
                  "phoneNumber": "34-913-302-800",
                  "lat": "40.41378",
                  "lng": "-3.69212",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "455e4356-c4b6-4017-90c0-ea5d7a16dd66"
              },
              {
                  "iconName": "museum",
                  "title": "Victoria & Albert Museum",
                  "website": "https://www.vam.ac.uk/",
                  "instagram": "@vamuseum",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7942-2000",
                  "lat": "51.49663",
                  "lng": "-0.17218",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9af3fee3-4486-475b-b17f-c771be745cd4"
              },
              {
                  "iconName": "museum",
                  "title": "Peggy Guggenheim Collection",
                  "website": "http://www.guggenheim-venice.it/inglese/default.html",
                  "instagram": "@guggenheim_venice",
                  "town": "Venice",
                  "country": "Italy",
                  "phoneNumber": "39-041-240-5411",
                  "lat": "45.43082",
                  "lng": "12.33153",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6598bb1b-1293-4801-bcdf-f9f5ccee39a5"
              },
              {
                  "iconName": "museum",
                  "title": "Musee de l'Orangerie",
                  "website": "http://www.musee-orangerie.fr/en",
                  "instagram": "@museeorangerie",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-44-77-80-07",
                  "lat": "48.86379",
                  "lng": "2.32266",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3120849e-284d-4d01-90ca-cbee099b8d37"
              },
              {
                  "iconName": "museum",
                  "title": "Mauritshuis",
                  "website": "https://www.mauritshuis.nl/en/",
                  "instagram": "@mauritshuis_museum",
                  "town": "The Hague",
                  "country": "Netherlands",
                  "phoneNumber": "31-703-023-456",
                  "lat": "52.08042",
                  "lng": "4.3143",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "774b68df-f105-41c0-81d8-6da8072dfc83"
              },
              {
                  "iconName": "national park",
                  "title": "Acadia National Park",
                  "website": "https://www.nps.gov/acad/index.htm",
                  "instagram": "@acadianps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "44.33856",
                  "lng": "-68.27333",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "13149c5c-7ae6-471d-b0a4-6b98af1700b4"
              },
              {
                  "iconName": "national park",
                  "title": "Arches National Park",
                  "website": "https://www.nps.gov/arch/index.htm",
                  "instagram": "@archesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.7331",
                  "lng": "-109.59251",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9e393664-306f-40d8-8042-495e53adc183"
              },
              {
                  "iconName": "national park",
                  "title": "Badlands National Park",
                  "website": "https://www.nps.gov/badl/index.htm",
                  "instagram": "@badlandsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "43.85541",
                  "lng": "-102.33969",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1e1256ed-0883-4035-969f-973e0d7e1765"
              },
              {
                  "iconName": "national park",
                  "title": "Big Bend National Park",
                  "website": "https://www.nps.gov/bibe/index.htm",
                  "instagram": "@bigbendnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "29.12752",
                  "lng": "-103.24254",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a43b4d98-44a0-47ea-a1bd-46a2352cdac2"
              },
              {
                  "iconName": "national park",
                  "title": "Biscayne National Park",
                  "website": "https://www.nps.gov/bisc/index.htm",
                  "instagram": "@biscaynenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "25.46305",
                  "lng": "-80.34637",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "26a770c1-0bac-493e-aadf-a8a025291ae3"
              },
              {
                  "iconName": "national park",
                  "title": "Black Canyon of the Gunnison National Park",
                  "website": "https://www.nps.gov/blca/index.htm",
                  "instagram": "@blackcanyonnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.57541",
                  "lng": "-107.74159",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a228c447-4fd7-4255-b410-84d3bee91254"
              },
              {
                  "iconName": "national park",
                  "title": "Bryce Canyon National Park",
                  "website": "https://www.nps.gov/brca/index.htm",
                  "instagram": "@brycecanyonnps_gov",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.59305",
                  "lng": "-112.18708",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "21f7e350-71a5-4837-b219-c263cc116694"
              },
              {
                  "iconName": "national park",
                  "title": "Canyonlands National Park",
                  "website": "https://www.nps.gov/cany/index.htm",
                  "instagram": "@canyonloandsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.32689",
                  "lng": "-109.87826",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d4e0e30d-6c31-423f-bd8c-ec25fa13099c"
              },
              {
                  "iconName": "national park",
                  "title": "Capitol Reef National Park",
                  "website": "https://www.nps.gov/care/index.htm",
                  "instagram": "@capitolreefnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.36699",
                  "lng": "-111.2615",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "18bc8b77-c69e-4181-a0db-169b124396d0"
              },
              {
                  "iconName": "national park",
                  "title": "Carlsbad Caverns National Park",
                  "website": "https://www.nps.gov/cave/index.htm",
                  "instagram": "@carlsbadcavernsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "32.14788",
                  "lng": "-104.55671",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8bb617ab-a063-48e2-96ae-8e7535f8569d"
              },
              {
                  "iconName": "national park",
                  "title": "Channel Islands National Park",
                  "website": "https://www.nps.gov/chis/index.htm",
                  "instagram": "@channelislandsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "33.9961",
                  "lng": "-119.76916",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "de5ec83d-237f-4574-9a7e-871e0e3c9131"
              },
              {
                  "iconName": "national park",
                  "title": "Congaree National Park",
                  "website": "https://www.nps.gov/cong/index.htm",
                  "instagram": "@congareenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "33.7914",
                  "lng": "-80.76932",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "65e862e2-81bd-4c4d-9e8b-6032f0a8d94d"
              },
              {
                  "iconName": "national park",
                  "title": "Cuyahoga Valley National Park",
                  "website": "https://www.nps.gov/cuva/index.htm",
                  "instagram": "@cuyahogavalleynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.28085",
                  "lng": "-81.56781",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "43f10a7d-e72a-4e88-9e1b-2ebabdb86d89"
              },
              {
                  "iconName": "national park",
                  "title": "Denali National Park",
                  "website": "https://www.nps.gov/dena/index.htm",
                  "instagram": "@denalinps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "63.11482",
                  "lng": "-151.1926",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9e0a120e-1521-489d-8e79-ef05bd4a70fb"
              },
              {
                  "iconName": "national park",
                  "title": "Death Valley National Park",
                  "website": "https://www.nps.gov/deva/index.htm",
                  "instagram": "@deathvalleynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.50541",
                  "lng": "-117.07941",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1b4bde8a-ea59-49a3-8021-ae3de5b1f526"
              },
              {
                  "iconName": "national park",
                  "title": "Dry Tortugas National Park",
                  "website": "https://www.nps.gov/drto/index.htm",
                  "instagram": "@drytortugasnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "24.66467",
                  "lng": "-82.88559",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "02211c9c-2d2b-49cf-b7d9-476e8f68c95c"
              },
              {
                  "iconName": "national park",
                  "title": "Everglades National Park",
                  "website": "https://www.nps.gov/ever/index.htm",
                  "instagram": "@evergladesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "25.28662",
                  "lng": "-80.89864",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2dab235e-a1a0-40c5-b985-7f663bd7dd29"
              },
              {
                  "iconName": "national park",
                  "title": "Gates of the Arctic National Park",
                  "website": "https://www.nps.gov/gaar/index.htm",
                  "instagram": "@alaskanps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "67.91466",
                  "lng": "-153.46378",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "759857f2-e102-4428-9f9b-7646918d1833"
              },
              {
                  "iconName": "national park",
                  "title": "Glacier National Park",
                  "website": "https://www.nps.gov/glac/index.htm",
                  "instagram": "@glaciernps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "48.75963",
                  "lng": "-113.78702",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fc5013b1-1790-4ccb-8c98-a1ae0ca0f552"
              },
              {
                  "iconName": "national park",
                  "title": "Glacier Bay National Park",
                  "website": "https://www.nps.gov/glba/index.htm",
                  "instagram": "@glacierbaynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "58.66585",
                  "lng": "-136.90021",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "138e521d-4e8c-4fce-b262-a5b6d13b660e"
              },
              {
                  "iconName": "national park",
                  "title": "Grand Canyon National Park",
                  "website": "https://www.nps.gov/grca/index.htm",
                  "instagram": "@grandcanyonnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.10697",
                  "lng": "-112.11299",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a8136ceb-fbc8-4224-a227-1644bf710bc9"
              },
              {
                  "iconName": "national park",
                  "title": "Great Sand Dunes National Park",
                  "website": "https://www.nps.gov/grsa/index.htm",
                  "instagram": "@greatsanddunesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.79163",
                  "lng": "-105.59432",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d749c42d-a45d-4207-8fff-78aec561f91f"
              },
              {
                  "iconName": "national park",
                  "title": "Great Smoky Mountains National Park",
                  "website": "https://www.nps.gov/grsm/index.htm",
                  "instagram": "@greatsmokynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "35.61179",
                  "lng": "-83.48954",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7ff0f204-68da-4d55-9fda-3c6a8e607050"
              },
              {
                  "iconName": "national park",
                  "title": "Grand Teton National Park",
                  "website": "https://www.nps.gov/grte/index.htm",
                  "instagram": "@grandtetonnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "43.79045",
                  "lng": "-110.68176",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "922ae0c0-9989-4167-a13f-80f1142a5be5"
              },
              {
                  "iconName": "national park",
                  "title": "Guadalupe Mountains National Park",
                  "website": "https://www.nps.gov/gumo/index.htm",
                  "instagram": "@guadalupemountainsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "31.94521",
                  "lng": "-104.87252",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a6c6554f-cc43-4ffa-9308-43b10e060c3f"
              },
              {
                  "iconName": "national park",
                  "title": "Haleakala National Park",
                  "website": "https://www.nps.gov/hale/index.htm",
                  "instagram": "@haleakalanps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "20.72041",
                  "lng": "-156.15515",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3be9d353-1f10-4b4a-aa29-af681653a41d"
              },
              {
                  "iconName": "national park",
                  "title": "Hawaii Volcanoes National Park",
                  "website": "https://www.nps.gov/havo/index.htm",
                  "instagram": "@hawaiivolcanoesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "19.41943",
                  "lng": "-155.2885",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "61299a2f-b9f8-49a3-a574-1d577031dca6"
              },
              {
                  "iconName": "national park",
                  "title": "Hot Springs National Park",
                  "website": "https://www.nps.gov/hosp/index.htm",
                  "instagram": "@hotspringsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "34.52172",
                  "lng": "-93.04235",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5efd80d3-8050-4706-bed2-2865074d94a2"
              },
              {
                  "iconName": "national park",
                  "title": "Isle Royale National Park",
                  "website": "https://www.nps.gov/isro/index.htm",
                  "instagram": "@isleroyalenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "47.99588",
                  "lng": "-88.90929",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "94ed93f9-9e83-4993-812c-dbafbdd215d6"
              },
              {
                  "iconName": "national park",
                  "title": "Joshua Tree National Park",
                  "website": "https://www.nps.gov/jotr/index.htm",
                  "instagram": "@joshuatreenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "33.87343",
                  "lng": "-115.90099",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ea8d7cfe-9c3a-48e1-a827-26c82e85f531"
              },
              {
                  "iconName": "national park",
                  "title": "Katmai National Park",
                  "website": "https://www.nps.gov/katm/index.htm",
                  "instagram": "@katmainpp",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "58.59756",
                  "lng": "-154.69372",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ec283333-e0d0-42a0-a714-ad42ae2d4901"
              },
              {
                  "iconName": "national park",
                  "title": "Kenai Fjords National Park",
                  "website": "https://www.nps.gov/kefj/index.htm",
                  "instagram": "@kenaifjordsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "60.04379",
                  "lng": "-149.81636",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ebb2556e-64e0-4c18-b31f-1d186e038d26"
              },
              {
                  "iconName": "national park",
                  "title": "Kobuk Valley National Park",
                  "website": "https://www.nps.gov/kova/index.htm",
                  "instagram": "@kobukvalleynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "67.33564",
                  "lng": "-159.12431",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bab100d0-41cf-43b5-b13b-a697e53d4652"
              },
              {
                  "iconName": "national park",
                  "title": "Lake Clark National Park",
                  "website": "https://www.nps.gov/lacl/index.htm",
                  "instagram": "@lakeclarknps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "60.41273",
                  "lng": "-154.3235",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2073e69b-6289-4640-b3f4-331cb831bb44"
              },
              {
                  "iconName": "national park",
                  "title": "Lassen Volcanic National Park",
                  "website": "https://www.nps.gov/lavo/index.htm",
                  "instagram": "@lassennps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "40.49768",
                  "lng": "-121.42065",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "04f3e8a7-e7e8-4740-8a69-a04f619de7d1"
              },
              {
                  "iconName": "national park",
                  "title": "Mesa Verde National Park",
                  "website": "https://www.nps.gov/meve/index.htm",
                  "instagram": "@mesaverdenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.23089",
                  "lng": "-108.46183",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "06d54011-1e4a-4d79-9bd0-830f60061684"
              },
              {
                  "iconName": "national park",
                  "title": "Mount Rainier National Park",
                  "website": "https://www.nps.gov/mora/index.htm",
                  "instagram": "@mountrainiernps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "46.87998",
                  "lng": "-121.72691",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b3c27faf-0ea1-4b6e-bac8-88c2361ac761"
              },
              {
                  "iconName": "national park",
                  "title": "North Cascades National Park",
                  "website": "https://www.nps.gov/noca/index.htm",
                  "instagram": "@ncascadesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "48.77184",
                  "lng": "-121.29846",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0f3ae5f8-668b-4bd7-9681-7e73bb1d77af"
              },
              {
                  "iconName": "national park",
                  "title": "Olympic National Park",
                  "website": "https://www.nps.gov/olym/index.htm",
                  "instagram": "@olympicnationalpark",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "47.80212",
                  "lng": "-123.60435",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2b3a1c0-14b7-42e3-bcd2-2d419e3656f3"
              },
              {
                  "iconName": "national park",
                  "title": "Petrified Forest National Park",
                  "website": "https://www.nps.gov/pefo/index.htm",
                  "instagram": "@petrifiedforestnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "34.91001",
                  "lng": "-109.80679",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4d883b53-d461-4f2f-97aa-cc7a9eee8e01"
              },
              {
                  "iconName": "national park",
                  "title": "Pinnacles National Park",
                  "website": "https://www.nps.gov/pinn/index.htm",
                  "instagram": "@pinnaclesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.47336",
                  "lng": "-121.22454",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "91c07591-8ab8-496b-b0f4-d1aa185604c6"
              },
              {
                  "iconName": "national park",
                  "title": "Redwood National Park",
                  "website": "https://www.nps.gov/redw/index.htm",
                  "instagram": "@redwoodnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.2132",
                  "lng": "-124.00463",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3587fddb-63b7-4cd4-b1aa-2eacecf95452"
              },
              {
                  "iconName": "national park",
                  "title": "Rocky Mountain National Park",
                  "website": "https://www.nps.gov/romo/index.htm",
                  "instagram": "@rockynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "40.34282",
                  "lng": "-105.68364",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "07b2e077-3e46-4c2c-a7c1-6c945254c1f6"
              },
              {
                  "iconName": "national park",
                  "title": "Saguaro National Park",
                  "website": "https://www.nps.gov/sagu/index.htm",
                  "instagram": "@saguaronationalpark",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "32.29676",
                  "lng": "-111.16661",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a1fba333-69a0-4e8f-a952-4bd98e3294b8"
              },
              {
                  "iconName": "national park",
                  "title": "Kings Canyon National Park",
                  "website": "https://www.nps.gov/seki/index.htm",
                  "instagram": "@sequoiakingsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.88788",
                  "lng": "-118.55514",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9ce3d123-f39f-4432-85c8-0152b945ebe9"
              },
              {
                  "iconName": "national park",
                  "title": "Sequoia National Park",
                  "website": "https://www.nps.gov/seki/index.htm",
                  "instagram": "@sequoiakingsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.48638",
                  "lng": "-118.56575",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f2563d00-52c7-4ac7-ae8f-c57e31779f2b"
              },
              {
                  "iconName": "national park",
                  "title": "Shenandoah National Park",
                  "website": "https://www.nps.gov/shen/index.htm",
                  "instagram": "@shenandoahnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.29277",
                  "lng": "-78.67958",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "07c2730b-41dc-45ec-a68f-47dd5c5a1f42"
              },
              {
                  "iconName": "national park",
                  "title": "Theodore Roosevelt National Park",
                  "website": "https://www.nps.gov/thro/index.htm",
                  "instagram": "@theodorerooseveltnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "46.97899",
                  "lng": "-103.53871",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "42f28fbb-0185-4080-8c0b-5cec3a8efa75"
              },
              {
                  "iconName": "national park",
                  "title": "Voyageurs National Park",
                  "website": "https://www.nps.gov/voya/index.htm",
                  "instagram": "@voyageursnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "48.48411",
                  "lng": "-92.82708",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9325d86e-fbc3-470c-bb10-ceed1c4c583f"
              },
              {
                  "iconName": "national park",
                  "title": "Wind Cave National Park",
                  "website": "https://www.nps.gov/wica/index.htm",
                  "instagram": "@windcavenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "43.6046",
                  "lng": "-103.42134",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e13b4f63-1a02-4a0f-9273-bc4ca6bd864a"
              },
              {
                  "iconName": "national park",
                  "title": "Wrangell-St Elias National Park",
                  "website": "https://www.nps.gov/wrst/index.htm",
                  "instagram": "@wrangellstenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "61.71049",
                  "lng": "-142.98568",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cead22e8-ec8a-4b11-851a-a20d83274dcb"
              },
              {
                  "iconName": "national park",
                  "title": "Yellowstone National Park",
                  "website": "https://www.nps.gov/yell/index.htm",
                  "instagram": "@yellowstonenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "44.42797",
                  "lng": "-110.58845",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "277307cc-fbe0-494c-bdac-ea594fc79472"
              },
              {
                  "iconName": "national park",
                  "title": "Yosemite National Park",
                  "website": "https://www.nps.gov/yose/index.htm",
                  "instagram": "@yosemitenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.86511",
                  "lng": "-119.53832",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b38a920b-f657-4230-8ee4-d7ed3c16a4a4"
              },
              {
                  "iconName": "national park",
                  "title": "Zion National Park",
                  "website": "https://www.nps.gov/zion/index.htm",
                  "instagram": "@zionnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.29821",
                  "lng": "-113.0263",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6beebb18-841c-46fe-a8d3-fa79c8d97b14"
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Atelier de Joel Robuchon",
                  "website": "http://www.casinos.lotoquebec.com/en/montreal/explore/restaurants/atelier-de-joel-robuchon",
                  "instagram": "@joelrobuchonmtl",
                  "town": "Montreal",
                  "country": "Canada",
                  "phoneNumber": "514-656-5600",
                  "lat": "45.50541",
                  "lng": "-73.52595",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4aa2e3af-ecb1-485a-b109-e41313b9b718"
              },
              {
                  "iconName": "restaurant",
                  "title": "Jean-Georges",
                  "website": "http://www.jean-georgesrestaurant.com/",
                  "instagram": "@jean_georgesnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-333-1220",
                  "lat": "40.76906",
                  "lng": "-73.98156",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "67eba835-a1c9-461b-94d0-531b202f3b59"
              },
              {
                  "iconName": "restaurant",
                  "title": "Masa",
                  "website": "http://www.masanyc.com/",
                  "instagram": "@chefmasanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-889-0905",
                  "lat": "40.76873",
                  "lng": "-73.98311",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "add28ef2-8977-4e10-8019-ab0a43e85597"
              },
              {
                  "iconName": "restaurant",
                  "title": "Per Se",
                  "website": "https://www.thomaskeller.com/perseny",
                  "instagram": "@perseny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-823-9800",
                  "lat": "40.76849",
                  "lng": "-73.98323",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9c3c9c01-d03e-4649-9089-0b842d0d924d"
              },
              {
                  "iconName": "restaurant",
                  "title": "Union Square Café",
                  "website": "https://www.unionsquarecafe.com/",
                  "instagram": "@unionsquarecafe",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-254-3500",
                  "lat": "40.73773",
                  "lng": "-73.98793",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ad3fac47-fca4-43ac-8db3-e160a645eb47"
              },
              {
                  "iconName": "restaurant",
                  "title": "Eleven Madison Park",
                  "website": "https://www.elevenmadisonpark.com/",
                  "instagram": "@elevenmadisonpark",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-913-9659",
                  "lat": "40.7415",
                  "lng": "-73.98696",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2d92c135-6e77-427f-be5d-c60dc3c5f4d5"
              },
              {
                  "iconName": "restaurant",
                  "title": "Restaurant Guy Savoy",
                  "website": "https://www.guysavoy.com/en/",
                  "instagram": "@guysavoy",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-43-80-40-61",
                  "lat": "48.85669",
                  "lng": "2.33923",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "81c998cf-63a8-418b-8262-43d834fb1663"
              },
              {
                  "iconName": "restaurant",
                  "title": "Piccolo",
                  "website": "https://piccolomaine.com/",
                  "instagram": "@piccolomaine",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-775-6148",
                  "lat": "43.65904",
                  "lng": "-70.25243",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "30507ac3-62d2-4b6f-8bc2-72f76ecc7bca"
              },
              {
                  "iconName": "restaurant",
                  "title": "Myers + Chang",
                  "website": "http://www.myersandchang.com/",
                  "instagram": "@myersandchang",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-566-1401",
                  "lat": "42.34384",
                  "lng": "-71.06632",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "55605c9e-8b3f-45db-bb8f-73f744ab0434"
              },
              {
                  "iconName": "restaurant",
                  "title": "Koko Head Café",
                  "website": "http://www.kokoheadcafe.com/",
                  "instagram": "@kokoheadcafe",
                  "town": "Honolulu",
                  "country": "USA",
                  "phoneNumber": "808-739-8888",
                  "lat": "21.28201",
                  "lng": "-157.79877",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "21096acc-4d0e-4de5-a948-18d95a54b94b"
              },
              {
                  "iconName": "restaurant",
                  "title": "The Araki",
                  "website": "http://www.the-araki.com/",
                  "instagram": "@sushixryu",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7287-2481",
                  "lat": "51.51173",
                  "lng": "-0.14029",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "af68ca6f-79f6-4baa-b8b8-7e92fbf90815"
              },
              {
                  "iconName": "restaurant",
                  "title": "Chef & the Farmer",
                  "website": "http://www.vivianhoward.com/chef-the-farmer/",
                  "instagram": "@chefandthefarmer",
                  "town": "Kinston",
                  "country": "USA",
                  "phoneNumber": "302-684-1000",
                  "lat": "35.26135",
                  "lng": "-77.58214",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "43c2a008-10d3-4c8a-9deb-b82f6cd8b162"
              },
              {
                  "iconName": "restaurant",
                  "title": "Prince's Hot Chicken Shack",
                  "website": "https://princeshotchicken.com/",
                  "instagram": "@princeshotchicken_nashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "615-256-6565",
                  "lat": "36.22998",
                  "lng": "-86.7609",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4d031445-c18f-4c62-a04a-aae0731382e9"
              },
              {
                  "iconName": "restaurant",
                  "title": "The Ledbury",
                  "website": "http://www.theledbury.com/",
                  "instagram": "@theledbury",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7792-9090",
                  "lat": "51.51664",
                  "lng": "-0.20006",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4069c6a1-7c54-4bff-8af5-08351dda6b1c"
              },
              {
                  "iconName": "restaurant",
                  "title": "SingleThread",
                  "website": "https://singlethreadfarms.com/",
                  "instagram": "@singlethreadfarms",
                  "town": "Healdsburg",
                  "country": "USA",
                  "phoneNumber": "707-887-3300",
                  "lat": "38.61223",
                  "lng": "-122.86968",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "84fe9c08-b0ac-42df-87df-8b2c2f5a04b6"
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Atelier de Joel Robuchon",
                  "website": "https://joelrobuchon.co.uk/latelier/",
                  "instagram": "@joelrobuchon_latelierlondon",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7010-8600",
                  "lat": "51.51312",
                  "lng": "-0.12848",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6ff0447f-5465-4366-ad56-941b58cbadd8"
              },
              {
                  "iconName": "restaurant",
                  "title": "Oleana",
                  "website": "https://www.oleanarestaurant.com/",
                  "instagram": "@oleanabuzz",
                  "town": "Cambridge",
                  "country": "USA",
                  "phoneNumber": "617-670-1500",
                  "lat": "42.37054",
                  "lng": "-71.09717",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8bb78e01-6219-4268-b665-60c41b1dcd5e"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Coucou",
                  "website": "https://www.lecoucou.com/",
                  "instagram": "@lecoucou_nyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-288-0033",
                  "lat": "40.71913",
                  "lng": "-74.00025",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dcc2660f-45fe-42bd-bd18-c3f9b78f1280"
              },
              {
                  "iconName": "restaurant",
                  "title": "Rioja",
                  "website": "http://www.riojadenver.com/",
                  "instagram": "@riojadenver",
                  "town": "Denver",
                  "country": "USA",
                  "phoneNumber": "304-574-1998",
                  "lat": "39.74793",
                  "lng": "-104.99946",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8b0a2dce-07a2-41ab-ac91-5ee1d98c095c"
              },
              {
                  "iconName": "restaurant",
                  "title": "The Barn at Blackberry Farm",
                  "website": "http://www.blackberryfarm.com/wine-food/dinner/barn",
                  "instagram": "@blackberryfarm",
                  "town": "Walland",
                  "country": "USA",
                  "phoneNumber": "877-512-2450",
                  "lat": "35.69264",
                  "lng": "-83.86246",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3edfe62e-25a9-4bef-97ef-39d75625d8f7"
              },
              {
                  "iconName": "restaurant",
                  "title": "Amber",
                  "website": "http://www.amberhongkong.com/",
                  "instagram": "@rekkebus",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2132-0066",
                  "lat": "22.2807",
                  "lng": "114.15762",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2657b115-d9dc-48eb-b0d5-a4ce88f62435"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Bernardin",
                  "website": "https://www.le-bernardin.com/",
                  "instagram": "@lebernardinny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-582-5100",
                  "lat": "40.76156",
                  "lng": "-73.9818",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3e4caed6-6664-4e95-84c9-c640a6b04a9e"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Diplomate",
                  "website": "http://www.lediplomatedc.com/",
                  "instagram": "@lediplomatedc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-387-2151",
                  "lat": "38.91135",
                  "lng": "-77.03157",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ac8d9a37-0b5b-4a1a-b480-95bbe7e106e8"
              },
              {
                  "iconName": "restaurant",
                  "title": "Laurel",
                  "website": "http://www.restaurantlaurel.com/",
                  "instagram": "@laurelepx",
                  "town": "Philadelphia",
                  "country": "USA",
                  "phoneNumber": "215-360-5282",
                  "lat": "39.9294",
                  "lng": "-75.16373",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c69107cf-2279-4c92-b6dd-b3f4fc638419"
              },
              {
                  "iconName": "restaurant",
                  "title": "Acadia",
                  "website": "http://www.acadiachicago.com/",
                  "instagram": "@acadiachicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-492-6262",
                  "lat": "41.85903",
                  "lng": "-87.62523",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "97581158-eb7b-436b-b1eb-82e81ee132bc"
              },
              {
                  "iconName": "restaurant",
                  "title": "South Philly Barbacoa",
                  "website": "http://www.southphillybarbacoa.com/",
                  "instagram": "@barbacoachef",
                  "town": "Philadelphia",
                  "country": "USA",
                  "phoneNumber": "215-625-8800",
                  "lat": "39.93493",
                  "lng": "-75.15856",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "15cd958a-205d-4ea7-a0ca-98561d89f359"
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Noodle Bar",
                  "website": "https://noodlebar-ny.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-780-0880",
                  "lat": "40.72921",
                  "lng": "-73.9845",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8f78d0d6-9db6-47fe-81e7-6ef15090006f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Alinea",
                  "website": "http://www.alinearestaurant.com/",
                  "instagram": "@thealineagroup",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-877-5339",
                  "lat": "41.91344",
                  "lng": "-87.64816",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "657ff556-91fb-4fd5-bd30-dba3c9ef5245"
              },
              {
                  "iconName": "restaurant",
                  "title": "Boka",
                  "website": "http://www.bokachicago.com/",
                  "instagram": "@bokachicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-360-9500",
                  "lat": "41.91359",
                  "lng": "-87.64825",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f569252d-b98e-44be-a886-b23bbb19ac81"
              },
              {
                  "iconName": "restaurant",
                  "title": "Frasca Food & Wine",
                  "website": "http://www.frascafoodandwine.com/",
                  "instagram": "@frascafoodwine",
                  "town": "Boulder",
                  "country": "USA",
                  "phoneNumber": "303-444-5500",
                  "lat": "40.0192",
                  "lng": "-105.27247",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ace37c3d-209c-43b6-bb93-369f94437f62"
              },
              {
                  "iconName": "restaurant",
                  "title": "Flocons de Sel",
                  "website": "http://www.floconsdesel.com/en/",
                  "instagram": "@floconsdesel",
                  "town": "Megeve",
                  "country": "France",
                  "phoneNumber": "33-04-50-21-49-99",
                  "lat": "45.8304",
                  "lng": "6.59693",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1f6a2c25-af3b-4723-a27d-618385d1279a"
              },
              {
                  "iconName": "restaurant",
                  "title": "Saison",
                  "website": "https://www.saisonsf.com/",
                  "instagram": "@saisonsf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "416-599-7646",
                  "lat": "37.77952",
                  "lng": "-122.39226",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e6a66661-a5e1-450d-a01e-803dd121f1eb"
              },
              {
                  "iconName": "restaurant",
                  "title": "Regis et Jacques Marcon",
                  "website": "http://www.regismarcon.fr/restaurant-regis-et-jacques-marcon-ec1",
                  "instagram": "@regis_jacques_marcon",
                  "town": "Saint-Bonnet-le-Froid",
                  "country": "France",
                  "phoneNumber": "33-04-71-59-93-72",
                  "lat": "45.13886",
                  "lng": "4.43331",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a407e9f1-9408-4e8a-a65f-820b01e9d260"
              },
              {
                  "iconName": "restaurant",
                  "title": "Rech",
                  "website": "https://hongkong-ic.intercontinental.com/en/dining/rech-by-alain-ducasse/",
                  "instagram": "@alainducasse",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2313-2323",
                  "lat": "22.2936",
                  "lng": "114.17391",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "91a5223c-ccea-41c5-a88e-28b3dee276f7"
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Atelier de Joel Robuchon",
                  "website": "http://www.joelrobuchon-china.com/index.php?c=content&a=list&catid=55",
                  "instagram": "@joel.robuchon",
                  "town": "Huangpu",
                  "country": "China",
                  "phoneNumber": "86-21-6070-8888",
                  "lat": "31.23111",
                  "lng": "121.49042",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7db4cef0-96db-4b2f-b259-792cf40b054d"
              },
              {
                  "iconName": "restaurant",
                  "title": "Ultraviolet",
                  "website": "https://uvbypp.cc/",
                  "instagram": "@uvbypp",
                  "town": "Huangpu",
                  "country": "China",
                  "phoneNumber": "86-21-6323-9898",
                  "lat": "31.23061",
                  "lng": "121.49057",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "13bb18f3-c504-4d7c-9e34-b5e24a8ea1dc"
              },
              {
                  "iconName": "restaurant",
                  "title": "Daisho",
                  "website": "https://daisho.momofuku.com/",
                  "instagram": "@momofukutoronto",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "647-253-8000",
                  "lat": "43.64941",
                  "lng": "-79.38663",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e791b46e-c5e5-40c7-81d2-28e2ff8804c7"
              },
              {
                  "iconName": "restaurant",
                  "title": "Shoto",
                  "website": "https://shoto.momofuku.com/",
                  "instagram": "@momofukutoronto",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "650-561-1500",
                  "lat": "43.64943",
                  "lng": "-79.38654",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "71c9022f-14f3-4c36-bcb0-4495055e9702"
              },
              {
                  "iconName": "restaurant",
                  "title": "Black Cat",
                  "website": "http://www.blackcatboulder.com/",
                  "instagram": "@blackcatboulder",
                  "town": "Boulder",
                  "country": "USA",
                  "phoneNumber": "303-820-2282",
                  "lat": "40.01785",
                  "lng": "-105.27838",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "14a22750-7387-458f-9d86-755ef637c077"
              },
              {
                  "iconName": "restaurant",
                  "title": "Jungsik",
                  "website": "http://www.jungsik.com/",
                  "instagram": "@jungsik_inc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-219-7693",
                  "lat": "40.71882",
                  "lng": "-74.00907",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0571efff-9dae-4052-b43e-a911c8eed316"
              },
              {
                  "iconName": "restaurant",
                  "title": "Primo",
                  "website": "http://www.primorestaurant.com/",
                  "instagram": "@primorestaurant",
                  "town": "Rockland",
                  "country": "USA",
                  "phoneNumber": "207-602-1561",
                  "lat": "44.08987",
                  "lng": "-69.11053",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "661de538-90b1-42c6-bbb1-9e7f897cf6f1"
              },
              {
                  "iconName": "restaurant",
                  "title": "McCrady's",
                  "website": "http://www.mccradysrestaurant.com/home-page/",
                  "instagram": "@mccradys",
                  "town": "Charleston",
                  "country": "USA",
                  "phoneNumber": "843-706-6500",
                  "lat": "32.77825",
                  "lng": "-79.92719",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "619bf1c3-2777-4692-b660-a1f4393cd1ee"
              },
              {
                  "iconName": "restaurant",
                  "title": "Highlands Bar & Grill",
                  "website": "https://highlandsbarandgrill.com/",
                  "instagram": "@highlandsbarandgrill",
                  "town": "Birmingham",
                  "country": "USA",
                  "phoneNumber": "206-283-3313",
                  "lat": "33.50057",
                  "lng": "-86.79549",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "97f3dd39-61b9-469e-8f15-2f3264d4139e"
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Ssam Bar",
                  "website": "https://ssambar.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-271-4252",
                  "lat": "40.73167",
                  "lng": "-73.98584",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "5d95a500-35a0-48ed-ac6b-11d0770fd412"
              },
              {
                  "iconName": "restaurant",
                  "title": "Benu",
                  "website": "https://www.benusf.com/",
                  "instagram": "@clee_benu",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-750-3600",
                  "lat": "37.78544",
                  "lng": "-122.39903",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "572fbfb9-3823-4ac7-83c5-a1bb16b6a65f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Den",
                  "website": "http://www.jimbochoden.com/en/",
                  "instagram": "@zaiyuhasegawa",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-364-55-5433",
                  "lat": "35.67317",
                  "lng": "139.71272",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c9697472-5937-4c47-84cc-202ba423436c"
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Nishi",
                  "website": "https://nishi.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "646-664-0310",
                  "lat": "40.74433",
                  "lng": "-73.9988",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "22a77129-51f4-4129-992c-0944622815a7"
              },
              {
                  "iconName": "restaurant",
                  "title": "Zahav",
                  "website": "http://www.zahavrestaurant.com/",
                  "instagram": "@zahavrestaurant",
                  "town": "Philadelphia",
                  "country": "USA",
                  "phoneNumber": "216-239-1200",
                  "lat": "39.9462",
                  "lng": "-75.14526",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "98ca319d-eae8-4f81-813f-98afbaf5ce84"
              },
              {
                  "iconName": "restaurant",
                  "title": "Marea",
                  "website": "http://www.marea-nyc.com/",
                  "instagram": "@mareanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-627-9800",
                  "lat": "40.76739",
                  "lng": "-73.98084",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cb3b554c-ab7b-40d0-9dd4-99539d03490f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Alain Ducasse au Plaza Athenee",
                  "website": "https://www.alainducasse-plazaathenee.com/en",
                  "instagram": "@alainducasse",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-53-67-65-00",
                  "lat": "48.86619",
                  "lng": "2.30421",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2f8f619-0815-4e12-80e3-c02d816618fd"
              },
              {
                  "iconName": "restaurant",
                  "title": "No Anchor",
                  "website": "https://www.noanchorbar.com/",
                  "instagram": "@noanchorbar",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-448-4721",
                  "lat": "47.61549",
                  "lng": "-122.34858",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ae1796fc-df8f-48dc-a136-07359528e029"
              },
              {
                  "iconName": "restaurant",
                  "title": "Florilege",
                  "website": "http://www.aoyama-florilege.jp/en/",
                  "instagram": "@restaurant_florilege",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-364-40-0878",
                  "lat": "35.67234",
                  "lng": "139.71355",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b9ce3d97-b658-4d92-9895-aee9b197012c"
              },
              {
                  "iconName": "restaurant",
                  "title": "Canlis",
                  "website": "https://canlis.com/",
                  "instagram": "@canlisrestaurant",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-448-2610",
                  "lat": "47.64308",
                  "lng": "-122.34675",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f4cb78fc-8e96-4c9d-92a0-e955befeec51"
              },
              {
                  "iconName": "restaurant",
                  "title": "St John",
                  "website": "https://stjohnrestaurant.com/",
                  "instagram": "@st.john.restaurant",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7251-0848",
                  "lat": "51.52044",
                  "lng": "-0.10142",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6810cf59-9a97-4da4-bfc2-c9100e6e6eb9"
              },
              {
                  "iconName": "restaurant",
                  "title": "Blanca",
                  "website": "http://www.blancanyc.com/",
                  "instagram": "@eatblanca",
                  "town": "Brooklyn",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "40.70507",
                  "lng": "-73.93354",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "eca08e84-1e4d-4e14-937c-6f89f69a64eb"
              },
              {
                  "iconName": "restaurant",
                  "title": "North Pond",
                  "website": "http://www.northpondrestaurant.com/",
                  "instagram": "@northpondchi",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "773-681-0651",
                  "lat": "41.92985",
                  "lng": "-87.63746",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6f6e4604-41fd-4a7e-bb8e-2586146e1143"
              },
              {
                  "iconName": "restaurant",
                  "title": "Pic",
                  "website": "https://www.anne-sophie-pic.com/en/content/anne-sophie-pic-restaurant",
                  "instagram": "@annesophiepic",
                  "town": "Valence",
                  "country": "France",
                  "phoneNumber": "33-04-75-44-15-32",
                  "lat": "44.91775",
                  "lng": "4.88559",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "39167549-9e27-41de-8384-b3a268a94186"
              },
              {
                  "iconName": "restaurant",
                  "title": "Matador Room",
                  "website": "http://www.matadorroom.com/",
                  "instagram": "@matadorroom",
                  "town": "Miami",
                  "country": "USA",
                  "phoneNumber": "786-507-7900",
                  "lat": "25.80561",
                  "lng": "-80.1242",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "479af092-b276-4e3a-96d0-48e662599f29"
              },
              {
                  "iconName": "restaurant",
                  "title": "Jean-Georges",
                  "website": "http://www.threeonthebund.com/dining.php?concept_id=1",
                  "instagram": "@chefjgv",
                  "town": "Huangpu",
                  "country": "China",
                  "phoneNumber": "86-21-6321-7733",
                  "lat": "31.23607",
                  "lng": "121.48658",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f1a13a9e-7097-4cb4-b104-28c5eb8a4710"
              },
              {
                  "iconName": "restaurant",
                  "title": "Mercato",
                  "website": "http://www.threeonthebund.com/dining.php?concept_id=3",
                  "instagram": "@chefjgv",
                  "town": "Huangpu",
                  "country": "China",
                  "phoneNumber": "86-21-6321-9922",
                  "lat": "31.23615",
                  "lng": "121.4864",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8d7b8fab-602d-43e1-8d74-4b117b978b6d"
              },
              {
                  "iconName": "restaurant",
                  "title": "Mirazur",
                  "website": "http://www.mirazur.fr/",
                  "instagram": "@restaurantmirazur",
                  "town": "Menton",
                  "country": "France",
                  "phoneNumber": "33-04-92-41-86-86",
                  "lat": "43.78589",
                  "lng": "7.52798",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b46a2989-42b9-4b27-afe1-4559440ef7d9"
              },
              {
                  "iconName": "restaurant",
                  "title": "Atelier Crenn",
                  "website": "https://www.ateliercrenn.com/",
                  "instagram": "@atelier.crenn",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-581-3500",
                  "lat": "37.79833",
                  "lng": "-122.43594",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fba18228-6b0d-490b-bf81-a44cf4f865f5"
              },
              {
                  "iconName": "restaurant",
                  "title": "Mercato",
                  "website": "http://www.mercato-international.com/en/locations.php?aid=38",
                  "instagram": "@mercato_hongkong",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-3706-8567",
                  "lat": "22.28079",
                  "lng": "114.15555",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "54de979c-1573-4e8b-990a-b80226066ca5"
              },
              {
                  "iconName": "restaurant",
                  "title": "Manresa",
                  "website": "https://www.manresarestaurant.com/",
                  "instagram": "@manresaca",
                  "town": "Los Gatos",
                  "country": "USA",
                  "phoneNumber": "408-695-4500",
                  "lat": "37.22736",
                  "lng": "-121.98083",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b4b60e40-7c04-4db6-bd30-e318545faa09"
              },
              {
                  "iconName": "restaurant",
                  "title": "ABC Kitchen",
                  "website": "https://www.abchome.com/dine/abc-kitchen/",
                  "instagram": "@abckitchen",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-554-1515",
                  "lat": "40.73773",
                  "lng": "-73.98961",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "daedea11-8240-4dfc-813d-65424e46f4ca"
              },
              {
                  "iconName": "restaurant",
                  "title": "Cosme",
                  "website": "http://www.cosmenyc.com/#",
                  "instagram": "@cosmenyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-924-9700",
                  "lat": "40.73961",
                  "lng": "-73.98835",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "395eefbe-ae9b-40e9-9bb0-9d93b2c0782a"
              },
              {
                  "iconName": "restaurant",
                  "title": "Hyotei",
                  "website": "http://www.hyotei.co.jp/en/",
                  "instagram": "@hyoteiyoshihiro",
                  "town": "Kyoto",
                  "country": "Japan",
                  "phoneNumber": "81-757-71-4116",
                  "lat": "35.01134",
                  "lng": "135.7865",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f8839691-b6ce-4590-ad7b-845aa014ebb5"
              },
              {
                  "iconName": "restaurant",
                  "title": "Menton",
                  "website": "http://www.mentonboston.com/",
                  "instagram": "@mentonboston",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-742-9991",
                  "lat": "42.3505",
                  "lng": "-71.04821",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "331eafbd-a159-4e5d-82cf-e9805d69531c"
              },
              {
                  "iconName": "restaurant",
                  "title": "Maison Lameloise",
                  "website": "http://www.lameloise.fr/en/restaurant-lameloise/",
                  "instagram": "@maisonlameloise",
                  "town": "Chagny-en-Bourgogne",
                  "country": "France",
                  "phoneNumber": "33-03-85-87-65-65",
                  "lat": "46.90793",
                  "lng": "4.753",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "83babbcb-a7f7-4990-ac1b-52f2a4dd444f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Husk",
                  "website": "http://www.husknashville.com/",
                  "instagram": "@husknashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "615-262-6000",
                  "lat": "36.15529",
                  "lng": "-86.76986",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ad862e90-6a5b-4825-b3aa-296ec7f82505"
              },
              {
                  "iconName": "restaurant",
                  "title": "Coi",
                  "website": "http://www.coirestaurant.com/",
                  "instagram": "@coirestaurant",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-440-0460",
                  "lat": "37.79806",
                  "lng": "-122.40342",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4821c03c-c17a-49c4-b715-a5215f0905a3"
              },
              {
                  "iconName": "restaurant",
                  "title": "The Test Kitchen",
                  "website": "http://www.thetestkitchen.co.za/home/",
                  "instagram": "@thetestkitchen",
                  "town": "Woodstock",
                  "country": "South Africa",
                  "phoneNumber": "27-21-447-2337",
                  "lat": "-33.92753",
                  "lng": "18.45714",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0d513a72-1da9-4cb7-912f-bfa5d43906fa"
              },
              {
                  "iconName": "restaurant",
                  "title": "ABCV",
                  "website": "http://www.abchome.com/dine/abcv/",
                  "instagram": "@abcvnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-5829",
                  "lat": "40.73809",
                  "lng": "-73.98929",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e1b39763-ebce-4494-a771-8570ca59aed0"
              },
              {
                  "iconName": "restaurant",
                  "title": "ABC Cocina",
                  "website": "https://www.abchome.com/dine/abc-cocina/",
                  "instagram": "@abccocina",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-5829",
                  "lat": "40.73797",
                  "lng": "-73.98928",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2c9bc5a-ab6c-4a61-9a39-c3c4a7dae6cd"
              },
              {
                  "iconName": "restaurant",
                  "title": "Joel Robuchon, Monte-Carlo",
                  "website": "http://www.metropole.com/en/restaurant-montecarlo/joel-robuchon",
                  "instagram": "@joel.robuchon",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-93-15-15-15",
                  "lat": "43.74107",
                  "lng": "7.42794",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2d2b268f-f0b4-4950-8866-291f408fc00c"
              },
              {
                  "iconName": "restaurant",
                  "title": "Odyssey",
                  "website": "http://www.metropole.com/en/restaurant-montecarlo/piscine",
                  "instagram": "@joel.robuchon",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-93-15-15-15",
                  "lat": "43.74083",
                  "lng": "7.42835",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2ef1982c-0b18-4cfb-836c-d3f36eaebc6f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Yoshi",
                  "website": "http://www.metropole.com/en/restaurant-montecarlo/yoshi#",
                  "instagram": "@joel.robuchon",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-93-15-15-15",
                  "lat": "43.74077",
                  "lng": "7.42798",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cb1b4417-02c3-43c6-b052-e1cbaf64a75a"
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Assiette Champenoise",
                  "website": "https://www.assiettechampenoise.com/en/restaurant/",
                  "instagram": "@lallement_arnaud",
                  "town": "Tinqueux",
                  "country": "France",
                  "phoneNumber": "33-03-26-84-64-64",
                  "lat": "49.24766",
                  "lng": "4.0038",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "42621ce9-37fe-4ce0-9f71-8aa43a3d6715"
              },
              {
                  "iconName": "restaurant",
                  "title": "Sukiyabashi Jiro",
                  "website": "https://www.sushi-jiro.jp/dining-at-jiro/",
                  "instagram": "@jiro_dreams",
                  "town": "Tokyo",
                  "country": "Japan",
                  "phoneNumber": "81-335-35-3600",
                  "lat": "35.67272",
                  "lng": "139.76393",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "146622d3-66de-41a8-bc1b-66c43ff978c6"
              },
              {
                  "iconName": "restaurant",
                  "title": "Brae",
                  "website": "https://braerestaurant.com/",
                  "instagram": "@braerestaurant",
                  "town": "Birregurra",
                  "country": "Australia",
                  "phoneNumber": "61-3-5236-2226",
                  "lat": "-38.34694",
                  "lng": "143.80721",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ca667fa2-37db-4534-820e-0978703f48b0"
              },
              {
                  "iconName": "restaurant",
                  "title": "Craft",
                  "website": "https://www.craftrestaurant.com/",
                  "instagram": "@craft_newyork",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-796-1500",
                  "lat": "40.73816",
                  "lng": "-73.98866",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "244aba83-078a-41df-a245-579811344755"
              },
              {
                  "iconName": "restaurant",
                  "title": "Animal",
                  "website": "http://www.animalrestaurant.com/",
                  "instagram": "@jonandvinnydelivery",
                  "town": "Los Angeles",
                  "country": "USA",
                  "phoneNumber": "347-335-0446",
                  "lat": "34.07921",
                  "lng": "-118.36177",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e9b7884c-3f14-469a-9ed4-965a9019ec59"
              },
              {
                  "iconName": "restaurant",
                  "title": "Estela",
                  "website": "https://www.estelanyc.com/",
                  "instagram": "@estelanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-243-4020",
                  "lat": "40.72463",
                  "lng": "-73.99474",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6c4538d8-a174-498f-9e1f-dd0095b8d03f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Quince",
                  "website": "http://www.quincerestaurant.com/",
                  "instagram": "@quince_sf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-828-7990",
                  "lat": "37.79757",
                  "lng": "-122.40338",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "38d0758c-386d-4171-a818-4a0887c3def8"
              },
              {
                  "iconName": "restaurant",
                  "title": "Elizabeth",
                  "website": "http://www.elizabeth-restaurant.com/",
                  "instagram": "@elizabethrestaurant_and_co",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "775-586-7000",
                  "lat": "41.96956",
                  "lng": "-87.68859",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a5a77cb7-4ebc-44b6-add5-cc7419ab4ed1"
              },
              {
                  "iconName": "restaurant",
                  "title": "Alain Ducasse at the Dorchester",
                  "website": "http://www.alainducasse-dorchester.com/",
                  "instagram": "@alainducasse",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7629-8866",
                  "lat": "51.50729",
                  "lng": "-0.15234",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a6cfa8f4-6b55-4880-ab4b-b1770139b59a"
              },
              {
                  "iconName": "restaurant",
                  "title": "Compere Lapin",
                  "website": "http://www.comperelapin.com/",
                  "instagram": "@comperelapin",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-900-1180",
                  "lat": "29.94787",
                  "lng": "-90.06737",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8ae1bcd3-ecc8-4993-b742-911f784bdb76"
              },
              {
                  "iconName": "restaurant",
                  "title": "Beast",
                  "website": "http://www.beastpdx.com/info/",
                  "instagram": "@naomipomeroy",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "504-218-7428",
                  "lat": "45.56239",
                  "lng": "-122.63509",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "735c7184-1b45-4445-8ec5-986ff9fa1e53"
              },
              {
                  "iconName": "restaurant",
                  "title": "Drifters Wife",
                  "website": "http://www.drifterswife.com/",
                  "instagram": "@drifterswife",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-808-8258",
                  "lat": "43.66553",
                  "lng": "-70.2516",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f16c5ece-8943-47ee-b06f-80509e80a2f3"
              },
              {
                  "iconName": "restaurant",
                  "title": "Daniel",
                  "website": "https://www.danielnyc.com/",
                  "instagram": "@restaurantdaniel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-288-3700",
                  "lat": "40.76677",
                  "lng": "-73.9676",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "083b1703-3aee-4fdb-8c6b-bcadce5fdeca"
              },
              {
                  "iconName": "restaurant",
                  "title": "Benoit",
                  "website": "https://www.benoitny.com/",
                  "instagram": "@benoitny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "617-224-4000",
                  "lat": "40.76252",
                  "lng": "-73.97727",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "95e363ab-fa00-4996-9aea-dc5a22098c19"
              },
              {
                  "iconName": "restaurant",
                  "title": "Café Boulud",
                  "website": "https://www.cafeboulud.com/toronto/",
                  "instagram": "@cafebouludto",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "418-692-2211",
                  "lat": "43.67171",
                  "lng": "-79.38991",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c67a0ecc-2319-403a-9f1a-044aac36fc3c"
              },
              {
                  "iconName": "restaurant",
                  "title": "610 Magnolia",
                  "website": "https://610magnolia.com/",
                  "instagram": "@chefedwardlee",
                  "town": "Louisville",
                  "country": "USA",
                  "phoneNumber": "503-841-6968",
                  "lat": "38.22935",
                  "lng": "-85.76544",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "993929b6-3d93-43e6-ba28-bf26409fd695"
              },
              {
                  "iconName": "restaurant",
                  "title": "Blackbird",
                  "website": "http://www.blackbirdrestaurant.com/",
                  "instagram": "@blackbirdchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-867-0110",
                  "lat": "41.8843",
                  "lng": "-87.64355",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "00dbcfbd-b3ed-4a40-b30a-550f5077bb17"
              },
              {
                  "iconName": "restaurant",
                  "title": "Pizzeria Bianco",
                  "website": "http://www.pizzeriabianco.com/welcome",
                  "instagram": "@pizzeriabianco",
                  "town": "Phoenix",
                  "country": "USA",
                  "phoneNumber": "604-233-0460",
                  "lat": "33.44915",
                  "lng": "-112.06563",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4a41d8f8-6243-4ca4-b4b8-16f03e7abf0a"
              },
              {
                  "iconName": "restaurant",
                  "title": "Blue Hill at Stone Barns",
                  "website": "https://www.bluehillfarm.com/dine/stone-barns",
                  "instagram": "@bluehillfarm",
                  "town": "Pocantico Hills",
                  "country": "USA",
                  "phoneNumber": "949-715-6000",
                  "lat": "41.104",
                  "lng": "-73.82895",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "02ab08ae-a7f6-4780-bf84-88bfc4f611b4"
              },
              {
                  "iconName": "restaurant",
                  "title": "Ad Hoc",
                  "website": "https://www.thomaskeller.com/adhoc",
                  "instagram": "@adhoc_addendum",
                  "town": "Yountville",
                  "country": "USA",
                  "phoneNumber": "707-944-2861",
                  "lat": "38.39916",
                  "lng": "-122.35861",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9ee9e13f-5879-4266-a9ba-9f5c8ead12c1"
              },
              {
                  "iconName": "restaurant",
                  "title": "Olmsted",
                  "website": "http://www.olmstednyc.com/",
                  "instagram": "@olmstednyc",
                  "town": "Brooklyn",
                  "country": "USA",
                  "phoneNumber": "760-294-7866",
                  "lat": "40.67703",
                  "lng": "-73.96867",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ac6910a9-7eca-4ce9-bb4f-217abea64920"
              },
              {
                  "iconName": "restaurant",
                  "title": "Dinner by Heston Blumenthal",
                  "website": "http://www.dinnerbyheston.co.uk/",
                  "instagram": "@dinnerbyhb",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7201-3833",
                  "lat": "51.50215",
                  "lng": "-0.15996",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d60658ac-7ac2-43cb-be67-4d3c0cd62867"
              },
              {
                  "iconName": "restaurant",
                  "title": "Osteria Mozza",
                  "website": "http://www.la.osteriamozza.com/",
                  "instagram": "@osteriamozza",
                  "town": "Los Angeles",
                  "country": "USA",
                  "phoneNumber": "323-782-9225",
                  "lat": "34.08326",
                  "lng": "-118.33893",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dc719dee-8fd3-4c4c-b645-9f6f26a285ca"
              },
              {
                  "iconName": "restaurant",
                  "title": "Oriole",
                  "website": "http://www.oriolechicago.com/",
                  "instagram": "@oriolechi",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-923-9988",
                  "lat": "41.88613",
                  "lng": "-87.64507",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7b761262-69bf-4e41-9d4a-fe515b8f19ae"
              },
              {
                  "iconName": "restaurant",
                  "title": "The French Laundry",
                  "website": "https://www.thomaskeller.com/tfl",
                  "instagram": "@_tfl_",
                  "town": "Yountville",
                  "country": "USA",
                  "phoneNumber": "707-944-2487",
                  "lat": "38.40441",
                  "lng": "-122.36497",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0ba7b1f2-08ff-4ba4-9e63-d1fc74910510"
              },
              {
                  "iconName": "restaurant",
                  "title": "Restaurant Gordon Ramsay",
                  "website": "https://www.gordonramsayrestaurants.com/restaurant-gordon-ramsay/",
                  "instagram": "@gordonramsayrestaurants",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-020-7352-4441",
                  "lat": "51.48542",
                  "lng": "-0.16214",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ace5b932-e6d7-4143-8e72-f60174ca3738"
              },
              {
                  "iconName": "restaurant",
                  "title": "Gaggan",
                  "website": "http://www.eatatgaggan.com/",
                  "instagram": "@gaggan_anand",
                  "town": "Bangkok",
                  "country": "Thailand",
                  "phoneNumber": "66-26-521-700",
                  "lat": "13.7377",
                  "lng": "100.54243",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b4a3d318-b676-4aaf-be1c-b8cdee25948a"
              },
              {
                  "iconName": "restaurant",
                  "title": "La Maison Troisgros",
                  "website": "http://www.troisgros.com/page_troisgros_le-restaurant",
                  "instagram": "@maisontroisgros",
                  "town": "Ouches",
                  "country": "France",
                  "phoneNumber": "33-04-77-71-66-97",
                  "lat": "46.00969",
                  "lng": "3.99194",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0ccbaa41-30ef-4e9c-a1d7-a262402a8c60"
              },
              {
                  "iconName": "restaurant",
                  "title": "Turkey & the Wolf",
                  "website": "http://www.turkeyandthewolf.com/",
                  "instagram": "@turkeyandthewolf",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-302-2357",
                  "lat": "29.92717",
                  "lng": "-90.07433",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d9cb2f41-d171-45f1-ae61-af74f9fb6bba"
              },
              {
                  "iconName": "restaurant",
                  "title": "Attica",
                  "website": "http://www.attica.com.au/#!home",
                  "instagram": "@atticamelbourne",
                  "town": "Ripponlea",
                  "country": "Australia",
                  "phoneNumber": "61-3-9530-0111",
                  "lat": "-37.87701",
                  "lng": "144.9973",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f98b26d9-9891-4f83-ab6c-9318c32d5f9b"
              },
              {
                  "iconName": "restaurant",
                  "title": "Barbuto",
                  "website": "http://www.barbutonyc.com/index.php",
                  "instagram": "@barbutonyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-956-2888",
                  "lat": "40.7377",
                  "lng": "-74.00805",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4f4b20ae-6585-44e4-9766-be1946899035"
              },
              {
                  "iconName": "restaurant",
                  "title": "Alleno Paris au Pavillon Ledoyen",
                  "website": "http://www.yannick-alleno.com/en/restaurants-reservation/alleno/restaurant-3-etoiles-paris.html",
                  "instagram": "@yannickalleno",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-53-05-10-00",
                  "lat": "48.86608",
                  "lng": "2.31645",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "785bb824-f6e6-418e-970f-30b236380cd2"
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Ko",
                  "website": "https://ko.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-219-0900",
                  "lat": "40.7248",
                  "lng": "-73.99136",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e155b0db-b97a-4146-97c0-67fe98b7e0d2"
              },
              {
                  "iconName": "restaurant",
                  "title": "Maple & Ash",
                  "website": "https://www.mapleandash.com/",
                  "instagram": "@mapleandash",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "313-833-7900",
                  "lat": "41.90207",
                  "lng": "-87.62875",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "fedbe69f-c1cb-4113-b42a-242168b800d3"
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Seiobo",
                  "website": "https://seiobo.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "Sydney",
                  "country": "Australia",
                  "phoneNumber": "61-2-9657-9169",
                  "lat": "-33.86958",
                  "lng": "151.19591",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "92872eed-f36a-40f9-8a96-752b39a532a2"
              },
              {
                  "iconName": "restaurant",
                  "title": "Septime",
                  "website": "http://www.septime-charonne.fr/en/",
                  "instagram": "@septimeparis",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-43-67-38-29",
                  "lat": "48.85356",
                  "lng": "2.38072",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "02bf3409-6197-46c9-9633-f18143c35bc9"
              },
              {
                  "iconName": "restaurant",
                  "title": "Girl & the Goat",
                  "website": "http://www.girlandthegoat.com/",
                  "instagram": "@stephanieizard",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-521-8000",
                  "lat": "41.8841",
                  "lng": "-87.64797",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7cffe3f3-ace3-48a3-84f8-4784732a9db6"
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Arpege",
                  "website": "http://www.alain-passard.com/en/",
                  "instagram": "@alain_passard",
                  "town": "Paris",
                  "country": "France",
                  "phoneNumber": "33-01-47-05-09-06",
                  "lat": "48.85574",
                  "lng": "2.31698",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2644e3b4-5460-4211-9574-26c0371dfaac"
              },
              {
                  "iconName": "restaurant",
                  "title": "minibar by Jose Andres",
                  "website": "https://www.minibarbyjoseandres.com/minibar/",
                  "instagram": "@minibarbyjose",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-617-2400",
                  "lat": "38.89635",
                  "lng": "-77.0236",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f83a7c69-8016-4a83-ba3a-807f9b10f68e"
              },
              {
                  "iconName": "restaurant",
                  "title": "No 9 Park",
                  "website": "http://www.no9park.com/",
                  "instagram": "@no9park",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "646-518-1919",
                  "lat": "42.35758",
                  "lng": "-71.06283",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f11198d1-a850-4dc5-9491-15a8b4fdc4f7"
              },
              {
                  "iconName": "restaurant",
                  "title": "The Modern",
                  "website": "https://www.themodernnyc.com/",
                  "instagram": "@themodernnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-432-1818",
                  "lat": "40.76107",
                  "lng": "-73.97675",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bc595b97-5e40-4399-9f2c-81f0db676e03"
              },
              {
                  "iconName": "restaurant",
                  "title": "Franklin Barbecue",
                  "website": "https://franklinbbq.com/",
                  "instagram": "@franklinbbq",
                  "town": "Austin",
                  "country": "USA",
                  "phoneNumber": "514-285-2000",
                  "lat": "30.27013",
                  "lng": "-97.73127",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "478ccdce-efa7-4183-aeb4-f299e82113b3"
              },
              {
                  "iconName": "restaurant",
                  "title": "Next",
                  "website": "https://www.nextrestaurant.com/",
                  "instagram": "@thealineagroup",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.88661",
                  "lng": "-87.65198",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "588b61b2-4873-4570-ad9f-d8a2b0eb6932"
              },
              {
                  "iconName": "restaurant",
                  "title": "Mugaritz",
                  "website": "https://www.mugaritz.com/en/",
                  "instagram": "@mugaritz",
                  "town": "Errenteria",
                  "country": "Spain",
                  "phoneNumber": "34-943-522-455",
                  "lat": "43.27228",
                  "lng": "-1.91713",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0e3ec8ae-56d2-4d98-86be-5ae7fd7041f4"
              },
              {
                  "iconName": "restaurant",
                  "title": "Nerua",
                  "website": "http://www.neruaguggenheimbilbao.com/en/",
                  "instagram": "@neruaguggenheimbilbao",
                  "town": "Bilbao",
                  "country": "Spain",
                  "phoneNumber": "34-944-000-430",
                  "lat": "43.2689",
                  "lng": "-2.93265",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "519c154f-98b6-435d-a8e6-4ad867424a35"
              },
              {
                  "iconName": "restaurant",
                  "title": "Arzak",
                  "website": "https://www.arzak.es/en/",
                  "instagram": "@arzakrestaurant",
                  "town": "San Sebastian",
                  "country": "Spain",
                  "phoneNumber": "34-943-278-465",
                  "lat": "43.32144",
                  "lng": "-1.94936",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1c61f68b-be56-4dc7-86af-4715735a8116"
              },
              {
                  "iconName": "restaurant",
                  "title": "Astrid y Gaston",
                  "website": "http://www.en.astridygaston.com/",
                  "instagram": "@astrid_y_gaston",
                  "town": "San Isidro",
                  "country": "Peru",
                  "phoneNumber": "51-1-442-2777",
                  "lat": "-12.09657",
                  "lng": "-77.03495",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "79dd8925-4e75-44c6-a018-335bfec14e91"
              },
              {
                  "iconName": "restaurant",
                  "title": "ABaC",
                  "website": "http://www.abacbarcelona.com/en/restaurant",
                  "instagram": "@abachotelrestaurant",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-933-196-600",
                  "lat": "41.41069",
                  "lng": "2.13629",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ab46d4fb-f8b2-49b7-9e3e-f4c5f386f6fe"
              },
              {
                  "iconName": "restaurant",
                  "title": "Tickets",
                  "website": "http://www.ticketsbar.es/en",
                  "instagram": "@ticketsbar",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-932-924-252",
                  "lat": "41.3752",
                  "lng": "2.15684",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "443f67b5-6e49-48fa-87a7-654df9b188bd"
              },
              {
                  "iconName": "restaurant",
                  "title": "Azurmendi",
                  "website": "https://azurmendi.restaurant/en/",
                  "instagram": "@azurmendi_atxa",
                  "town": "Larrabetzu",
                  "country": "Spain",
                  "phoneNumber": "34-944-558-359",
                  "lat": "43.26052",
                  "lng": "-2.81605",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cfe77a68-6af7-41eb-b297-14c166d18d98"
              },
              {
                  "iconName": "restaurant",
                  "title": "Lasarte",
                  "website": "https://www.restaurantlasarte.com/en/home-1/",
                  "instagram": "@lasartebcn",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-934-453-242",
                  "lat": "41.39357",
                  "lng": "2.16202",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "50bcbc4f-048d-48b7-9fbd-83dbdc47d730"
              },
              {
                  "iconName": "restaurant",
                  "title": "DiverXO",
                  "website": "http://www.diverxo.com/en/",
                  "instagram": "@cf_dabiz_diverxo_oficial",
                  "town": "Madrid",
                  "country": "Spain",
                  "phoneNumber": "34-915-700-766",
                  "lat": "40.45814",
                  "lng": "-3.68597",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "50d1dfa3-cc2c-4388-bef2-79b1c76e3c17"
              },
              {
                  "iconName": "restaurant",
                  "title": "Maido",
                  "website": "http://www.maido.pe/en/",
                  "instagram": "@mitsuharu_maido",
                  "town": "Miraflores",
                  "country": "Peru",
                  "phoneNumber": "51-1-447-9333",
                  "lat": "-12.12549",
                  "lng": "-77.03056",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cac81db5-3e6d-4c51-a3cc-3119ef056317"
              },
              {
                  "iconName": "restaurant",
                  "title": "Central",
                  "website": "http://www.centralrestaurante.com.pe/en/",
                  "instagram": "@centralrest",
                  "town": "Miraflores",
                  "country": "Peru",
                  "phoneNumber": "51-1-242-8515",
                  "lat": "-12.1326",
                  "lng": "-77.02778",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2da21d97-42cd-4302-bf24-84abc5c558e4"
              },
              {
                  "iconName": "restaurant",
                  "title": "El Celler de Can Roca",
                  "website": "http://www.cellercanroca.com/index.htm",
                  "instagram": "@cellercanroca",
                  "town": "Girona",
                  "country": "Spain",
                  "phoneNumber": "34-972-222-157",
                  "lat": "41.99343",
                  "lng": "2.80806",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "457242de-c87b-4cce-a79c-65be24628145"
              },
              {
                  "iconName": "restaurant",
                  "title": "Sushi Shikon",
                  "website": "http://www.sushi-shikon.com/",
                  "instagram": "@sushishikon",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2643-6800",
                  "lat": "22.28519",
                  "lng": "114.15196",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "35e602f1-76f9-4bf3-bb09-5214ca782208"
              },
              {
                  "iconName": "restaurant",
                  "title": "Norda",
                  "website": "http://www.restaurangnorda.se/?lang=en",
                  "instagram": "@restaurangnorda",
                  "town": "Gothenburg",
                  "country": "Sweden",
                  "phoneNumber": "46-31-619-060",
                  "lat": "57.7082",
                  "lng": "11.97458",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2b446999-f7e8-4cec-aa86-904f0c7fef31"
              },
              {
                  "iconName": "restaurant",
                  "title": "Faviken",
                  "website": "http://www.favikenmagasinet.se/en/",
                  "instagram": "@faviken",
                  "town": "Jarpen",
                  "country": "Sweden",
                  "phoneNumber": "46-64-740-177",
                  "lat": "63.4353",
                  "lng": "13.29317",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2367400-3a88-4c09-923f-c547b7269c2b"
              },
              {
                  "iconName": "restaurant",
                  "title": "The Fat Duck",
                  "website": "http://www.thefatduck.co.uk/",
                  "instagram": "@thehestonblumenthalteam",
                  "town": "Bray",
                  "country": "England",
                  "phoneNumber": "44-016-2858-0333",
                  "lat": "51.50789",
                  "lng": "-0.70175",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "59febfb5-4e93-4aea-ad4b-ac45595988f1"
              },
              {
                  "iconName": "restaurant",
                  "title": "Relæ",
                  "website": "http://www.restaurant-relae.dk/en/",
                  "instagram": "@restrelae",
                  "town": "Copenhagen",
                  "country": "Denmark",
                  "phoneNumber": "45-3696-6609",
                  "lat": "55.69299",
                  "lng": "12.54326",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "da59efa6-994f-4e02-b3aa-c808ac595a8c"
              },
              {
                  "iconName": "restaurant",
                  "title": "De Leest",
                  "website": "http://www.restaurantdeleest.nl/",
                  "instagram": "@de_leest",
                  "town": "Vaassen",
                  "country": "Netherlands",
                  "phoneNumber": "31-578-571-382",
                  "lat": "52.28819",
                  "lng": "5.96733",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2c31ede8-efc0-48ee-b5aa-0efba9fb4a2b"
              },
              {
                  "iconName": "restaurant",
                  "title": "8 1/2 Otto e Mezzo Bombana",
                  "website": "http://www.ottoemezzobombana.com/hong-kong/en/homepage/",
                  "instagram": "@umberto_bombana",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2537-8859",
                  "lat": "22.28157",
                  "lng": "114.15868",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "63738c9e-7873-4660-9e30-9478ece9dba7"
              },
              {
                  "iconName": "restaurant",
                  "title": "Belcanto",
                  "website": "http://www.belcanto.pt/en/",
                  "instagram": "@belcanto_joseavillez",
                  "town": "Lisbon",
                  "country": "Portugal",
                  "phoneNumber": "351-213-420-607",
                  "lat": "38.7099",
                  "lng": "-9.14143",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "71e0d529-55f8-4f58-b821-946c88f6b3fe"
              },
              {
                  "iconName": "restaurant",
                  "title": "Indian Accent",
                  "website": "http://www.indianaccent.com/newdelhi/",
                  "instagram": "@chefmanishmehrotra",
                  "town": "New Delhi",
                  "country": "India",
                  "phoneNumber": "91-11-6617-5151",
                  "lat": "28.59182",
                  "lng": "77.23822",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4006d153-4211-4ced-9017-7aeec61e9e41"
              },
              {
                  "iconName": "restaurant",
                  "title": "Restaurante Martin Berasategui",
                  "website": "https://www.martinberasategui.com/en/inicio",
                  "instagram": "@martinberasategui",
                  "town": "Lasarte-Oria",
                  "country": "Spain",
                  "phoneNumber": "34-943-366-471",
                  "lat": "43.26678",
                  "lng": "-2.01555",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "88428171-c1e4-4eaa-a55a-82ac290615bb"
              },
              {
                  "iconName": "restaurant",
                  "title": "Borago",
                  "website": "https://www.borago.cl/?lan=en&page=",
                  "instagram": "@rgborago",
                  "town": "Vitacura",
                  "country": "Chile",
                  "phoneNumber": "56-2-2953-8893",
                  "lat": "-33.4044",
                  "lng": "-70.59842",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "08d1f10d-da24-47bc-b5be-397791bf8987"
              },
              {
                  "iconName": "restaurant",
                  "title": "Akelarre",
                  "website": "https://www.akelarre.net/en/akelarre",
                  "instagram": "@akelarre_pedrosubjiana",
                  "town": "San Sebastian",
                  "country": "Spain",
                  "phoneNumber": "34-943-311-209",
                  "lat": "41.47881",
                  "lng": "2.06764",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "137a808c-3ecb-429f-a202-284cc0d5d8cc"
              },
              {
                  "iconName": "restaurant",
                  "title": "229 Parks Restaurant & Tavern",
                  "website": "http://www.229parks.com/",
                  "instagram": "@229parksdenali",
                  "town": "Denali National Park",
                  "country": "USA",
                  "phoneNumber": "914-366-9600",
                  "lat": "63.63901",
                  "lng": "-148.79508",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d99c83b9-0a92-48a6-8da4-bce311ebfe8d"
              },
              {
                  "iconName": "restaurant",
                  "title": "Geranium",
                  "website": "http://www.geranium.dk/en/",
                  "instagram": "@restaurant_geranium",
                  "town": "Copenhagen",
                  "country": "Denmark",
                  "phoneNumber": "45-6996-0020",
                  "lat": "55.7036",
                  "lng": "12.5721",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e7b6bbc9-834c-4bff-a29d-1c81a2972282"
              },
              {
                  "iconName": "restaurant",
                  "title": "Combal.Zero",
                  "website": "http://www.combal.org/en/",
                  "instagram": "@davidescabin.zero",
                  "town": "Rivoli",
                  "country": "Italy",
                  "phoneNumber": "39-0119-565225",
                  "lat": "45.06914",
                  "lng": "7.50975",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "51fd9601-ccc7-4e1c-af89-74246fd4a580"
              },
              {
                  "iconName": "restaurant",
                  "title": "Piazza Duomo",
                  "website": "http://www.piazzaduomoalba.it/en/",
                  "instagram": "@piazzaduomoalba",
                  "town": "Alba",
                  "country": "Italy",
                  "phoneNumber": "39-0173-366167",
                  "lat": "44.70061",
                  "lng": "8.03589",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4d93f99b-a527-45fb-a678-970d1a65472f"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Grill",
                  "website": "http://www.hoteldeparismontecarlo.com/restaurants-and-bars/grill/",
                  "instagram": "@alainducasse",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-98-06-88-88",
                  "lat": "43.73901",
                  "lng": "7.42726",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1f5854fb-4994-43a2-935e-f89710fa2857"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Louis XV - Alain Ducasse a l'Hotel de Paris",
                  "website": "http://www.hoteldeparismontecarlo.com/restaurants-and-bars/le-louis-xv-alain-ducasse/",
                  "instagram": "@alainducasse",
                  "town": "Monte Carlo",
                  "country": "Monaco",
                  "phoneNumber": "377-98-06-88-64",
                  "lat": "43.73912",
                  "lng": "7.42715",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6cb5e5c1-8a59-4a1b-b27d-be07319daf65"
              },
              {
                  "iconName": "restaurant",
                  "title": "Georges Blanc",
                  "website": "https://www.georgesblanc.com/en/village-blanc/our-restaurants/georges-blanc-restaurant.html",
                  "instagram": "@georges_blanc_officiel",
                  "town": "Vonnas",
                  "country": "France",
                  "phoneNumber": "33-04-74-50-90-90",
                  "lat": "46.22003",
                  "lng": "4.98959",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "77cb69c8-9179-4cc5-9dad-664a7fefe081"
              },
              {
                  "iconName": "restaurant",
                  "title": "Patagonia Sur",
                  "website": "http://www.restaurantepatagoniasur.com/",
                  "instagram": "@francismallmann",
                  "town": "Buenos Aires",
                  "country": "Argentina",
                  "phoneNumber": "54-11-4303-5917",
                  "lat": "-34.64021",
                  "lng": "-58.36172",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c2cc5da4-03d7-4279-9ada-21fbba739fa5"
              },
              {
                  "iconName": "restaurant",
                  "title": "DOM",
                  "website": "http://www.domrestaurante.com.br/en/home.html",
                  "instagram": "@alexatala",
                  "town": "Jardins",
                  "country": "Brazil",
                  "phoneNumber": "55-11-3062-3592",
                  "lat": "-23.56633",
                  "lng": "-46.66745",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "618ca9e6-223e-4b40-8379-88edcf26c4f5"
              },
              {
                  "iconName": "restaurant",
                  "title": "Lasai",
                  "website": "http://www.lasai.com.br/",
                  "instagram": "@restaurantelasai",
                  "town": "Botafogo",
                  "country": "Brazil",
                  "phoneNumber": "55-21-3449-1834",
                  "lat": "-22.95414",
                  "lng": "-43.1956",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "628864ec-6da5-4280-9d4d-9763e2847f7d"
              },
              {
                  "iconName": "restaurant",
                  "title": "Tangara Jean-Georges",
                  "website": "https://www.oetkercollection.com/destinations/palacio-tangara/restaurants-bars/restaurants/tangara-jean-georges/",
                  "instagram": "@palaciotangara",
                  "town": "Sao Paulo",
                  "country": "Brazil",
                  "phoneNumber": "55-11-4904-4072",
                  "lat": "-23.63234",
                  "lng": "-46.72269",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "213100e5-cf62-4789-8cd6-da9f11615fdf"
              },
              {
                  "iconName": "restaurant",
                  "title": "Mani",
                  "website": "http://www.manimanioca.com.br/",
                  "instagram": "@manimanioca",
                  "town": "Sao Paulo",
                  "country": "Brazil",
                  "phoneNumber": "55-11-3085-4148",
                  "lat": "-23.56638",
                  "lng": "-46.67981",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c4b1b7bc-a29f-4e1e-b7f7-3ec9ccd99e99"
              },
              {
                  "iconName": "restaurant",
                  "title": "Siete Fuegos",
                  "website": "http://www.vinesresortandspa.com/wine-dine/siete-fuegos-restaurant/",
                  "instagram": "@francismallmann",
                  "town": "Tunuyan",
                  "country": "Argentina",
                  "phoneNumber": "54-26-1461-3910",
                  "lat": "-33.58897",
                  "lng": "-69.22037",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e4ff1e67-6e2e-43c0-bd79-b7f8bac2a1a8"
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Atelier de Joel Robuchon",
                  "website": "http://www.robuchon.hk/",
                  "instagram": "@joel.robuchon",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2166-9000",
                  "lat": "22.28161",
                  "lng": "114.15751",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "243c74c3-0b7f-426d-80db-de75caa986bd"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Jardin de Joel Robuchon",
                  "website": "http://www.robuchon.hk/",
                  "instagram": "@joel.robuchon",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2166-9000",
                  "lat": "22.28111",
                  "lng": "114.15759",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "46e7f848-61e3-4668-ae36-1942780963ba"
              },
              {
                  "iconName": "restaurant",
                  "title": "Bo Innovation",
                  "website": "http://www.boinnovation.com/html/html_default.html",
                  "instagram": "@boinnovationhk",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2850-8371",
                  "lat": "22.27624",
                  "lng": "114.17102",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f46234f6-e619-4f69-8094-12f2404b22ee"
              },
              {
                  "iconName": "restaurant",
                  "title": "Al Molo",
                  "website": "http://www.diningconcepts.com/restaurants/Al-Molo",
                  "instagram": "@almolohk",
                  "town": "Hong Kong",
                  "country": "China",
                  "phoneNumber": "852-2525-9300",
                  "lat": "22.29504",
                  "lng": "114.16817",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ee64ddc2-7680-45b6-af7c-0da6cc0cd8ad"
              },
              {
                  "iconName": "restaurant",
                  "title": "La Colombe",
                  "website": "https://www.lacolombe.co.za/welcome",
                  "instagram": "@lacolombect",
                  "town": "Constantia",
                  "country": "South Africa",
                  "phoneNumber": "27-21-794-2390",
                  "lat": "-34.01518",
                  "lng": "18.40331",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b186f8e3-3588-41c2-99db-ed8eb684bb06"
              },
              {
                  "iconName": "restaurant",
                  "title": "De Librije",
                  "website": "https://www.librije.com/home2/?lang=en",
                  "instagram": "@jonnie_en_therese",
                  "town": "Zwolle",
                  "country": "Netherlands",
                  "phoneNumber": "31-388-530-000",
                  "lat": "52.51538",
                  "lng": "6.09767",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "781281b0-4bcf-4067-9134-a62a753f14cc"
              },
              {
                  "iconName": "restaurant",
                  "title": "St Hubertus",
                  "website": "http://www.rosalpina.it/italy-michelin-star-restaurants.htm",
                  "instagram": "@restaurantsthubertus1996",
                  "town": "San Cassiano",
                  "country": "Italy",
                  "phoneNumber": "39-0471-849500",
                  "lat": "46.57152",
                  "lng": "11.93109",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d8848b4d-9868-41fd-bf26-1ea7f8d4bdec"
              },
              {
                  "iconName": "restaurant",
                  "title": "Quay",
                  "website": "https://www.quay.com.au/",
                  "instagram": "@quayrestaurant",
                  "town": "Sydney",
                  "country": "Australia",
                  "phoneNumber": "61-2-9251-5600",
                  "lat": "-33.85796",
                  "lng": "151.21008",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1f71930c-1a9e-47b4-88b9-c8e6ce2c8b1a"
              },
              {
                  "iconName": "restaurant",
                  "title": "La Pergola",
                  "website": "https://romecavalieri.com/la-pergola/",
                  "instagram": "@heinzbecklapergola",
                  "town": "Rome",
                  "country": "Italy",
                  "phoneNumber": "39-0635-092152",
                  "lat": "41.91898",
                  "lng": "12.44666",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cd3ae5fa-1b30-405d-ab87-53399e8ccd08"
              },
              {
                  "iconName": "restaurant",
                  "title": "Da Vittorio",
                  "website": "https://www.davittorio.com/en/",
                  "instagram": "@davittorioristorante",
                  "town": "Brusaporto",
                  "country": "Italy",
                  "phoneNumber": "39-0356-81024",
                  "lat": "45.67498",
                  "lng": "9.76875",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "aef68a3c-6255-4999-bb56-e354a3190abb"
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Calandre",
                  "website": "https://www.alajmo.it/en/sezione/le-calandre/le-calandre",
                  "instagram": "@alajmobros",
                  "town": "Rubano",
                  "country": "Italy",
                  "phoneNumber": "39-0496-30303",
                  "lat": "45.42157",
                  "lng": "11.80951",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ec2ba897-7c02-4fa3-82bf-fd868c4f134b"
              },
              {
                  "iconName": "restaurant",
                  "title": "Osteria Francescana",
                  "website": "https://www.osteriafrancescana.it/",
                  "instagram": "@osteria_francescana",
                  "town": "Modena",
                  "country": "Italy",
                  "phoneNumber": "39-0592-23912",
                  "lat": "44.64481",
                  "lng": "10.92157",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6259464d-ff3e-4be9-85b9-1518a7ce00ec"
              },
              {
                  "iconName": "restaurant",
                  "title": "Disfrutar",
                  "website": "http://www.en.disfrutarbarcelona.com/",
                  "instagram": "@disfrutarbcn",
                  "town": "Barcelona",
                  "country": "Spain",
                  "phoneNumber": "34-933-486-896",
                  "lat": "41.38775",
                  "lng": "2.15319",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a1b996f0-c396-4775-bc90-ec0554806c00"
              },
              {
                  "iconName": "restaurant",
                  "title": "Fuegos de Apalta",
                  "website": "https://www.monteswines.com/montesway/en/",
                  "instagram": "@francismallmann",
                  "town": "Santa Cruz",
                  "country": "Chile",
                  "phoneNumber": "56-7-2260-5191",
                  "lat": "-34.61116",
                  "lng": "-71.27295",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3a7f9fe7-28c9-46cb-add8-0515581202ef"
              },
              {
                  "iconName": "restaurant",
                  "title": "Kadeau",
                  "website": "http://www.kadeau.dk/kbh_english.php",
                  "instagram": "@restaurantkadeau",
                  "town": "Copenhagen",
                  "country": "Denmark",
                  "phoneNumber": "45-3325-2223",
                  "lat": "55.67229",
                  "lng": "12.58895",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9f09c9d7-c961-4a1b-8326-f6b65b286e3b"
              },
              {
                  "iconName": "restaurant",
                  "title": "Inter Scaldes",
                  "website": "http://www.interscaldes.nl/en",
                  "instagram": "@jannisbrevet",
                  "town": "Kruiningen",
                  "country": "Netherlands",
                  "phoneNumber": "31-113-381-753",
                  "lat": "51.45703",
                  "lng": "4.02242",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "aee3def4-1afd-4b05-b29a-6855df68078e"
              },
              {
                  "iconName": "ski area",
                  "title": "Cerro Castor",
                  "website": "http://www.cerrocastor.com/",
                  "instagram": "@cerrocastor",
                  "town": "Ushuaia",
                  "country": "Argentina",
                  "phoneNumber": "54-29-0149-9301",
                  "lat": "-54.72418",
                  "lng": "-68.017",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bd3a10e8-ace5-40c2-911a-0cc6c515af15"
              },
              {
                  "iconName": "ski area",
                  "title": "Courchevel",
                  "website": "http://www.courchevel.com/",
                  "instagram": "@courchevel_officiel",
                  "town": "Saint-Bon-Tarentaise",
                  "country": "France",
                  "phoneNumber": "33-04-79-08-00-29",
                  "lat": "45.41726",
                  "lng": "6.63001",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4f51c5e5-19bd-4883-aa34-d5c8547ffc6a"
              },
              {
                  "iconName": "ski area",
                  "title": "Deer Valley",
                  "website": "http://www.deervalley.com/",
                  "instagram": "@deervalleyresort",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-649-3700",
                  "lat": "40.62116",
                  "lng": "-111.48829",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e904025c-d96c-4c56-8230-365b47302260"
              },
              {
                  "iconName": "ski area",
                  "title": "Niseko",
                  "website": "http://www.niseko.ne.jp/en/niseko/index.html",
                  "instagram": "@nisekounited",
                  "town": "Niseko",
                  "country": "Japan",
                  "phoneNumber": "000-000-0000",
                  "lat": "42.86394",
                  "lng": "140.69686",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "de18f177-7f43-49e2-be9a-fe8b4b980c41"
              },
              {
                  "iconName": "ski area",
                  "title": "Crested Butte",
                  "website": "http://www.skicb.com/",
                  "instagram": "@skicrestedbutte",
                  "town": "Crested Butte",
                  "country": "USA",
                  "phoneNumber": "970-476-5641",
                  "lat": "38.89913",
                  "lng": "-106.9654",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "454e129c-df4a-4b5b-a03a-4b9b6370380b"
              },
              {
                  "iconName": "ski area",
                  "title": "Lake Louise",
                  "website": "http://www.skilouise.com/",
                  "instagram": "@skilouise",
                  "town": "Lake Louise",
                  "country": "Canada",
                  "phoneNumber": "403-522-3989",
                  "lat": "51.44193",
                  "lng": "-116.16218",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d772d0d9-f2fe-4d45-944a-9f57816f92e3"
              },
              {
                  "iconName": "ski area",
                  "title": "Taos",
                  "website": "http://www.skitaos.com/",
                  "instagram": "@skitaos",
                  "town": "Taos Ski Valley",
                  "country": "USA",
                  "phoneNumber": "602-258-8300",
                  "lat": "36.59433",
                  "lng": "-105.44958",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c85e4239-fc80-488f-a6df-d46aeac6ce00"
              },
              {
                  "iconName": "ski area",
                  "title": "Squaw Valley",
                  "website": "http://www.squawalpine.com/",
                  "instagram": "@squawalpine",
                  "town": "Olympic Valley",
                  "country": "USA",
                  "phoneNumber": "800-548-4486",
                  "lat": "39.1957",
                  "lng": "-120.23499",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "68b5caac-5fe5-4183-9fc7-570abbff58cb"
              },
              {
                  "iconName": "ski area",
                  "title": "Big Sky",
                  "website": "https://bigskyresort.com",
                  "instagram": "@bigskyresort",
                  "town": "Big Sky",
                  "country": "USA",
                  "phoneNumber": "800-618-5535",
                  "lat": "45.2835",
                  "lng": "-111.40153",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "08bf4988-0b0d-474d-b097-009cc8709e61"
              },
              {
                  "iconName": "ski area",
                  "title": "Megeve",
                  "website": "https://forfaits.megeve.com/accueil/page.aspx?WPG=4&PO=396&LC=EN",
                  "instagram": "@megeve_officiel",
                  "town": "Megeve",
                  "country": "France",
                  "phoneNumber": "33-04-50-21-57-10",
                  "lat": "45.84942",
                  "lng": "6.61472",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ee5390fc-6edf-4614-b7a2-8e950c81eb5d"
              },
              {
                  "iconName": "ski area",
                  "title": "Alta",
                  "website": "https://www.alta.com/",
                  "instagram": "@altaskiarea",
                  "town": "Alta",
                  "country": "USA",
                  "phoneNumber": "801-933-2222",
                  "lat": "40.58781",
                  "lng": "-111.63821",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4729d43e-8c19-4ae3-a099-3f8ac3136076"
              },
              {
                  "iconName": "ski area",
                  "title": "Alta Badia",
                  "website": "https://www.altabadia.org/en/winter-holidays/winter-italian-alps.html",
                  "instagram": "@alta_badia_official",
                  "town": "La Villa",
                  "country": "Italy",
                  "phoneNumber": "39-0471-847037",
                  "lat": "46.58089",
                  "lng": "11.90165",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "48432ad7-eb92-4ee8-b114-861133fbe6e6"
              },
              {
                  "iconName": "ski area",
                  "title": "Aspen Snowmass",
                  "website": "https://www.aspensnowmass.com/",
                  "instagram": "@aspensnowmass",
                  "town": "Snowmass Village",
                  "country": "USA",
                  "phoneNumber": "970-949-1234",
                  "lat": "39.20835",
                  "lng": "-106.94999",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7acc34b0-6fe4-413c-9fc4-d58afb2a6718"
              },
              {
                  "iconName": "ski area",
                  "title": "Beaver Creek",
                  "website": "https://www.beavercreek.com/",
                  "instagram": "@beavercreek",
                  "town": "Beaver Creek",
                  "country": "USA",
                  "phoneNumber": "970-754-8245",
                  "lat": "39.60275",
                  "lng": "-106.51694",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7adc572a-5e8a-4565-bacb-76107d5ce2ae"
              },
              {
                  "iconName": "ski area",
                  "title": "Chamonix",
                  "website": "https://www.chamonix.com/chamonix-mont-blanc,0,en.html",
                  "instagram": "@chamonixmontblanc",
                  "town": "Chamonix",
                  "country": "France",
                  "phoneNumber": "000-000-0000",
                  "lat": "45.92395",
                  "lng": "6.86349",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ec7807b6-12d9-49ea-9956-5033ccff1aa1"
              },
              {
                  "iconName": "ski area",
                  "title": "Jackson Hole",
                  "website": "https://www.jacksonhole.com/",
                  "instagram": "@jacksonhole",
                  "town": "Teton Village",
                  "country": "USA",
                  "phoneNumber": "307-734-7333",
                  "lat": "43.58914",
                  "lng": "-110.82791",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8f974eda-f358-49c4-a0f6-e74f0065e7bc"
              },
              {
                  "iconName": "ski area",
                  "title": "Killington",
                  "website": "https://www.killington.com/",
                  "instagram": "@killingtonmtn",
                  "town": "Killington",
                  "country": "USA",
                  "phoneNumber": "808-662-6600",
                  "lat": "43.62538",
                  "lng": "-72.79743",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "48aeb321-7d1d-44a5-9bad-6ca8293904ce"
              },
              {
                  "iconName": "ski area",
                  "title": "The Remarkables",
                  "website": "https://www.nzski.com/queenstown/the-mountains/the-remarkables",
                  "instagram": "@theremarkables",
                  "town": "Queenstown",
                  "country": "New Zealand",
                  "phoneNumber": "64-800-697-547",
                  "lat": "-45.05405",
                  "lng": "168.81429",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "59571280-105e-477f-b0c3-dfc8df81b311"
              },
              {
                  "iconName": "ski area",
                  "title": "Park City",
                  "website": "https://www.parkcitymountain.com/",
                  "instagram": "@pcski",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-675-3999",
                  "lat": "40.65335",
                  "lng": "-111.50957",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1c9bba79-d1ac-452e-889c-608d2906166f"
              },
              {
                  "iconName": "ski area",
                  "title": "Heavenly",
                  "website": "https://www.skiheavenly.com/",
                  "instagram": "@skiheavenly",
                  "town": "Stateline",
                  "country": "USA",
                  "phoneNumber": "780-882-3301",
                  "lat": "38.93577",
                  "lng": "-119.93934",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "afbe2879-0cb4-462e-8618-a225d6cbc014"
              },
              {
                  "iconName": "ski area",
                  "title": "Snowbird",
                  "website": "https://www.snowbird.com/",
                  "instagram": "@snowbird",
                  "town": "Sandy",
                  "country": "USA",
                  "phoneNumber": "802-253-3000",
                  "lat": "40.5808",
                  "lng": "-111.65581",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "3c240a32-d73e-4926-923b-dae165a749f0"
              },
              {
                  "iconName": "ski area",
                  "title": "Steamboat",
                  "website": "https://www.steamboat.com/",
                  "instagram": "@steamboatresort",
                  "town": "Steamboat Springs",
                  "country": "USA",
                  "phoneNumber": "970-920-2739",
                  "lat": "40.45718",
                  "lng": "-106.80454",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2fb9733e-a41c-44ce-abea-8433e17f8c2f"
              },
              {
                  "iconName": "ski area",
                  "title": "Stowe",
                  "website": "https://www.stowe.com/",
                  "instagram": "@stowemt",
                  "town": "Stowe",
                  "country": "USA",
                  "phoneNumber": "802-253-7371",
                  "lat": "44.53151",
                  "lng": "-72.78088",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7f48d1ea-1d1c-4c96-95d4-b15caab9f65f"
              },
              {
                  "iconName": "ski area",
                  "title": "Stratton",
                  "website": "https://www.stratton.com/",
                  "instagram": "@strattonresort",
                  "town": "Stratton Mountain",
                  "country": "USA",
                  "phoneNumber": "802-422-3333",
                  "lat": "43.11281",
                  "lng": "-72.90758",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6a3941ed-ee05-422b-8fe9-0c81a1b73ab6"
              },
              {
                  "iconName": "ski area",
                  "title": "Sunday River",
                  "website": "https://www.sundayriver.com/",
                  "instagram": "@sundayriver",
                  "town": "Newry",
                  "country": "USA",
                  "phoneNumber": "207-878-5385",
                  "lat": "44.47335",
                  "lng": "-70.8577",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b779444a-4a73-4300-a1d2-6e37e65a6f3c"
              },
              {
                  "iconName": "ski area",
                  "title": "Sun Valley",
                  "website": "https://www.sunvalley.com/",
                  "instagram": "@sunvalley",
                  "town": "Ketchum",
                  "country": "USA",
                  "phoneNumber": "212-203-8095",
                  "lat": "43.67055",
                  "lng": "-114.36824",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9bf9872b-fbb6-4242-91c4-14dcc38330a0"
              },
              {
                  "iconName": "ski area",
                  "title": "Telluride",
                  "website": "https://www.tellurideskiresort.com/",
                  "instagram": "@tellurideski",
                  "town": "Telluride",
                  "country": "USA",
                  "phoneNumber": "970-754-4636",
                  "lat": "37.93576",
                  "lng": "-107.81389",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0382bc71-0a19-4ae7-9869-ca3d9a6c2bb2"
              },
              {
                  "iconName": "ski area",
                  "title": "Tremblant",
                  "website": "https://www.tremblant.ca/",
                  "instagram": "@monttremblant",
                  "town": "Mont-Tremblant",
                  "country": "Canada",
                  "phoneNumber": "831-394-3321",
                  "lat": "46.21341",
                  "lng": "-74.58389",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "eadd14d8-c900-48ee-9cc2-1825ffc33659"
              },
              {
                  "iconName": "ski area",
                  "title": "Vail",
                  "website": "https://www.vail.com/",
                  "instagram": "@vailmtn",
                  "town": "Vail",
                  "country": "USA",
                  "phoneNumber": "970-879-1780",
                  "lat": "39.63904",
                  "lng": "-106.3734",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a3d3929f-0276-4232-a142-76700b9777a2"
              },
              {
                  "iconName": "ski area",
                  "title": "Whistler",
                  "website": "https://www.whistlerblackcomb.com/",
                  "instagram": "@whistlerblackcomb",
                  "town": "Whistler",
                  "country": "Canada",
                  "phoneNumber": "607-544-1800",
                  "lat": "50.11496",
                  "lng": "-122.94865",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0120ca98-714b-4931-9deb-c39cf5b0cfc6"
              },
              {
                  "iconName": "ski area",
                  "title": "Winter Park",
                  "website": "https://www.winterparkresort.com/",
                  "instagram": "@winterparkresort",
                  "town": "Winter Park",
                  "country": "USA",
                  "phoneNumber": "970-728-7517",
                  "lat": "39.88656",
                  "lng": "-105.76373",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2e5ed9dc-e6a2-417b-aeb2-37b38c63d0fa"
              },
              {
                  "iconName": "UNESCO",
                  "title": "Tower of London",
                  "website": "https://www.hrp.org.uk/tower-of-london/",
                  "instagram": "@historicroyalpalaces",
                  "town": "London",
                  "country": "England",
                  "phoneNumber": "44-084-4482-7777",
                  "lat": "51.50811",
                  "lng": "-0.07595",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f48e7186-c1a4-4428-9db3-8f86b9548f30"
              },
              {
                  "iconName": "vineyard",
                  "title": "Amisfield",
                  "website": "https://amisfield.co.nz/",
                  "instagram": "@amisfieldvineyard",
                  "town": "Queenstown",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-442-0556",
                  "lat": "-44.98709",
                  "lng": "168.81557",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8811a233-05b2-4668-97b4-71916b266db8"
              },
              {
                  "iconName": "vineyard",
                  "title": "Vignoble Klur",
                  "website": "http://www.klur.net/en/organic-wine-vacations/",
                  "instagram": "@vacancesklur",
                  "town": "Katzenthal",
                  "country": "France",
                  "phoneNumber": "33-03-89-80-94-29",
                  "lat": "48.10684",
                  "lng": "7.28025",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a93f766b-a1c7-4200-971d-97988af78b84"
              },
              {
                  "iconName": "vineyard",
                  "title": "Cable Bay",
                  "website": "https://cablebay.nz/",
                  "instagram": "@cable_bay_vineyards",
                  "town": "Oneroa",
                  "country": "New Zealand",
                  "phoneNumber": "64-9-372-5889",
                  "lat": "-36.7877",
                  "lng": "175.00036",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e3992e9d-c20c-466e-9e2d-572e3115044e"
              },
              {
                  "iconName": "vineyard",
                  "title": "Far Niente",
                  "website": "https://farniente.com/visit-napa-valley/wine-tours/",
                  "instagram": "@farnientewinery",
                  "town": "Oakville",
                  "country": "USA",
                  "phoneNumber": "707-963-1211",
                  "lat": "38.42577",
                  "lng": "-122.40313",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e325ca83-7a1f-4923-a788-c618c323594c"
              },
              {
                  "iconName": "vineyard",
                  "title": "Ravine Vineyard Estate Winery",
                  "website": "https://ravinevineyard.com/",
                  "instagram": "@ravinevineyard",
                  "town": "St Davids",
                  "country": "Canada",
                  "phoneNumber": "905-468-2187",
                  "lat": "43.16028",
                  "lng": "-79.10321",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0d4ffcf8-6ca6-4ab0-ba0b-19c21c353221"
              },
              {
                  "iconName": "vineyard",
                  "title": "Inniskillin Wines",
                  "website": "http://www.inniskillin.com/Niagara",
                  "instagram": "@inniskillinwines",
                  "town": "Niagara-on-the-Lake",
                  "country": "Canada",
                  "phoneNumber": "907-683-2567",
                  "lat": "43.21056",
                  "lng": "-79.06395",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9954401c-d426-4586-95d8-756b7e6fdd0b"
              },
              {
                  "iconName": "vineyard",
                  "title": "Mt Lofty Ranges",
                  "website": "http://www.mtloftyrangesvineyard.com.au/",
                  "instagram": "@mtloftyvineyard",
                  "town": "Lenswood",
                  "country": "Australia",
                  "phoneNumber": "61-8-8389-8339",
                  "lat": "-34.90796",
                  "lng": "138.82226",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9c335f36-2413-4b04-931a-537304412024"
              },
              {
                  "iconName": "vineyard",
                  "title": "No 1 Family Estate",
                  "website": "http://www.no1familyestate.co.nz/",
                  "instagram": "@no1familyestate",
                  "town": "Blenheim",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-572-9876",
                  "lat": "-41.4836",
                  "lng": "173.83746",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "50efdaa6-5e97-4ab6-abed-1ce78b88f04c"
              },
              {
                  "iconName": "vineyard",
                  "title": "Domaine Yves Boyer Martenot",
                  "website": "http://www.boyer-martenot.com/en",
                  "instagram": "@boyermartenot",
                  "town": "Meursault",
                  "country": "France",
                  "phoneNumber": "33-03-80-21-26-25",
                  "lat": "46.97544",
                  "lng": "4.77207",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f88b6459-32d1-4f29-8072-e87b1ffd31df"
              },
              {
                  "iconName": "vineyard",
                  "title": "Mission Estate",
                  "website": "http://www.missionestate.co.nz/",
                  "instagram": "@missionestate",
                  "town": "Napier",
                  "country": "New Zealand",
                  "phoneNumber": "64-6-845-9353",
                  "lat": "-39.51848",
                  "lng": "176.84484",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cb38b596-2b9a-4822-9f00-6cf298c59597"
              },
              {
                  "iconName": "vineyard",
                  "title": "Champagne Tribaut",
                  "website": "https://champagne.tribaut.wine/",
                  "instagram": "@champagnetribautschloesser",
                  "town": "Romery",
                  "country": "France",
                  "phoneNumber": "33-03-26-58-64-21",
                  "lat": "49.09721",
                  "lng": "3.91667",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "e29a87ee-0c5f-4c60-b589-dc91519ed757"
              },
              {
                  "iconName": "vineyard",
                  "title": "Peregrine",
                  "website": "http://www.peregrinewines.co.nz/",
                  "instagram": "@peregrinewines",
                  "town": "Queenstown",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-442-4000",
                  "lat": "-45.0206",
                  "lng": "168.95137",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6c9b734b-fde6-4950-aa72-fb50e7ad555e"
              },
              {
                  "iconName": "vineyard",
                  "title": "Huia",
                  "website": "http://www.huiavineyards.com/huia",
                  "instagram": "@huia_vineyards",
                  "town": "Rapaura",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-572-8326",
                  "lat": "-41.48294",
                  "lng": "173.82847",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "059469a3-ad0a-4eaa-9b71-c6689a73cc13"
              },
              {
                  "iconName": "vineyard",
                  "title": "Te Awa",
                  "website": "https://teawacollection.com/",
                  "instagram": "@te_awa_winery",
                  "town": "Hastings",
                  "country": "New Zealand",
                  "phoneNumber": "64-6-879-7602",
                  "lat": "-39.61442",
                  "lng": "176.73637",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "454d67e1-0509-4b2f-be45-5625b8ecf488"
              },
              {
                  "iconName": "vineyard",
                  "title": "Craggy Range",
                  "website": "https://www.craggyrange.com/",
                  "instagram": "@craggyrange",
                  "town": "Havelock North",
                  "country": "New Zealand",
                  "phoneNumber": "64-6-873-0141",
                  "lat": "-39.69284",
                  "lng": "176.92304",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9752c53f-4e83-4d3c-97ce-20b228dcccba"
              },
              {
                  "iconName": "vineyard",
                  "title": "TarraWarra Estate",
                  "website": "http://www.tarrawarra.com.au/",
                  "instagram": "@_tarrawarra_",
                  "town": "Yarra Glen",
                  "country": "Australia",
                  "phoneNumber": "61-3-5957-3511",
                  "lat": "-37.65935",
                  "lng": "145.46965",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "aa55d902-55c2-4079-aeaa-13827d59b59e"
              },
              {
                  "iconName": "vineyard",
                  "title": "All Saints",
                  "website": "https://www.allsaintswine.com.au/",
                  "instagram": "@allsaintsestate",
                  "town": "Wahgunyah",
                  "country": "Australia",
                  "phoneNumber": "61-2-6035-2222",
                  "lat": "-35.99342",
                  "lng": "146.40992",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "32d971cd-c3a7-4a7b-98b6-3d9e03f2a648"
              },
              {
                  "iconName": "vineyard",
                  "title": "Bay of Fires",
                  "website": "https://www.bayoffireswines.com.au/index.cfm?",
                  "instagram": "@bayoffireswines",
                  "town": "Pipers River",
                  "country": "Australia",
                  "phoneNumber": "61-3-6382-7622",
                  "lat": "-41.11547",
                  "lng": "147.09626",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "93bda35f-f7e3-40fc-b9b9-755ccc994016"
              },
              {
                  "iconName": "vineyard",
                  "title": "Chamonix",
                  "website": "http://www.chamonix.co.za/",
                  "instagram": "@chamonixwinefarm",
                  "town": "Franschhoek",
                  "country": "South Africa",
                  "phoneNumber": "27-21-876-8400",
                  "lat": "-33.89955",
                  "lng": "19.12748",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7c0dc1e1-2365-4981-9141-a84b8ad89e58"
              },
              {
                  "iconName": "vineyard",
                  "title": "Red Hill Estate",
                  "website": "https://www.redhillestate.com.au/",
                  "instagram": "@redhillestate",
                  "town": "Red Hill South",
                  "country": "Australia",
                  "phoneNumber": "61-3-5989-2838",
                  "lat": "-38.40249",
                  "lng": "145.01664",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7b3aec73-d150-4e9f-bb8b-135beb874768"
              },
              {
                  "iconName": "vineyard",
                  "title": "Te Whare Ra",
                  "website": "https://www.twrwines.co.nz/",
                  "instagram": "@tewharerawinesnz",
                  "town": "Renwick",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-572-8581",
                  "lat": "-41.51121",
                  "lng": "173.81616",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "efaa159b-cdae-430c-9d8a-137c28e051de"
              },
              {
                  "iconName": "vineyard",
                  "title": "Stag's Leap Wine Cellars",
                  "website": "https://www.cask23.com/visit",
                  "instagram": "@stagsleapwinecellars",
                  "town": "Napa",
                  "country": "USA",
                  "phoneNumber": "707-531-4788",
                  "lat": "38.39922",
                  "lng": "-122.32353",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cb52180d-8a42-45e1-8602-4ac2379e7961"
              },
              {
                  "iconName": "vineyard",
                  "title": "Maison Emile Beyer",
                  "website": "https://www.emile-beyer.fr/home-emile-beyer-m1-en.html",
                  "instagram": "@emilebeyer1580",
                  "town": "Eguisheim",
                  "country": "France",
                  "phoneNumber": "33-03-89-41-40-45",
                  "lat": "48.04279",
                  "lng": "7.30684",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "04818dc5-8057-4d56-9a3c-c69cc837a21a"
              },
              {
                  "iconName": "vineyard",
                  "title": "Thierry Violot-Guillemard",
                  "website": "http://www.violot-guillemard.fr/en/",
                  "instagram": "@domaine_violot_guillemard",
                  "town": "Pommard",
                  "country": "France",
                  "phoneNumber": "33-03-80-22-49-98",
                  "lat": "47.00804",
                  "lng": "4.79479",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "26bd48c3-f5b7-42da-9a18-5980509c0b3e"
              },
              {
                  "iconName": "vineyard",
                  "title": "Man O' War",
                  "website": "http://www.manowarvineyards.co.nz/",
                  "instagram": "@manowarwine",
                  "town": "Waiheke Island",
                  "country": "New Zealand",
                  "phoneNumber": "64-9-372-9678",
                  "lat": "-36.78644",
                  "lng": "175.1543",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f8af539b-a9d2-4c55-9f1f-b3efff89bdd0"
              },
              {
                  "iconName": "vineyard",
                  "title": "Mondavi",
                  "website": "https://www.robertmondaviwinery.com/Visit-Us",
                  "instagram": "@robertmondavi",
                  "town": "Oakville",
                  "country": "USA",
                  "phoneNumber": "707-254-2800",
                  "lat": "38.44126",
                  "lng": "-122.4098",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d7eee965-3b56-4577-8eb7-05f9b4d98965"
              },
              {
                  "iconName": "vineyard",
                  "title": "Cakebread Cellars",
                  "website": "https://www.cakebread.com/tours-and-tastings",
                  "instagram": "@cakebreadcellars",
                  "town": "St Helena",
                  "country": "USA",
                  "phoneNumber": "709-658-3444",
                  "lat": "38.44774",
                  "lng": "-122.41199",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9a92c560-19dc-4a8d-8bb8-0f198c4ada24"
              },
              {
                  "iconName": "vineyard",
                  "title": "Seresin",
                  "website": "https://seresin.co.nz/",
                  "instagram": "@seresinestate",
                  "town": "Renwick",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-572-9408",
                  "lat": "-41.50903",
                  "lng": "173.79537",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4503aee7-082e-405f-8702-39c865a8dd63"
              },
              {
                  "iconName": "vineyard",
                  "title": "Elephant Hill",
                  "website": "https://www.elephanthill.co.nz/",
                  "instagram": "@elephanthill",
                  "town": "Te Awanga",
                  "country": "New Zealand",
                  "phoneNumber": "64-6-873-0400",
                  "lat": "-39.62311",
                  "lng": "176.96161",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4d0df474-a430-4286-8c23-da58b892ee77"
              },
              {
                  "iconName": "vineyard",
                  "title": "Frog's Leap",
                  "website": "https://www.frogsleap.com/visit.php",
                  "instagram": "@frogsleap",
                  "town": "Rutherford",
                  "country": "USA",
                  "phoneNumber": "707-963-5222",
                  "lat": "38.47407",
                  "lng": "-122.40237",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "32ad9899-645f-4ec3-aa94-7980b560c0a6"
              },
              {
                  "iconName": "vineyard",
                  "title": "Silver Oak",
                  "website": "https://www.silveroak.com/visit-us/",
                  "instagram": "@silveroakcellars",
                  "town": "Oakville",
                  "country": "USA",
                  "phoneNumber": "707-944-2380",
                  "lat": "38.44087",
                  "lng": "-122.38135",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dc034c96-018a-42bc-9707-8fef414abb18"
              },
              {
                  "iconName": "vineyard",
                  "title": "Bodegas Portia",
                  "website": "http://www.bodegasportia.com/en/inicio",
                  "instagram": "@bodegasportia_",
                  "town": "Gumiel de Izan",
                  "country": "Spain",
                  "phoneNumber": "34-947-102-700",
                  "lat": "41.76816",
                  "lng": "-3.69399",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a187dd84-3d0b-492f-8bc7-2f46e64e2503"
              },
              {
                  "iconName": "vineyard",
                  "title": "Herdade do Esporao",
                  "website": "https://www.esporao.com/en/winetourism/herdade-do-esporao/",
                  "instagram": "@esporaoworld",
                  "town": "Reguenos de Monsaraz",
                  "country": "Portugal",
                  "phoneNumber": "351-266-509-280",
                  "lat": "38.37983",
                  "lng": "-7.56079",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "372c480a-7774-40fb-8a5f-e1c6ed011272"
              },
              {
                  "iconName": "vineyard",
                  "title": "Delgado Zuleta",
                  "website": "http://www.delgadozuleta.com/en/centro-de-interpretacion-del-vino/",
                  "instagram": "@delgadozuleta",
                  "town": "Sanlucar de Barrameda",
                  "country": "Spain",
                  "phoneNumber": "34-956-360-543",
                  "lat": "36.76817",
                  "lng": "-6.35891",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b114a841-d1ed-48a6-b3a8-62f721228474"
              },
              {
                  "iconName": "vineyard",
                  "title": "Doolhof",
                  "website": "http://www.doolhof.com/",
                  "instagram": "@doolhofwines",
                  "town": "Wellington",
                  "country": "South Africa",
                  "phoneNumber": "27-21-864-2805",
                  "lat": "-33.6261",
                  "lng": "19.0839",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a5679ad0-c4f0-4883-92b1-a306869499c1"
              },
              {
                  "iconName": "vineyard",
                  "title": "Val du Charron",
                  "website": "http://www.vdcwines.co.za/",
                  "instagram": "@valdu.charron",
                  "town": "Wellington",
                  "country": "South Africa",
                  "phoneNumber": "27-21-873-1256",
                  "lat": "-33.62453",
                  "lng": "19.04904",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "80877fa9-fb83-4bed-b620-d06719f05169"
              },
              {
                  "iconName": "vineyard",
                  "title": "Bodegas Ismael Arroyo",
                  "website": "http://www.valsotillo.com/en/wine-tours/",
                  "instagram": "@valsotillo",
                  "town": "Sotillo de la Ribera",
                  "country": "Spain",
                  "phoneNumber": "34-947-532-309",
                  "lat": "41.77797",
                  "lng": "-3.82203",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d7742fa9-c96d-46ea-8bca-c203ec7167db"
              },
              {
                  "iconName": "vineyard",
                  "title": "El Celler Cooperativa de Falset",
                  "website": "http://www.etim.cat/enoturisme-la-cooperativa",
                  "instagram": "@etimonline",
                  "town": "Falset",
                  "country": "Spain",
                  "phoneNumber": "34-977-830-105",
                  "lat": "41.14371",
                  "lng": "0.819",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2a7650ef-05b5-4431-9ab6-f2281c5b096b"
              },
              {
                  "iconName": "vineyard",
                  "title": "Macia Batle",
                  "website": "http://www.maciabatle.com/en/visitas/?idioma=en&url=Visita",
                  "instagram": "@maciabatle",
                  "town": "Mallorca",
                  "country": "Spain",
                  "phoneNumber": "34-971-140-014",
                  "lat": "39.65379",
                  "lng": "2.77698",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "29c4d7ac-0183-4a74-a08e-7f9ee7376d04"
              },
              {
                  "iconName": "vineyard",
                  "title": "Vina Lapostolle / Clos Apalta",
                  "website": "http://www.closapalta.com/",
                  "instagram": "@closapalta",
                  "town": "Millahue",
                  "country": "Chile",
                  "phoneNumber": "56-7-2295-3360",
                  "lat": "-34.59267",
                  "lng": "-71.29231",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a8b4a100-7279-4ddb-b60c-c3359e6a92fc"
              },
              {
                  "iconName": "vineyard",
                  "title": "Viu Manent",
                  "website": "http://www.viumanent.cl/en/",
                  "instagram": "@viumanentwinery",
                  "town": "Cunaco",
                  "country": "Chile",
                  "phoneNumber": "56-2-2840-3160",
                  "lat": "-34.64999",
                  "lng": "-71.30866",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1b1dc28d-8c50-45a1-9bcb-96b9902e8f05"
              },
              {
                  "iconName": "vineyard",
                  "title": "Vivanco",
                  "website": "https://vivancoculturadevino.es/en/experiences/visits/",
                  "instagram": "@vivancoculturadevino",
                  "town": "Briones",
                  "country": "Spain",
                  "phoneNumber": "34-941-322-323",
                  "lat": "42.53941",
                  "lng": "-2.77757",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "27fa6261-305e-419f-bfd4-610df75d2ffe"
              },
              {
                  "iconName": "vineyard",
                  "title": "Miquel Oliver",
                  "website": "http://www.miqueloliver.com/en/tours-2/",
                  "instagram": "@moliverbodegas",
                  "town": "Mallorca",
                  "country": "Spain",
                  "phoneNumber": "34-971-561-117",
                  "lat": "39.62898",
                  "lng": "3.10844",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f48176cb-f54a-45af-8062-9958f2f31353"
              },
              {
                  "iconName": "vineyard",
                  "title": "Achaval-Ferrer",
                  "website": "http://www.achaval-ferrer.com/eng/index_en.php#inicio",
                  "instagram": "@achavalferrer",
                  "town": "Perdriel",
                  "country": "Argentina",
                  "phoneNumber": "54-26-1553-5565",
                  "lat": "-33.05535",
                  "lng": "-68.90735",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1a1943af-a96f-48aa-a82a-5be5c4e37733"
              },
              {
                  "iconName": "vineyard",
                  "title": "Venissa",
                  "website": "http://www.venissa.it/en/",
                  "instagram": "@venissa_tenuta",
                  "town": "Mazzorbo",
                  "country": "Italy",
                  "phoneNumber": "39-0415-272281",
                  "lat": "45.48854",
                  "lng": "12.41097",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "f52d57c7-b439-4977-8c0c-0dfa4d3ac47a"
              },
              {
                  "iconName": "vineyard",
                  "title": "Moreson",
                  "website": "https://www.moreson.co.za/",
                  "instagram": "@moresonwinefarm",
                  "town": "Franschhoek",
                  "country": "South Africa",
                  "phoneNumber": "27-21-876-8525",
                  "lat": "-33.88805",
                  "lng": "19.06198",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cddcf997-afb4-4446-853a-4ce98ce4cea5"
              },
              {
                  "iconName": "vineyard",
                  "title": "Tokara",
                  "website": "http://www.tokara.com/",
                  "instagram": "@tokarawines",
                  "town": "Stellenbosch",
                  "country": "South Africa",
                  "phoneNumber": "27-21-808-5900",
                  "lat": "-33.91807",
                  "lng": "18.92091",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "c4845b28-ee64-4d5d-bc0e-fc2e834f5b35"
              },
              {
                  "iconName": "vineyard",
                  "title": "Diemersfontein",
                  "website": "https://www.diemersfontein.co.za/",
                  "instagram": "@diemersfontein",
                  "town": "Wellington",
                  "country": "South Africa",
                  "phoneNumber": "27-21-864-5050",
                  "lat": "-33.66023",
                  "lng": "19.00662",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "77eaa9f3-3537-4853-aa73-a239ee7ed1f3"
              },
              {
                  "iconName": "vineyard",
                  "title": "Haute Cabriere",
                  "website": "https://www.cabriere.co.za/",
                  "instagram": "@hautecabriere",
                  "town": "Franschhoek",
                  "country": "South Africa",
                  "phoneNumber": "27-21-876-8500",
                  "lat": "-33.91422",
                  "lng": "19.13564",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6a32363c-5ca1-46c4-a068-9ff68ba6cdea"
              },
              {
                  "iconName": "vineyard",
                  "title": "Fattoria di Corsignano",
                  "website": "http://www.tenutacorsignano.it/?lang=en",
                  "instagram": "@fattoriadicorsignano",
                  "town": "Castelnuovo Berardegna",
                  "country": "Italy",
                  "phoneNumber": "39-0577-322545",
                  "lat": "43.39408",
                  "lng": "11.34446",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "52770ddd-9881-44b5-8d2a-fc5652ee56ce"
              },
              {
                  "iconName": "vineyard",
                  "title": "Val Delle Corti",
                  "website": "http://www.valdellecorti.it/en/home-page.html",
                  "instagram": "@valdellecorti",
                  "town": "Radda in Chianti",
                  "country": "Italy",
                  "phoneNumber": "39-0577-738215",
                  "lat": "43.47938",
                  "lng": "11.36958",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ba24c94f-44df-4bc7-8ccc-64503c9143f9"
              },
              {
                  "iconName": "vineyard",
                  "title": "Renato Keber",
                  "website": "http://www.renatokeber.com/en/",
                  "instagram": "@keber_renato",
                  "town": "Cormons",
                  "country": "Italy",
                  "phoneNumber": "39-0481-639844",
                  "lat": "45.97656",
                  "lng": "13.50285",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0908210b-608f-457f-a587-97dc0bf9b996"
              },
              {
                  "iconName": "vineyard",
                  "title": "Bird in Hand",
                  "website": "http://www.birdinhand.com.au/",
                  "instagram": "@birdinhandwine",
                  "town": "Woodside",
                  "country": "Australia",
                  "phoneNumber": "61-8-8389-9488",
                  "lat": "-34.95689",
                  "lng": "138.89531",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "dbed0c93-bdfb-4dc5-afff-2e26ad941d09"
              },
              {
                  "iconName": "vineyard",
                  "title": "Bodegas Tradicion",
                  "website": "http://www.bodegastradicion.es/index.php/en/visit-us",
                  "instagram": "@bodegastradicion",
                  "town": "Jerez de la Frontera",
                  "country": "Spain",
                  "phoneNumber": "34-956-168-628",
                  "lat": "36.68566",
                  "lng": "-6.14623",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "30483b59-992b-440c-ad52-0a02b2c729a8"
              },
              {
                  "iconName": "vineyard",
                  "title": "Bodegas de Palacio de Fefinanes",
                  "website": "http://www.fefinanes.com/en/wine-tourism/",
                  "instagram": "@bodega_fefinanes",
                  "town": "Combados",
                  "country": "Spain",
                  "phoneNumber": "34-986-542-204",
                  "lat": "42.51888",
                  "lng": "-8.81323",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "cce71561-5b51-4422-9a87-d60dc37dabd9"
              },
              {
                  "iconName": "vineyard",
                  "title": "Kanonkop",
                  "website": "http://www.kanonkop.co.za/",
                  "instagram": "@kanonkopwineestate",
                  "town": "Stellenbosch",
                  "country": "South Africa",
                  "phoneNumber": "27-21-884-4656",
                  "lat": "-33.85519",
                  "lng": "18.86013",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "55e37e54-02dd-4c7e-a493-d36d066aaa98"
              },
              {
                  "iconName": "vineyard",
                  "title": "Allee Bleue",
                  "website": "http://www.alleebleue.co.za/",
                  "instagram": "@alleebleue",
                  "town": "Groot Drakenstein",
                  "country": "South Africa",
                  "phoneNumber": "27-21-874-1021",
                  "lat": "-33.85857",
                  "lng": "18.98634",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "1870d01f-3677-4877-abef-2610a28bd707"
              },
              {
                  "iconName": "vineyard",
                  "title": "Waverley Hills",
                  "website": "https://waverleyhills.co.za/",
                  "instagram": "@waverleyhills_organic",
                  "town": "Tulbagh",
                  "country": "South Africa",
                  "phoneNumber": "27-23-231-0002",
                  "lat": "-33.4114",
                  "lng": "19.24189",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "0c41f314-d3cb-4889-b392-649a069be56e"
              },
              {
                  "iconName": "vineyard",
                  "title": "Cellers de Scala Dei",
                  "website": "http://www.cellersdescaladei.com/",
                  "instagram": "@cellersscaladei",
                  "town": "Escaladei",
                  "country": "Spain",
                  "phoneNumber": "34-977-827-173",
                  "lat": "41.24812",
                  "lng": "0.81129",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "69a42cca-06f7-4898-8f33-28e8d043d7e2"
              },
              {
                  "iconName": "vineyard",
                  "title": "Taylor's Port Lodge",
                  "website": "https://www.taylor.pt/us/visit-taylor-fladgate/port-cellars",
                  "instagram": "@taylorsportwine",
                  "town": "Vila Nova de Gaia",
                  "country": "Portugal",
                  "phoneNumber": "351-223-772-973",
                  "lat": "41.13394",
                  "lng": "-8.61428",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "4996bd0b-899e-48d3-9144-2a2a1a3183b4"
              },
              {
                  "iconName": "vineyard",
                  "title": "Domaine Andre Dezat & Fils",
                  "website": "http://www.dezat-sancerre.com/english/",
                  "instagram": "@andredezat",
                  "town": "Verdigny",
                  "country": "France",
                  "phoneNumber": "33-02-48-79-38-82",
                  "lat": "47.35335",
                  "lng": "2.81121",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "b56656be-69b4-455c-a5cc-94a984e742d2"
              },
              {
                  "iconName": "vineyard",
                  "title": "Salentein",
                  "website": "http://www.bodegasalentein.com/en/home.html",
                  "instagram": "@salenteinbodega",
                  "town": "Los Arboles de Villegas",
                  "country": "Argentina",
                  "phoneNumber": "54-26-2242-9500",
                  "lat": "-33.49842",
                  "lng": "-69.25205",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "d6e8111c-fcdb-4fd9-ae00-9349c62e4916"
              },
              {
                  "iconName": "vineyard",
                  "title": "Yealands",
                  "website": "https://www.yealands.co.nz/us",
                  "instagram": "@yealands",
                  "town": "Seddon",
                  "country": "New Zealand",
                  "phoneNumber": "64-3-575-7618",
                  "lat": "-41.64862",
                  "lng": "174.13152",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "eea72e3c-8531-4048-a37a-da4d86e4893c"
              },
              {
                  "iconName": "vineyard",
                  "title": "Cantina Tramin",
                  "website": "http://www.cantinatramin.it/EN/1/13/contacts.htm",
                  "instagram": "@cantina_tramin",
                  "town": "Termeno",
                  "country": "Italy",
                  "phoneNumber": "39-0471-096633",
                  "lat": "46.3454",
                  "lng": "11.25124",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2819f9bc-249f-4029-b7ef-d323b0346c50"
              },
              {
                  "iconName": "vineyard",
                  "title": "Braida",
                  "website": "http://www.braida.com/it/en/visita-braida-2/",
                  "instagram": "@braidawinery",
                  "town": "Rocchetta Tanaro",
                  "country": "Italy",
                  "phoneNumber": "39-335-1559195",
                  "lat": "44.85526",
                  "lng": "8.3469",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "285ab51b-0982-43d8-9c90-5ce0a9f96cad"
              },
              {
                  "iconName": "vineyard",
                  "title": "Polvanera",
                  "website": "http://www.cantinepolvanera.it/en/",
                  "instagram": "@polvaneraofficial",
                  "town": "Gioia del Colle",
                  "country": "Italy",
                  "phoneNumber": "39-080-758900",
                  "lat": "40.82505",
                  "lng": "16.87587",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "773f7310-48a1-4f72-8685-5e84fef16d90"
              },
              {
                  "iconName": "vineyard",
                  "title": "Le Bignele",
                  "website": "http://www.lebignele.it/index.php?lang=en",
                  "instagram": "@le_bignele",
                  "town": "Marano di Valpolicella",
                  "country": "Italy",
                  "phoneNumber": "39-0457-755061",
                  "lat": "45.54506",
                  "lng": "10.92449",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6f479f87-5ea0-485d-abf4-498259d36a63"
              },
              {
                  "iconName": "vineyard",
                  "title": "Santa Sofia",
                  "website": "http://www.santasofia.com/",
                  "instagram": "@santa_sofiawines",
                  "town": "San Pietro in Cariano",
                  "country": "Italy",
                  "phoneNumber": "39-0457-701074",
                  "lat": "45.49922",
                  "lng": "10.92371",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a9916d09-43ef-4416-bc90-cd5a8c6278d4"
              },
              {
                  "iconName": "vineyard",
                  "title": "Feudi di Guagnano",
                  "website": "http://www.feudiguagnano.it/?lang=en",
                  "instagram": "@feudiguagnano",
                  "town": "Guagnano",
                  "country": "Italy",
                  "phoneNumber": "39-0832-705422",
                  "lat": "40.40393",
                  "lng": "17.95057",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "460a5218-806b-452b-8684-b70d9f131086"
              },
              {
                  "iconName": "vineyard",
                  "title": "Rignana",
                  "website": "http://www.rignana.it/?lang=en#",
                  "instagram": "@fattoria_villa_rignana",
                  "town": "Greve in Chianti",
                  "country": "Italy",
                  "phoneNumber": "39-0558-52065",
                  "lat": "43.56063",
                  "lng": "11.26631",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "6036f339-8c26-4641-a274-05bee263f599"
              },
              {
                  "iconName": "vineyard",
                  "title": "Cantine di Orgosolo",
                  "website": "http://www.cantinediorgosolo.it/eng/",
                  "instagram": "@cantinediorgosolo",
                  "town": "Orgosolo",
                  "country": "Italy",
                  "phoneNumber": "39-0784-403096",
                  "lat": "40.21191",
                  "lng": "9.35412",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "ebbd8ccd-c1da-48db-aa05-3a013e8666fa"
              },
              {
                  "iconName": "vineyard",
                  "title": "Massimago",
                  "website": "http://www.massimago.com/",
                  "instagram": "@massimago",
                  "town": "Mezzane di Sotto",
                  "country": "Italy",
                  "phoneNumber": "39-0458-880143",
                  "lat": "45.47636",
                  "lng": "11.14583",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "bbc5d83c-f5c5-438f-aa3a-11de81961b82"
              },
              {
                  "iconName": "vineyard",
                  "title": "Cantina Terlano",
                  "website": "http://www.cantina-terlano.com/en/winery/",
                  "instagram": "@cantinaterlano",
                  "town": "Terlano",
                  "country": "Italy",
                  "phoneNumber": "39-0471-257135",
                  "lat": "46.53066",
                  "lng": "11.25194",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "8cf9c656-c5ec-454c-b20b-418a93177f41"
              },
              {
                  "iconName": "vineyard",
                  "title": "Quinta Nova",
                  "website": "http://www.quintanova.com/en/gallery/",
                  "instagram": "@quintanova.winesandtourism",
                  "town": "Covas do Douro",
                  "country": "Portugal",
                  "phoneNumber": "351-254-730-430",
                  "lat": "41.16173",
                  "lng": "-7.59577",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "899076f6-420b-4e93-95d4-399da20f980e"
              },
              {
                  "iconName": "vineyard",
                  "title": "Tenute Chiaromonte",
                  "website": "http://www.tenutechiaromonte.com/index.php?lg=eng",
                  "instagram": "@tenutechiaromonte",
                  "town": "Acquaviva delle Fonti",
                  "country": "Italy",
                  "phoneNumber": "39-080-768156",
                  "lat": "40.90178",
                  "lng": "16.86841",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "a913fa40-aeb7-4dfd-8348-1157f12dc0c3"
              },
              {
                  "iconName": "vineyard",
                  "title": "AA Badenhorst",
                  "website": "https://aabadenhorst.com/",
                  "instagram": "@aabadenhorst",
                  "town": "Swartland",
                  "country": "South Africa",
                  "phoneNumber": "27-80-373-5038",
                  "lat": "-33.54255",
                  "lng": "18.81865",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "45bc1200-befd-44a2-b124-c58cb730f51e"
              },
              {
                  "iconName": "vineyard",
                  "title": "Quinta do Crasto",
                  "website": "https://quintadocrasto.pt/wine-tourism/?lang=en",
                  "instagram": "@quintadocrasto",
                  "town": "Gouvinhas",
                  "country": "Portugal",
                  "phoneNumber": "351-254-920-020",
                  "lat": "41.16503",
                  "lng": "-7.62831",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "2b776365-6592-459a-987c-e19cb147eae6"
              },
              {
                  "iconName": "vineyard",
                  "title": "Hambledon Vineyard",
                  "website": "https://www.hambledonvineyard.co.uk/",
                  "instagram": "@hambledon_vineyard",
                  "town": "Hambledon",
                  "country": "England",
                  "phoneNumber": "44-023-9263-2358",
                  "lat": "50.93673",
                  "lng": "-1.07907",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "7c99604f-a01f-43b4-87e4-46f9f63d9ec9"
              },
              {
                  "iconName": "vineyard",
                  "title": "Quinta de la Rosa",
                  "website": "https://www.quintadelarosa.com/",
                  "instagram": "@quintadelarosa",
                  "town": "Pinhao",
                  "country": "Portugal",
                  "phoneNumber": "651-254-732-254",
                  "lat": "41.1823",
                  "lng": "-7.55253",
                  "map_id": "TheSpecialCuratedMap",
                  "id": "9d44a404-8ca6-4d29-8ff1-ed455c52632e"
              }
          ]
      },
      {
          "id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
          "title": "USA",
          "origin": {
              "lat": 40.017557,
              "lng": -105.278199
          },
          "zoom": 5,
          "locationList": [
              {
                  "iconName": "bar",
                  "title": "The Bar at the NoMad Hotel",
                  "website": "https://www.thenomadhotel.com/new-york/dining/spaces/the-nomad-bar",
                  "instagram": "@thenomadhotel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-823-9335",
                  "lat": "40.74482",
                  "lng": "-73.98827",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7c9e19bf-8a29-4eae-a5e9-8ecceebeba06",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "bar",
                  "title": "Anvil Bar & Refuge",
                  "website": "https://www.anvilhouston.com/",
                  "instagram": "@anvilhouston",
                  "town": "Houston",
                  "country": "USA",
                  "phoneNumber": "713-525-9400",
                  "lat": "29.74308",
                  "lng": "-95.39686",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d3ad9c1c-2c43-41b2-bc5f-3884ba904e8c",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "bar",
                  "title": "Bar Goto",
                  "website": "https://www.bargoto.com/",
                  "instagram": "@bargoto_nyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-5829",
                  "lat": "40.72277",
                  "lng": "-73.98989",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "88f2a3ec-31af-4d65-b29c-a3b4dee381ec",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "bar",
                  "title": "Maison Premiere",
                  "website": "https://maisonpremiere.com/",
                  "instagram": "@maisonpremiere",
                  "town": "Brooklyn",
                  "country": "USA",
                  "phoneNumber": "401-584-7000",
                  "lat": "40.71425",
                  "lng": "-73.96166",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "447dfb1c-ab2e-4969-a285-bc7d78f6a9c9",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "bar",
                  "title": "Lost Lake",
                  "website": "http://www.lostlaketiki.com/",
                  "instagram": "@lostlaketiki",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "773-477-5845",
                  "lat": "41.93212",
                  "lng": "-87.70713",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0f0a99dd-b87d-4017-b43b-d8265b74b429",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "bar",
                  "title": "Cure",
                  "website": "http://www.curenola.com/",
                  "instagram": "@curenola",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-522-5400",
                  "lat": "29.93501",
                  "lng": "-90.10746",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "591b8b97-11ae-40e9-bf40-e8d78d90ecc8",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "bar",
                  "title": "The Aviary",
                  "website": "https://theaviary.com/site/",
                  "instagram": "@thealineagroup",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.88657",
                  "lng": "-87.65206",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "472c2de6-467b-4c10-a55d-d0cef88ce4b4",
                  "iconImageObject": {
                      "url": "./assets/bar.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Foundation Brewing Company",
                  "website": "http://www.foundationbrew.com/",
                  "instagram": "@foundationbrew",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-573-2425",
                  "lat": "43.70294",
                  "lng": "-70.3201",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "dc04cdc8-061f-4283-a924-b3938583dc6d",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Blackberry Farm",
                  "website": "http://www.blackberryfarm.com/brewery/",
                  "instagram": "@blackberryfarm",
                  "town": "Walland",
                  "country": "USA",
                  "phoneNumber": "865-984-8166",
                  "lat": "35.69264",
                  "lng": "-83.86246",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "049bde6f-fc55-4d0e-9093-88c4bc7e9fc3",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Bunker Brewing Company",
                  "website": "http://www.bunkerbrewingco.com/",
                  "instagram": "@bunkerbrewing",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-747-5307",
                  "lat": "43.65267",
                  "lng": "-70.28369",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9ab7056c-fd59-48dd-983d-e526dd6cc205",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Two Roads Brewing Company",
                  "website": "https://tworoadsbrewing.com/",
                  "instagram": "@tworoadsbrewing",
                  "town": "Stratford",
                  "country": "USA",
                  "phoneNumber": "203-658-3631",
                  "lat": "41.18567",
                  "lng": "-73.14209",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "313d46db-f1f6-44c9-9ebf-11abe6dcf537",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Stone Brewing Co",
                  "website": "http://www.stonebrewing.com/",
                  "instagram": "@stonebrewing",
                  "town": "Escondido",
                  "country": "USA",
                  "phoneNumber": "760-448-1234",
                  "lat": "33.1158",
                  "lng": "-117.12001",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4090a6aa-e3b6-4ab6-9653-1bafa84485d9",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Rogue",
                  "website": "https://www.rogue.com/",
                  "instagram": "@rogueales",
                  "town": "Newport",
                  "country": "USA",
                  "phoneNumber": "575-776-2291",
                  "lat": "44.62022",
                  "lng": "-124.05233",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "532aa477-ec13-45d2-bf78-ad967a91530a",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Founders Brewing Co",
                  "website": "https://foundersbrewing.com/",
                  "instagram": "@foundersbrewing",
                  "town": "Grand Rapids",
                  "country": "USA",
                  "phoneNumber": "616-943-7373",
                  "lat": "42.95834",
                  "lng": "-85.67419",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "5f842bf5-dada-4cf1-8f3b-2ac48ea6013c",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Ninkasi Brewing",
                  "website": "http://www.ninkasibrewing.com",
                  "instagram": "@ninkasibrewing",
                  "town": "Eugene",
                  "country": "USA",
                  "phoneNumber": "541-347-4380",
                  "lat": "44.05692",
                  "lng": "-123.10958",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "92529775-2f28-4da4-8a24-12b42534f52b",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Aspen Brewing Company",
                  "website": "http://www.aspenbrewingcompany.com/",
                  "instagram": "@aspenbrewingcompany",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "970-920-3300",
                  "lat": "39.18985",
                  "lng": "-106.81842",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9d04e7f3-9fa4-4918-be2c-f0112cdf3180",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Banded Horn Brewing Company",
                  "website": "https://www.bandedhorn.com/",
                  "instagram": "@bandedhornbrewing",
                  "town": "Biddeford",
                  "country": "USA",
                  "phoneNumber": "207-613-9471",
                  "lat": "43.49284",
                  "lng": "-70.45275",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7800ae44-9bcd-400f-a432-6528cc64f599",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Bridge Brew Works",
                  "website": "http://www.bridgebrewworks.com/",
                  "instagram": "@bridgebrewworks",
                  "town": "Fayetteville",
                  "country": "USA",
                  "phoneNumber": "305-534-8800",
                  "lat": "38.0165",
                  "lng": "-81.11368",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "da0e9f27-ad66-4573-a1e5-1fcbe04dd029",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Bissell Brothers Brewing Company",
                  "website": "https://www.bissellbrothers.com/",
                  "instagram": "@bissellbrothers",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-824-3000",
                  "lat": "43.65141",
                  "lng": "-70.29055",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "351f2caa-6bc6-4046-b41a-98f134d41b6c",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Against the Grain Brewhouse",
                  "website": "http://www.atgbrewery.com/",
                  "instagram": "@atgbrewery",
                  "town": "Louisville",
                  "country": "USA",
                  "phoneNumber": "502-636-0783",
                  "lat": "38.25548",
                  "lng": "-85.74402",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "223f3b10-4037-4c3f-af80-b98916882e31",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Half Full Brewery",
                  "website": "http://www.halffullbrewery.com/",
                  "instagram": "@halffullbrewery",
                  "town": "Stamford",
                  "country": "USA",
                  "phoneNumber": "205-939-1400",
                  "lat": "41.0395",
                  "lng": "-73.54992",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4c973cab-c645-42f5-91bd-b520f7465d07",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Avery Brewing Co",
                  "website": "https://www.averybrewing.com/",
                  "instagram": "@averybrewingco",
                  "town": "Boulder",
                  "country": "USA",
                  "phoneNumber": "303-442-6966",
                  "lat": "40.06255",
                  "lng": "-105.20474",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a4799fb2-fb51-4560-87d5-529faedad66c",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Lord Hobo Brewing Co",
                  "website": "https://lordhobobrewing.com/",
                  "instagram": "@lordhobobrewing",
                  "town": "Woburn",
                  "country": "USA",
                  "phoneNumber": "786-257-4600",
                  "lat": "42.47609",
                  "lng": "-71.12889",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "417c7981-4e79-48ea-8a04-62c65820a598",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Allagash Brewing Company",
                  "website": "https://www.allagash.com/",
                  "instagram": "@allagashbrewing",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-967-2321",
                  "lat": "43.70314",
                  "lng": "-70.31769",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "5bed7470-dd17-4540-a862-da7525afd9da",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "New Belgium Brewing Company",
                  "website": "http://www.newbelgium.com/brewery",
                  "instagram": "@newbelgium",
                  "town": "Fort Collins",
                  "country": "USA",
                  "phoneNumber": "970-349-2222",
                  "lat": "40.59323",
                  "lng": "-105.0686",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8e91fda3-99ae-4e65-987b-569b99e259b2",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Maine Beer Company",
                  "website": "https://www.mainebeercompany.com/",
                  "instagram": "@mainebeerco",
                  "town": "Freeport",
                  "country": "USA",
                  "phoneNumber": "207-236-3391",
                  "lat": "43.83913",
                  "lng": "-70.1214",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "690aa803-3a16-4f9a-9a1f-810ad4b5fa6c",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Dogfish Head Craft Brewing",
                  "website": "https://www.dogfish.com",
                  "instagram": "@dogfishhead",
                  "town": "Milton",
                  "country": "USA",
                  "phoneNumber": "303-440-4324",
                  "lat": "38.77036",
                  "lng": "-75.31083",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c5dc74a0-1808-4704-9268-dcc9ea4e9d5b",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Brewery Ommegang",
                  "website": "http://www.ommegang.com/",
                  "instagram": "@breweryommegang",
                  "town": "Cooperstown",
                  "country": "USA",
                  "phoneNumber": "612-375-7600",
                  "lat": "42.6268",
                  "lng": "-74.94566",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a3fe972d-5bb1-4b0c-919b-343de08ece6d",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "Odell Brewing Co",
                  "website": "https://www.odellbrewing.com/",
                  "instagram": "@odellbrewing",
                  "town": "Fort Collins",
                  "country": "USA",
                  "phoneNumber": "970-726-5514",
                  "lat": "40.58946",
                  "lng": "-105.06318",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "42a545a3-75e6-4963-8f29-55fb986330e3",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "brewery",
                  "title": "3 Floyds Brewing Co",
                  "website": "https://www.3floyds.com",
                  "instagram": "@3floydsbrewing",
                  "town": "Munster",
                  "country": "USA",
                  "phoneNumber": "252-208-2433",
                  "lat": "41.53552",
                  "lng": "-87.51681",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3aeb362c-b092-4d86-960e-b9b6d2d76b8f",
                  "iconImageObject": {
                      "url": "./assets/brewery.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Pinehurst #2",
                  "website": "https://www.pinehurst.com/golf/courses/no-2/",
                  "instagram": "@pinehurstresort",
                  "town": "Pinehurst",
                  "country": "USA",
                  "phoneNumber": "888-333-5405",
                  "lat": "35.19131",
                  "lng": "-79.46349",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e240edff-f985-49dd-90b2-e8d7517da8ea",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Pinehurst #8",
                  "website": "https://www.pinehurst.com/golf/courses/no-8/",
                  "instagram": "@pinehurstresort",
                  "town": "Pinehurst",
                  "country": "USA",
                  "phoneNumber": "877-545-2124",
                  "lat": "35.21793",
                  "lng": "-79.471",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "cab1a6ae-96d5-42f5-8827-31296d16a789",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "TPC Sawgrass",
                  "website": "https://tpc.com/sawgrass/",
                  "instagram": "@tpcsawgrass",
                  "town": "Ponte Vedra",
                  "country": "USA",
                  "phoneNumber": "905-262-8463",
                  "lat": "30.19901",
                  "lng": "-81.39483",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4e261021-d64c-496e-b461-40e9570d7140",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Torrey Pines South",
                  "website": "http://www.torreypinesgolfcourse.com/index.html",
                  "instagram": "@torreypinesgolf",
                  "town": "La Jolla",
                  "country": "USA",
                  "phoneNumber": "863-428-1000",
                  "lat": "32.9043",
                  "lng": "-117.24448",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "92f0f3e1-d9b5-4d93-9609-b42e846070bf",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Pebble Beach",
                  "website": "https://www.pebblebeach.com/golf/pebble-beach-golf-links/",
                  "instagram": "@pebblebeachresorts",
                  "town": "Pebble Beach",
                  "country": "USA",
                  "phoneNumber": "831-667-2200",
                  "lat": "36.56877",
                  "lng": "-121.95061",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ec443d3a-85e5-49e9-8631-cfda3bf6df2d",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Spanish Bay",
                  "website": "https://www.pebblebeach.com/golf/the-links-at-spanish-bay/",
                  "instagram": "@pebblebeachresorts",
                  "town": "Pebble Beach",
                  "country": "USA",
                  "phoneNumber": "831-574-5608",
                  "lat": "36.61239",
                  "lng": "-121.94386",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "047f232a-bf39-483b-b878-c385b70dc8ae",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Spyglass Hill",
                  "website": "https://www.pebblebeach.com/golf/spyglass-hill-golf-course/",
                  "instagram": "@pebblebeachresorts",
                  "town": "Pebble Beach",
                  "country": "USA",
                  "phoneNumber": "831-574-5609",
                  "lat": "36.5838",
                  "lng": "-121.95581",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "10dd1b93-b8de-48ce-adc4-b4b78f8fc4b7",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Bandon Dunes",
                  "website": "https://www.bandondunesgolf.com/golf/golf-courses/bandon-dunes",
                  "instagram": "@bandondunesgolf",
                  "town": "Bandon",
                  "country": "USA",
                  "phoneNumber": "541-867-3660",
                  "lat": "43.18862",
                  "lng": "-124.39611",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "218443ba-e7e5-478b-a2da-203b7bd6a0a3",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Bethpage Black",
                  "website": "https://parks.ny.gov/golf-courses/11/details.aspx",
                  "instagram": "@bethpagegolf",
                  "town": "Farmingdale",
                  "country": "USA",
                  "phoneNumber": "518-891-5674",
                  "lat": "40.74297",
                  "lng": "-73.45453",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "384867ab-e30c-4a7e-a153-022e4446a156",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "The Irish  at Whistling Straits",
                  "website": "https://www.americanclubresort.com/golf/whistling-straits/the-irish",
                  "instagram": "@theamericanclub",
                  "town": "Sheboygan",
                  "country": "USA",
                  "phoneNumber": "800-618-5535",
                  "lat": "43.85698",
                  "lng": "-87.73838",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ad073079-4b96-4335-9d5a-5ea8338dcfda",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "golf course",
                  "title": "Whistling Straits",
                  "website": "https://www.americanclubresort.com/golf/whistling-straits/the-straits",
                  "instagram": "@theamericanclub",
                  "town": "Sheboygan",
                  "country": "USA",
                  "phoneNumber": "801-359-1078",
                  "lat": "43.85104",
                  "lng": "-87.73513",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "613a73f2-2268-4c8e-a3c5-cdb0d99fbfd3",
                  "iconImageObject": {
                      "url": "./assets/golf course.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Refinery Hotel New York",
                  "website": "https://www.refineryhotelnewyork.com/",
                  "instagram": "@refineryhotel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "646-774-1234",
                  "lat": "40.7522",
                  "lng": "-73.98537",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6c81f513-16e6-4351-990a-7b74cccedc95",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Wentworth Mansion",
                  "website": "https://www.wentworthmansion.com/",
                  "instagram": "@wentworthmansionsc",
                  "town": "Charleston",
                  "country": "USA",
                  "phoneNumber": "844-312-2221",
                  "lat": "32.77991",
                  "lng": "-79.9398",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7612f78e-0bf1-4e1d-a66b-56473e2290ee",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Malibu Beach Inn",
                  "website": "https://www.malibubeachinn.com/",
                  "instagram": "@malibubeachinn",
                  "town": "Malibu",
                  "country": "USA",
                  "phoneNumber": "310-860-7800",
                  "lat": "34.0381",
                  "lng": "-118.67437",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "27ca40f1-1d77-4b05-bf33-8b9a2066fdcc",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Wheatleigh",
                  "website": "https://www.wheatleigh.com/",
                  "instagram": "@wheatleighhotel",
                  "town": "Lenox",
                  "country": "USA",
                  "phoneNumber": "413-662-2111",
                  "lat": "42.34132",
                  "lng": "-73.30334",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fbcd65a9-1925-40f9-9e71-67e41f088df6",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Auberge Saint-Antoine",
                  "website": "https://saint-antoine.com/en/",
                  "instagram": "@aubergesaintantoine",
                  "town": "Quebec City",
                  "country": "Canada",
                  "phoneNumber": "418-692-3861",
                  "lat": "46.81444",
                  "lng": "-71.20178",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9cab9cb1-053f-443f-aa10-a17a69e50690",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Clayoquot Wilderness Resort",
                  "website": "https://wildretreat.com/",
                  "instagram": "@clayoquotresort",
                  "town": "Tofino",
                  "country": "Canada",
                  "phoneNumber": "902-285-2600",
                  "lat": "49.36359",
                  "lng": "-125.78038",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c313c52e-6109-467d-88d7-dc118eb8dcdf",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Blackberry Farm",
                  "website": "http://www.blackberryfarm.com/",
                  "instagram": "@blackberryfarm",
                  "town": "Walland",
                  "country": "USA",
                  "phoneNumber": "865-984-8166",
                  "lat": "35.68611",
                  "lng": "-83.86562",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ce7e0b82-3541-4d0b-be3e-642e8250f8e1",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Camden Harbour Inn",
                  "website": "https://www.camdenharbourinn.com/",
                  "instagram": "@camdenharbourinn",
                  "town": "Camden",
                  "country": "USA",
                  "phoneNumber": "207-370-8187",
                  "lat": "44.20586",
                  "lng": "-69.0616",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d52a99e9-553e-4034-9784-b69065d74874",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Home Ranch",
                  "website": "https://www.homeranch.com/",
                  "instagram": "@thehomeranch",
                  "town": "Clark",
                  "country": "USA",
                  "phoneNumber": "970-879-6111",
                  "lat": "40.71575",
                  "lng": "-106.9068",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "68e01913-637a-465a-a784-54a057dda6d8",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Little Nell",
                  "website": "https://www.thelittlenell.com/",
                  "instagram": "@thelittlenell",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "970-923-1227",
                  "lat": "39.18638",
                  "lng": "-106.81742",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8da4ae58-865e-4cee-9caf-5fda8e0f5f9c",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Meadowood Napa Valley",
                  "website": "http://www.meadowood.com/",
                  "instagram": "@meadowoodnapavalley",
                  "town": "St Helena",
                  "country": "USA",
                  "phoneNumber": "707-723-4646",
                  "lat": "38.52255",
                  "lng": "-122.46748",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "89e4b521-f586-4a9f-9761-601bd8fb064a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Ocean House",
                  "website": "https://www.oceanhouseri.com/",
                  "instagram": "@oceanhouseri",
                  "town": "Watch Hill",
                  "country": "USA",
                  "phoneNumber": "401-637-7600",
                  "lat": "41.31028",
                  "lng": "-71.85389",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "2524d993-e851-414b-adae-bf82bbfe3f97",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Point",
                  "website": "http://www.thepointsaranac.com/",
                  "instagram": "@the_pointresort",
                  "town": "Saranac Lake",
                  "country": "USA",
                  "phoneNumber": "541-247-6664",
                  "lat": "44.30372",
                  "lng": "-74.33133",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c2189e91-591a-49c2-880f-1609c75cf1b4",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Auberge du Soleil",
                  "website": "https://aubergedusoleil.aubergeresorts.com/",
                  "instagram": "@aubergedusoleil",
                  "town": "Rutherford",
                  "country": "USA",
                  "phoneNumber": "707-963-4704",
                  "lat": "38.49352",
                  "lng": "-122.40609",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c5d23acb-b343-4794-8a44-948e93295f00",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Surrey Hotel",
                  "website": "http://www.thesurrey.com/",
                  "instagram": "@surreyhotelnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-299-3900",
                  "lat": "40.77426",
                  "lng": "-73.96398",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "17967397-5242-4e9b-808e-e7ec14b2050d",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Triple Creek Ranch",
                  "website": "https://www.triplecreekranch.com/",
                  "instagram": "@triplecreekranch",
                  "town": "Darby",
                  "country": "USA",
                  "phoneNumber": "408-354-4330",
                  "lat": "45.88065",
                  "lng": "-114.20817",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "40dc16d8-d7ee-4556-9ba1-ae5b3703f7ab",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Weekapaug Inn",
                  "website": "http://www.weekapauginn.com/",
                  "instagram": "@weekapauginn",
                  "town": "Westerly",
                  "country": "USA",
                  "phoneNumber": "403-522-3555",
                  "lat": "41.33052",
                  "lng": "-71.75039",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ddd6fb54-9c41-432c-a834-b0344a14db13",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The White Barn Inn & Spa",
                  "website": "http://www.whitebarninn.com/",
                  "instagram": "@gracehotels",
                  "town": "Kennebunk Beach",
                  "country": "USA",
                  "phoneNumber": "208-622-2135",
                  "lat": "43.35529",
                  "lng": "-70.47954",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "017e5a36-6554-4e26-87ed-a199f2d60e32",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood CordeValle",
                  "website": "https://www.rosewoodhotels.com/en/cordevalle-northern-california",
                  "instagram": "@rwcordevalle",
                  "town": "San Martin",
                  "country": "USA",
                  "phoneNumber": "413-637-0610",
                  "lat": "37.06758",
                  "lng": "-121.63289",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "1386c613-2df1-4896-b984-4f40842217dc",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Amangiri",
                  "website": "https://www.aman.com/resorts/amangiri",
                  "instagram": "@amangiri",
                  "town": "Canyon Point",
                  "country": "USA",
                  "phoneNumber": "435-940-5700",
                  "lat": "37.01458",
                  "lng": "-111.61128",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a6255705-f7a6-4396-88c5-f9d19d9ac459",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Fairmont Le Chateau Frontenac",
                  "website": "http://www.fairmont.com/frontenac-quebec/",
                  "instagram": "@fairmontfrontenac",
                  "town": "Quebec City",
                  "country": "Canada",
                  "phoneNumber": "432-729-4362",
                  "lat": "46.81198",
                  "lng": "-71.20502",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "68e3342e-9660-4f90-8eb5-182bc3778e70",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Mohonk Mountain House",
                  "website": "https://www.mohonk.com/",
                  "instagram": "@mohonkmountainhouse",
                  "town": "New Paltz",
                  "country": "USA",
                  "phoneNumber": "855-331-7213",
                  "lat": "41.76829",
                  "lng": "-74.15602",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a8dba88b-523b-4da8-93ba-a59280a46fdb",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Union Station Hotel Nashville",
                  "website": "http://www.unionstationhotelnashville.com/",
                  "instagram": "@unionstationnashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "616-776-1195",
                  "lat": "36.15724",
                  "lng": "-86.78484",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ba0e1024-5ae4-492b-8bbc-a61c104e6626",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Washington, D.C.",
                  "website": "https://www.rosewoodhotels.com/en/washington-dc",
                  "instagram": "@rwwashingtondc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-633-1000",
                  "lat": "38.90399",
                  "lng": "-77.06132",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d7989115-9602-45d8-a443-5edbc007c29b",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Chicago",
                  "website": "http://www.chicago.peninsula.com/en/default",
                  "instagram": "@thepeninsulachi",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-337-6070",
                  "lat": "41.89617",
                  "lng": "-87.62515",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3dd9ac16-744b-45e7-84f8-c29643e21c81",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Thompson Seattle",
                  "website": "http://www.thompsonhotels.com/hotels/seattle/thompson-seattle",
                  "instagram": "@thompsonseattle",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-654-3100",
                  "lat": "47.61071",
                  "lng": "-122.34139",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "562c99f9-16a4-4565-9eca-d8787dd2adf7",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Inn of the Anasazi",
                  "website": "https://www.rosewoodhotels.com/en/inn-of-the-anasazi-santa-fe",
                  "instagram": "@rwinnofanasazi",
                  "town": "Santa Fe",
                  "country": "USA",
                  "phoneNumber": "508-228-2500",
                  "lat": "35.68795",
                  "lng": "-105.93689",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "2ef9190d-e101-4603-a65b-fe9c19bdbe73",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, Chicago",
                  "website": "https://www.sohohousechicago.com/",
                  "instagram": "@sohohouse",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-715-0708",
                  "lat": "41.88375",
                  "lng": "-87.64839",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "814cd143-0720-4790-a350-f3eeb09647c3",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Press Hotel",
                  "website": "http://www.thepresshotel.com/",
                  "instagram": "@thepresshotel",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-596-0770",
                  "lat": "43.65885",
                  "lng": "-70.25634",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3e1d8883-ddb5-444a-9260-a81770e82cb8",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Chicago Athletic Association Hotel",
                  "website": "http://www.chicagoathletichotel.com/",
                  "instagram": "@chicagoathletichotel",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "845-765-3286",
                  "lat": "41.88166",
                  "lng": "-87.625",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ac9af370-7d6c-466a-ac2a-d15531fb1df1",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Washington",
                  "website": "https://washingtondc.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattdc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "203-335-2010",
                  "lat": "38.90586",
                  "lng": "-77.05103",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7aeeee64-f9b9-43ec-8f08-e2bae3cba61c",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Austin Motel",
                  "website": "http://www.austinmotel.com/",
                  "instagram": "@austinmotel",
                  "town": "Austin",
                  "country": "USA",
                  "phoneNumber": "512-653-1137",
                  "lat": "30.25158",
                  "lng": "-97.74941",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "987b9ff3-b6c9-45cf-b2d8-5c93324a0554",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, San Francisco",
                  "website": "http://www.stregissanfrancisco.com/",
                  "instagram": "@stregissf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-292-0100",
                  "lat": "37.78594",
                  "lng": "-122.40144",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d7666e5b-5ec0-4b5b-b847-15fce9ef3bc8",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Beaver Creek Resort & Spa",
                  "website": "https://beavercreek.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattbc",
                  "town": "Beaver Creek",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "39.60448",
                  "lng": "-106.51564",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "68558194-203b-46c3-a0d3-4d36a2143c33",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "XV Beacon",
                  "website": "http://xvbeacon.com/",
                  "instagram": "@xvbeaconhotel",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-737-0099",
                  "lat": "42.3584",
                  "lng": "-71.06196",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "02038827-ffe4-4cdd-8cf8-3e5010c8222c",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Edson Hill",
                  "website": "http://www.edsonhill.com/",
                  "instagram": "@edsonhillvt",
                  "town": "Stowe",
                  "country": "USA",
                  "phoneNumber": "802-297-4000",
                  "lat": "44.511",
                  "lng": "-72.73463",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "51f8db71-6fae-433f-9e9d-9cb3363b5344",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, New York",
                  "website": "https://newyork.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "647-253-6227",
                  "lat": "40.76537",
                  "lng": "-73.97907",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "32d0ef30-013c-407b-ad8c-88cab9ff6a9b",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Amangani",
                  "website": "https://www.aman.com/resorts/amangani",
                  "instagram": "@amangani",
                  "town": "Jackson",
                  "country": "USA",
                  "phoneNumber": "310-432-9200",
                  "lat": "43.50405",
                  "lng": "-110.77424",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f763fd6c-50cf-4e65-83f5-04fb1111dbc9",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Ludlow",
                  "website": "http://www.ludlowhotel.com/",
                  "instagram": "@ludlowhotelnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-4411",
                  "lat": "40.72182",
                  "lng": "-73.98735",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3f89bb51-021e-44cf-a3a3-84bb4746eb0d",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Houston",
                  "website": "http://www.stregishoustonhotel.com/",
                  "instagram": "@stregishouston",
                  "town": "Houston",
                  "country": "USA",
                  "phoneNumber": "718-552-2610",
                  "lat": "29.7477",
                  "lng": "-95.4504",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "66e86938-8aa1-4067-8da6-63861476581f",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, Toronto",
                  "website": "https://www.sohohousetoronto.com/",
                  "instagram": "@sohohouse",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "416-963-6000",
                  "lat": "43.64881",
                  "lng": "-79.38646",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "26d489b7-4a3f-46da-bea3-dbf4271067ae",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, New York",
                  "website": "http://www.stregisnewyork.com/",
                  "instagram": "@stregisnewyork",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-777-7773",
                  "lat": "40.76134",
                  "lng": "-73.97452",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "660b02e3-d9d9-4c99-a51f-fdd73836ffc0",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Metropolitan at The 9",
                  "website": "http://www.metropolitancleveland.com/#gref",
                  "instagram": "@the9cle",
                  "town": "Cleveland",
                  "country": "USA",
                  "phoneNumber": "219-922-3565",
                  "lat": "41.49973",
                  "lng": "-81.68578",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "856348ca-3c26-4b33-9969-617407643616",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Thompson Chicago",
                  "website": "http://www.thompsonhotels.com/hotels/chicago/thompson-chicago",
                  "instagram": "@thompsonchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-280-2660",
                  "lat": "41.90135",
                  "lng": "-87.62741",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "17d9b7ed-c06d-4dad-9817-24c3befad6ec",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Liberty",
                  "website": "http://www.libertyhotel.com/",
                  "instagram": "@liberty_hotel",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-267-9300",
                  "lat": "42.36193",
                  "lng": "-71.06962",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0fe1b617-e4a5-49fb-b114-35b6be43777e",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Beverly Hills",
                  "website": "https://www.montagehotels.com/beverlyhills/",
                  "instagram": "@montagebh",
                  "town": "Beverly Hills",
                  "country": "USA",
                  "phoneNumber": "312-266-2100",
                  "lat": "34.06773",
                  "lng": "-118.39892",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6aca0796-a4cc-44ea-b0ac-5cb889df0c61",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Deer Valley",
                  "website": "http://www.stregisdeervalley.com/",
                  "instagram": "@stregisdv",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "443-573-1700",
                  "lat": "40.63806",
                  "lng": "-111.47719",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d0fd507f-c4ea-4e00-b880-eec3f941bb0a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Monterey Tides",
                  "website": "http://www.jdvhotels.com/hotels/california/monterey-hotels/monterey-tides/?utm_source=local&utm_campaign=gmb&utm_medium=organic",
                  "instagram": "@montereytides",
                  "town": "Monterey",
                  "country": "USA",
                  "phoneNumber": "831-574-5607",
                  "lat": "36.61113",
                  "lng": "-121.85892",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d00c96bf-c0bb-4aae-98a6-51a394fd084b",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Mansion on Turtle Creek",
                  "website": "https://www.rosewoodhotels.com/en/mansion-on-turtle-creek-dallas",
                  "instagram": "@rwmansionturtlecreek",
                  "town": "Dallas",
                  "country": "USA",
                  "phoneNumber": "215-271-8299",
                  "lat": "32.80411",
                  "lng": "-96.80738",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fe5d5d13-f58f-457a-bf5c-4877dd0b78f5",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Sand Hill",
                  "website": "https://www.rosewoodhotels.com/en/sand-hill-menlo-park",
                  "instagram": "@rwsandhill",
                  "town": "Menlo Park",
                  "country": "USA",
                  "phoneNumber": "707-226-1395",
                  "lat": "37.41954",
                  "lng": "-122.21187",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "cbbd049f-b79e-4410-94cb-9f44b56914c2",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, New York",
                  "website": "https://www.sohohouseny.com/",
                  "instagram": "@sohohouse",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-744-1600",
                  "lat": "40.74058",
                  "lng": "-74.00583",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "21cb62e1-7c3c-479c-8388-d3a7ec6e3aad",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Laguna Beach",
                  "website": "https://www.montagehotels.com/lagunabeach/",
                  "instagram": "@montagelaguna",
                  "town": "Laguna Beach",
                  "country": "USA",
                  "phoneNumber": "970-221-0524",
                  "lat": "33.51496",
                  "lng": "-117.75716",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "792f690a-f997-4a4c-836a-9ac0c804c16a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Aspen Resort",
                  "website": "https://www.stregisaspen.com/",
                  "instagram": "@stregisaspen",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "970-920-4600",
                  "lat": "39.18691",
                  "lng": "-106.82111",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fd555a06-292d-4a7e-bc81-f1f5daf35ebd",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Jerome",
                  "website": "https://hoteljerome.aubergeresorts.com/",
                  "instagram": "@hoteljeromeaspen",
                  "town": "Aspen",
                  "country": "USA",
                  "phoneNumber": "858-581-7171",
                  "lat": "39.19085",
                  "lng": "-106.8195",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "805cf49f-646b-4036-9c75-caed4efc8f20",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Langham, Chicago",
                  "website": "http://www.langhamhotels.com/en/the-langham/chicago/",
                  "instagram": "@langhamchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-944-8888",
                  "lat": "41.88862",
                  "lng": "-87.62758",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9962b271-4c17-4c25-a0ba-0579fc8ecf4a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel Terra, Jackson Hole",
                  "website": "http://www.hotelterrajacksonhole.com/",
                  "instagram": "@hotelterra",
                  "town": "Teton Village",
                  "country": "USA",
                  "phoneNumber": "307-733-2292",
                  "lat": "43.58658",
                  "lng": "-110.829",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "781fc394-2162-4f1b-9a7d-3863b54aa495",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Carlyle, a Rosewood Hotel",
                  "website": "https://www.rosewoodhotels.com/en/the-carlyle-new-york",
                  "instagram": "@thecarlylehotel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-753-4500",
                  "lat": "40.7744",
                  "lng": "-73.96315",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c76ad358-366b-46eb-b54b-147fbd4f05b1",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Christiania at Vail",
                  "website": "https://www.destinationhotels.com/christiania-vail",
                  "instagram": "@christiania_at_vail",
                  "town": "Vail",
                  "country": "USA",
                  "phoneNumber": "970-498-9070",
                  "lat": "39.63986",
                  "lng": "-106.37221",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9a91363c-2a23-4e93-96e2-15d21217a51a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "JW Marriott Parq Vancouver",
                  "website": "http://www.marriott.com/hotels/travel/yvrjw-jw-marriott-parq-vancouver/",
                  "instagram": "@jwmarriottvan",
                  "town": "Vancouver",
                  "country": "Canada",
                  "phoneNumber": "604-682-5566",
                  "lat": "49.27514",
                  "lng": "-123.11292",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d4c1c6e3-7c62-4fbe-a00a-d3f0c5e883b8",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Thompson Nashville",
                  "website": "http://www.thompsonhotels.com/hotels/nashville/thompson-nashville",
                  "instagram": "@thompsonnashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "615-726-1001",
                  "lat": "36.15247",
                  "lng": "-86.78403",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0f02aa5e-2fc5-4e00-80c6-191e93155515",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Hotel William Gray",
                  "website": "http://www.hotelwilliamgray.com/",
                  "instagram": "@hotelwilliamgray",
                  "town": "Montreal",
                  "country": "Canada",
                  "phoneNumber": "516-249-0700",
                  "lat": "45.50724",
                  "lng": "-73.55339",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d22457c6-23b5-447b-a308-4adf2cdb46e3",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Palmetto Bluff",
                  "website": "https://www.montagehotels.com/palmettobluff/",
                  "instagram": "@montagepalmettobluff",
                  "town": "Bluffton",
                  "country": "USA",
                  "phoneNumber": "843-853-1886",
                  "lat": "32.204",
                  "lng": "-80.88407",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d864dc80-9800-4f61-9724-6ff12da1a0bd",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Post Ranch Inn",
                  "website": "http://www.postranchinn.com/",
                  "instagram": "@postranchinn",
                  "town": "Big Sur",
                  "country": "USA",
                  "phoneNumber": "831-667-2331",
                  "lat": "36.23025",
                  "lng": "-121.77181",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ab9f6b84-f85d-4d1c-b5a9-045aba635724",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Ventana Inn & Spa",
                  "website": "http://www.ventanainn.com/",
                  "instagram": "@ventana_inn",
                  "town": "Big Sur",
                  "country": "USA",
                  "phoneNumber": "843-577-0025",
                  "lat": "36.22915",
                  "lng": "-121.76035",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3897a567-b9ee-4f37-951e-931187ad8fe4",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "White Elephant Village",
                  "website": "http://www.whiteelephanthotel.com/",
                  "instagram": "@whiteelephantnantucket",
                  "town": "Nantucket",
                  "country": "USA",
                  "phoneNumber": "508-693-6611",
                  "lat": "41.28841",
                  "lng": "-70.09694",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e0486063-2ad6-47a8-8784-e9563257253e",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Marker, San Francisco",
                  "website": "http://www.jdvhotels.com/hotels/california/san-francisco-hotels/the-marker-san-francisco/",
                  "instagram": "@themarkersf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-393-9000",
                  "lat": "37.78665",
                  "lng": "-122.4119",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "966371dc-451f-400f-bec6-ce3848e7436e",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Whitehall",
                  "website": "https://www.whitehallmaine.com/",
                  "instagram": "@whitehallmaine",
                  "town": "Camden",
                  "country": "USA",
                  "phoneNumber": "207-236-4200",
                  "lat": "44.21675",
                  "lng": "-69.05906",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fe63310c-6d4d-4d68-adb9-f44a15cb067a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Calistoga Ranch",
                  "website": "https://calistogaranch.aubergeresorts.com/",
                  "instagram": "@calistogaranch",
                  "town": "Napa Valley",
                  "country": "USA",
                  "phoneNumber": "707-261-6410",
                  "lat": "38.57976",
                  "lng": "-122.51276",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "eebed2b7-f59c-43f5-9ff4-2e57c978cf27",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Summercamp",
                  "website": "https://www.summercamphotel.com/",
                  "instagram": "@summercamphotel",
                  "town": "Oak Bluffs",
                  "country": "USA",
                  "phoneNumber": "512-441-1157",
                  "lat": "41.4569",
                  "lng": "-70.56017",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0caa9f10-23d4-4a25-b62c-d571a815541c",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula New York",
                  "website": "http://www.newyork.peninsula.com/en/default",
                  "instagram": "@thepeninsulanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "213-232-6200",
                  "lat": "40.76164",
                  "lng": "-73.97543",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9db2efe6-464b-4829-940f-24d59b4fa782",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Aviara Resort Golf Club & Spa",
                  "website": "https://aviara.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattaviara",
                  "town": "Carlsbad",
                  "country": "USA",
                  "phoneNumber": "773-293-6048",
                  "lat": "33.09923",
                  "lng": "-117.2855",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "2ac29677-e0bc-4790-ba77-1ab91337b57a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Stein Eriksen Lodge Deer Valley",
                  "website": "http://www.steinlodge.com/",
                  "instagram": "@steinlodge",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-649-8111",
                  "lat": "40.6221",
                  "lng": "-111.49094",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4713e0fd-f9f9-4ab5-9922-f753844b8302",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Farmhouse Inn",
                  "website": "http://www.farmhouseinn.com/",
                  "instagram": "@farmhouse_inn",
                  "town": "Forestville",
                  "country": "USA",
                  "phoneNumber": "707-942-7022",
                  "lat": "38.48956",
                  "lng": "-122.88367",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "45cb5a74-f390-4fc0-a5a7-27c540199545",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Park Hyatt, Chicago",
                  "website": "https://chicago.park.hyatt.com/en/hotel/home.html",
                  "instagram": "@parkhyattchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-337-2888",
                  "lat": "41.89711",
                  "lng": "-87.62529",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "66f256a1-b591-4d28-af9b-fe9f19b99517",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Rosewood Hotel Georgia",
                  "website": "https://www.rosewoodhotels.com/en/hotel-georgia-vancouver",
                  "instagram": "@rwhotelgeorgia",
                  "town": "Vancouver",
                  "country": "Canada",
                  "phoneNumber": "604-967-8950",
                  "lat": "49.28347",
                  "lng": "-123.11903",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3e2c7db6-54f1-486c-bfd7-ca0e372a2d8a",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Atlanta",
                  "website": "http://www.stregisatlanta.com/",
                  "instagram": "@stregisatl",
                  "town": "Atlanta",
                  "country": "USA",
                  "phoneNumber": "404-733-4400",
                  "lat": "33.8399",
                  "lng": "-84.38255",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "cee0445e-6cd4-449f-8ca9-341ab999b214",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Montage Deer Valley",
                  "website": "https://www.montagehotels.com/deervalley/",
                  "instagram": "@montagedeervalley",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-649-1000",
                  "lat": "40.6159",
                  "lng": "-111.51183",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0b2855d5-f4ac-4a58-9616-a32d20d34fca",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Soho House, West Hollywood",
                  "website": "https://www.sohohousewh.com/",
                  "instagram": "@sohohouse",
                  "town": "West Hollywood",
                  "country": "USA",
                  "phoneNumber": "310-551-2888",
                  "lat": "34.08981",
                  "lng": "-118.3928",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "20b465e1-ae39-4c6f-98a8-1a969b02ab73",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The St Regis, Washington DC",
                  "website": "http://www.stregiswashingtondc.com/",
                  "instagram": "@stregisdc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-789-1234",
                  "lat": "38.90208",
                  "lng": "-77.03604",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e17e8deb-c425-40f2-9c74-dd3c8a3fd75e",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Saint",
                  "website": "http://www.thesainthotelneworleans.com/",
                  "instagram": "@thesainthotel",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-599-2119",
                  "lat": "29.95519",
                  "lng": "-90.07142",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8bbef3a7-d7cd-4aa8-abd4-aad21ef3a278",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Fairmont San Francisco",
                  "website": "http://www.fairmont.com/san-francisco/",
                  "instagram": "@fairmontsanfrancisco",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-775-8500",
                  "lat": "37.79236",
                  "lng": "-122.41056",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3c3fc056-4a6d-4d51-8dc2-c95b6264b4da",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "Tu Tu'tun Lodge",
                  "website": "http://www.tututun.com/",
                  "instagram": "@tututunlodge",
                  "town": "Gold Beach",
                  "country": "USA",
                  "phoneNumber": "541-344-2739",
                  "lat": "42.4758",
                  "lng": "-124.33728",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "062f6a04-f196-4e6b-91dd-858c54a43082",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "lodging",
                  "title": "The Peninsula Beverly Hills",
                  "website": "http://www.beverlyhills.peninsula.com/en/default",
                  "instagram": "@thepeninsulabh",
                  "town": "Beverly Hills",
                  "country": "USA",
                  "phoneNumber": "310-651-7777",
                  "lat": "34.06578",
                  "lng": "-118.41056",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "1f1965f2-3ab4-4d5e-9f31-8e06c794d7e8",
                  "iconImageObject": {
                      "url": "./assets/lodging.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Chinati Foundation",
                  "website": "https://www.chinati.org/",
                  "instagram": "@chinatifoundation",
                  "town": "Marfa",
                  "country": "USA",
                  "phoneNumber": "435-604-1300",
                  "lat": "30.30002",
                  "lng": "-104.02604",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "b1498402-0ea2-4866-9b2d-c8030c48b259",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Baltimore Museum of Art",
                  "website": "https://artbma.org/",
                  "instagram": "@baltimoremuseumofart",
                  "town": "Baltimore",
                  "country": "USA",
                  "phoneNumber": "502-217-6300",
                  "lat": "39.32595",
                  "lng": "-76.61938",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d959ee34-549d-4200-870e-c9570b64eaa0",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "MASS MoCA",
                  "website": "https://massmoca.org/",
                  "instagram": "@massmoca",
                  "town": "North Adams",
                  "country": "USA",
                  "phoneNumber": "414-224-3200",
                  "lat": "42.70187",
                  "lng": "-73.11519",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8bd982ee-9b4e-4c1a-a91b-b29fcf8b98b5",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "High Museum of Art",
                  "website": "https://www.high.org/",
                  "instagram": "@highmuseumofart",
                  "town": "Atlanta",
                  "country": "USA",
                  "phoneNumber": "406-821-4600",
                  "lat": "33.79006",
                  "lng": "-84.38555",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "325b9e41-e628-40ac-9ceb-73b834fe34aa",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Seattle Art Museum",
                  "website": "http://www.seattleartmuseum.org/",
                  "instagram": "@seattleartmuseum",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "207-221-5711",
                  "lat": "47.6073",
                  "lng": "-122.33813",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4b2bc5c3-5f87-4edf-a0b8-ed9928213a44",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Montreal Museum of Fine Arts",
                  "website": "https://www.mbam.qc.ca/en/",
                  "instagram": "@mbamtl",
                  "town": "Montreal",
                  "country": "Canada",
                  "phoneNumber": "514-392-2781",
                  "lat": "45.49852",
                  "lng": "-73.5794",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9193b81b-441f-4e4f-9565-10d7f7d90247",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "The Menil Collection",
                  "website": "https://www.menil.org/",
                  "instagram": "@menilcollection",
                  "town": "Houston",
                  "country": "USA",
                  "phoneNumber": "713-840-7600",
                  "lat": "29.73734",
                  "lng": "-95.39851",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "404a178d-9acc-4835-9f6c-9a883a06da5c",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Phillips Collection",
                  "website": "http://www.phillipscollection.org/",
                  "instagram": "@phillipscollection",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-393-0812",
                  "lat": "38.91175",
                  "lng": "-77.04691",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0b3215fc-0e0c-4d1d-af7d-06813e4ca149",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Asian Art Museum",
                  "website": "http://www.asianart.org/",
                  "instagram": "@asianartmuseum",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-685-4860",
                  "lat": "37.78016",
                  "lng": "-122.41619",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c1294ae5-6c64-4b40-a5e4-ff20be8a4485",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "The Museum of Contemporary Art",
                  "website": "https://mcachicago.org/",
                  "instagram": "@mcachicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-335-1234",
                  "lat": "41.89722",
                  "lng": "-87.62134",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "1b3b0786-a436-425b-83e1-eaa379dd34f8",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "The Broad",
                  "website": "https://www.thebroad.org/",
                  "instagram": "@thebroadmuseum",
                  "town": "Los Angeles",
                  "country": "USA",
                  "phoneNumber": "214-559-2100",
                  "lat": "34.05438",
                  "lng": "-118.25064",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7e2ebc62-3a0e-4eeb-90bc-869c3e1d2238",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Isabella Stewart Gardner Museum",
                  "website": "https://www.gardnermuseum.org/",
                  "instagram": "@gardnermuseum",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-661-0505",
                  "lat": "42.33818",
                  "lng": "-71.09912",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c1a962ef-2afc-4c28-b966-afaff7d145f8",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Kimbell Art Museum",
                  "website": "https://www.kimbellart.org/",
                  "instagram": "@kimbellartmuseum",
                  "town": "Fort Worth",
                  "country": "USA",
                  "phoneNumber": "819-681-3000",
                  "lat": "32.74857",
                  "lng": "-97.36492",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "cbb90ec9-777a-4f7d-9e88-40b177735b72",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Pulitzer Arts Foundation",
                  "website": "https://pulitzerarts.org/",
                  "instagram": "@pulitzerarts",
                  "town": "St Louis",
                  "country": "USA",
                  "phoneNumber": "323-297-0100",
                  "lat": "38.64021",
                  "lng": "-90.2345",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d53ebc42-49e6-4f1a-a495-297d4adae2d7",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Museum of Fine Arts",
                  "website": "https://www.mfa.org/",
                  "instagram": "@mfaboston",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-542-5200",
                  "lat": "42.33938",
                  "lng": "-71.09404",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "b4291f75-6bc1-4f3d-9656-bdfc4d4f5998",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "MH de Young Museum",
                  "website": "https://deyoung.famsf.org/",
                  "instagram": "@deyoungmuseum",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-772-5000",
                  "lat": "37.77147",
                  "lng": "-122.46867",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7a0b53fb-b11e-41d7-8351-3126a090bc2c",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Detroit Institute of Arts",
                  "website": "https://www.dia.org/",
                  "instagram": "@diadetroit",
                  "town": "Detroit",
                  "country": "USA",
                  "phoneNumber": "314-754-1850",
                  "lat": "42.35941",
                  "lng": "-83.06457",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4061b218-c6c3-4000-8a53-0794df35a957",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Portland Museum of Art",
                  "website": "https://www.portlandmuseum.org/",
                  "instagram": "@ptldmuseumofart",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-805-1336",
                  "lat": "43.65388",
                  "lng": "-70.26261",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6e3151ca-efd6-411a-9f7d-dc428be4fed0",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Milwaukee Art Museum",
                  "website": "https://mam.org/",
                  "instagram": "@milwaukeeart",
                  "town": "Milwaukee",
                  "country": "USA",
                  "phoneNumber": "415-284-4000",
                  "lat": "43.04007",
                  "lng": "-87.89705",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "717806ca-be15-41a5-b3ff-ac5d1a608710",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Walker Art Center",
                  "website": "https://walkerart.org/",
                  "instagram": "@walkerartcenter",
                  "town": "Minneapolis",
                  "country": "USA",
                  "phoneNumber": "615-226-9442",
                  "lat": "44.96845",
                  "lng": "-93.28919",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "61c4f26d-8cbd-4dc1-9f34-2ab66e2af1db",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "museum",
                  "title": "Smithsonian American Art Museum",
                  "website": "https://americanart.si.edu/",
                  "instagram": "@americanartmuseum",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-638-2626",
                  "lat": "38.89786",
                  "lng": "-77.02294",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8ca392ac-b764-4411-930f-8345c586a679",
                  "iconImageObject": {
                      "url": "./assets/museum.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Acadia National Park",
                  "website": "https://www.nps.gov/acad/index.htm",
                  "instagram": "@acadianps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "44.33856",
                  "lng": "-68.27333",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "13149c5c-7ae6-471d-b0a4-6b98af1700b4",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Arches National Park",
                  "website": "https://www.nps.gov/arch/index.htm",
                  "instagram": "@archesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.7331",
                  "lng": "-109.59251",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9e393664-306f-40d8-8042-495e53adc183",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Badlands National Park",
                  "website": "https://www.nps.gov/badl/index.htm",
                  "instagram": "@badlandsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "43.85541",
                  "lng": "-102.33969",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "1e1256ed-0883-4035-969f-973e0d7e1765",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Big Bend National Park",
                  "website": "https://www.nps.gov/bibe/index.htm",
                  "instagram": "@bigbendnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "29.12752",
                  "lng": "-103.24254",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a43b4d98-44a0-47ea-a1bd-46a2352cdac2",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Black Canyon of the Gunnison National Park",
                  "website": "https://www.nps.gov/blca/index.htm",
                  "instagram": "@blackcanyonnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.57541",
                  "lng": "-107.74159",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a228c447-4fd7-4255-b410-84d3bee91254",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Bryce Canyon National Park",
                  "website": "https://www.nps.gov/brca/index.htm",
                  "instagram": "@brycecanyonnps_gov",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.59305",
                  "lng": "-112.18708",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "21f7e350-71a5-4837-b219-c263cc116694",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Canyonlands National Park",
                  "website": "https://www.nps.gov/cany/index.htm",
                  "instagram": "@canyonloandsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.32689",
                  "lng": "-109.87826",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d4e0e30d-6c31-423f-bd8c-ec25fa13099c",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Capitol Reef National Park",
                  "website": "https://www.nps.gov/care/index.htm",
                  "instagram": "@capitolreefnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.36699",
                  "lng": "-111.2615",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "18bc8b77-c69e-4181-a0db-169b124396d0",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Carlsbad Caverns National Park",
                  "website": "https://www.nps.gov/cave/index.htm",
                  "instagram": "@carlsbadcavernsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "32.14788",
                  "lng": "-104.55671",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8bb617ab-a063-48e2-96ae-8e7535f8569d",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Channel Islands National Park",
                  "website": "https://www.nps.gov/chis/index.htm",
                  "instagram": "@channelislandsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "33.9961",
                  "lng": "-119.76916",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "de5ec83d-237f-4574-9a7e-871e0e3c9131",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Congaree National Park",
                  "website": "https://www.nps.gov/cong/index.htm",
                  "instagram": "@congareenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "33.7914",
                  "lng": "-80.76932",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "65e862e2-81bd-4c4d-9e8b-6032f0a8d94d",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Cuyahoga Valley National Park",
                  "website": "https://www.nps.gov/cuva/index.htm",
                  "instagram": "@cuyahogavalleynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.28085",
                  "lng": "-81.56781",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "43f10a7d-e72a-4e88-9e1b-2ebabdb86d89",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Death Valley National Park",
                  "website": "https://www.nps.gov/deva/index.htm",
                  "instagram": "@deathvalleynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.50541",
                  "lng": "-117.07941",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "1b4bde8a-ea59-49a3-8021-ae3de5b1f526",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Glacier National Park",
                  "website": "https://www.nps.gov/glac/index.htm",
                  "instagram": "@glaciernps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "48.75963",
                  "lng": "-113.78702",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fc5013b1-1790-4ccb-8c98-a1ae0ca0f552",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Grand Canyon National Park",
                  "website": "https://www.nps.gov/grca/index.htm",
                  "instagram": "@grandcanyonnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.10697",
                  "lng": "-112.11299",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a8136ceb-fbc8-4224-a227-1644bf710bc9",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Great Sand Dunes National Park",
                  "website": "https://www.nps.gov/grsa/index.htm",
                  "instagram": "@greatsanddunesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.79163",
                  "lng": "-105.59432",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d749c42d-a45d-4207-8fff-78aec561f91f",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Great Smoky Mountains National Park",
                  "website": "https://www.nps.gov/grsm/index.htm",
                  "instagram": "@greatsmokynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "35.61179",
                  "lng": "-83.48954",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7ff0f204-68da-4d55-9fda-3c6a8e607050",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Grand Teton National Park",
                  "website": "https://www.nps.gov/grte/index.htm",
                  "instagram": "@grandtetonnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "43.79045",
                  "lng": "-110.68176",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "922ae0c0-9989-4167-a13f-80f1142a5be5",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Guadalupe Mountains National Park",
                  "website": "https://www.nps.gov/gumo/index.htm",
                  "instagram": "@guadalupemountainsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "31.94521",
                  "lng": "-104.87252",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a6c6554f-cc43-4ffa-9308-43b10e060c3f",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Hot Springs National Park",
                  "website": "https://www.nps.gov/hosp/index.htm",
                  "instagram": "@hotspringsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "34.52172",
                  "lng": "-93.04235",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "5efd80d3-8050-4706-bed2-2865074d94a2",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Isle Royale National Park",
                  "website": "https://www.nps.gov/isro/index.htm",
                  "instagram": "@isleroyalenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "47.99588",
                  "lng": "-88.90929",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "94ed93f9-9e83-4993-812c-dbafbdd215d6",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Joshua Tree National Park",
                  "website": "https://www.nps.gov/jotr/index.htm",
                  "instagram": "@joshuatreenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "33.87343",
                  "lng": "-115.90099",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ea8d7cfe-9c3a-48e1-a827-26c82e85f531",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Lassen Volcanic National Park",
                  "website": "https://www.nps.gov/lavo/index.htm",
                  "instagram": "@lassennps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "40.49768",
                  "lng": "-121.42065",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "04f3e8a7-e7e8-4740-8a69-a04f619de7d1",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Mesa Verde National Park",
                  "website": "https://www.nps.gov/meve/index.htm",
                  "instagram": "@mesaverdenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.23089",
                  "lng": "-108.46183",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "06d54011-1e4a-4d79-9bd0-830f60061684",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Mount Rainier National Park",
                  "website": "https://www.nps.gov/mora/index.htm",
                  "instagram": "@mountrainiernps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "46.87998",
                  "lng": "-121.72691",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "b3c27faf-0ea1-4b6e-bac8-88c2361ac761",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "North Cascades National Park",
                  "website": "https://www.nps.gov/noca/index.htm",
                  "instagram": "@ncascadesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "48.77184",
                  "lng": "-121.29846",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0f3ae5f8-668b-4bd7-9681-7e73bb1d77af",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Olympic National Park",
                  "website": "https://www.nps.gov/olym/index.htm",
                  "instagram": "@olympicnationalpark",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "47.80212",
                  "lng": "-123.60435",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c2b3a1c0-14b7-42e3-bcd2-2d419e3656f3",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Petrified Forest National Park",
                  "website": "https://www.nps.gov/pefo/index.htm",
                  "instagram": "@petrifiedforestnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "34.91001",
                  "lng": "-109.80679",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4d883b53-d461-4f2f-97aa-cc7a9eee8e01",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Pinnacles National Park",
                  "website": "https://www.nps.gov/pinn/index.htm",
                  "instagram": "@pinnaclesnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.47336",
                  "lng": "-121.22454",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "91c07591-8ab8-496b-b0f4-d1aa185604c6",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Redwood National Park",
                  "website": "https://www.nps.gov/redw/index.htm",
                  "instagram": "@redwoodnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.2132",
                  "lng": "-124.00463",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3587fddb-63b7-4cd4-b1aa-2eacecf95452",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Rocky Mountain National Park",
                  "website": "https://www.nps.gov/romo/index.htm",
                  "instagram": "@rockynps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "40.34282",
                  "lng": "-105.68364",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "07b2e077-3e46-4c2c-a7c1-6c945254c1f6",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Saguaro National Park",
                  "website": "https://www.nps.gov/sagu/index.htm",
                  "instagram": "@saguaronationalpark",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "32.29676",
                  "lng": "-111.16661",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a1fba333-69a0-4e8f-a952-4bd98e3294b8",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Kings Canyon National Park",
                  "website": "https://www.nps.gov/seki/index.htm",
                  "instagram": "@sequoiakingsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.88788",
                  "lng": "-118.55514",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9ce3d123-f39f-4432-85c8-0152b945ebe9",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Sequoia National Park",
                  "website": "https://www.nps.gov/seki/index.htm",
                  "instagram": "@sequoiakingsnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "36.48638",
                  "lng": "-118.56575",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f2563d00-52c7-4ac7-ae8f-c57e31779f2b",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Shenandoah National Park",
                  "website": "https://www.nps.gov/shen/index.htm",
                  "instagram": "@shenandoahnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "38.29277",
                  "lng": "-78.67958",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "07c2730b-41dc-45ec-a68f-47dd5c5a1f42",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Theodore Roosevelt National Park",
                  "website": "https://www.nps.gov/thro/index.htm",
                  "instagram": "@theodorerooseveltnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "46.97899",
                  "lng": "-103.53871",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "42f28fbb-0185-4080-8c0b-5cec3a8efa75",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Voyageurs National Park",
                  "website": "https://www.nps.gov/voya/index.htm",
                  "instagram": "@voyageursnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "48.48411",
                  "lng": "-92.82708",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9325d86e-fbc3-470c-bb10-ceed1c4c583f",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Wind Cave National Park",
                  "website": "https://www.nps.gov/wica/index.htm",
                  "instagram": "@windcavenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "43.6046",
                  "lng": "-103.42134",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e13b4f63-1a02-4a0f-9273-bc4ca6bd864a",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Yellowstone National Park",
                  "website": "https://www.nps.gov/yell/index.htm",
                  "instagram": "@yellowstonenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "44.42797",
                  "lng": "-110.58845",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "277307cc-fbe0-494c-bdac-ea594fc79472",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Yosemite National Park",
                  "website": "https://www.nps.gov/yose/index.htm",
                  "instagram": "@yosemitenps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.86511",
                  "lng": "-119.53832",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "b38a920b-f657-4230-8ee4-d7ed3c16a4a4",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "national park",
                  "title": "Zion National Park",
                  "website": "https://www.nps.gov/zion/index.htm",
                  "instagram": "@zionnps",
                  "town": "Not Listed",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "37.29821",
                  "lng": "-113.0263",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6beebb18-841c-46fe-a8d3-fa79c8d97b14",
                  "iconImageObject": {
                      "url": "./assets/national park.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "L'Atelier de Joel Robuchon",
                  "website": "http://www.casinos.lotoquebec.com/en/montreal/explore/restaurants/atelier-de-joel-robuchon",
                  "instagram": "@joelrobuchonmtl",
                  "town": "Montreal",
                  "country": "Canada",
                  "phoneNumber": "514-656-5600",
                  "lat": "45.50541",
                  "lng": "-73.52595",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4aa2e3af-ecb1-485a-b109-e41313b9b718",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Jean-Georges",
                  "website": "http://www.jean-georgesrestaurant.com/",
                  "instagram": "@jean_georgesnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-333-1220",
                  "lat": "40.76906",
                  "lng": "-73.98156",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "67eba835-a1c9-461b-94d0-531b202f3b59",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Masa",
                  "website": "http://www.masanyc.com/",
                  "instagram": "@chefmasanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-889-0905",
                  "lat": "40.76873",
                  "lng": "-73.98311",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "add28ef2-8977-4e10-8019-ab0a43e85597",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Per Se",
                  "website": "https://www.thomaskeller.com/perseny",
                  "instagram": "@perseny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-823-9800",
                  "lat": "40.76849",
                  "lng": "-73.98323",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9c3c9c01-d03e-4649-9089-0b842d0d924d",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Union Square Café",
                  "website": "https://www.unionsquarecafe.com/",
                  "instagram": "@unionsquarecafe",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-254-3500",
                  "lat": "40.73773",
                  "lng": "-73.98793",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ad3fac47-fca4-43ac-8db3-e160a645eb47",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Eleven Madison Park",
                  "website": "https://www.elevenmadisonpark.com/",
                  "instagram": "@elevenmadisonpark",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-913-9659",
                  "lat": "40.7415",
                  "lng": "-73.98696",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "2d92c135-6e77-427f-be5d-c60dc3c5f4d5",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Piccolo",
                  "website": "https://piccolomaine.com/",
                  "instagram": "@piccolomaine",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-775-6148",
                  "lat": "43.65904",
                  "lng": "-70.25243",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "30507ac3-62d2-4b6f-8bc2-72f76ecc7bca",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Myers + Chang",
                  "website": "http://www.myersandchang.com/",
                  "instagram": "@myersandchang",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-566-1401",
                  "lat": "42.34384",
                  "lng": "-71.06632",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "55605c9e-8b3f-45db-bb8f-73f744ab0434",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Chef & the Farmer",
                  "website": "http://www.vivianhoward.com/chef-the-farmer/",
                  "instagram": "@chefandthefarmer",
                  "town": "Kinston",
                  "country": "USA",
                  "phoneNumber": "302-684-1000",
                  "lat": "35.26135",
                  "lng": "-77.58214",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "43c2a008-10d3-4c8a-9deb-b82f6cd8b162",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Prince's Hot Chicken Shack",
                  "website": "https://princeshotchicken.com/",
                  "instagram": "@princeshotchicken_nashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "615-256-6565",
                  "lat": "36.22998",
                  "lng": "-86.7609",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4d031445-c18f-4c62-a04a-aae0731382e9",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "SingleThread",
                  "website": "https://singlethreadfarms.com/",
                  "instagram": "@singlethreadfarms",
                  "town": "Healdsburg",
                  "country": "USA",
                  "phoneNumber": "707-887-3300",
                  "lat": "38.61223",
                  "lng": "-122.86968",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "84fe9c08-b0ac-42df-87df-8b2c2f5a04b6",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Oleana",
                  "website": "https://www.oleanarestaurant.com/",
                  "instagram": "@oleanabuzz",
                  "town": "Cambridge",
                  "country": "USA",
                  "phoneNumber": "617-670-1500",
                  "lat": "42.37054",
                  "lng": "-71.09717",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8bb78e01-6219-4268-b665-60c41b1dcd5e",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Coucou",
                  "website": "https://www.lecoucou.com/",
                  "instagram": "@lecoucou_nyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-288-0033",
                  "lat": "40.71913",
                  "lng": "-74.00025",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "dcc2660f-45fe-42bd-bd18-c3f9b78f1280",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Rioja",
                  "website": "http://www.riojadenver.com/",
                  "instagram": "@riojadenver",
                  "town": "Denver",
                  "country": "USA",
                  "phoneNumber": "304-574-1998",
                  "lat": "39.74793",
                  "lng": "-104.99946",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8b0a2dce-07a2-41ab-ac91-5ee1d98c095c",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "The Barn at Blackberry Farm",
                  "website": "http://www.blackberryfarm.com/wine-food/dinner/barn",
                  "instagram": "@blackberryfarm",
                  "town": "Walland",
                  "country": "USA",
                  "phoneNumber": "877-512-2450",
                  "lat": "35.69264",
                  "lng": "-83.86246",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3edfe62e-25a9-4bef-97ef-39d75625d8f7",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Bernardin",
                  "website": "https://www.le-bernardin.com/",
                  "instagram": "@lebernardinny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-582-5100",
                  "lat": "40.76156",
                  "lng": "-73.9818",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3e4caed6-6664-4e95-84c9-c640a6b04a9e",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Le Diplomate",
                  "website": "http://www.lediplomatedc.com/",
                  "instagram": "@lediplomatedc",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-387-2151",
                  "lat": "38.91135",
                  "lng": "-77.03157",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ac8d9a37-0b5b-4a1a-b480-95bbe7e106e8",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Laurel",
                  "website": "http://www.restaurantlaurel.com/",
                  "instagram": "@laurelepx",
                  "town": "Philadelphia",
                  "country": "USA",
                  "phoneNumber": "215-360-5282",
                  "lat": "39.9294",
                  "lng": "-75.16373",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c69107cf-2279-4c92-b6dd-b3f4fc638419",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Acadia",
                  "website": "http://www.acadiachicago.com/",
                  "instagram": "@acadiachicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-492-6262",
                  "lat": "41.85903",
                  "lng": "-87.62523",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "97581158-eb7b-436b-b1eb-82e81ee132bc",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "South Philly Barbacoa",
                  "website": "http://www.southphillybarbacoa.com/",
                  "instagram": "@barbacoachef",
                  "town": "Philadelphia",
                  "country": "USA",
                  "phoneNumber": "215-625-8800",
                  "lat": "39.93493",
                  "lng": "-75.15856",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "15cd958a-205d-4ea7-a0ca-98561d89f359",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Noodle Bar",
                  "website": "https://noodlebar-ny.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-780-0880",
                  "lat": "40.72921",
                  "lng": "-73.9845",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8f78d0d6-9db6-47fe-81e7-6ef15090006f",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Alinea",
                  "website": "http://www.alinearestaurant.com/",
                  "instagram": "@thealineagroup",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-877-5339",
                  "lat": "41.91344",
                  "lng": "-87.64816",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "657ff556-91fb-4fd5-bd30-dba3c9ef5245",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Boka",
                  "website": "http://www.bokachicago.com/",
                  "instagram": "@bokachicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-360-9500",
                  "lat": "41.91359",
                  "lng": "-87.64825",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f569252d-b98e-44be-a886-b23bbb19ac81",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Frasca Food & Wine",
                  "website": "http://www.frascafoodandwine.com/",
                  "instagram": "@frascafoodwine",
                  "town": "Boulder",
                  "country": "USA",
                  "phoneNumber": "303-444-5500",
                  "lat": "40.0192",
                  "lng": "-105.27247",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ace37c3d-209c-43b6-bb93-369f94437f62",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Saison",
                  "website": "https://www.saisonsf.com/",
                  "instagram": "@saisonsf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "416-599-7646",
                  "lat": "37.77952",
                  "lng": "-122.39226",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e6a66661-a5e1-450d-a01e-803dd121f1eb",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Daisho",
                  "website": "https://daisho.momofuku.com/",
                  "instagram": "@momofukutoronto",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "647-253-8000",
                  "lat": "43.64941",
                  "lng": "-79.38663",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e791b46e-c5e5-40c7-81d2-28e2ff8804c7",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Shoto",
                  "website": "https://shoto.momofuku.com/",
                  "instagram": "@momofukutoronto",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "650-561-1500",
                  "lat": "43.64943",
                  "lng": "-79.38654",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "71c9022f-14f3-4c36-bcb0-4495055e9702",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Black Cat",
                  "website": "http://www.blackcatboulder.com/",
                  "instagram": "@blackcatboulder",
                  "town": "Boulder",
                  "country": "USA",
                  "phoneNumber": "303-820-2282",
                  "lat": "40.01785",
                  "lng": "-105.27838",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "14a22750-7387-458f-9d86-755ef637c077",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Jungsik",
                  "website": "http://www.jungsik.com/",
                  "instagram": "@jungsik_inc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-219-7693",
                  "lat": "40.71882",
                  "lng": "-74.00907",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0571efff-9dae-4052-b43e-a911c8eed316",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Primo",
                  "website": "http://www.primorestaurant.com/",
                  "instagram": "@primorestaurant",
                  "town": "Rockland",
                  "country": "USA",
                  "phoneNumber": "207-602-1561",
                  "lat": "44.08987",
                  "lng": "-69.11053",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "661de538-90b1-42c6-bbb1-9e7f897cf6f1",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "McCrady's",
                  "website": "http://www.mccradysrestaurant.com/home-page/",
                  "instagram": "@mccradys",
                  "town": "Charleston",
                  "country": "USA",
                  "phoneNumber": "843-706-6500",
                  "lat": "32.77825",
                  "lng": "-79.92719",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "619bf1c3-2777-4692-b660-a1f4393cd1ee",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Highlands Bar & Grill",
                  "website": "https://highlandsbarandgrill.com/",
                  "instagram": "@highlandsbarandgrill",
                  "town": "Birmingham",
                  "country": "USA",
                  "phoneNumber": "206-283-3313",
                  "lat": "33.50057",
                  "lng": "-86.79549",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "97f3dd39-61b9-469e-8f15-2f3264d4139e",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Ssam Bar",
                  "website": "https://ssambar.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-271-4252",
                  "lat": "40.73167",
                  "lng": "-73.98584",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "5d95a500-35a0-48ed-ac6b-11d0770fd412",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Benu",
                  "website": "https://www.benusf.com/",
                  "instagram": "@clee_benu",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-750-3600",
                  "lat": "37.78544",
                  "lng": "-122.39903",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "572fbfb9-3823-4ac7-83c5-a1bb16b6a65f",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Nishi",
                  "website": "https://nishi.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "646-664-0310",
                  "lat": "40.74433",
                  "lng": "-73.9988",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "22a77129-51f4-4129-992c-0944622815a7",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Zahav",
                  "website": "http://www.zahavrestaurant.com/",
                  "instagram": "@zahavrestaurant",
                  "town": "Philadelphia",
                  "country": "USA",
                  "phoneNumber": "216-239-1200",
                  "lat": "39.9462",
                  "lng": "-75.14526",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "98ca319d-eae8-4f81-813f-98afbaf5ce84",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Marea",
                  "website": "http://www.marea-nyc.com/",
                  "instagram": "@mareanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-627-9800",
                  "lat": "40.76739",
                  "lng": "-73.98084",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "cb3b554c-ab7b-40d0-9dd4-99539d03490f",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "No Anchor",
                  "website": "https://www.noanchorbar.com/",
                  "instagram": "@noanchorbar",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-448-4721",
                  "lat": "47.61549",
                  "lng": "-122.34858",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ae1796fc-df8f-48dc-a136-07359528e029",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Canlis",
                  "website": "https://canlis.com/",
                  "instagram": "@canlisrestaurant",
                  "town": "Seattle",
                  "country": "USA",
                  "phoneNumber": "206-448-2610",
                  "lat": "47.64308",
                  "lng": "-122.34675",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f4cb78fc-8e96-4c9d-92a0-e955befeec51",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Blanca",
                  "website": "http://www.blancanyc.com/",
                  "instagram": "@eatblanca",
                  "town": "Brooklyn",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "40.70507",
                  "lng": "-73.93354",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "eca08e84-1e4d-4e14-937c-6f89f69a64eb",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "North Pond",
                  "website": "http://www.northpondrestaurant.com/",
                  "instagram": "@northpondchi",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "773-681-0651",
                  "lat": "41.92985",
                  "lng": "-87.63746",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6f6e4604-41fd-4a7e-bb8e-2586146e1143",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Atelier Crenn",
                  "website": "https://www.ateliercrenn.com/",
                  "instagram": "@atelier.crenn",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-581-3500",
                  "lat": "37.79833",
                  "lng": "-122.43594",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fba18228-6b0d-490b-bf81-a44cf4f865f5",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Manresa",
                  "website": "https://www.manresarestaurant.com/",
                  "instagram": "@manresaca",
                  "town": "Los Gatos",
                  "country": "USA",
                  "phoneNumber": "408-695-4500",
                  "lat": "37.22736",
                  "lng": "-121.98083",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "b4b60e40-7c04-4db6-bd30-e318545faa09",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "ABC Kitchen",
                  "website": "https://www.abchome.com/dine/abc-kitchen/",
                  "instagram": "@abckitchen",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-554-1515",
                  "lat": "40.73773",
                  "lng": "-73.98961",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "daedea11-8240-4dfc-813d-65424e46f4ca",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Cosme",
                  "website": "http://www.cosmenyc.com/#",
                  "instagram": "@cosmenyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-924-9700",
                  "lat": "40.73961",
                  "lng": "-73.98835",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "395eefbe-ae9b-40e9-9bb0-9d93b2c0782a",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Menton",
                  "website": "http://www.mentonboston.com/",
                  "instagram": "@mentonboston",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "617-742-9991",
                  "lat": "42.3505",
                  "lng": "-71.04821",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "331eafbd-a159-4e5d-82cf-e9805d69531c",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Husk",
                  "website": "http://www.husknashville.com/",
                  "instagram": "@husknashville",
                  "town": "Nashville",
                  "country": "USA",
                  "phoneNumber": "615-262-6000",
                  "lat": "36.15529",
                  "lng": "-86.76986",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ad862e90-6a5b-4825-b3aa-296ec7f82505",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Coi",
                  "website": "http://www.coirestaurant.com/",
                  "instagram": "@coirestaurant",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-440-0460",
                  "lat": "37.79806",
                  "lng": "-122.40342",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4821c03c-c17a-49c4-b715-a5215f0905a3",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "ABCV",
                  "website": "http://www.abchome.com/dine/abcv/",
                  "instagram": "@abcvnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-5829",
                  "lat": "40.73809",
                  "lng": "-73.98929",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e1b39763-ebce-4494-a771-8570ca59aed0",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "ABC Cocina",
                  "website": "https://www.abchome.com/dine/abc-cocina/",
                  "instagram": "@abccocina",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-475-5829",
                  "lat": "40.73797",
                  "lng": "-73.98928",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c2c9bc5a-ab6c-4a61-9a39-c3c4a7dae6cd",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Craft",
                  "website": "https://www.craftrestaurant.com/",
                  "instagram": "@craft_newyork",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-796-1500",
                  "lat": "40.73816",
                  "lng": "-73.98866",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "244aba83-078a-41df-a245-579811344755",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Animal",
                  "website": "http://www.animalrestaurant.com/",
                  "instagram": "@jonandvinnydelivery",
                  "town": "Los Angeles",
                  "country": "USA",
                  "phoneNumber": "347-335-0446",
                  "lat": "34.07921",
                  "lng": "-118.36177",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e9b7884c-3f14-469a-9ed4-965a9019ec59",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Estela",
                  "website": "https://www.estelanyc.com/",
                  "instagram": "@estelanyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-243-4020",
                  "lat": "40.72463",
                  "lng": "-73.99474",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6c4538d8-a174-498f-9e1f-dd0095b8d03f",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Quince",
                  "website": "http://www.quincerestaurant.com/",
                  "instagram": "@quince_sf",
                  "town": "San Francisco",
                  "country": "USA",
                  "phoneNumber": "415-828-7990",
                  "lat": "37.79757",
                  "lng": "-122.40338",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "38d0758c-386d-4171-a818-4a0887c3def8",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Elizabeth",
                  "website": "http://www.elizabeth-restaurant.com/",
                  "instagram": "@elizabethrestaurant_and_co",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "775-586-7000",
                  "lat": "41.96956",
                  "lng": "-87.68859",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a5a77cb7-4ebc-44b6-add5-cc7419ab4ed1",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Compere Lapin",
                  "website": "http://www.comperelapin.com/",
                  "instagram": "@comperelapin",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-900-1180",
                  "lat": "29.94787",
                  "lng": "-90.06737",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8ae1bcd3-ecc8-4993-b742-911f784bdb76",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Beast",
                  "website": "http://www.beastpdx.com/info/",
                  "instagram": "@naomipomeroy",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "504-218-7428",
                  "lat": "45.56239",
                  "lng": "-122.63509",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "735c7184-1b45-4445-8ec5-986ff9fa1e53",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Drifters Wife",
                  "website": "http://www.drifterswife.com/",
                  "instagram": "@drifterswife",
                  "town": "Portland",
                  "country": "USA",
                  "phoneNumber": "207-808-8258",
                  "lat": "43.66553",
                  "lng": "-70.2516",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f16c5ece-8943-47ee-b06f-80509e80a2f3",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Daniel",
                  "website": "https://www.danielnyc.com/",
                  "instagram": "@restaurantdaniel",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-288-3700",
                  "lat": "40.76677",
                  "lng": "-73.9676",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "083b1703-3aee-4fdb-8c6b-bcadce5fdeca",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Benoit",
                  "website": "https://www.benoitny.com/",
                  "instagram": "@benoitny",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "617-224-4000",
                  "lat": "40.76252",
                  "lng": "-73.97727",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "95e363ab-fa00-4996-9aea-dc5a22098c19",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Café Boulud",
                  "website": "https://www.cafeboulud.com/toronto/",
                  "instagram": "@cafebouludto",
                  "town": "Toronto",
                  "country": "Canada",
                  "phoneNumber": "418-692-2211",
                  "lat": "43.67171",
                  "lng": "-79.38991",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c67a0ecc-2319-403a-9f1a-044aac36fc3c",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "610 Magnolia",
                  "website": "https://610magnolia.com/",
                  "instagram": "@chefedwardlee",
                  "town": "Louisville",
                  "country": "USA",
                  "phoneNumber": "503-841-6968",
                  "lat": "38.22935",
                  "lng": "-85.76544",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "993929b6-3d93-43e6-ba28-bf26409fd695",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Blackbird",
                  "website": "http://www.blackbirdrestaurant.com/",
                  "instagram": "@blackbirdchicago",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-867-0110",
                  "lat": "41.8843",
                  "lng": "-87.64355",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "00dbcfbd-b3ed-4a40-b30a-550f5077bb17",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Pizzeria Bianco",
                  "website": "http://www.pizzeriabianco.com/welcome",
                  "instagram": "@pizzeriabianco",
                  "town": "Phoenix",
                  "country": "USA",
                  "phoneNumber": "604-233-0460",
                  "lat": "33.44915",
                  "lng": "-112.06563",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4a41d8f8-6243-4ca4-b4b8-16f03e7abf0a",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Blue Hill at Stone Barns",
                  "website": "https://www.bluehillfarm.com/dine/stone-barns",
                  "instagram": "@bluehillfarm",
                  "town": "Pocantico Hills",
                  "country": "USA",
                  "phoneNumber": "949-715-6000",
                  "lat": "41.104",
                  "lng": "-73.82895",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "02ab08ae-a7f6-4780-bf84-88bfc4f611b4",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Ad Hoc",
                  "website": "https://www.thomaskeller.com/adhoc",
                  "instagram": "@adhoc_addendum",
                  "town": "Yountville",
                  "country": "USA",
                  "phoneNumber": "707-944-2861",
                  "lat": "38.39916",
                  "lng": "-122.35861",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9ee9e13f-5879-4266-a9ba-9f5c8ead12c1",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Olmsted",
                  "website": "http://www.olmstednyc.com/",
                  "instagram": "@olmstednyc",
                  "town": "Brooklyn",
                  "country": "USA",
                  "phoneNumber": "760-294-7866",
                  "lat": "40.67703",
                  "lng": "-73.96867",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "ac6910a9-7eca-4ce9-bb4f-217abea64920",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Osteria Mozza",
                  "website": "http://www.la.osteriamozza.com/",
                  "instagram": "@osteriamozza",
                  "town": "Los Angeles",
                  "country": "USA",
                  "phoneNumber": "323-782-9225",
                  "lat": "34.08326",
                  "lng": "-118.33893",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "dc719dee-8fd3-4c4c-b645-9f6f26a285ca",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Oriole",
                  "website": "http://www.oriolechicago.com/",
                  "instagram": "@oriolechi",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-923-9988",
                  "lat": "41.88613",
                  "lng": "-87.64507",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7b761262-69bf-4e41-9d4a-fe515b8f19ae",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "The French Laundry",
                  "website": "https://www.thomaskeller.com/tfl",
                  "instagram": "@_tfl_",
                  "town": "Yountville",
                  "country": "USA",
                  "phoneNumber": "707-944-2487",
                  "lat": "38.40441",
                  "lng": "-122.36497",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0ba7b1f2-08ff-4ba4-9e63-d1fc74910510",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Turkey & the Wolf",
                  "website": "http://www.turkeyandthewolf.com/",
                  "instagram": "@turkeyandthewolf",
                  "town": "New Orleans",
                  "country": "USA",
                  "phoneNumber": "504-302-2357",
                  "lat": "29.92717",
                  "lng": "-90.07433",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d9cb2f41-d171-45f1-ae61-af74f9fb6bba",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Barbuto",
                  "website": "http://www.barbutonyc.com/index.php",
                  "instagram": "@barbutonyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-956-2888",
                  "lat": "40.7377",
                  "lng": "-74.00805",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4f4b20ae-6585-44e4-9766-be1946899035",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Momofuku Ko",
                  "website": "https://ko.momofuku.com/",
                  "instagram": "@momolongplay",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-219-0900",
                  "lat": "40.7248",
                  "lng": "-73.99136",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e155b0db-b97a-4146-97c0-67fe98b7e0d2",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Maple & Ash",
                  "website": "https://www.mapleandash.com/",
                  "instagram": "@mapleandash",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "313-833-7900",
                  "lat": "41.90207",
                  "lng": "-87.62875",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "fedbe69f-c1cb-4113-b42a-242168b800d3",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Girl & the Goat",
                  "website": "http://www.girlandthegoat.com/",
                  "instagram": "@stephanieizard",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "312-521-8000",
                  "lat": "41.8841",
                  "lng": "-87.64797",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7cffe3f3-ace3-48a3-84f8-4784732a9db6",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "minibar by Jose Andres",
                  "website": "https://www.minibarbyjoseandres.com/minibar/",
                  "instagram": "@minibarbyjose",
                  "town": "Washington",
                  "country": "USA",
                  "phoneNumber": "202-617-2400",
                  "lat": "38.89635",
                  "lng": "-77.0236",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f83a7c69-8016-4a83-ba3a-807f9b10f68e",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "No 9 Park",
                  "website": "http://www.no9park.com/",
                  "instagram": "@no9park",
                  "town": "Boston",
                  "country": "USA",
                  "phoneNumber": "646-518-1919",
                  "lat": "42.35758",
                  "lng": "-71.06283",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "f11198d1-a850-4dc5-9491-15a8b4fdc4f7",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "The Modern",
                  "website": "https://www.themodernnyc.com/",
                  "instagram": "@themodernnyc",
                  "town": "New York",
                  "country": "USA",
                  "phoneNumber": "212-432-1818",
                  "lat": "40.76107",
                  "lng": "-73.97675",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "bc595b97-5e40-4399-9f2c-81f0db676e03",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Franklin Barbecue",
                  "website": "https://franklinbbq.com/",
                  "instagram": "@franklinbbq",
                  "town": "Austin",
                  "country": "USA",
                  "phoneNumber": "514-285-2000",
                  "lat": "30.27013",
                  "lng": "-97.73127",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "478ccdce-efa7-4183-aeb4-f299e82113b3",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "restaurant",
                  "title": "Next",
                  "website": "https://www.nextrestaurant.com/",
                  "instagram": "@thealineagroup",
                  "town": "Chicago",
                  "country": "USA",
                  "phoneNumber": "000-000-0000",
                  "lat": "41.88661",
                  "lng": "-87.65198",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "588b61b2-4873-4570-ad9f-d8a2b0eb6932",
                  "iconImageObject": {
                      "url": "./assets/restaurant.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Deer Valley",
                  "website": "http://www.deervalley.com/",
                  "instagram": "@deervalleyresort",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-649-3700",
                  "lat": "40.62116",
                  "lng": "-111.48829",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e904025c-d96c-4c56-8230-365b47302260",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Crested Butte",
                  "website": "http://www.skicb.com/",
                  "instagram": "@skicrestedbutte",
                  "town": "Crested Butte",
                  "country": "USA",
                  "phoneNumber": "970-476-5641",
                  "lat": "38.89913",
                  "lng": "-106.9654",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "454e129c-df4a-4b5b-a03a-4b9b6370380b",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Taos",
                  "website": "http://www.skitaos.com/",
                  "instagram": "@skitaos",
                  "town": "Taos Ski Valley",
                  "country": "USA",
                  "phoneNumber": "602-258-8300",
                  "lat": "36.59433",
                  "lng": "-105.44958",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "c85e4239-fc80-488f-a6df-d46aeac6ce00",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Squaw Valley",
                  "website": "http://www.squawalpine.com/",
                  "instagram": "@squawalpine",
                  "town": "Olympic Valley",
                  "country": "USA",
                  "phoneNumber": "800-548-4486",
                  "lat": "39.1957",
                  "lng": "-120.23499",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "68b5caac-5fe5-4183-9fc7-570abbff58cb",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Big Sky",
                  "website": "https://bigskyresort.com",
                  "instagram": "@bigskyresort",
                  "town": "Big Sky",
                  "country": "USA",
                  "phoneNumber": "800-618-5535",
                  "lat": "45.2835",
                  "lng": "-111.40153",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "08bf4988-0b0d-474d-b097-009cc8709e61",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Alta",
                  "website": "https://www.alta.com/",
                  "instagram": "@altaskiarea",
                  "town": "Alta",
                  "country": "USA",
                  "phoneNumber": "801-933-2222",
                  "lat": "40.58781",
                  "lng": "-111.63821",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "4729d43e-8c19-4ae3-a099-3f8ac3136076",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Aspen Snowmass",
                  "website": "https://www.aspensnowmass.com/",
                  "instagram": "@aspensnowmass",
                  "town": "Snowmass Village",
                  "country": "USA",
                  "phoneNumber": "970-949-1234",
                  "lat": "39.20835",
                  "lng": "-106.94999",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7acc34b0-6fe4-413c-9fc4-d58afb2a6718",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Beaver Creek",
                  "website": "https://www.beavercreek.com/",
                  "instagram": "@beavercreek",
                  "town": "Beaver Creek",
                  "country": "USA",
                  "phoneNumber": "970-754-8245",
                  "lat": "39.60275",
                  "lng": "-106.51694",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7adc572a-5e8a-4565-bacb-76107d5ce2ae",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Jackson Hole",
                  "website": "https://www.jacksonhole.com/",
                  "instagram": "@jacksonhole",
                  "town": "Teton Village",
                  "country": "USA",
                  "phoneNumber": "307-734-7333",
                  "lat": "43.58914",
                  "lng": "-110.82791",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "8f974eda-f358-49c4-a0f6-e74f0065e7bc",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Killington",
                  "website": "https://www.killington.com/",
                  "instagram": "@killingtonmtn",
                  "town": "Killington",
                  "country": "USA",
                  "phoneNumber": "808-662-6600",
                  "lat": "43.62538",
                  "lng": "-72.79743",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "48aeb321-7d1d-44a5-9bad-6ca8293904ce",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Park City",
                  "website": "https://www.parkcitymountain.com/",
                  "instagram": "@pcski",
                  "town": "Park City",
                  "country": "USA",
                  "phoneNumber": "435-675-3999",
                  "lat": "40.65335",
                  "lng": "-111.50957",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "1c9bba79-d1ac-452e-889c-608d2906166f",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Heavenly",
                  "website": "https://www.skiheavenly.com/",
                  "instagram": "@skiheavenly",
                  "town": "Stateline",
                  "country": "USA",
                  "phoneNumber": "780-882-3301",
                  "lat": "38.93577",
                  "lng": "-119.93934",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "afbe2879-0cb4-462e-8618-a225d6cbc014",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Snowbird",
                  "website": "https://www.snowbird.com/",
                  "instagram": "@snowbird",
                  "town": "Sandy",
                  "country": "USA",
                  "phoneNumber": "802-253-3000",
                  "lat": "40.5808",
                  "lng": "-111.65581",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "3c240a32-d73e-4926-923b-dae165a749f0",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Steamboat",
                  "website": "https://www.steamboat.com/",
                  "instagram": "@steamboatresort",
                  "town": "Steamboat Springs",
                  "country": "USA",
                  "phoneNumber": "970-920-2739",
                  "lat": "40.45718",
                  "lng": "-106.80454",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "2fb9733e-a41c-44ce-abea-8433e17f8c2f",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Stowe",
                  "website": "https://www.stowe.com/",
                  "instagram": "@stowemt",
                  "town": "Stowe",
                  "country": "USA",
                  "phoneNumber": "802-253-7371",
                  "lat": "44.53151",
                  "lng": "-72.78088",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "7f48d1ea-1d1c-4c96-95d4-b15caab9f65f",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Stratton",
                  "website": "https://www.stratton.com/",
                  "instagram": "@strattonresort",
                  "town": "Stratton Mountain",
                  "country": "USA",
                  "phoneNumber": "802-422-3333",
                  "lat": "43.11281",
                  "lng": "-72.90758",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "6a3941ed-ee05-422b-8fe9-0c81a1b73ab6",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Sunday River",
                  "website": "https://www.sundayriver.com/",
                  "instagram": "@sundayriver",
                  "town": "Newry",
                  "country": "USA",
                  "phoneNumber": "207-878-5385",
                  "lat": "44.47335",
                  "lng": "-70.8577",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "b779444a-4a73-4300-a1d2-6e37e65a6f3c",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Sun Valley",
                  "website": "https://www.sunvalley.com/",
                  "instagram": "@sunvalley",
                  "town": "Ketchum",
                  "country": "USA",
                  "phoneNumber": "212-203-8095",
                  "lat": "43.67055",
                  "lng": "-114.36824",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9bf9872b-fbb6-4242-91c4-14dcc38330a0",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Telluride",
                  "website": "https://www.tellurideskiresort.com/",
                  "instagram": "@tellurideski",
                  "town": "Telluride",
                  "country": "USA",
                  "phoneNumber": "970-754-4636",
                  "lat": "37.93576",
                  "lng": "-107.81389",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0382bc71-0a19-4ae7-9869-ca3d9a6c2bb2",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Tremblant",
                  "website": "https://www.tremblant.ca/",
                  "instagram": "@monttremblant",
                  "town": "Mont-Tremblant",
                  "country": "Canada",
                  "phoneNumber": "831-394-3321",
                  "lat": "46.21341",
                  "lng": "-74.58389",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "eadd14d8-c900-48ee-9cc2-1825ffc33659",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Vail",
                  "website": "https://www.vail.com/",
                  "instagram": "@vailmtn",
                  "town": "Vail",
                  "country": "USA",
                  "phoneNumber": "970-879-1780",
                  "lat": "39.63904",
                  "lng": "-106.3734",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "a3d3929f-0276-4232-a142-76700b9777a2",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "ski area",
                  "title": "Winter Park",
                  "website": "https://www.winterparkresort.com/",
                  "instagram": "@winterparkresort",
                  "town": "Winter Park",
                  "country": "USA",
                  "phoneNumber": "970-728-7517",
                  "lat": "39.88656",
                  "lng": "-105.76373",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "2e5ed9dc-e6a2-417b-aeb2-37b38c63d0fa",
                  "iconImageObject": {
                      "url": "./assets/ski area.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Far Niente",
                  "website": "https://farniente.com/visit-napa-valley/wine-tours/",
                  "instagram": "@farnientewinery",
                  "town": "Oakville",
                  "country": "USA",
                  "phoneNumber": "707-963-1211",
                  "lat": "38.42577",
                  "lng": "-122.40313",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "e325ca83-7a1f-4923-a788-c618c323594c",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Ravine Vineyard Estate Winery",
                  "website": "https://ravinevineyard.com/",
                  "instagram": "@ravinevineyard",
                  "town": "St Davids",
                  "country": "Canada",
                  "phoneNumber": "905-468-2187",
                  "lat": "43.16028",
                  "lng": "-79.10321",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "0d4ffcf8-6ca6-4ab0-ba0b-19c21c353221",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Inniskillin Wines",
                  "website": "http://www.inniskillin.com/Niagara",
                  "instagram": "@inniskillinwines",
                  "town": "Niagara-on-the-Lake",
                  "country": "Canada",
                  "phoneNumber": "907-683-2567",
                  "lat": "43.21056",
                  "lng": "-79.06395",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9954401c-d426-4586-95d8-756b7e6fdd0b",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Stag's Leap Wine Cellars",
                  "website": "https://www.cask23.com/visit",
                  "instagram": "@stagsleapwinecellars",
                  "town": "Napa",
                  "country": "USA",
                  "phoneNumber": "707-531-4788",
                  "lat": "38.39922",
                  "lng": "-122.32353",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "cb52180d-8a42-45e1-8602-4ac2379e7961",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Mondavi",
                  "website": "https://www.robertmondaviwinery.com/Visit-Us",
                  "instagram": "@robertmondavi",
                  "town": "Oakville",
                  "country": "USA",
                  "phoneNumber": "707-254-2800",
                  "lat": "38.44126",
                  "lng": "-122.4098",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "d7eee965-3b56-4577-8eb7-05f9b4d98965",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Cakebread Cellars",
                  "website": "https://www.cakebread.com/tours-and-tastings",
                  "instagram": "@cakebreadcellars",
                  "town": "St Helena",
                  "country": "USA",
                  "phoneNumber": "709-658-3444",
                  "lat": "38.44774",
                  "lng": "-122.41199",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "9a92c560-19dc-4a8d-8bb8-0f198c4ada24",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Frog's Leap",
                  "website": "https://www.frogsleap.com/visit.php",
                  "instagram": "@frogsleap",
                  "town": "Rutherford",
                  "country": "USA",
                  "phoneNumber": "707-963-5222",
                  "lat": "38.47407",
                  "lng": "-122.40237",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "32ad9899-645f-4ec3-aa94-7980b560c0a6",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              },
              {
                  "iconName": "vineyard",
                  "title": "Silver Oak",
                  "website": "https://www.silveroak.com/visit-us/",
                  "instagram": "@silveroakcellars",
                  "town": "Oakville",
                  "country": "USA",
                  "phoneNumber": "707-944-2380",
                  "lat": "38.44087",
                  "lng": "-122.38135",
                  "map_id": "08b448a0-c2bd-47fb-b0e6-eb746b19a8b0",
                  "id": "dc034c96-018a-42bc-9707-8fef414abb18",
                  "iconImageObject": {
                      "url": "./assets/vineyard.png",
                      "scaledSize": {
                          "width": 40,
                          "height": 60
                      }
                  }
              }
          ]
      }
  ]
  }

}
