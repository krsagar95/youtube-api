import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchVideosService {

  private API_URL = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  getVideos(query: any): Observable <any> {
    const params = new HttpParams()
      .set('key','AIzaSyDVU3DyTStopWngOOaGOCicxifld-g5v4c')
      .set('part','snippet')
      .set('q',query.keyword)
      .set('maxResults',query.maxResults);
      let options = {params:params};
    return this.http.get(this.API_URL,options)
      .pipe(
        map((response: any) => response.items)
      );
  }
}
