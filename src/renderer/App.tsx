import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import {useState} from 'react';

let day = new Date();

const TimeSign = () => {
  const items = [];
  const v = 1.6;
  for(let i=1; i<13; i++) {
    const style = {
      transform: `rotate(calc(30deg * ${i + v}))`,
    };
    const style_b = {
      transform: `rotate(calc(-30deg * ${i + v}))`,
    };
    items.push(<span style={style} key={i}><b style={style_b}>{i}</b></span>);
  }
  return <>{items}</>;
}

function Clock() {
  const [hh, setHh] = useState(day.getHours());
  const [mm, setMm] = useState(day.getMinutes());
  const [ss, setSs] = useState(day.getSeconds());

  const clock = setInterval(()=>{
    day = new Date();
    setSs(day.getSeconds());
    if(ss===0){
      setMm(day.getMinutes());
      setHh(day.getHours());
    }
    clearInterval(clock);
  }, 1000);

  return (
    <div className="container">
      <div className='clock'>
        <TimeSign />
        <div className='circle' id="mn" style={{transform:`rotateZ(${mm*6}deg)`}}>
          <div className='circle circle2' id='hr' style={{transform:`rotateZ(${hh*30+mm/2-mm*6}deg)`}}>
            <div className='circle circle3' id='sc' style={{transform:`rotateZ(${(ss-1)*6-hh*30-mm/2}deg)`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clock />} />
      </Routes>
    </Router>
  );
}
