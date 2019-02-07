export class HolidayRequest {
  constructor(
    public did: number,
    public end: boolean,
    public end_date: Date,
    public request_date: Date,
    public start: boolean,
    public start_date: Date,
    public status: string,
    public traitment_date: Date,
    public tcid: number,
    public uid: number,
    ) {
  }
}
