export class Accolade{
    public LocationID: string;
    public Lookup: string;
    public Rank: string; 
    public Title: string 
    public Year: string; 

    constructor(locationID: string, lookup: string, rank: string, title: string,
        year: string){
this.LocationID = locationID;
this.Lookup = lookup;
this.Rank = rank;
this.Title = title;
this.Year = year;
    }
}