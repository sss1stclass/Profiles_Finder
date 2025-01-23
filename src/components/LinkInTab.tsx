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

const LinkInTab = () => {
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
            'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
        }

    }

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://linkedin-data-api.p.rapidapi.com?username=${inputData}`, options);
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

    console.log(gitData);

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
                            image={gitData?.profilePicture}
                            alt={gitData?.loginjh}
                        />
                    </Box>
                    <CardContent>
                        <Typography display='flex' alignItems='center' gutterBottom variant="h5" component="div">
                            {gitData?.firstName ? gitData?.firstName + " " + gitData?.lastName : inputData}
                            <Tooltip title="Visit Full Profile">
                                <a href={`https://www.linkedin.com/in/${inputData}/`} target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="delete">
                                        <OpenInNewIcon sx={{ height: '20px', width: '20px' }} />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {gitData?.headline || 'No bio available.'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Is Open To Work:</span>  <span >{gitData?.isOpenToWork ? "Yes" : 'No'}</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Summary: </span><span style={{ fontWeight: 500 }}>{gitData?.summary || 'N/A'}</span>
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
