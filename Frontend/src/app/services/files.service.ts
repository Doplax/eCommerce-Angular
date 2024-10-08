import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';



interface File {
  originalname: string;
  filename: string;
  location: string;
}


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/files/upload'

  constructor(
    private http: HttpClient
  ) { }

  getFile(name:string, url:string, type:string){
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content],{type});
        saveAs(blob,name)
      }),
      map(() => true)
    );
  }

  uploadFile(file:Blob) {
    const dto = new FormData();
    dto.append('file',file);
    return this.http.post<File>(this.apiUrl,dto, {
      // Este header es opcional, depende del backend
      headers: {
        'Content-Type': "multipart/form-data"
      }
    })


  }
}
