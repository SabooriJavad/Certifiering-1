'use client';

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function EmployeeForm() {
    const [employees, setEmployees] = useState();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {

        try {
            const response = await axios.post('http://localhost:5000/api/employees', data);
            setEmployees(response.data);
            reset();
            alert('The account registered successfully!');


        } catch (err) {
            alert('somethings want wrong');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder='Name' /><br />
            <input {...register('email')} placeholder='Email' /><br />
            <input {...register('password')} placeholder='Password' /> <br />
            <input {...register('position')} placeholder='Position' /><br />
            <input {...register('employeeCode')} placeholder='Employee-cod' /><br />
            <button type='submit'>Register</button>

        </form>
    )
};