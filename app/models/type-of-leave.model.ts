export class TypeOfLeave {
  constructor(
    public tcid: number,
    public maxDays: number,
    public remainingBalance: number,
    public type: string,
    public uid: number,
  ) {
  }
}
