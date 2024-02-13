import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../middleware/authContext';
import { loginform } from '../api_calls/webUsersApi';
import { message } from 'antd';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
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
                login();
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
                <h2 style={{marginBottom:"0.5rem"}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{display:"table-caption"}}>
                        <div className='form-group' style={{marginBottom:"0.5rem"}}>
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
                        <div className='form-group' style={{marginBottom:"0.5rem"}}>
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
                    </div>
                    <button type='submit' style={{paddingLeft:'0.8rem', paddingRight: '0.8rem', paddingTop: '0.2rem', paddingBottom:'0.2rem'}}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
