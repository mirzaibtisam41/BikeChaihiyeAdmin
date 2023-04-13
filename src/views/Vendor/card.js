import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({ item }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 220, objectFit: 'fill' }}
                image={`https://bikechahiye.onrender.com/${item?.productPic[0]}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {`${item?.brand}${" "}${item?.category[0]}`}
                </Typography>
                <Typography sx={{ textAlign: 'justify' }} variant="body2" color="text.secondary">
                    {item?.detail}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography color="text.secondary">{`${item?.price}${" "}PKR`}</Typography>
            </CardActions>
        </Card>
    );
}