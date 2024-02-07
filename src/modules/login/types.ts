type Login = {
    username: string;
    password: string;
}

type User = {
    id       : number;
    username : string;
    email    : string;
    firstName: string;
    lastName : string;
    gender   : string;
    image    : string;
    token    : string;
}

export {
    Login,
    User
};