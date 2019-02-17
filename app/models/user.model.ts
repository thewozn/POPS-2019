export class User {
    constructor(
        public uid: number,
        public status: string,
        public sid: number,
        public lastName: string,
        public firstName: string,
        public dateN: Date,
        public email: string,
        public address: string,
        public cp: string,
        public city: string,
        public country: string,
        public password: string,
        public picturePath: string,
        public alive: boolean,
        ) {
    }
}
