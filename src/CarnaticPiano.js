import { Piano, MidiNumbers } from 'react-piano';
import Soundfont from 'soundfont-player';
import 'react-piano/dist/styles.css';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
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

function CarnaticPiano() {
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('b3');
    const keyMap = {
        48: {
            carnatic: 'Sa',
            western: 'C',
            class: 'white',
        },
        49: {
            carnatic: 'ri1',
            western: 'C#',
            class: 'black',
        },
        50: {
            carnatic: 'Ri',
            western: 'D',
            class: 'white',
        },
        51: {
            carnatic: 'ga1',
            western: 'D#',
            class: 'black',
        },
        52: {
            carnatic: 'Ga',
            western: 'E',
            class: 'white',
        },
        53: {
            carnatic: 'Ma',
            western: 'F',
            class: 'white',
        },
        54: {
            carnatic: 'Ma2',
            western: 'F#',
            class: 'black',
        },
        55: {
            carnatic: 'Pa',
            western: 'G',
            class: 'white',
        },
        56: {
            carnatic: 'da1',
            western: 'G#',
            class: 'black',
        },
        57: {
            carnatic: 'Da',
            western: 'A',
            class: 'white',
        },
        58: {
            carnatic: 'ni1',
            western: 'A#',
            class: 'black',
        },
        59: {
            carnatic: 'Ni',
            western: 'B',
            class: 'white',
        },
    }

    const [key, setKey] = React.useState(0);
    const [isLoopOn, setIsLoopOn] = React.useState(false);
    const [instrument, setInstrument] = React.useState("acoustic_grand_piano");

    const handleChange = (event) => {
        setKey(event.target.value);
    };

    const handleInstrumentChange = async (event) => {
        piano = await Soundfont.instrument(ac, event.target.value, { soundfont: 'MusyngKite' });
        setInstrument(event.target.value);
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
                <Button variant="contained" color="primary" onClick={() => { piano.stop() }}>STOP</Button>
            </Grid>
            <Piano
            noteRange={{ first: firstNote, last: lastNote }}
            playNote={(midiNumber) => {
                
                piano.stop()
                piano.play(midiNumber + key, null, { loop: isLoopOn })
            }}
            stopNote={(midiNumber) => {
                
            }}
            width={1000}
            renderNoteLabel={
                ({keyboardShortcut, midiNumber, isActive, isAccidental}) => {
                    return <div className={keyMap[midiNumber].class}>{keyMap[midiNumber].carnatic}</div>
                }
            }
            />
        </div>
    )
}

export default CarnaticPiano;