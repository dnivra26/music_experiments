import './App.css';
import { Piano, MidiNumbers } from 'react-piano';
import Soundfont from 'soundfont-player';
import 'react-piano/dist/styles.css';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';


var ac = new AudioContext()
var piano;
Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' }).then(function (local_piano) {
  piano = local_piano;
});

function App() {

  const firstNote = MidiNumbers.fromNote('c3');
  const lastNote = MidiNumbers.fromNote('b3');
  const keyMap = {
    48: 'Sa',
    49: 'ri1',
    50: 'Ri',
    51: 'ga1',
    52: 'Ga',
    53: 'Ma',
    54: 'Ma2',
    55: 'Pa',
    56: 'da1',
    57: 'Da',
    58: 'ni1',
    59: 'Ni',
  }

  const [key, setKey] = React.useState(0);

  const handleChange = (event) => {
    setKey(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        Select Key 
        <Select value={key} onChange={handleChange} >
          <MenuItem value={0}>Sa</MenuItem>
          <MenuItem value={1}>ri1</MenuItem>
          <MenuItem value={2}>Ri</MenuItem>
          <MenuItem value={3}>ga1</MenuItem>
          <MenuItem value={4}>Ga</MenuItem>
          <MenuItem value={5}>Ma</MenuItem>
          <MenuItem value={6}>Ma2</MenuItem>
          <MenuItem value={7}>da1</MenuItem>
          <MenuItem value={8}>Da</MenuItem>
          <MenuItem value={9}>ni1</MenuItem>
          <MenuItem value={10}>Ni</MenuItem>
        </Select>
        <Button onClick={() => { piano.stop() }}>STOP</Button>
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}
          playNote={(midiNumber) => {
            
            piano.stop()
            piano.play(midiNumber + key, null, { loop: true, sustain: true })
          }}
          stopNote={(midiNumber) => {
            
          }}
          width={1000}
          renderNoteLabel={
            ({keyboardShortcut, midiNumber, isActive, isAccidental}) => {
                return <div className="white-keys">{keyMap[midiNumber]}</div>
            }
          }
        />
      </header>
    </div>
  );
}

export default App;
