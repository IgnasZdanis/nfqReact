import React from 'react';

export default ({Poster, Title}) => (
    <div className="movie">
        <img src={Poster} alt={Title}/>
        <h2>{Title}</h2>
    </div>
);