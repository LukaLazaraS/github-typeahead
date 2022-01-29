import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AppService } from './app.service';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'github-typeahead';
  users: User[] = [];
  delayTimer: any;

  usernameSearchInput = new FormControl();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getUsers(this.usernameSearchInput.value).subscribe(data => {
      data.items.forEach((user: { avatar_url: any; login: any; html_url: any; }) => {
        this.users.push({ img: user.avatar_url, username: user.login, link: user.html_url });
      });
    })
  }

  onUsernameChange() {
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.appService.getUsers(this.usernameSearchInput.value).subscribe(data => {
        console.log(data);
        this.users = [];
        data.items.forEach((user: { avatar_url: any; login: any; html_url: any; }) => {
          this.users.push({ img: user.avatar_url, username: user.login, link: user.html_url });
        });
      })
    }, 500);
  }

  onClickUser(link: string) {
    window.location.href = link;
  }
}
