export class VacationRequest {
  constructor(
    public did: number,
    public end: boolean,
    public endDate: Date,
    public requestDate: Date,
    public start: boolean,
    public startDate: Date,
    public status: string,
    public traitmentDate: Date,
    public tcid: number,
    public uid: number,
    ) {
  }
}
