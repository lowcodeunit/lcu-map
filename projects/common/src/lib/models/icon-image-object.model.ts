export class IconImageObject {
    public url: string;
    public scaledSize: {
        width: number,
        height: number
    };
    public name?: string;
    constructor(url: string, scaledSize: any, name?: string){
        this.url = url;
        this.scaledSize = scaledSize;
        this.name = name;
    }

}
