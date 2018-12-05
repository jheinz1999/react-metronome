import React from 'react';

export default class ControlPanel extends React.Component {

  constructor() {

    super();

    this.state = {

      bpm: 120,
      top: 4,
      bottom: 4

    }

  }

  handleChange = e => {

    let val = parseInt(e.target.value);

    if (e.target.value === '')
      val = 0;

    if (val != NaN) {

      this.setState({

        [e.target.name]: val

      });

    }

  }

  render() {

    const {stop, play, createSequence, updateBPM} = this.props;

    return (

      <div className='control-panel'>

        <button onClick={play}>Play</button>
        <button onClick={stop}>Stop</button>
        <form onSubmit={e => {

          e.preventDefault();
          createSequence(this.state.bpm, this.state.top, this.state.bottom);

        }}>

          <input type='text' name='bpm' value={this.state.bpm} onChange={this.handleChange}/>
          <input type='text' name='top' value={this.state.top} onChange={this.handleChange} />
          <input type='text' name='bottom' value={this.state.bottom} onChange={this.handleChange} />
          <button>Add metronome</button>

        </form>

      </div>

    );

  }

}
