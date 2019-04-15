import { Injectable, OnInit, NgZone } from "@angular/core";
import { Http, Headers} from "@angular/http";
import { CompanyServiceService } from "./company-service.service";
import { UserService } from "./user-services.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FeedService } from "./feed-service.service";

@Injectable({
    providedIn:'root'
})
export class ImageUploadService {
    token;
    file;
    image

    constructor(private http:Http,){}

    uploadImg(image){
        return this.http.post('http://localhost:8080/api/imageupload',image);
    }

}
