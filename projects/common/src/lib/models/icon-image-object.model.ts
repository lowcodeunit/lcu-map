export class IconImageObject {
    public url: string;
    public scaledSize: {
        width: number,
        height: number
    };
    constructor(url: string, scaledSize: any){
        this.url = url;
        this.scaledSize = scaledSize;
    }

}
