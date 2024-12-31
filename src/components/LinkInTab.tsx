import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Skeleton,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

type GitHubUser = {
    avatar_url: string;
    login: string;
    bio?: string;
    [key: string]: any;
};

const LinkInTab = () => {
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
            const response = await axios.get(``);
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
                            image='data:image/jpeg;base64,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'
                            alt={gitData?.login}
                        />
                    </Box>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Under Construction
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
                            image='data:image/png;base64,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'
                            alt='Image is Broken'
                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Enter your LinkedIn Username
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

export default LinkInTab;
