import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/auth/side_img.svg'
import logo from '../assets/auth/logo.svg'
import './auth_style.css'
import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import authInstance from '../apis/authinstance';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';



function Auth({ register }) {
    const navigate = useNavigate();
    const registerForm = register ? true : false;
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!username) {
            newErrors.username = "Username is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (registerForm && password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        else {
            setErrors({})
            const data = {
                username, email, password
            }
            const response = await authInstance.post('/api/auth/local/register', data);
            if (response.status === 200) {
                navigate('/')
            }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!username) {
            newErrors.username = "Username is required";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        else {
            setErrors({})
            const data = {
                identifier: username, password
            }
            const response = await authInstance.post('/api/auth/local', data);
            if (response.status === 200) {
                sessionStorage.setItem("token", response.data.jwt)
                navigate('/home')
            } else {
                alert(response.data.error.message)
            }
        }
    }

    return (

        <>
            <Header />
            <div className='py-10 px-15'>
                <div className='flex items-stretch justify-center border-1 main-div'>
                    <div className='px-5 pb-5 pt-5 w-1/2 flex flex-col items-center justify-center gap-6'>
                        <img src={logo} alt="" />
                        <p className='para'> <span className='logo-heading'>Listbnb</span> a largest Classified Listing marketplace offers Perfect Ads Classifieds...</p>
                        {registerForm ? (
                            <p className='heading'>Create Your Account</p>
                        ) : (
                            <p className='heading'>Login To Your Account</p>
                        )
                        }

                        <Container maxWidth="xs">
                            <div elevation={10} sx={{ marginTop: 8, padding: 2 }}>
                                <Box component="form" onSubmit={registerForm ? handleRegister : handleLogin} noValidate
                                    sx={{
                                        mt: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 3,
                                    }}>
                                    {registerForm && (
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Email*
                                            </Typography>
                                            <TextField
                                                placeholder="Type here"
                                                fullWidth
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                InputLabelProps={{
                                                    shrink: true, // Always show the label
                                                    sx: {
                                                        color: 'red', // Set label color
                                                    },
                                                }}
                                                sx={{
                                                    '& input::placeholder': {
                                                        color: 'black',
                                                        opacity: 1,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Username*
                                        </Typography>
                                        <TextField
                                            placeholder="Type here"
                                            fullWidth
                                            required
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            error={!!errors.username}
                                            helperText={errors.username}
                                            InputLabelProps={{
                                                shrink: true, // Always show the label
                                                sx: {
                                                    color: 'red', // Set label color
                                                },
                                            }}
                                            sx={{
                                                '& input::placeholder': {
                                                    color: 'black',
                                                    opacity: 1,
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Password*
                                        </Typography>
                                        <TextField
                                            placeholder="Type here"
                                            fullWidth
                                            required
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            error={!!errors.password}
                                            helperText={errors.password}
                                            InputLabelProps={{
                                                shrink: true, // Always show the label
                                                sx: {
                                                    color: 'red', // Set label color
                                                },
                                            }}
                                            sx={{
                                                '& input::placeholder': {
                                                    color: 'black',
                                                    opacity: 1,
                                                },
                                            }}
                                        />
                                    </Box>
                                    {registerForm && (
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Confirem Password*
                                            </Typography>
                                            <TextField
                                                placeholder="Type here"
                                                fullWidth
                                                required
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword}
                                                InputLabelProps={{
                                                    shrink: true, // Always show the label
                                                    sx: {
                                                        color: 'red', // Set label color
                                                    },
                                                }}
                                                sx={{
                                                    '& input::placeholder': {
                                                        color: 'black',
                                                        opacity: 1,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    )}
                                    <Button type="submit" variant="contained" class='register-btn' fullWidth sx={{ mt: 1 }}>
                                        {registerForm ? (
                                            <>
                                                Register <i class="fa-solid fa-arrow-right px-3" ></i>
                                            </>
                                        ) : (
                                            <>
                                                Login <i class="fa-solid fa-arrow-right px-3" ></i>
                                            </>
                                        )
                                        }
                                    </Button>
                                </Box>
                            </div>
                        </Container>
                    </div>
                    <div className='p-5 pt-5 bg-blue-100 w-1/2 flex flex-col items-center justify-center main-div'>
                        <img src={image} alt="" />
                        <div className='flex flex-col items-center justify-center gap-4'>
                            {registerForm ? (
                                <>
                                    <p className='heading'>Already have an account?</p>
                                    <p className='para'>To connect with us please login to our account if you are having one already.</p>
                                </>
                            ) : (
                                <>
                                    <p className='heading'>Do You have an account?</p>
                                    <p className='para'>To connect with us please register for a new account if you are not having one already.</p>
                                </>
                            )
                            }

                            <Link to={registerForm ? '/' : '/register'} className='login-btn text-white px-5 py-4'>
                                {registerForm ? 'Login' : 'Register'}
                                <i class="fa-solid fa-arrow-right px-3" ></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Auth;
