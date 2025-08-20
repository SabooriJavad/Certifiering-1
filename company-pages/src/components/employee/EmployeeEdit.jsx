'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from 'next/navigation';




export default function EmployeeEdit({ }) {
    const { id } = useParams(); // Hämta id från URL
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm();
    const [employee, setEmployee] = useState(null);

    const fetchEmployee = async () => {

        try {
            console.log("ID:", id);
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
            setEmployee(response.data);
            setValue('name', response.data.name);
            setValue('email', response.data.email);
        } catch (error) {
            console.error("Kunde inte hämta anställd:", error);
        }

    };


    useEffect(() => {
        if (id) {
            fetchEmployee();
        }
    }, [id, setValue]);

    const onSubmit = async (data) => {

        try {
            const response = await axios.put(`http://localhost:5000/api/employees/${id}`, data);

            alert('Updaterat');
            router.push('/employees');
        } catch (error) {
            console.error('Kunde inte uppdatera', error);

        }


    }
    return (
        < form onSubmit={handleSubmit(onSubmit)}>

            <p>
                <label>
                    <input {...register('name')} defaultValue={employee?.name} placeholder="Name" />
                </label>
            </p>

            <p>
                <label>
                    <input {...register('email')} defaultValue={employee?.email} placeholder="Email" />
                </label>
            </p>
            <button type="submit">Save</button>
            {employee && (
                <p>
                    {employee.name} - {employee.email}
                </p>
            )}
        </form>
    )
}
/*   const fetchEvent = async () => {

    console.log(eventId);
    try {

      const response = await axios.get<IEvent>(`${API_URL}/events`);
     
      
      const eventData = response.data;
      setEvent(eventData);

      setValue('title', eventData.title);
      setValue('description', eventData.description);
     setValue('date', new Date(eventData.date).toISOString().slice(0, 16)) ;
      
      ;
     
    } catch (err: any) {
      console.error('Kunde inte hämta Evenemang',err.rsponse?.status,err.reposne?.data || err.message);
    }
    
  };
  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId, setValue]) */