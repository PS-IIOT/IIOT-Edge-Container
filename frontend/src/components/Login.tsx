import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/login.service';

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = (formData: unknown) => {
        const userIsLogedIn = loginUser(formData.username, formData.password);
        console.log('userIsLogedIn', userIsLogedIn);
        if (userIsLogedIn == true) {
            navigate('/AdminPanel');
        } else {
            alert('wrong input');
        }
    };
    return (
        <div
            className={`flex flex-col justify-start items-start m-auto rounded-xl drop-shadow-xl shadow-md shadow-grey bg-slate-200 w-60 h-60`}
        >
            <div className="Login-Header bg-slate-400 w-full h-12 rounded-t-md flex justify-center items-center">
                <h1 className="text-slate-100 text-3xl">Login</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center w-full mt-4"
            >
                <input
                    className="flex-1 rounded-md m-2 bg-slate-500 border-2 border-white placeholder:text-white justify-center p-1 text-slate-100"
                    type="text"
                    placeholder="username:"
                    {...register('username', { required: true })}
                />
                <input
                    className="flex-1 rounded-md m-2 bg-slate-500 border-2 border-white placeholder:text-white justify-center p-1 text-slate-100"
                    type="password"
                    placeholder="password:"
                    {...register('password', { required: true })}
                />
                <button
                    className="flex-1 w-28 mx-auto rounded-md m-2 bg-slate-500 border-2 border-white placeholder:text-white justify-center p-1 text-slate-100 hover:bg-green-500"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
