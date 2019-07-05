export class PhotoInfo{
    /**
     * height of the photo
     */
height: number;

/**
 * Width of the photo
 */
width: number;

/**
 * The reference id for the photo
 */
reference: string;

constructor(height:number, width: number, reference: string){
    this.height = height;
    this.width = width;
    this.reference = reference;
}



}