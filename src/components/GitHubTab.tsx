import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

const GitHubTab = () => {
    return (
        <Box>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="data:image/png;base64,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"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default GitHubTab;