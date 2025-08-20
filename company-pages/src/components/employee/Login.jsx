'use client';


import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios';


export default function EmployeeLogin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/employees/login', formData);

            if (res.data.success) {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "/employees";
                alert('Login successfully');
                router.push('/employee/dashboard');
            } else {
                setError('Invalid email');
            }

        } catch (err) {
            setError(err.response?.data?.error || '‼️Login failed');

        }
    };

    return (
        <div style={{ padding: '2rem' }}>

            <h2>Employee Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'tomato' }}>{error}</p>}

        </div>
    )

}