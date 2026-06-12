import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { HttpService } from '../../../../services/http.service';
import { NotifyService } from '../../../../services/notify.service';
import { add_details } from '../../../../../constants/url/urls';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../partials/modal/modal.component';

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
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  imports: [CommonModule, ModalComponent],
})
export class SkillsComponent implements OnInit, OnChanges {
  isModalVisible = false;
  formFields = Skill[0];

  formTitle = 'Add Language';
  @Input()
  Id!: string;
  @Input()
  skills: any;
  constructor(
    private http: HttpService,
    private notify: NotifyService,
  ) {}
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
    this.AddSkill(labelValuePairs[0].value);
  }

  AddSkill(skill: string) {
    const trimmedSkill = skill?.trim();

    // Empty or only spaces
    if (!trimmedSkill) {
      this.notify.notifyMessage('error', 'Please enter a skill.');
      return;
    }

    // Duplicate skill
    if (
      this.skills?.some(
        (s: string) => s.toLowerCase() === trimmedSkill.toLowerCase(),
      )
    ) {
      this.notify.notifyMessage('error', 'This skill has already been added.');
      return;
    }

    const body = { skill: trimmedSkill };
    this.http.post(add_details + '/' + this.Id + '/skills', body).subscribe({
      next: (res: any) => {
        this.notify.notifyMessage('success', 'Skill Added Succesfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: () => {
        this.notify.notifyMessage(
          'error',
          'Unable to add the skill at the moment. Please try again later.',
        );
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
      error: () => {
        this.notify.notifyMessage(
          'error',
          'Unable to delete the skill at the moment. Please try again later.',
        );
      },
    });
  }
}
