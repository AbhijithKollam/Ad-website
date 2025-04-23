import React, { useState } from 'react';
import { TextField, Container, Box, Typography } from '@mui/material';
import './post_style.css'
import authInstance from '../../apis/authinstance';
import { toast } from 'react-toastify';

const Posts = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        price: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidUrl(formData.image)) {
            const response = await authInstance.post('/api/advertisements',
                formData,
            );
            if (response.status === 200) {
                toast.success("Created successfully!");
                setFormData({
                    title: '',
                    description: '',
                    image: '',
                    price: 0,
                })
            }
        }

    };

    const isValidUrl = (url) => {
        return /^(http|https):\/\/[^ "]+$/.test(url);
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
                            Ad Title*
                        </Typography>
                        <TextField
                            name="title"
                            placeholder='Type here'
                            value={formData.title}
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
                            Description*
                        </Typography>
                        <TextField
                            name="description"
                            placeholder='Type here'
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
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
                            Price*
                        </Typography>
                        <TextField
                            type='number'
                            name="price"
                            placeholder='Type here'
                            value={formData.price}
                            onChange={handleChange}
                            required
                            fullWidth
                            onWheel={(e) => e.target.blur()}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" gutterBottom>
                            Photo*
                        </Typography>
                        <TextField
                            name="image"
                            placeholder='Image url'
                            value={formData.image}
                            onChange={handleChange}
                            required
                            fullWidth
                            error={formData.image && !isValidUrl(formData.image)}
                            helperText={
                                formData.image && !isValidUrl(formData.image)
                                    ? "Enter a valid URL"
                                    : ""
                            }
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '12px', // change this value as needed
                                },
                            }}
                        />
                    </Box>
                    <button type="submit" className='submit-btn text-white p-3'>
                        Post
                    </button>
                </Box>
            </Container>
        </div>
    );
};

export default Posts;
