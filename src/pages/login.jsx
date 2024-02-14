import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginform } from '../api_calls/webUsersApi';
import { message } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            var response = await loginform(formData);
            if (response && response.success) {
                message.success(response.message);
                localStorage.setItem('userData', JSON.stringify(response.data));
                navigate('/');
            } else {
                message.error(response ? response.message : 'Unknown error');
            }
        } catch (error) {
            console.error('Error during login:', error);
            message.error('Error during login. Please try again later.');
        }
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
                    <div className='inputsGroup'>
                        <div className='form-group'>
                            <input
                                type='text'
                                id='userName'
                                name='userName'
                                value={formData.userName}
                                onChange={handleChange}
                                required
                                placeholder='User Name*'
                            />
                        </div>
                        <div className='form-group' style={{marginBottom:"0.5rem"}}>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='Password*'
                            />
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
