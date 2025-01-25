import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    Skeleton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type GitHubUser = {
    profilePicture: string;
    login: string;
    bio?: string;
    [key: string]: any;
};

const InstagramTab = () => {
    const [inputData, setInputData] = useState('');
    const [gitData, setGitData] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(event.target.value);
    };

    const options: any = {
        headers: {
            'x-rapidapi-key': 'd5bfa59e35msh67b901ce161ab73p1a63b1jsn1d02a6cb597a',
            'x-rapidapi-host': 'instagram-scraper-20252.p.rapidapi.com'
        }

    }

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://instagram-scraper-20252.p.rapidapi.com/v1/info?username_or_id_or_url=${inputData}`, options);
            setGitData(response?.data?.data);
        } catch (error: any) {
            if (error.response?.status === 404) {
                setError('User not found. Please check the username.');
            } else {
                setError('An error occurred. Please try again.');
            }
            setGitData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputData) {
            handleFetchData();
        }
    };

    const handleSearchAgain = () => {
        setInputData('');
        setGitData(null);
        setError(null);
    };

    return (
        <Box sx={{ minWidth: 345, margin: 'auto', padding: 2 }}>
            {loading ? (
                <Card sx={{ maxWidth: 345, minHeight: 400, margin: 'auto', padding: 2 }}>
                    <Skeleton variant="circular" width={80} height={80} sx={{ margin: 'auto', marginTop: 2 }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem', marginTop: 2, marginBottom: 1 }} width="60%" height={40} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} width="80%" height={30} />
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: 2 }} width="40%" height={30} />
                </Card>
            ) : gitData ? (
                <Card sx={{ maxWidth: 345 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: '50%', height: 180, borderRadius: '50%' }}
                                image='https://i.pinimg.com/236x/20/c6/77/20c677b590a91c81a194e33798a09581.jpg'
                                alt="Profile Pic"
                            />
                    </Box>
                    <CardContent>
                        <Typography display='flex' alignItems='center' gutterBottom variant="h5" component="div">
                            {gitData?.full_name ? gitData?.full_name : inputData}
                            <Tooltip title="Visit Full Profile">
                                <a href={`https://www.instagram.com/${inputData}/`} target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="visit profile">
                                        <OpenInNewIcon sx={{ height: '20px', width: '20px' }} />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {gitData?.biography || 'No bio available.'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Followers:</span>  <span >{gitData?.follower_count}</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Followings: </span><span style={{ fontWeight: 500 }}>{gitData?.following_count || 'N/A'}</span>
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleSearchAgain} variant="contained" color="warning" size="small">
                            Go Back
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <Card sx={{ minWidth: 345 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '50%', height: 180, borderRadius: '50%' }}
                            image='data:image/jpeg;base64,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'
                            alt='Image is Broken'
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Enter your Instagram Username
                        </Typography>
                        <TextField
                            label="Username"
                            variant="filled"
                            value={inputData}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                            fullWidth
                        />
                        {error && (
                            <Typography color="error" sx={{ marginTop: 1 }}>
                                {error}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            disabled={inputData.length <= 0 || loading}
                            onClick={handleFetchData}
                            variant="contained"
                            color="info"
                            endIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                            size="small"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </Button>
                    </CardActions>
                </Card>
            )}
        </Box>
    );
};

export default InstagramTab;
