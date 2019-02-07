export class User {
    constructor(
        public uid: number,
        public status: string,
        public sid: string,
        public last_name: string,
        public first_name: string,
        public date_n: Date,
        public email: string,
        public address: string,
        public cp: string,
        public city: string,
        public country: string,
        public password: string,
        public picturepath: string,
        public alive: boolean,
        ) {
    }
}
