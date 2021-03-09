import { Injectable } from "@angular/core";

const SEARCH_KEY = "SEARCH_HISTORY";

@Injectable({
  providedIn: "root",
})
export class SearchHistoryService {
  constructor() {}

  public store(s: string): void {
    const history = this.getHistory();
    if (history.indexOf(s) === -1) {
      history.push(s);
      localStorage.setItem(SEARCH_KEY, JSON.stringify(history));
    }
  }

  public getHistory(limit?: number): string[] {
    const history = JSON.parse(localStorage.getItem(SEARCH_KEY)) || [];
    if (limit && history.length > limit) {
      return history.slice(0, limit);
    }

    return history;
  }

  public getFilteredHistory(s: string, limit: number = 5): string[] {
    const results = this.getHistory().filter(
      (element) => element && element.toLowerCase().includes(s)
    );
    if (results.length > limit) {
      return results.slice(0, limit);
    }

    return results;
  }
}
