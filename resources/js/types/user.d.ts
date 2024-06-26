interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    birthdate: string;
    avatar: string | null;
    deleted_at: string | null;
    state: string;
}

interface IndexProps {
    users: User[];
}

interface EditProps {
    user: User;
}
