export class DefaultMarker{
    public Name: string;
    public RelativePath: string;
    public Width: number;
    public Height: number;

    constructor(name: string, relativePath: string, width: number, height: number){
        this.Name = name;
        this.RelativePath = relativePath;
        this.Width = width;
        this.Height = height;
    }
}