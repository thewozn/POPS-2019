export class VacationRequest {
  constructor(
    public did: number,
    public end: boolean,
    public endDate: string,
    public requestDate: string,
    public start: boolean,
    public startDate: string,
    public status: string,
    public traitmentDate: string,
    public uid: number,
    public vid: number,
    ) {
  }
}
