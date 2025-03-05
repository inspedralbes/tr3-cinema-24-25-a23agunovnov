'use client'

export default function MovieComp(props) {
    return <>
        <div className="group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <img
                src={props.movie.Poster}
                alt={props.movie.Title}
                className="w-full aspect-[2/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg mb-1">{props.movie.Title}</h3>
                    <span className="inline-block px-2 py-1 bg-white/20 text-white text-sm rounded">
                        {props.movie.Year}
                    </span>
                </div>
            </div>
        </div>
    </>
}