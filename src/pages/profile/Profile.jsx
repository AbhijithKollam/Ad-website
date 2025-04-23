import React, { useEffect, useState } from 'react';
import { TextField, Container, Box, Typography } from '@mui/material';
import authInstance from '../../apis/authinstance';
import { toast } from 'react-toastify';


const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        location: '',
    });

    useEffect(() => {
        getUserProfile()
    }, []);


    const getUserProfile = async (e) => {
        try {
            const response = await authInstance.get('/api/profile');
            if (response.status === 200) {
                const user = response.data;
                setFormData(prev => ({
                    ...prev,
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    username: user.username || '',
                    phone: user.phone || '',
                    location: user.location || '',
                }));
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    }
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid =
            formData.firstName &&
            formData.lastName &&
            formData.email &&
            formData.username &&
            formData.phone && // updated field name
            formData.location;
        if (!isValid) {
            toast.error("Please fill all required fields correctly.");
            return;
        }
        try {
            const response = await authInstance.put('/api/profile', formData);
            if (response.status === 200) {
                toast.success("Updated successfully!");
                getUserProfile()
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className='px-50 bg-white main-div mx-9 mt-3 p-6'>
            <Container >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    gap={3}

                >
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            First Name*
                        </Typography>
                        <TextField
                            name="firstName"
                            placeholder='Type here'
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Last Name*
                        </Typography>
                        <TextField
                            name="lastName"
                            placeholder='Type here'
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Email*
                        </Typography>
                        <TextField
                            name="email"
                            placeholder='Type here'
                            value={formData.email}
                            type='email'
                            onChange={handleChange}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            User Name*
                        </Typography>
                        <TextField
                            name="username"
                            placeholder='Type here'
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Mobile*
                        </Typography>
                        <TextField
                            name="phone"
                            placeholder='Type here'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Location*
                        </Typography>
                        <TextField
                            name="location"
                            placeholder='Type here'
                            value={formData.location}
                            onChange={handleChange}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <button type="submit" className='submit-btn text-white p-3'>
                        Save
                    </button>
                </Box>
            </Container>
        </div>
    )
}

export default Profile
