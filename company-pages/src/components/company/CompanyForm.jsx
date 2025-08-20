'use client'


import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';



export default function CompanyForm() {
    const [company, setCompany] = useState();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/companies', data);
            setCompany(response.data);
            reset();
            alert('Company registered successfully!');


        } catch (err) {
            console.error('Error creating company', err);
            alert('Filed to register comapny');
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Company Name" /><br />
            <input {...register('companyNumber')} placeholder="Company Number" /><br />
            <input {...register('email')} placeholder='Email' /><br />
            <input {...register('password')} placeholder='password' /> <br />
            <input {...register('location')} placeholder="Location" /><br />
            <button type="submit">Register</button>

        </form>
    )

};