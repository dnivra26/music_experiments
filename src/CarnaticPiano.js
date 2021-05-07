import { Piano, MidiNumbers, KeyboardShortcuts } from 'react-piano';
import Soundfont from 'soundfont-player';
import 'react-piano/dist/styles.css';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

var ac = new AudioContext()
var piano;
Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' }).then(function (local_piano) {
  piano = local_piano;
});

const westernToCarnatic = {
    'C': {
        carnatic: 'Sa',
        western: 'C',
        class: 'white',
    },
    'Db': {
        carnatic: 'ri1',
        western: 'C#',
        class: 'black',
    },
    'D': {
        carnatic: 'Ri',
        western: 'D',
        class: 'white',
    },
    'Eb': {
        carnatic: 'ga1',
        western: 'D#',
        class: 'black',
    },
    'E': {
        carnatic: 'Ga',
        western: 'E',
        class: 'white',
    },
    'F': {
        carnatic: 'Ma',
        western: 'F',
        class: 'white',
    },
    'Gb': {
        carnatic: 'Ma2',
        western: 'F#',
        class: 'black',
    },
    'G': {
        carnatic: 'Pa',
        western: 'G',
        class: 'white',
    },
    'Ab': {
        carnatic: 'da1',
        western: 'G#',
        class: 'black',
    },
    'A': {
        carnatic: 'Da',
        western: 'A',
        class: 'white',
    },
    'Bb': {
        carnatic: 'ni1',
        western: 'A#',
        class: 'black',
    },
    'B': {
        carnatic: 'Ni',
        western: 'B',
        class: 'white',
    },
}

function CarnaticPiano() {
    
    

    const [key, setKey] = React.useState(0);
    const [isLoopOn, setIsLoopOn] = React.useState(false);
    const [instrument, setInstrument] = React.useState("acoustic_grand_piano");
    const [octave, setOctave] = React.useState(3);
    const [keysVisible, setKeysVisible] = React.useState(12);
    
    const [firstNote, setFirstNote] = React.useState(MidiNumbers.fromNote('c3'));
    
    const [lastNote, setLastNote] = React.useState(MidiNumbers.fromNote('c3') + keysVisible);

    const keyboardShortcuts = KeyboardShortcuts.create({
        firstNote: firstNote,
        lastNote: lastNote,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
      });

    const handleChange = (event) => {
        setKey(event.target.value);
    };

    const handleOctaveChange = (newOctave) => {
        if(newOctave >= 1 && newOctave <= 7) {
            setOctave(newOctave);
        }
    };

    const handleVisibleKeysChange = (keysVisible) => {
        if(keysVisible >= 8 && keysVisible <= 25) {
            setKeysVisible(keysVisible);
            setLastNote(firstNote + keysVisible);
        }
    };

    const handleInstrumentChange = async (event) => {
        piano = await Soundfont.instrument(ac, event.target.value, { soundfont: 'MusyngKite' });
        setInstrument(event.target.value);
    };

    const handleShift = (shift) => {
        setFirstNote(firstNote+shift);
        setLastNote(lastNote+shift);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Grid container alignItems="center" className={classes.root}>
                Key - Kattai
                <Select value={key} onChange={handleChange} >
                    <MenuItem value={0}>Sa - C - 1</MenuItem>
                    <MenuItem value={1}>ri1 - C# - 1.5</MenuItem>
                    <MenuItem value={2}>Ri - D - 2</MenuItem>
                    <MenuItem value={3}>ga1 - D# - 2.5</MenuItem>
                    <MenuItem value={4}>Ga - E - 3</MenuItem>
                    <MenuItem value={5}>Ma - F - 4</MenuItem>
                    <MenuItem value={6}>Ma2 - F# - 4.5</MenuItem>
                    <MenuItem value={7}>Pa - G - 5</MenuItem>
                    <MenuItem value={8}>da1 - G# - 5.5</MenuItem>
                    <MenuItem value={9}>Da - A - 6</MenuItem>
                    <MenuItem value={10}>ni1 - A# - 6.5</MenuItem>
                    <MenuItem value={11}>Ni - B - 7</MenuItem>
                </Select>

                <Divider orientation="vertical" flexItem />
                Loop
                <Checkbox
                    color="primary"
                    onChange={(event) => {
                        setIsLoopOn(event.target.checked);
                    }}
                />
                <Divider orientation="vertical" flexItem />
                Instrument
                <Select value={instrument} onChange={handleInstrumentChange} >
                    <MenuItem value="acoustic_grand_piano">{"acoustic_grand_piano".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="acoustic_guitar_nylon">{"acoustic_guitar_nylon".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="acoustic_guitar_steel">{"acoustic_guitar_steel".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="cello">{"cello".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="fiddle">{"fiddle".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="flute">{"flute".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="harmonica">{"harmonica".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="kalimba">{"kalimba".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="ocarina">{"ocarina".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="piccolo">{"piccolo".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="recorder">{"recorder".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="shanai">{"shanai".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="viola">{"viola".replace(/_/gi, " ")}</MenuItem>
                    <MenuItem value="violin">{"violin".replace(/_/gi, " ")}</MenuItem>
                </Select>
                <Divider orientation="vertical" flexItem />
                Octave
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={() => { handleOctaveChange(octave - 1) }}>-</Button>
                    <Button disabled>{octave}</Button>
                    <Button onClick={() => { handleOctaveChange(octave + 1) }}>+</Button>
                </ButtonGroup>
                <Divider orientation="vertical" flexItem />
                Keys Visible
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={() => { handleVisibleKeysChange(keysVisible - 1) }}>-</Button>
                    <Button disabled>{keysVisible}</Button>
                    <Button onClick={() => { handleVisibleKeysChange(keysVisible + 1) }}>+</Button>
                </ButtonGroup>
                <Divider orientation="vertical" flexItem />
                Shift Keys
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button onClick={() => { handleShift(-1) }}>{"<"}</Button>
                    <Button onClick={() => { handleShift(+1) }}>{">"}</Button>
                </ButtonGroup>
                <Divider orientation="vertical" flexItem />
                <Button variant="contained" color="primary" onClick={() => { piano.stop() }}>STOP</Button>
            </Grid>
            <Piano
                keyboardShortcuts={keyboardShortcuts}
                noteRange={{ first: firstNote + ((octave - 3)*12), last: lastNote + ((octave - 3)*12)}}
                playNote={(midiNumber) => {
                    piano.stop()
                    piano.play(midiNumber + key, null, { loop: isLoopOn })
                }}
                stopNote={(midiNumber) => {
                
                }}
                width={1000}
                renderNoteLabel={
                    ({keyboardShortcut, midiNumber, isActive, isAccidental}) => {
                        const pitch = MidiNumbers.getAttributes(midiNumber).pitchName;

                        return <div className={westernToCarnatic[pitch].class}>{westernToCarnatic[pitch].carnatic}</div>
                    }
                }
            />
        </div>
    )
}

export default CarnaticPiano;