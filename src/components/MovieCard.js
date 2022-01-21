import {Link} from 'react-router-dom'

import { Card,Button } from 'antd';
import 'antd/dist/antd.css'

const { Meta } = Card;

const MovieCard = props => {
    const link = props.link;
    const imageLink = props.imageLink;
    const title = props.title;
    const date = props.date;

    console.log(props);
    return (
    <Card
    hoverable
    style={{ width: 240 }}
    cover={<img class="card_image" width="200" height="300" src={imageLink}></img>}
    >
    <Meta title={title} description={date} lien={link}/>
  </Card>   
    )
}

export default MovieCard;