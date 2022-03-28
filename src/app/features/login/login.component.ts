import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  sub: Subscription;
  destroy$: Subject<boolean> = new Subject<boolean>();

  user = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private userStore: UserStoreService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  submit(form: NgForm) {
    this.auth.login(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.userStore.isAdmin()
            .subscribe()
        },
        error: err => {
          alert(err.error.result);
        }
      });
  }

}
