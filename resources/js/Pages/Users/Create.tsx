import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Form, Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Create = () => {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        gender: "",
        birthdate: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <Container>
            <h1 className="my-4">{t("create_user")}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("name", e.target.value)
                        }
                        placeholder="Name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={data.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("email", e.target.value)
                        }
                        placeholder="Email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        value={data.gender}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setData("gender", e.target.value)
                        }
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
                        value={data.birthdate}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("birthdate", e.target.value)
                        }
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={processing}>
                    {t("create_user")}
                </Button>
            </Form>
        </Container>
    );
};

export default Create;
