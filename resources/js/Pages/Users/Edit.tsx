import React, { useState, FormEvent } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Form, Button, Container } from "react-bootstrap";

interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    birthdate: string;
}

interface EditProps {
    user: User;
}

const Edit: React.FC<EditProps> = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [gender, setGender] = useState(
        user.gender === "Мужской" ? "male" : "female"
    );
    const [birthdate, setBirthdate] = useState(user.birthdate);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        Inertia.put(`/users/${user.id}`, { name, email, gender, birthdate });
    };
    return (
        <Container>
            <h1 className="my-4">Edit user</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        required
                    >
                        <option value="">Choose gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Edit
                </Button>
            </Form>
        </Container>
    );
};
export default Edit;
