export class LocationRating{
    public title: string;

    public rating: number;

    public totalRatings: number;

    public color?: string;

    constructor(title: string, rating: number, totalRatings: number, color?: string){
        this.title = title;
        this.rating = rating;
        this.totalRatings = totalRatings;
        this.color = color;
    }
}