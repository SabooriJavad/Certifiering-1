
'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function EmployeePage() {

    const router = useRouter();
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchDelete = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
            setEmployee(response.data);

        } catch (err) {
            console.error('Could  not fetch employee', err);
            alert('Could not fetch employee');
            router.push('/employees');
        }

    };

    useEffect(() => {
        if (id)
            fetchDelete();

    }, [id, router]);




    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure to want delete employee/${id}`);
        if (!confirmDelete) {
            return;
        }
        setLoading(true);


        try {
            await axios.delete(`http://localhost:5000/api/employees/${id}`);
            alert('Empolyee removed');
            router.push('/employee')
        } catch (error) {
            console.error('Error while deleting', error);
            alert('Something went wron while deleting');
        } finally {
            setLoading(false);

        }
    };

    return (
        <main>
            <h2>Delete Employee</h2>
            {employee ? (
                <div>
                    <p><strong>Name:</strong>{employee.name}</p>
                    <p><strong>Email:</strong>{employee.email}</p>
                    <p><strong>Position:</strong>{employee.position}</p>
                </div>
            ) : (
                <p>Loading employee</p>
            )}
            <button onClick={handleDelete}
                disabled={loading}
                style={{ padding: '10px 20 px', background: 'red', color: 'white', border: 'none' }}

            >
                {loading ? 'Delete...' : 'Delete'}
            </button>

            <br /><br />

            <button onClick={() => router.push('/employees')}>Back</button>
        </main>
    )

}