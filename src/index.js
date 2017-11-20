import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';
import {DebounceInput} from 'react-debounce-input';

class MovieSearch extends React.Component {
    state = {
        input: '',
        movie: {},
        loading: false
    };

    componentWillMount() {
        this.onRequest();
    }

    onInput = (e) => {
        let value = e.target.value;
        let regex = /[^a-z ]/g;
        value = value.replace(regex, '');
        if (this.state.input !== value) {
            this.setState({input: value});
            this.onRequest(value);
        }
    };
    onRequest(value = 'fast') {
        this.setState({loading:true});
        fetch(`http://www.omdbapi.com/?t=${value}&apikey=969a0dc3`)
            .then(response => response.json())
            .then(json => this.setState({movie: json, loading:false}));
    }
    render() {
        return (
            <div>
                {this.state.loading &&
                    <h4>Loading...</h4>
                }
                <h1>Movies</h1>
                <Movie {...this.state.movie}/>
                <DebounceInput
                    debounceTimeout={150}
                    onChange={this.onInput} />
            </div>
        )

    }
}
//<input type="text" value={this.state.input} onChange={this.onInput}/>
ReactDOM.render(<MovieSearch />, document.getElementById('root'));