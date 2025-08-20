'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);


    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Kunde inte hämta anställda:', error);
        }
    };

    useEffect(() => {

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Employees</h2>
            <ul>
                {employees.map((emp) => (
                    <li key={emp._id}>
                        <strong>{emp.name}</strong> - {emp.email} - {emp.position} |
                        <Link href={`/employees/edit/${emp._id}`}> Redigera</Link>
                        <Link href={`/employees/delete/${emp._id}`}> Delete</Link>

                    </li>

                ))}
            </ul>
        </div >
    );
}


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getEmployees } from '@/api/api'; // justera sökväg vid behov

// export default function EmployeeList() {
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         async function fetchEmployees() {
//             try {
//                 const response = await getEmployees();
//                 setEmployees(response.data);
//             } catch (err) {
//                 setError('Kunde inte hämta anställda');
//             }
//         }

//         fetchEmployees();
//     }, []);

//     return (
//         <div style={{ padding: '2rem' }}>
//             <h2>Lista över Anställda</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             {employees.length === 0 ? (
//                 <p>Inga anställda hittades.</p>
//             ) : (
//                 <ul>
//                     {employees.map((emp) => (
//                         <li key={emp._id}>
//                             <strong>{emp.name}</strong> – {emp.position} – {emp.email}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }
