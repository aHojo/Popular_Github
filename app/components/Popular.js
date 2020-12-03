import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from "../utils/api.js";
import Card from './Card';
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from "react-icons/fa";
import Loading from './Loading';
import Tooltip from './Tooltip';

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func,
}

function ReposGrid({repos}) {
  return (
    <ul className="grid space-around" >
      {repos.map((repo, i) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const {login, avatar_url} = owner;

        return (
          <li key={i}>
            <Card
              header={`#${i + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github Username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255,215,0" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129,195,245" size={22} />
                  {forks.toLocaleString()}
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241,138,0" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
  
  ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
  }

function LanguagesNav ({selected, onUpdateLanguage}) {

  const languages = ['All', "JavaScript", "Ruby", "CSS", "Python"]

    return (
      <ul className="flex-center" >
        {languages.map((item, i) =>
          <li key={i}>
            <button 
              className="btn-clear nav-link" 
              style={item === selected ? {color: 'rgb(187,46,31)'} : null }
              onClick={() => onUpdateLanguage(item)}>
              {item}
            </button>
          </li>

        )}
      </ul>
    )
}
export default class Popular extends React.Component {

  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null,
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error:null,
    })

      if (!this.state.repos[selectedLanguage]) {
        fetchPopularRepos(selectedLanguage)
        .then((data) => {

          this.setState(({repos}) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch(e => {
          console.warn(e)
          this.setState({
            error: "There was an error getting the repositories"
          })
        })
        // fetchPopularRepos(selectedLanguage)
        // .then(repos => {
        //   if (repos) {
        //     this.setState({
        //       repos,
        //       error: null,
        //     })
        //   }
        // })
        
      }
      
  }

  isLoading = () => {
    const {selectedLanguage, repos, error} = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const {selectedLanguage, repos, error} = this.state
    return (
      <React.Fragment>
        <LanguagesNav 
          selected={selectedLanguage} 
          onUpdateLanguage={this.updateLanguage} />
          {this.isLoading() && <Loading text="Fetching Repos" />}
          {error && <p className="error center-text">{error}</p>}
          {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
      </React.Fragment>
    )
  }
}