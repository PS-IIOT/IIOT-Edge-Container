import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/login.service';

type UserData = {
    username: string;
    password: string;
};

export const Login = () => {
    const { register, handleSubmit } = useForm<UserData>();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('username') != null) {
            navigate('/AdminPanel');
        }
    }, []);

    const onSubmit = async (formData: UserData) => {
        const userCredentials = {
            username: formData.username,
            password: formData.password,
        };
        await loginUser(userCredentials).then((response) => {
            if (response.successLogin == true) {
                navigate('/AdminPanel');
                sessionStorage.setItem('username', formData.username);
                sessionStorage.setItem('password', formData.username);
            } else {
                navigate('/Login');
            }
        });
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
