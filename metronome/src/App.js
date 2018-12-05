import React, { Component } from 'react';

import ControlPanel from './components/ControlPanel';
import Sequencer from './components/Sequencer';

class App extends Component {

  constructor() {

    super();

    this.state = {

      sequence: []

    }

    this.bpmStuff = {

      context: new AudioContext(),
      nextNoteTime: 0,
      sequenceIndex: 0,
      currentBeat: 0,
      stopped: false,
      interval: null

    }

  }

  play = () => {

    this.bpmStuff.nextNoteTime = this.bpmStuff.context.currentTime + 0.2;
    this.bpmStuff.currentBeat = 0;
    this.bpmStuff.sequenceIndex = 0;

    this.bpmStuff.interval = setInterval(this.scheduler, 100);

  }

  scheduler = () => {

    while (this.bpmStuff.nextNoteTime < this.bpmStuff.context.currentTime + 0.1) {

      if (!this.bpmStuff.stopped) {

        this.schedule(this.bpmStuff.nextNoteTime);
        this.getNextNote();

      }

      else {

        clearInterval(this.bpmStuff.interval);
        this.bpmStuff.stopped = false;

      }

    }

  }


  stop = () => {

    this.bpmStuff.currentBeat = 0;
    this.bpmStuff.sequenceIndex = 0;
    this.bpmStuff.nextNoteTime = 0;
    this.bpmStuff.stopped = true;

  }

  getNextNote = () => {

    let { sequenceIndex, currentBeat, nextNoteTime } = this.bpmStuff;
    let { sequence } = this.state;

    nextNoteTime += 60.0 / sequence[sequenceIndex].bpm * (4.0 / sequence[sequenceIndex].bottom);

    currentBeat++;

    if (currentBeat === sequence[sequenceIndex].top) {

      currentBeat = 0;
      sequenceIndex++;

    }

    if (sequenceIndex === sequence.length) {

      sequenceIndex = 0;

    }

    this.bpmStuff.nextNoteTime = nextNoteTime;
    this.bpmStuff.currentBeat = currentBeat;
    this.bpmStuff.sequenceIndex = sequenceIndex;

  }

  schedule = time => {

    const { context, currentBeat, sequenceIndex } = this.bpmStuff;

    let osc = context.createOscillator();
    osc.connect(context.destination);

    if (currentBeat === 0 && sequenceIndex === 0)
      osc.frequency.value = 1760;

    else if (currentBeat === 0)
      osc.frequency.value = 880;

    else
      osc.frequency.value = 440;

    osc.start(time);
    osc.stop(time + 0.03);

  }

  createSequence = (bpm, top, bottom) => {

    this.setState({sequence: [...this.state.sequence, {bpm: bpm, top: top, bottom: bottom}]});

  }

  render() {
    return (
      <div className="App">
        <ControlPanel play={this.play} stop={this.stop} updateBPM={this.updateBPM} createSequence={this.createSequence}/>
        <Sequencer list={this.state.sequence} />
      </div>
    );
  }
}

export default App;
