import React, { useEffect, useState } from 'react';
import './css.css';
import Ponteiro from '../../assets/ponteiro.svg'
import Velocimetro from '../../assets/velocimetro_skin_1.svg'

function Painel() {

  const [rpm, setRpm] = useState("0")
  const [valorRpm, setValorRpm] = useState(0)
  const [teste, setTeste] = useState(0)

  useEffect(() => {
    animation_ponteiro()
    window.electron.receive("serial", (data_rpm: any) => {
     const resp = arrayBufferToString(data_rpm)
      console.log(parseInt(resp, 0))
      setValorRpm(parseInt(resp, 0));
      const valor_calc = (parseInt(resp, 0) * 22) / 1000
      setRpm(String(valor_calc)); 
    })
  }, [])

let i = 0
const animation_ponteiro = () => {

 setInterval(() => {
  i = i + 2
  if(i > 280){
    i = 0
  }
  setTeste(i)
 },50)

  setTimeout(() => {
    setRpm("181")
  }, 1000)

  setTimeout(() => {
    setRpm("0")
  }, 3000)

}

  const arrayBufferToString = (buffer: any) => {
    let str = '';
    const array = new Uint8Array(buffer);
    for (let i = 0; i < array.length; i++) {
      str += String.fromCharCode(array[i]);
    }
    return str;
  }

  useEffect(() => {
    //const sec = document.querySelector(".sec") as HTMLDivElement;
    //sec.style.transform = `rotate(${parseInt(rpm)}deg)`;
  }, [rpm])

  return (
    <>
   <div className='text-white text-center w-20'  style={{position: "absolute", top: 70, left: 533, fontFamily: "MoolBoran", fontSize: "60px"}}>
  <div className='flex justify-center items-center'>
    0
  </div>
   </div>
      <div  style={{ position: "absolute", top: 48, left: 195 }}>
        <div style={{
          width: '300px',
          height: '300px',
          position: 'relative',
        }} className="flex flex-col justify-center items-center m-5 opacity-100">
          <div className="flex justify-center items-center">
            <img
              className='' style={{ 
                width: '55%', 
                transform: `rotate(${rpm}deg)`, 
                transitionDuration: "0.5s" }} 
                src={Ponteiro} alt=" " />
          </div>
        </div>
      </div>

      <div  style={{ position: "absolute", top: 48, left: 630 }}>
        <div style={{
          width: '300px',
          height: '300px',
          position: 'relative',
        }} className="flex flex-col justify-center items-center m-5 opacity-100">
          <div className="flex justify-center items-center">
            <img
              className='' style={{ 
                width: '55%', 
                transform: `rotate(${teste}deg)`, 
                transitionDuration: "0.5s" }} 
                src={Ponteiro} alt=" " />
          </div>
        </div>
      </div>

      <div>
         <img src={Velocimetro} alt="" />
      </div>
    </>
  );
}

export default Painel
 