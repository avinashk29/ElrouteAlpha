import { Injectable, OnInit } from "@angular/core";
import { Http, Headers} from "@angular/http";

@Injectable({
    providedIn:'root'
})
export class ImageUploadService {
    token;
    constructor(private http:Http){}
    
    uploadImg(image){
        // console.log(image)
        // const headers=new Headers();
        // headers.append('x-auth',this.token);
        // console.log(this.token);
        return this.http.post('http://localhost:8080/api/imageupload',image);
    }

}