import React from 'react';

export default function ControlPanel({stop, play, createSequence, updateBPM}) {

  return (

    <div className='control-panel'>

      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
      <input type='text' onChange={updateBPM} placeholder='120' />

    </div>

  );

}
