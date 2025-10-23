import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  users: any[] = [];
  loaded = false;

  private searchSubject = new Subject<string>();
  private lastSearchTerm = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      switchMap(() => this.apiService.getUsers()),
      map(users => {
        const term = this.lastSearchTerm.toLowerCase();
        return users.filter(user =>
          (user.name && user.name.toLowerCase().includes(term)) ||
          (user.email && user.email.toLowerCase().includes(term))
        );
      })
    ).subscribe(data => {
      this.users = data.slice(0, 5);
      this.loaded = true;
    });

    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe((data: any[]) => {
      this.users = data.slice(0, 10);
      this.loaded = true;
    });
  }

  onSearch(term: string) {
    this.lastSearchTerm = term;
    this.searchSubject.next(term);
  }
}
