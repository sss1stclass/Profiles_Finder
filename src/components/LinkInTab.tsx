import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    InputAdornment,
    Skeleton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClearIcon from '@mui/icons-material/Clear';

type GitHubUser = {
    profilePicture: string;
    login: string;
    bio?: string;
    [key: string]: any;
};

const LinkInTab = () => {
    const [inputData, setInputData] = useState('sohil-maurya-154b741a2');
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
                        <Typography display='flex' alignItems='center' gutterBottom variant="h5" component="div" m={0}>
                            {gitData?.firstName ? gitData?.firstName + " " + gitData?.lastName : inputData}
                            <Tooltip title="Visit Full Profile">
                                <a href={`https://www.linkedin.com/in/${inputData}/`} target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="delete">
                                        <OpenInNewIcon sx={{ height: '20px', width: '20px' }} />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={1}>
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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="clear input"
                                            onClick={() => setInputData('')}
                                            edge="end"
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
