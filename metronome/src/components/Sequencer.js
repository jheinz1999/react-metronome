import React from 'react';

export default function Sequencer({list}) {

  return (

    <div className='sequencer'>

      {list.map((item, id) => (

        <div className='metronome' key={id}>

          <h3>BPM: {item.bpm}</h3>
          <h4>Time signature: {item.top}/{item.bottom}</h4>

        </div>

      ))}

    </div>

  );

}
