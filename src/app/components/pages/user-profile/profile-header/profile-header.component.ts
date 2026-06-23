import { Component, Input, OnInit } from '@angular/core';
import {  User } from '../../../../../constants/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css',
})
export class ProfileHeaderComponent   {
  @Input()
  user!: User;
 
  
}
