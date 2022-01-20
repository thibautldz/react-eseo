import {Link} from 'react-router-dom'

const MovieCard = props => {
    const link = props.link;
    const imageLink = props.imageLink;
    const title = props.title;
    const date = props.date;
    return (
        <Link to={link}>
            <div className="card">
                <img class="card_image" src={imageLink}></img>
                <h3>{{title}}</h3>
                <h4>{{date}}</h4>
            </div>
        </Link>
    )
}

export default MovieCard;