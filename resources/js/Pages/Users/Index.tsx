import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

import { Button, Table, Container } from "react-bootstrap";

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

const Index: React.FC<IndexProps> = ({ users }) => {
    const handleDelete = (id: number) => {
        Inertia.delete(`/users/${id}`);
    };
    const formatDate = (dateString: string) => {
        const options: object = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Container>
            <h1>Users</h1>
            <h1>PISEC</h1>
            <InertiaLink href="/users/create">
                <Button variant="primary" className="mb-3">
                    Create User
                </Button>
            </InertiaLink>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{formatDate(user.birthdate)}</td>
                            <td>
                                <InertiaLink href={`/users/${user.id}/edit`}>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        style={{ marginRight: "8px" }}
                                    >
                                        Edit
                                    </Button>
                                </InertiaLink>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Index;
