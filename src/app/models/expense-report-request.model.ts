import { ExpenseReportLine } from './expense-report-line.model';

export class ExpenseReportRequest {
  constructor(
    public did: number,
    public requestDate: string, //Mois de la note de frais YYYY-MM-jj
    public status: string,
    public traitmentDate: string,
    public uid: number,
    public expenseReportLineRequest: ExpenseReportLine[]
  ) {
  }
}
