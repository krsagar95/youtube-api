import { Component } from '@angular/core';
import { SearchVideosService } from './search-videos.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular app for youtube-api';
  isLoading: boolean = false;
  error: string = '';
  videos: any[] = [];
  options = { 'keyword': '' };
  maxResults: string = '5';
  constructor(private searchVideos: SearchVideosService) { }
  ngOnInit() {
  }
  onSubmit(form: any) {
    const params = { 'keyword': form.keyword, 'maxResults': this.maxResults };
    this.searchVideos.getVideos(params).subscribe({
      next: (items: any[]) => {
        this.videos = items.map(item => {
          return {
            title: item.snippet.title,
            videoId: item.id.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            channelId: item.snippet.channelId,
            channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            publishedAt: new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url
          };
        });
      },
      error: (e) => console.error(e)
    })
  }
}
