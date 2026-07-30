import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import { validateSkill } from './skill.validator';
import { FormFieldValue, SKILL_FIELDS } from './skill.interface';
import { NotifyService } from '../../../../core/services/notify.service';
import { JobseekerService } from '../../services/jobseeker.service';

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
    private jobseekerService: JobseekerService,
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

    this.jobseekerService.addSkill({ skill }).subscribe({
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
    this.jobseekerService.deleteSkill({ skill }).subscribe({
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
