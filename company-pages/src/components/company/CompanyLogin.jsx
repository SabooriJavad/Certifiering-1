'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function CompanyLogin() {
    const [formdata, setFormdata] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/companies/login', formdata);

            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');

                alert('Login successfully');

                router.push('/companys');
            } else {
                setError('Invalid email');
            }
        } catch (err) {
            setError(err.response?.data?.error || '‼️ Login failed');
        }
    };


    return (

        <div style={{ padding: '3rem' }}>

            <h2>Company Login</h2>

            <form onSubmit={handleSubmit}>
                <input type="email"
                    name="email"
                    placeholder="Email"
                    value={formdata.email}
                    onChange={handleChange}
                    required
                /> <br />
                <input type="password"
                    name="password"
                    placeholder="Password"
                    value={formdata.password}
                    onChange={handleChange}
                    required
                /><br />

                <button type="submit">Login</button>


            </form>
            {error && <p style={{ color: 'tomato' }}>{error}</p>}
        </div>
    )
}