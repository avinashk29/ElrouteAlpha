import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';


@Injectable({
    providedIn: 'root'
})

export class BookmarkServices {
token;
companyfollow;
CompanyBookmark;
productBookmark;
feedBookmark;
count=0;
constructor(public http:Http) {}
addProductBookmarks(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.patch('/bookmark/product/' + id , id ,{headers: headers});
}
DeleteProductBookmark(id){
    const headers = new Headers();
    headers.append('x-auth',this.token);
    return this.http.delete('/bookmark/product/'+ id , {headers: headers});
  }
addCompanyBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token+'dfghjkl');
    return this.http.patch('/bookmark/company/' + id , id , {headers: headers});
}
DeleteBookmarkCompany(id){
    const headers = new Headers();
    headers.append('x-auth',this.token);
    return this.http.delete('/bookmark/company/'+ id , {headers: headers});
  }
addPostBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    console.log(id);
    return this.http.patch('/bookmark/post/' + id, id, {headers: headers});

}
DeletePostBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    console.log(id);
    return this.http.delete('/bookmark/post/'+ id,{headers: headers});

}
addServiceBookmark(id) {
    const headers = new Headers();
    headers.append('x-auth',this.token);
    return this.http.patch('/bookmark/service/'+id,id,{headers:headers});
}

BookmarkResult(){
    const headers=new Headers();
    headers.append('x-auth',this.token);
    return this.http.get('/bookmarksave',{headers:headers});
}
// removeProduct() {
//     const headers = new Headers();
//     headers.append('x-auth', this.token);
//     console.log(this.token);
//     return this.http.patch('http://www.elroute.co.in/bookmark/product', {headers: headers});
// }
    getBookmarkProduct() {
    const headers = new Headers();
     headers.append('x-auth', this.token);
     console.log(this.token);
     return this.http.get('/bookmark/product', {headers: headers});
  }
  getBookmarkCompany() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.get('/bookmark/company', {headers: headers});
  }
  getBookmarkPost() {
    const headers = new Headers();
    headers.append('x-auth', this.token);
    console.log(this.token);
    return this.http.get('/bookmark/post', {headers: headers});
  }

  
}
