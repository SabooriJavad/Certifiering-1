'use client';

import { useState, useEffect } from 'react';
import { getCompanies } from '@/api/api';
import Link from 'next/link';

export default function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState();




    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            setCompanies(response.data);

        } catch (err) {
            console.error('Erro while fetching  company:', err);
            setError('Could not fetch company');
        }
    };
    useEffect(() => {
        fetchCompanies();

    }, []);

    return (
        < div style={{}}>

            <ul>
                {companies.map((com) => (
                    <li key={com._id}>
                        {com.name} -{com.email} - {com.location}
                        <Link href={`/companys/update/${com._id}`}>Redigera</Link>
                        <Link href={`/companys/delete/${com._id}`}>❌</Link>
                    </li>
                ))}
            </ul>
        </div>
    )


};

// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function CompanyList() {
//     const [companies, setCompanies] = useState([]);

//     useEffect(() => {
//         const fetchCompanies = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/companies');
//                 setCompanies(response.data);
//             } catch (error) {
//                 console.error('Kunde inte hämta anställda:', error);
//             }
//         };

//         fetchCompanies();
//     }, []);

//     return (
//         <div>
//             <h2>Companies</h2>
//             <ul>
//                 {companies.map((com) => (
//                     <li key={com._id}>
//                         {com.name} - {com.email} - {com.location}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
