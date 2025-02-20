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
    avatar_url: string;
    login: string;
    bio?: string;
    [key: string]: any;
};

const LeetcodeTab = () => {
    const [inputData, setInputData] = useState('sohilkr88');
    const [problemData, setProblemData] = useState<any>(null)
    const [gitData, setGitData] = useState<GitHubUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [problemLoading, setProblemLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(event.target.value);
    };

    const handleFetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${inputData}`);
            setGitData(response.data);
        } catch (error: any) {
            if (error.response?.status === 404) {
                setError('User not found. Please check the username.');
            } else if (error.response?.status === 429) {
                setError('Too many request from this IP, try again in 1 hour')
            }
            else {
                setError('An error occurred. Please try again.');
            }
            setGitData(null);
        } finally {
            setLoading(false);
        }
    };
    const handleFetchDataForProblemSolved = async () => {
        setError(null);
        setProblemLoading(true);
        try {
            const response = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${inputData}`);
            setProblemData(response.data);
        } catch (error: any) {
            if (error.response?.status === 404) {
                setError('User not found. Please check the username.');
            } else if (error.response?.status === 429) {
                setError('Too many request from this IP, try again in 1 hour')
            }
            else {
                setError('An error occurred. Please try again.');
            }
            setProblemData(null);
        } finally {
            setProblemLoading(false);
        }
    };

    const handleBothData = async () => {
        await handleFetchData();
        await handleFetchDataForProblemSolved();

    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && inputData) {
            handleFetchData();
        }
    };

    const handleSearchAgain = () => {
        setInputData('');
        setGitData(null);
        setProblemData(null);
        setError(null);
    };

    return (
        <Box sx={{ minWidth: 345, margin: 'auto', padding: 2 }}>
            {(loading || problemLoading) ? (
                <Card sx={{ maxWidth: 345, minHeight: 400, margin: 'auto', padding: 2 }}>
                    <Skeleton variant="circular" width={80} height={80} sx={{ margin: 'auto', marginTop: 2 }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem', marginTop: 2, marginBottom: 1 }} width="60%" height={40} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', marginBottom: 2 }} width="80%" height={30} />
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', marginTop: 2 }} width="40%" height={30} />
                </Card>
            ) : (gitData) ? (
                <Card sx={{ maxWidth: 345 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: '50%', height: 180, borderRadius: '50%' }}
                            image={gitData?.avatar || 'fallback-image-url'}
                            alt='Img Not Available'
                        />
                    </Box>
                    <CardContent>
                        <Typography display='flex' alignItems='center' gutterBottom variant="h5" component="div" m={0}>
                            {gitData.name ? gitData.name : inputData}
                            <Tooltip title="Visit Full Profile">
                                <a href={`https://leetcode.com/u/${inputData}`} target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="delete">
                                        <OpenInNewIcon sx={{ height: '20px', width: '20px' }} />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </Typography>
                        <Typography mb={1} variant="body2" color="text.secondary">
                            {gitData?.about || 'No bio available.'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Ranking: </span> {gitData?.ranking || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}> Skills: </span> {`[ ${gitData?.skillTags.join(',')} ]` || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Total Problem Solved: </span> {problemData?.totalSolved || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Easy/ Medium/ Hard: </span>   {`${problemData?.easySolved} / ${problemData?.mediumSolved} / ${problemData?.hardSolved}` || 'N/A'}
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
                            Enter your Leetcode Username
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
                            onClick={handleBothData}
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

export default LeetcodeTab;
