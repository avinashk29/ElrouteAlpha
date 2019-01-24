import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';


@Injectable({
    providedIn: 'root'
})

export class BookmarkServices {
token;
constructor(public http: Http) {}
addProductBookmarks(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.patch('http://localhost:8080/api/bookmark/product/' + id , id ,{headers: headers});
}
addCompanyBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.patch('http://localhost:8080/api/bookmark/company/' + id , id , {headers: headers});
}
addPostBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    console.log(id);
    return this.http.patch('http://localhost:8080/api/bookmark/post/' + id, id, {headers: headers});

}
addServiceBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth',this.token);
    return this.http.patch('http://localhost:8080/api/bookmark/service/'+id,id,{headers:headers});
}

BookmarkResult(){
    const headers=new Headers();
    headers.append('x-auth',this.token);
    return this.http.get('http://localhost:8080/api/bookmarksave',{headers:headers});
}
// removeProduct() {
//     const headers = new Headers();
//     headers.append('x-auth', this.token);
//     console.log(this.token);
//     return this.http.patch('http://www.elroute.co.in/api/bookmark/product', {headers: headers});
// }
getBookmarkProduct() {
    
    const headers = new Headers();
     headers.append('x-auth', this.token);
     console.log(this.token);
     return this.http.get('http://localhost:8080/api/bookmark/product', {headers: headers});
  }
  getBookmarkCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.get('http://localhost:8080/api/bookmark/company', {headers: headers});
  }
  getBookmarkPost() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.get('http://localhost:8080/api/bookmark/post', {headers: headers});
  }
  
}
