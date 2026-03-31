import { Component, Input,  OnInit } from '@angular/core';

import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_language_url } from '../../../../../constants/url/urls';


export const LanguageD = [
  {
    fields: [
      {
        label: 'Language',
        inputType: 'text',
        placeholder: 'Enter language name',
        value: '',
        name: 'languages', // Unique name for database or form handling
      },
    ],
  },
];
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css',
})
export class LanguagesComponent implements OnInit {
  isModalVisible = false;
  formFields = LanguageD[0];

  formTitle = 'Add Language';
  @Input()
  Id!: string;
  @Input()
  Languages: string[]=[];
  constructor(private http: HttpService, private notify: NotifyService) {}
  ngOnInit(): void {
   
  }
 
  openModal() {
    this.formFields = LanguageD[0];
  
    this.isModalVisible = true;
  
  }

  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(labelValuePairs: any) {
    this.AddLanguge(labelValuePairs[0].value);
  }

  submitForm() {
   
  }

  AddLanguge(lang: string) {
    const body = { language: lang };
    this.http.post(add_language_url + this.Id + '/language', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Language Added Succesfully!');
        window.location.reload();
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
        
      },
    });
  }
  deleteLang(lang: string) {
    const body = { language: lang };
    this.http.Put(add_language_url + this.Id + '/language', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Deleted Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
      },
    });
  }
}
