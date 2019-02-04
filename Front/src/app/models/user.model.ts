export class User {
    constructor(
        public uid: number,
        public status: string,
        public sid: string,
        public lastname: string,
        public firstname: string,
        public dateN: Date,
        public email: string,
        public address: string,
        public cp: string,
        public city: string,
        public country: string,
        public password: string,
        public picturepath: string) {
    }
}
