import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ScenarioRequest {
  constructor(private http: HttpClient) {}

  getJSON(): Observable<any> {
    return this.http.get("./assets/scenario.json");
  }
}
