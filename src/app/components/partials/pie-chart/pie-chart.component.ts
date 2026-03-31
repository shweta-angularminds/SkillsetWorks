import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  standalone: true,
  imports: [NgChartsModule],
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnChanges {
  @Input() pending: number = 0;
  @Input() approved: number = 0;
  @Input() rejected: number = 0;
  @Input() shortlisted: number = 0;
  total: number = 0;
  public pieChartData: ChartData<'pie'> = {
    labels: ['Pending', 'Approved', 'Rejected', 'shortListed'],
    datasets: [
      {
        data: [this.pending, this.approved, this.rejected, this.shortlisted],
        backgroundColor: ['#FAB12F', '#7ED4AD', '#E82561', '#0077ff'],
      },
    ],
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartType: ChartType = 'pie';

  ngOnChanges(changes: SimpleChanges): void {
    this.total =
      this.pending + this.approved + this.shortlisted + this.rejected;

    if (
      changes['pending'] ||
      changes['approved'] ||
      changes['rejected'] ||
      changes['shortlisted']
    ) {
      this.pieChartData = {
        labels: ['Pending', 'Approved', 'Rejected', 'Shortlisted'],
        datasets: [
          {
            data: [
              this.pending,
              this.approved,
              this.rejected,
              this.shortlisted,
            ],
            backgroundColor: ['#FAB12F', '#7ED4AD', '#E82561', '#75e6da'],
          },
        ],
      };
    }
  }
}
