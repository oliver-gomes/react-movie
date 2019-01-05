import React, { Component } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
// import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";
import FourColGrid from "../elements/FourColGrid/FourColGrid";

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  };

  componentDidMount() {
    if (localStorage.getItem(`${this.props.match.params.movieId}`)) {
      const state = JSON.parse(
        localStorage.getItem(`${this.props.match.params.movieId}`)
      );
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      //first fetch the movie data and then actors
      const endpoint = `${API_URL}movie/${
        this.props.match.params.movieId
      }?api_key=${API_KEY}&language=en-US`;
      this.fetchMovieData(endpoint);
    }
  }

  fetchMovieData = endpoint => {
    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState(
            {
              movie: result
            },
            () => {
              const endpoint_credit = `${API_URL}movie/${
                this.props.match.params.movieId
              }/credits?api_key=${API_KEY}&language=en-US`;
              fetch(endpoint_credit)
                .then(result => result.json())
                .then(result => {
                  const directors = result.crew.filter(
                    member => member.job === "Director"
                  );
                  this.setState(
                    {
                      actors: result.cast,
                      directors,
                      loading: false
                    },
                    () => {
                      localStorage.setItem(
                        `${this.props.match.params.movieId}`,
                        JSON.stringify(this.state)
                      );
                    }
                  );
                });
            }
          );
        }
      })
      .catch(error => console.error("Error: ", error));
  };

  render() {
    return (
      <div>
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}

        {this.state.actors ? (
          <div className="rmdb-moviegrid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map((element, i) => {
                return <Actor key={i} actor={element} />;
              })}
            </FourColGrid>
          </div>
        ) : null}

        {!this.state.actors && !this.state.loading ? (
          <h1>No Movie Found!</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
