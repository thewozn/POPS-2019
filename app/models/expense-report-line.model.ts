export class ExpenseReportLine {
  constructor(
    public lndfid: number,
    public advance: boolean,
    public amount: number,
    public publishing_date: Date,
    public refusal_reason: string,
    public state: string,
    public textDetails: string,
    public typeLine: string,
    public ndfid: number,
    public mid: number,
    ) {
  }
}
