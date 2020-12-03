import React from 'react';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import Results from './Results'
import PropTypes from 'prop-types';
import { ThemeConsumer } from '../contexts/theme';
import {Link} from 'react-router-dom';

function Instructions() {

  return (
    <ThemeConsumer>
        {({theme}) => (
          <div className="instructions-container">
          <h1 className="center-text header-lg">
            Instructions
          </h1>
          <ol className="container-sm grid center-text battle-instructions">
            <li>
              <h3 className="header-sm">Enter Two Github users</h3>
              <FaUserFriends className={`bg-${theme}`} color="rgb(255,191,116" size={140} />
            </li>
            <li>
              <h3 className="header-sm">Battle</h3>
              <FaFighterJet className={`bg-${theme}`} color="#727272" size={140} />

            </li>
            <li>
              <h3 className="header-sm">See the Winners</h3>
              <FaTrophy className={`bg-${theme}`} color="rgb(255,255,0)" size={140} />

            </li>
          </ol>
        </div>
        )}

    </ThemeConsumer>
  )
}


class PlayerInput extends React.Component {

  state = {
    username: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);

  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  
  render() {

    return (

      <ThemeConsumer>
        {({theme}) => (
          <form className="column player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username" className={`input-${theme}`}
                placeholder="github username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`} type="submit" disabled={!this.state.username}>Submit</button>
            </div>
        </form>
        )}
      </ThemeConsumer>
      
    )
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired

}

function PlayerPreview({ username, onReset, label }) {

  return (

    <ThemeConsumer>
      {({theme}) => (
        <div className="column player">
        <h3 className="player-label">{label}</h3>
        <div className={`row bg-${theme}`}>
          <div className="player-info">
            <img
              className="avatar-small"
              src={`https://github.com/${username}.png?size=200`}
              alt={`avatar for ${username}`}
            />
            <a
              href={`https://github.com/${username}`}
              className="link"
            >
              {username}
            </a>
          </div>
          <button className='btn-clear flex-center' onClick={onReset}>
            <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
          </button>
        </div>
      </div>
      )}
    </ThemeConsumer>
    
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {

  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     player_one: null,
  //     player_two: null,
  //     // battle: false,

  //   }

  //   this.handleSubmit = this.handleSubmit.bind(this)
  //   this.handleReset = this.handleReset.bind(this)
  // }

  state = {
    player_one: null,
    player_two: null,
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    })
  }

  handleReset = (id) => {
    this.setState({
      [id]: null
    })
  }

  render() {

    const { player_one, player_two } = this.state;


    // if (battle == true) {
    //   return (
    //     <React.Fragment>
    //       <Results 
    //         playerOne={player_one} 
    //         playerTwo={player_two} 
    //         onReset={() => this.setState({ player_one: null, player_two: null, battle: false})}
    //       />
    //     </React.Fragment>
    //   )
    // }



    return (
      <React.Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {player_one === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={(player) => this.handleSubmit('player_one', player)}
              />
            ) :
              (<PlayerPreview
                username={player_one}
                onReset={() => this.handleReset("player_one")}
                label="Player One"
              />)}


            {player_two === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={(player) => this.handleSubmit('player_two', player)}
              />
            ) :
              (<PlayerPreview
                username={player_two}
                onReset={() => this.handleReset("player_two")}
                label="Player Two"
              />)}
          </div>


          {player_one && player_two && (
            <Link className="btn dark-btn btn-space"
              // onClick={() => this.setState({ battle: true})}
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${player_one}&playerTwo=${player_two}`
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </React.Fragment>
    )
  }
}