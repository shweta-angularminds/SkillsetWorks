import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ObjectId } from 'mongoose';
import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_details } from '../../../../../constants/url/urls';

export const Skill = [
  {
    fields: [
      {
        label: 'Skill',
        inputType: 'text',
        placeholder: 'Enter skill here...',
        value: '',
        name: 'skills',
      },
    ],
  },
];
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit, OnChanges {
  isModalVisible = false;
  formFields = Skill[0];

  formTitle = 'Add Language';
  @Input()
  Id!: ObjectId;
  @Input()
  skills: any;
  constructor(private http: HttpService, private notify: NotifyService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  openModal() {
    this.formFields = Skill[0];

    this.isModalVisible = true;
  }

  onCloseModal() {
    this.isModalVisible = false;
  }

  handleFormDataChange(labelValuePairs: any) {
    this.AddLanguge(labelValuePairs[0].value);
  }

  AddLanguge(skill: string) {
    const body = { skill: skill };
    this.http.post(add_details + '/' + this.Id + '/skills', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Skill Added Succesfully!');
        window.location.reload();
      },
      error: (err: any) => {
        this.notify.notifyMessage('error', err.message);
      },
    });
  }
  deleteSkill(skill: string) {
    const body = { skill: skill };
    this.http.Put(add_details + '/' + this.Id + '/skills', body).subscribe({
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
