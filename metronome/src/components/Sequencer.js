import React from 'react';

import './Sequencer.scss';

export default function Sequencer({list, currentIndex, currentBeat}) {

  if (currentBeat === 0 && list[currentIndex]) {
    if (currentIndex !== 0)
      currentIndex--;
    else
      currentIndex = list.length - 1;

    currentBeat = list[currentIndex].top;

  }

  return (

    <div className='sequencer'>

      {list.map((item, id) => (

        <div className='metronome' key={id}>

          <h3>BPM: {item.bpm}</h3>
          <h4>Time signature: {item.top}/{item.bottom}</h4>

          {id === currentIndex && <h4>{currentBeat}</h4>}

        </div>

      ))}

    </div>

  );

}
