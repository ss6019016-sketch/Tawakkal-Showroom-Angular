import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments-old/environment-old';

export interface PageDto {
  pageId:   number;
  title:    string;
  icon:     string;
  path:     string;
  isHidden: boolean;
}

export interface ModuleMenuDto {
  moduleId:   number;
  moduleName: string;
  moduleIcon: string;
  pages:      PageDto[];
}

@Injectable({ providedIn: 'root' })
export class ModulePageService {

  private apiUrl = `${environment.apiUrl}ModulePage`;

  constructor(private http: HttpClient) {}

  getModulesAndPages(): Observable<ModuleMenuDto[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res?.data ?? res)
    );
  }
}