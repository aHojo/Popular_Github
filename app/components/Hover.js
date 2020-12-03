import React from 'react';



  export default class Hover extends React.Component {

    state={
      hovering: false
    }

    handleMouseOver = () => {
      this.setState({
        "hovering": true
      })
    }
    handleMouseOut = () => {
      this.setState({
        "hovering": false
      })
    }

    render() {
      return (
        <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} >
          {this.props.children(this.state.hovering)}
        </div>
      )
    }

  }
