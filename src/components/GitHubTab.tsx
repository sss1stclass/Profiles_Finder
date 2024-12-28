import { Box, Button, Card, CardActions, CardContent, CardMedia, Skeleton, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const GitHubTab = () => {
    const [showInput, setShowInput] = useState(true);
    const [inputData, setInputData] = useState('');
    const [gitData, setGitData] = useState<any>([]);
    const [loading, setLoading] = useState(false);


    const handleSearch = () => {
        setShowInput((prev) => !prev);
    }
    const handleSearchAgain = () => {
        setShowInput(true);
        setInputData('');

    }
    const handleChange = (event: any) => {
        setInputData(event.target.value);
    }
    const handleFetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.github.com/users/${inputData}`);
            setGitData(response.data);
        } catch (error: any) {
            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     handleFetchData();
    // }, [showInput])

    console.log(gitData);

    if (loading) {
        return (
            <Card sx={{ maxWidth: 500, maxHeight: 400 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton sx={{ alignItems: 'center' }} variant="rectangular" width={50} height={60} />
            </Card>
        )
    }


    return (

        <Box>
            {
                showInput && (
                    <Card sx={{ minWidth: 345 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia
                                sx={{ width: '50%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', objectFit: 'contain', objectPosition: '50% 50%' }}
                                // image={gitData?.avatar_url}
                                image="https://avatars.githubusercontent.com/u/68151294?v=4"
                                title="green iguana"
                            />
                        </Box>
                        <CardContent>
                            <Typography>
                                Enter your Github UserName
                            </Typography>
                            <TextField
                                label='Username'
                                variant='filled'
                                value={inputData}
                                onChange={handleChange}
                                fullWidth
                            />
                        </CardContent>
                        <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button disabled={inputData.length <= 0} onClick={handleSearch} variant='contained' color='info' endIcon={<SearchIcon />} size="small">Search</Button>
                        </CardActions>
                    </Card>
                )
            }
            {
                !showInput && !loading && (
                    <Card sx={{ maxWidth: 345 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia
                                sx={{ width: '50%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', objectFit: 'contain', objectPosition: '50% 50%' }}
                                // image={gitData?.avatar_url}
                                image="https://avatars.githubusercontent.com/u/68151294?v=4"
                                title="green iguana"
                            />
                        </Box>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {inputData}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, aut?
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button onClick={handleSearchAgain} variant='contained' color='info' endIcon={<SearchIcon />} size="small">Search Again</Button>
                        </CardActions>
                    </Card>
                )
            }

        </Box>
    )
}

export default GitHubTab;