import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

const Index = ({ users }) => {
    const handleDelete = (id) => {
        Inertia.delete(`/users/${id}`);
    };
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-5">
            <h1>Users</h1>
            <InertiaLink href="/users/create" className="btn btn-primary mb-3">
                Create User
            </InertiaLink>
            <table className="table table-bordered">
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
                                <InertiaLink
                                    href={`/users/${user.id}/edit`}
                                    className="btn btn-warning btn-sm mr-2"
                                    style={{ marginRight: "8px" }}
                                >
                                    Edit
                                </InertiaLink>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="btn btn-danger btn-sm ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
