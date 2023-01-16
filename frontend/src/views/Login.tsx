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
        document.title = 'Login';
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
        <div className="justify-self-center self-center flex flex-col justify-start items-start m-auto rounded-md drop-shadow-xl shadow-md shadow-grey bg-slate-200 w-full max-w-xs ">
            <div className="Login-Header bg-slate-400 w-full h-12 rounded-t-md flex justify-center items-center">
                <h1 className="text-white text-xl font-bold italic m-1 uppercase">
                    Login
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center w-full mt-4 "
            >
                <input
                    className="flex-1 rounded-md m-2 bg-slate-500 border-2 border-white  justify-center p-2 text-slate-100 placeholder-slate-300 placeholder:italic"
                    type="text"
                    placeholder="username"
                    {...register('username', { required: true })}
                />
                <input
                    className="flex-1 rounded-md m-2 bg-slate-500 border-2 border-white  placeholder-slate-300 placeholder:italic justify-center p-2 text-slate-100"
                    type="password"
                    placeholder="password"
                    {...register('password', { required: true })}
                />
                <button
                    className="flex-1 w-28 mx-auto rounded-md p-2 m-4 bg-slate-500 border-2 border-white placeholder:text-white justify-center text-slate-100 hover:bg-green-500 uppercase  font-bold text-xs"
                    type="submit"
                >
                    login
                </button>
            </form>
        </div>
    );
};
