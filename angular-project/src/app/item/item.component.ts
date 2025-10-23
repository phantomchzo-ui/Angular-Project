import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule], // Добавляем FormsModule для работы с формами
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchTerm: string = '';
  errorMessage = '';
  isLoading = true;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.filteredItems = data; // Изначально показываем все товары
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  // Метод для поиска товаров
  searchItems() {
    if (!this.searchTerm.trim()) {
      // Если поисковый запрос пустой, показываем все товары
      this.filteredItems = this.items;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.title.toLowerCase().includes(searchTermLower) ||
      item.description.toLowerCase().includes(searchTermLower) ||
      item.category.toLowerCase().includes(searchTermLower)
    );
  }

  // Метод для очистки поиска
  clearSearch() {
    this.searchTerm = '';
    this.filteredItems = this.items;
  }
}