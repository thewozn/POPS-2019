import { User } from './user.model';
export class Mission {
  constructor(
    public mid: number,
    public description: string,
    public status: string,
    public title: string,
    public sid: number,
    public users: User[],
    public usersSub: User[]
    ) {
  }
}
