export class TypeOfLeave {
  constructor(
    public tcid: number,
    public max_days: number,
    public remaining_balance: number,
    public type: string,
    public uid: number,
  ) {
  }
}
