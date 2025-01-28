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

const GitHubTab = () => {
    const [inputData, setInputData] = useState('sss1stclass');
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
                        <Typography display='flex' alignItems='center' gutterBottom variant="h5" component="div" m={0}>
                            {gitData.name ? gitData.name : inputData}
                            <Tooltip title="Visit Full Profile">
                                <a href={gitData?.html_url} target="_blank" rel="noopener noreferrer">
                                    <IconButton aria-label="delete">
                                        <OpenInNewIcon sx={{ height: '20px', width: '20px' }} />
                                    </IconButton>
                                </a>
                            </Tooltip>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                            {gitData?.bio || 'No bio available.'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Total Repo: </span>  {gitData?.public_repos || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Followers: </span>  {gitData?.followers || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span style={{ fontWeight: 600 }}>Followings: </span> {gitData?.following || 'N/A'}
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
                            image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAhFBMVEX///8AAACqqqr8/PwICAh3d3ft7e2ZmZn29vaUlJTDw8O7u7sMDAz5+fkEBAQQEBBpaWmIiIje3t44ODihoaFvb28YGBhfX19VVVXX19coKCiOjo6AgIDNzc1GRkYdHR3m5uYvLy9LS0s/Pz80NDQjIyOysrJJSUnHx8d7e3u8vLxaWlpbMzUlAAALMUlEQVR4nO1daZOqOhAdARFXxH0XdeQ64///f09ndGTJchISmlfl+XSrrtGcgfTenY+PN95444033rALN94mzqS1jr6aN0RRtG45SWc7Cqg3VgrBdtI8HmYNHnqr02K6TpZ96o2qInamhwGXVhaD866ZxNQ7BhEkwxXIK4X9oj2i3rkMcevoqTN74PB1cakJcOG3T9rEHphNt9QsWAgmO/SUibHa1O39XDZDI8x+sXPq83q6TunXMY/z2qdm9YNgfTZN7Q5vGlMz+/CNvo9ZekPaw+d/9WxRu2Mwj8moBRtrT+0J74vm7LkTvt1oEGFEYHx2Pqugdsfqu2Jq8aIqanfMK303J9YPWxbhujKtPjKus+U4VaQW2vp2fwmEkwqo+UcKancsrJ+8pBL5z8a+Y5Wa26SjdsNgbZGbvyPl1rD5am731NxuGn1ph5tDIiXzCK3YK2tqWg8MWsapuUNqUi9MDXML/lEzSmNu1BgLCAwuEY4GMw3+mJpNHv+MsfMP1FyKOBliV0duptj5lbncatgZYFc3WfLCsbTM7NdKB2QxL0tuTs1AhJLafEO9fzHaZbg51LuXYJDoc+vUwg8QIdT2gGLCkAKKs6b36tZWCaRx0lMIU+p9Y9jocKu7MHlioOGajySZt8N1ODxayammEe6mUTtqCg//LFbl5oq9nNkjhOgnQ2tRo8Fu/ZSFS6HYPqmSk2jvtH7pXG1ojHErLQfFhpKiLt+K9/uZ/bTfOhikdYO3uGR/oSv+uJK2CyTVW8UA1LdBvXGOCsrLFavcsYo++JL8fMxY0zUUi1hNWDuVGPARzm0pKXQ6s5clBtzaPZPax0dLvMyD03cSSXlzE3krnZK6obfhuddb3S0p/pVEflQQZdWjt/88zqdfUXviOE7SveP2D6e13jSH112+jnYRc7+4L6uaA/0DX5rwFmWS4sfp8E7TVkdq1bqjJLo+NOWqK/qk7J04YyEVuU0pzuBexuFxfVGpHhm1rjNPUm8ilcaQjSmTJg34FVCC7CFLa0N6MfArQM676qqXO+SJGCCiIhNLd1CU6spU780WlasDJDNMUSoIpAelob4OwK1BUUkn1U83yExMyESkaFVpA/u6ir8COXE05JCsteTUYcV4FOQiZGNCgbmEuJGcOSj27cWCbwCz+qKvsAW5KrhDYKb4YDm2pUIXIbCMzJ7vtSIS6Q67BWZsgJ4+3zI8gOSqKH3MAwzt73jrIQV+x1eVrH4xQvfG0wZwkZByoLA84Pg3R6QEcFW2V72igws9OfEdheRA9W4BXnp2Ya7HWwUG1WtxVJA3GkPW8gAPipcuI1CHPLDzxIyl6vC3Moyrpqa0PdZ7eYVX2wihyAHvr1lc24efO/Oltg8fzZUx5CWswVdUUxXEmZ4UiqYvZnWrpouMAhXnxXQdmqPRyq+bwQiU54W8gQ92sINRazsAzZQwrwwSbB2RpHwgBh9dXhmAR+5AQuoPoBGWT9SAvqBDwukPYIxnkV3lYgEGgRdfDbBnsM8uwuKVxnsxlIHEnRv5CNYEW0QRPMnAx0RKVuxhQrYgY6sH1sG30VgDZ9XtAesFy0oULLZEaJ08gcnLVXqJDy2h1eAPQI9hkM6vg8KSzmZ+AevkTu8UdHPrMEIOyvY0usorZmSMUsC8unTlHWazERuWv8BCz+lQA+YGEgSai3AhNZ5OIGOeag3U3A3QIL90PgQrtpPk0ysCZDunTxDmExCFvXKAjlBK9vUhbjUhBwm/wevzoIFC7vD8ALPxXyoZzOzVgxwWEHmlakDvnRGnJgDWr/hKsP5f/PAfYORexuUFI1cPgYK9lq/06P+KHNb5pkyOIOfIAGYHK5NbCH6yOmB28IscKFC4BSyVArODX+RAVfAp+MnqgOUgX9ISVOKcEo+KgUUuX3ouxsiFhJT+AD6Il4USYAtqEUMBk8eprYJ5rzpEv7CorJdaARYK1CFuCRaVplYcMHKlhlgYAnZdQFqwgwMCa2B/ga7nv9QScKRLDRQdmLtPW4rgTJcBvbgEB0akUzZg7pFTy1glwBs60lXY3yA5hY5lO0BLndMpYNBEaYzJWD2A1pRmyrjR4fUxDac/gEVcnquxiDG3oFKgb2VWrKPjvYgTPeikrmzMAJ6pSiovXbSeNFsfBZeSksZR4DrnbDt9AN9cRXlvBzyWJNcaAF9fRfjowFBPrlLjQ2Fg4IDOqYMHNuYfAGqAEcbAUDOqqLDgFi6ymkv3AO+w8HLhE65mNLfJYOUkd+wLaxWmdJLIFMk8K/H+8ENH0tYpm2cl3h5ae39Hr3qJqXJVTlxcrjLZ6lC1S472q9zB8svwA9swNwAbBN4a2GB71GA25IFjlTdUgWXbDzDPzEHpK67VsVN6pwq2l853NE4VqTtXcUIqu1ZZwUj5wbkSmal8owxnV6qTAMMKDLGO6mxQXgxL7dzeIZgfZwRBU/nuVl4+A50YkoLd67e66nMJPa4k0JkCf7CW11rqXCnGt3vhSEoGn8IBgNrU5lq3CQsCWMzpm+Mo6STro+CdXRm/z7az0LsoWRR6ZLgGveepCloCw9y7ds01MY2igxazhjho3C82k6RDgC1Ro3x4dUwYnPG6xGzamdBsKlop5zj1377Y8/B2m04ZgrEzLTeWVpyFYgyvOGcilVIbzRs3E43YZnBpzUsPK+9Jjj4jGj/LjHZxkJMe7poOzNDvRteVkYvWZaW8LEUeZro50XhED2VnbLy+7MGxfV4vo6jBpAluu5i6aUs+1Io5MmaQ2Snkgyj0xoDlnjKEgLJlP5i0A+ACdpHStBt8zowISMK+zxRaXtrGCg7SX1IqNkLHZQixh5QQ+4D30jJTeu/LXi0IoRLc4gF0LtlpsMwVOFuJd6SYOw/KX5KDFlpwxlR/pp9GIlRMoaqdohLvZgPOZ3N6gTI6Uui2K/eOuGVvA8B/MeAELjKOm0jdqc9w0HMl/4BJk19wauOyySu+mckcmiZBOcNSKVTFCThkjbcW79zp1GWWIqfWzsGZIJa7rSLh+Hc6QxQVUlQFqKZDOUXguZ7cEVMOaDXuliGnHKPiSMycxHVbBQ3Vu2oFVA763NRPQZ8tnAu6su8sXi/nbBddNGMp+rpAJ1m4ZBshLLkUdyatVmtyKRMD0/Z79NK8bH1ga2SbNjnNmDf72FkaZ6N73ZRuO4DLrEeyNCZRk9xJOwfqMzWr0q1aMFTTcL/Qvc/yjiVTS1t5MbXIlasZuTB9ZBtX1+ikdAYlUzBMt3xmoaJUh1zp5CCzBORsnp1KidADBlo4mJ6N+XS4Ojkj0xTY0Zud4fnpyuQM9buxg7CDRWJSJ6jGLo318vF6FWbzibHDp5iPH5r7wwriJeF43mxPnCRxnEk7ag6vx5PWeVQjZ3R6CTeiwIJWayt+IUHDuBnhKES8rZMTXcuohQseFNYih5eveRaqsmLYV9YiB18CEloZbBugFpJVcitLzUQu2L6mRQ5M9CzsVXl+QwdPixz0hxtsbM4jjhGHWYscUqc7s1Jl9oILvD62yO1iw2SK6Eij+lrkpDUSnnHtxkIgE2xa5GStA+OqulC64sJjrX5rcQ1yr13dZHNfaCyZJ3eNDRMQYyuIEGuRE2TFPysftu9OuMWXWnEbLrlwTTFrPx5y/CAtcpzyNq9J02f58bFkBz60rHZm2mUwp2xLv7AsFq2YLYvcgnoWV7dITysuVshT0z61J7b5MvlY51tyXeDenPqpPTGapiWn3liRTJXN7Cs2u8NS6DvH5+Pr6WmlfvQXpdlN6KdU5RC3d/ftnbRfp+VPFuszqsNRYyDoTEoF2TttvKb9jTfeeOONNwD8BxwNsGfOLOW9AAAAAElFTkSuQmCC'
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

export default GitHubTab;
