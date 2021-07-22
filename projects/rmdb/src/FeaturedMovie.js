import {MovieThumbnail} from './MovieThumbnail.js'
const FeaturedMovie = ({featuredMovie}) =>{
    console.log('featuredMovie',featuredMovie)
    const today = new Date().toLocaleDateString('en-CA').split('/')
    return (
        <section>
            <h1>Featured Movie for {today}</h1>
            <MovieThumbnail movie={featuredMovie}/>
        </section>
    )
}

export {FeaturedMovie}