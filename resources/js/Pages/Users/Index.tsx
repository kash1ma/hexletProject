import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";
import { Button, Table, Container } from "react-bootstrap";

const Index: React.FC<IndexProps> = ({ users }) => {
    const { t } = useTranslation();
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
            <h1>{t("user_list")}</h1>
            <h2>heyyo man</h2>
            <InertiaLink href="/users/create">
                <Button variant="primary" className="mb-3">
                    {t("create_user")}
                </Button>
            </InertiaLink>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{t("name")}</th>
                        <th>{t("email")}</th>
                        <th>{t("gender")}</th>
                        <th>{t("birthdate")}</th>
                        <th>{t("actions")}</th>
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
                                    {t("delete_user")}
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
