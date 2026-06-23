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
import { SKILL_FIELDS } from './constants/skill-form';
import { SkillService } from './service/skill.service';
import { validateSkill } from './utils/skill.validator';
import { FormFieldValue } from './constants/skill.interface';

@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  imports: [CommonModule, ModalComponent],
})
export class SkillsComponent {
  @Input() Id!: string;
  @Input() skills: string[] = [];

  isModalVisible = false;

  formTitle = 'Add Skill';

  formFields = SKILL_FIELDS;

  selectedFormData = {};

  constructor(
    private skillService: SkillService,
    private notify: NotifyService,
  ) {}

  openModal() {
    this.selectedFormData = {}; 
    this.isModalVisible = true;
  }

  onCloseModal() {
    this.selectedFormData = {}; 
    this.isModalVisible = false;
  }

  handleFormDataChange(data: FormFieldValue[]): void {
    const skill = data[0]?.value;

    const error = validateSkill(skill, this.skills);

    if (error) {
      this.notify.notifyMessage('error', error);
      return;
    }

    this.skillService.addSkill(this.Id, { skill }).subscribe({
      next: () => {
        this.skills = [...this.skills, skill];

        this.notify.notifyMessage('success', 'Skill added successfully');

        this.onCloseModal();
      },

      error: () => {
        this.notify.notifyMessage('error', 'Unable to add skill.');
      },
    });
  }

  deleteSkill(skill: string): void {
    this.skillService.deleteSkill(this.Id, { skill }).subscribe({
      next: () => {
        this.skills = this.skills.filter((s) => s !== skill);

        this.notify.notifyMessage('success', 'Skill deleted successfully');
      },

      error: () => {
        this.notify.notifyMessage('error', 'Unable to delete skill.');
      },
    });
  }
}
