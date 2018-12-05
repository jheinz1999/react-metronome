import React, { Component } from 'react';

import ControlPanel from './components/ControlPanel';

class App extends Component {

  constructor() {

    super();

    this.bpmStuff = {

      context: new AudioContext(),
      nextNoteTime: 0,
      sequence: [{bpm: 120, top: 4, bottom: 4}],
      sequenceIndex: 0,
      currentBeat: 0,
      stopped: false,
      interval: null

    }

  }

  play = () => {

    this.bpmStuff.nextNoteTime = this.bpmStuff.context.currentTime + 0.2;

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

    this.bpmStuff.stopped = true;
    this.bpmStuff.currentBeat = 0;
    this.bpmStuff.sequenceIndex = 0;
    this.bpmStuff.nextNoteTime = 0;

  }

  getNextNote = () => {

    let { sequence, sequenceIndex, currentBeat, nextNoteTime } = this.bpmStuff;

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

    const { context, currentBeat } = this.bpmStuff;

    let osc = context.createOscillator();
    osc.connect(context.destination);

    console.log(currentBeat, time);

    if (currentBeat === 0)
      osc.frequency.value = 880;

    else
      osc.frequency.value = 440;

    osc.start(time);
    osc.stop(time + 0.03);

  }

  updateBPM = e => {

    this.bpmStuff.sequence[this.bpmStuff.sequenceIndex].bpm = parseInt(e.target.value);

  }

  render() {
    return (
      <div className="App">
        <ControlPanel play={this.play} stop={this.stop} updateBPM={this.updateBPM}/>
      </div>
    );
  }
}

export default App;
