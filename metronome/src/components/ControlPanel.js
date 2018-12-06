import React from 'react';

import './ControlPanel.scss';

export default class ControlPanel extends React.Component {

  constructor() {

    super();

    this.state = {

      bpm: 120,
      top: 4,
      bottom: 4,
      showCreator: false

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

  addBPM = e => {

    e.preventDefault();

    if (this.state.bpm < 300)
      this.setState({bpm: this.state.bpm + 1})

  }

  subBPM = e => {

    e.preventDefault();

    if (this.state.bpm > 1)
      this.setState({bpm: this.state.bpm - 1})

  }

  render() {

    const {stop, play, createSequence, updateBPM} = this.props;

    return (

      <div className='control-panel'>

        <div className='control-btns'>

          <button onClick={play}>Play</button>
          <button onClick={stop}>Stop</button>
          <button onClick={() => this.setState({showCreator: true})}>Add Metronome</button>

        </div>

        <div className='add-form' style={{display: !this.state.showCreator && 'none'}}>

          <form onSubmit={e => {

            e.preventDefault();

            createSequence(this.state.bpm, this.state.top, this.state.bottom);
            this.setState({showCreator: false})

          }}>

            <div className='bpm-group'>

              <button className='change-bpm' onClick={this.subBPM}>-</button>

              <input type='range' name='bpm' min='1' max='300' value={this.state.bpm} onChange={this.handleChange} />

              <button className='change-bpm' onClick={this.addBPM}>+</button>

            </div>

            <p>{this.state.bpm} BPM</p>

            <div className='time-group'>

              <p>Time signature:</p>
              <select name='top' onChange={this.handleChange} value={this.state.top}>

                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>

              </select>

              <p> / </p>

              <select name='bottom' onChange={this.handleChange} value={this.state.bottom}>

                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>

              </select>

            </div>

            <button>Add metronome</button>

          </form>

        </div>

      </div>

    );

  }

}
