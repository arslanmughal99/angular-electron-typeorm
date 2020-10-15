import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { User } from "./user.entity";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    (async () => {
      const user = new User();
      user.class = "13";
      user.name = "Arslan";
      user.subject = "Computer Science";
      await user.save();
    })();
  }
}
