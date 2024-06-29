interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    birthdate: string;
}

interface IndexProps {
    users: User[];
}

interface EditProps {
    user: User;
}
