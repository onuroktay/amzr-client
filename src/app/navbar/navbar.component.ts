import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NavbarService} from '../services/navbar.service';
import {Tab} from '../model/tab';

@Component({
  selector: 'amzr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tab: Tab;

  constructor(private router: Router,
              private authService: AuthService,
              private navbarService: NavbarService) {
  }

  ngOnInit() {
    this.tab = this.navbarService.tab;
  }

  public changeTab(e) {
    switch (e.index) {
      case 0:
        this.router.navigate(['/app/items/page/1']);
        break;

      case 1:
        this.router.navigate(['/app/users']);
        break;

      default:
        break;
    }
  }

  getUserName(): string {
    return this.authService.getUserName();
  }


  getUserRole(): number {
    return this.authService.getUserRole();
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        this.router.navigate(['/login']);
        localStorage.removeItem('username');
        localStorage.removeItem('roleValue');
      }
    );
  }
}
