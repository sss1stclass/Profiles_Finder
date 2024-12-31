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
    avatar_url: string;
    login: string;
    bio?: string;
    [key: string]: any;
};

const GitHubTab = () => {
    const [inputData, setInputData] = useState('');
    const [gitData, setGitData] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(event.target.value);
    };

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.github.com/users/${inputData}`);
            setGitData(response.data);
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
                            image={gitData?.avatar_url || 'fallback-image-url'}
                            alt={gitData?.login}
                        />
                    </Box>
                    <CardContent>
                        <Typography display='flex' alignItems='center' gutterBottom variant="h5" component="div">
                            {gitData.name ? gitData.name : inputData}
                            <Tooltip title="Visit Full Profile">
                                <a href={gitData?.html_url} target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="delete">
                                        <OpenInNewIcon sx={{ height: '20px', width: '20px' }} />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {gitData?.bio || 'No bio available.'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Repo: {gitData?.public_repos || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Followers: {gitData?.followers || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Following: {gitData?.following || 'N/A'}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button onClick={handleSearchAgain} variant="contained" color="warning" size="small">
                            Search New User
                        </Button>
                    </CardActions>
                </Card>
            ) : (
                <Card sx={{ minWidth: 345 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '50%', height: 180, borderRadius: '50%' }}
                            image='data:image/png;base64,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'
                            alt='Image is Broken'
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Enter your GitHub Username
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

export default GitHubTab;
