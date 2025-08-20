// 'use client';
// import axios from 'axios';
// import { getCompaniesById, updateCompanies } from "@/api/api";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";



// export default function CompanyEdit(id) {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const companyId = searchParams.get(id);


//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         location: '',
//         companynumber: '',
//     });

//     const fetchCompany = async () => {
//         const res = await getCompaniesById(companyId);
//         setFormData(res.data);

//     };
//     if (companyId) fetchCompany();


//     useEffect(() => {
//         fetchCompany();
//     }, [companyId]);

//     const handleChange = (e) =>
//         setFormData({
//             ...formData, [e.target.name]: e.target.value
//         });

//     const handleSubmit = async (e) => {
//         e.pareventDefault();
//         await updateCompanies(companyId, formData);
//         router.push('/companys');
//     };
//     return (
//         <form onSubmit={handleSubmit}>
//             <p>
//                 <label>

//                     <input name="name" value={formData.name ?? ''} onChange={handleChange} placeholder="Namn" />

//                 </label>
//             </p>

//             <p>
//                 <label>
//                     <input name="email" value={formData.email ?? ''} onChange={handleChange} placeholder="Email" />
//                 </label>
//             </p>
//             <p>
//                 <label>
//                     <input name="location" value={formData.location ?? ''} onChange={handleChange} placeholder="Plats" />
//                 </label>
//             </p>


//             <button type="submit">Uppdatera</button>
//         </form>
//     );
// }


'use client';

import axios from "axios";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



export default function CompanyEdit() {
    const router = useRouter();
    const { id } = useParams();


    const { register, handleSubmit, setValue } = useForm();
    const [company, setCompany] = useState();

    const fetchCompany = async (companyId) => {
        if (!companyId) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/companies/${id}`);
            setCompany(response.data);
            setValue('name', response.data.name);
            setValue('email', response.data.email);
            setValue('location', response.data.location);
        } catch (error) {
            console.error('Kunde inte hämta company', error);
        }
    }


    useEffect(() => {
        if (id) {
            fetchCompany(id);
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {

        try {
            const response = await axios.put(`http://localhost:5000/api/companies/${id}`, data);
            alert('Updaterart');
            router.push('/companys');
        } catch (error) {
            console.error('Kunde inte updatera', error);
        }
        if (!company) return <p>Laddar Company data</p>
    };
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <p>
                    <label>
                        <input {...register('name')} defaultValue={company?.name} placeholder="Name" />

                    </label>
                </p>

                <p>
                    <label>
                        <input {...register('email')} defaultValue={company?.email} placeholder="Email" />

                    </label>
                </p>

                <p>
                    <label>
                        <input {...register('location')} defaultValue={company?.location} placeholder="Location" />

                    </label>
                </p>
                <button type="submit">Updatera</button>
            </form>
        </main>
    )
};