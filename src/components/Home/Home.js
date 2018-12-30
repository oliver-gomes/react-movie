import React, { Component } from "react";
import "./Home.css";

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from "../../config";

import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
  }
  render() {
    return (
      <div className="rmdb-home">
        <HeroImage />
        <SearchBar />
        <FourColGrid />
        <Spinner />
        <LoadMoreBtn />
      </div>
    );
  }
}

export default Home;
