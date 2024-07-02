import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";
import { Button, Table, Container } from "react-bootstrap";

const Index: React.FC<IndexProps> = ({ users }) => {
    const { t } = useTranslation();
    const handleDelete = (id: number) => {
        Inertia.delete(route("users.destroy", { id }));
    };

    const handleRestore = (id: number) => {
        Inertia.post(route("users.restore", { id }));
    };

    const handleForceDelete = (id: number) => {
        Inertia.delete(route("users.forceDelete", { id }));
    };

    const handleBan = (id: number) => {
        Inertia.post(route("users.ban", { id }));
    };

    const handleUnban = (id: number) => {
        Inertia.post(route("users.unban", { id }));
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
                        <th>{t("picture")}</th>
                        <th>{t("name")}</th>
                        <th>{t("email")}</th>
                        <th>{t("gender")}</th>
                        <th>{t("birthdate")}</th>
                        <th>{t("state")}</th>
                        <th>{t("actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.picture && (
                                    <img
                                        src={`/storage/${user.picture}`}
                                        alt={user.name}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                )}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{formatDate(user.birthdate)}</td>
                            <td>
                                {user.state === "App\\States\\Banned"
                                    ? t("banned")
                                    : t("active")}
                            </td>
                            <td>
                                {user.deleted_at ? (
                                    <>
                                        <Button
                                            variant="success"
                                            onClick={() =>
                                                handleRestore(user.id)
                                            }
                                            className="me-2"
                                        >
                                            {t("restore_user")}
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                handleForceDelete(user.id)
                                            }
                                        >
                                            {t("delete_user_forever")}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        {user.state !==
                                        "App\\States\\Banned" ? (
                                            <Button
                                                variant="warning"
                                                href={route("users.edit", {
                                                    id: user.id,
                                                })}
                                                className="me-2"
                                            >
                                                {t("edit_user")}
                                            </Button>
                                        ) : (
                                            <span className="text-muted me-2">
                                                {t("edit_not_allowed")}
                                            </span>
                                        )}
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            className="me-2"
                                        >
                                            {t("delete_user")}
                                        </Button>
                                        {user.state ===
                                        "App\\States\\Banned" ? (
                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleUnban(user.id)
                                                }
                                            >
                                                {t("unban_user")}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    handleBan(user.id)
                                                }
                                            >
                                                {t("ban_user")}
                                            </Button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Index;
