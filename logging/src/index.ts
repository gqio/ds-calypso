import { Injectable } from "@angular/core";
@Injectable()
export class Logger {
  debug(msg: any) {
    console.log(new Date() + ": " + JSON.stringify(msg));
  }
}
