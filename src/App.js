import React, { Component } from 'react';
import './App.css';
import Poster from './Poster';

class App extends Component {
  //to use "this" we have to have a constructor
  constructor(){
    super();
    this.state = {
      movieList: []
    }
    this.movieSearch=this.movieSearch.bind(this); // bind to the second '.this'
  }

  componentDidMount(){
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5";
    
    // fetch is a replacement for $.getJSON/$.ajax/axios
    fetch(url)  // works like promises
    .then((response)=>{
      return response.json();
    })
    .then((myJson)=>{
        const results = myJson.results;
        console.log(results)
        // this.state.moviesToShow = results // BAD BAD BAD
                             //    ^
                             //    |
                             //   BAD!!!!!
        this.setState({
            movieList: results
        });
    });

    console.log("Checking... yes! It's mounted");

}

    movieSearch(e){
      e.preventDefault();
      console.log("form Submitted!");
      const movieTitle = document.getElementById('searchTerm').value;
      const url = 'https://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query='+movieTitle;
		fetch(url)
		.then((response)=>{
		  return response.json();
		})
		.then((myJson)=>{
			const results = myJson.results;
			console.log(results)
			this.setState({
				movieList: results
			});
		});		


    }
  render() {
    const posters = this.state.movieList.map((movie, i)=>{
      return(<Poster key={i} movie={movie} />)
    })
    return (
      <div className="container">
        <div className = "row center m4">
          <h1>The Movie App</h1>
          <form onSubmit={this.movieSearch}>
            <input id="searchTerm" type="text" placeholder="Movie Title" />
            <button type="submit" className="btn waves-effect btn-light">SEARCH</button>
          </form>

          {posters}
        </div>
      </div>
    );
  }
}

export default App;
