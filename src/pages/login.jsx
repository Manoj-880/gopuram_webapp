import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';
import { loginform } from '../api_calls/webUsersApi';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        var response = await loginform(formData);
        console.log(response);
        login();
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="loginComponent">
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='userName'>User Name:</label>
                        <input
                            type='text'
                            id='userName'
                            name='userName'
                            value={formData.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
