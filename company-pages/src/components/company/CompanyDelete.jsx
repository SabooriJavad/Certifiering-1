'use client';

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function CompanyDelete() {
    const router = useRouter();
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(id);


    const fetchDelete = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/companies/${id}`);
            const allCompanies = response.data;
            const selectedCompany = allCompanies.find((c) => c._id === id);

            if (!selectedCompany) {
                alert('Could not found company');
                return;
            }
            setCompany(selectedCompany);
            console.log(selectedCompany);

        } catch (err) {
            alert('Could nod fetch company')
            router.push('/companys');

        }
    };

    useEffect(() => {
        if (id) {
            fetchDelete();

        }
    }, [id, router]);


    const handleDelete = async () => {

        const confirm = window.confirm('Are you sure you want to delete this company');

        if (!confirm) {
            router.push('/companys');
            return;
        }
        setLoading(true)
        try {
            await axios.delete(`http://localhost:5000/api/companies/${id}`);
            router.push('/companys');
            alert(' Company removed successfully');

        } catch (error) {
            console.error('Error while deleting:', error);

        } finally {
            setLoading(false);
        }

    };

    return (
        <main>

            {company ? (
                <div>
                    <p><strong>Name:</strong>{company?.name}</p>
                    <p><strong>Email:</strong>{company?.email}</p>
                    <p><strong>Location:</strong>{company?.location}</p>
                    <p><strong>Company Number:</strong> {company.companyNumber}</p>
                </div>
            ) : (
                <p>Loading company</p>
            )}
            <button onClick={handleDelete}
                disabled={loading}
                style={{ padding: '10px 20px', background: 'red', color: 'white', borderRadius: '12px' }}
            >
                {loading ? 'Delate...' : 'Delete'}
            </button>
            <br /><br />

            <button onClick={() => router.push('/companys')}>Back</button>
        </main>
    )


};