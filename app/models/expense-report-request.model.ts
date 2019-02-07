export class ExpenseReportRequest {
  constructor(
    public did: number,
    public request_date: Date,
    public status: string,
    public traitment_date: Date,
    public uid: number,
  ) {
  }
}
