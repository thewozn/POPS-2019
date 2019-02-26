export class ExpenseReportRequest {
  constructor(
    public did: number,
    public request_date: Date,
    public status: string,
    public traitmentDate: Date,
    public uid: number,
  ) {
  }
}
