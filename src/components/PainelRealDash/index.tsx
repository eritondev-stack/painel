import React, { useEffect, useState } from 'react';
import './css.css';
import PonteiroNovo from '../../assets/ponteiro_novo.svg'
import NovoPainel from '../../assets/Ponteiro_Novo_Painel.svg'
import TampaDeCima from '../../assets/parte_de_cima.svg'

function PainelRealDash() {

  const [rpm, setRpm] = useState("0")
  const [valorRpm, setValorRpm] = useState(0)
  const [teste, setTeste] = useState(0)
  const [rpm_teste, setRpm_teste] = useState(0)

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
      if (i > 280) {
        i = 0
      }
      setTeste(i)
    }, 50)

    setTimeout(() => {
      setRpm_teste(262)
    }, 1000)

    setTimeout(() => {
      setRpm_teste(0)
    }, 3000)

  }

  const update_parameter = (p: number) => {
    if(p > 130){

      return 1.75
    }else{
      return 1.8
    }
  }

  const arrayBufferToString = (buffer: any) => {
    let str = '';
    const array = new Uint8Array(buffer);
    for (let i = 0; i < array.length; i++) {
      str += String.fromCharCode(array[i]);
    }
    return str;
  }
  const width_c = "350" + "px";
  const rpm_teste_outro = 722 - (rpm_teste * update_parameter(rpm_teste))
  return (
    <>
      <button className='bg-white' style={{
        position: "absolute", top: 0, left: 160, border: "0px solid", zIndex: 101,
        width: '170px'
      }} onClick={() => setRpm_teste(rpm_teste + 15)}>Subir</button>

      <button className='bg-red-500' style={{
        position: "absolute", top: 0, left: 380, border: "0px solid", zIndex: 101,
        width: '170px'
      }} onClick={() => setRpm_teste(rpm_teste - 15)}>{rpm_teste}</button>


      <div style={{
        position: "absolute", top: 140, left: 160, border: "0px solid", zIndex: 101,
        width: '170px'
      }}>
        <img src={TampaDeCima} alt="" />
      </div>
      <div style={{ position: "absolute", top: 50, left: 70, border: "0px solid", zIndex: 100 }}>
        <div style={{
          width: width_c,
          height: width_c,
          position: 'relative',
          transform: `rotate(${-39}deg)`,
        }} className="flex flex-col justify-center items-center opacity-100">
          <div className="flex justify-center items-center">
            <img
              className='' style={{
                width: width_c,
                transform: `rotate(${rpm_teste}deg)`,
                transitionDuration: "0.3s"
              }}
              src={PonteiroNovo} alt=" " />
          </div>
        </div>
      </div>
      <div style={{ width: "400px", position: "absolute", top: "25px", left: "45px", border: "0px solid" }}>
        <svg viewBox="-31.25 -31.25 312.5 312.5" version="1.1"
          xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(140deg)" }}>
          <defs>
            <linearGradient id="linear-gradient" x1="0" y1="193.5" x2="387" y2="193.5"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color={rpm_teste > 100 ? "rgb(255,0,0)" : "#45ffec"} stop-opacity=".2" />
              <stop offset=".64" stop-color={rpm_teste > 100 ? "rgb(255,0,0)" : "#32c6e5"} stop-opacity=".53" />
              <stop offset=".94" stop-color={rpm_teste > 100 ? "rgb(255,0,0)" : "#29abe2"} stop-opacity=".7" />
            </linearGradient>
          </defs>
          <circle className="cls-1" r="100px" cx="125" cy="125" stroke="#76e5b1" stroke-width="70px"
            stroke-dashoffset={`${rpm_teste_outro}px`} stroke-dasharray="722px"></circle>
        </svg>
      </div>
      <div style={{ width: '500px' }}>
        <img src={NovoPainel} alt="" />
      </div>
    </>
  );
}

export default PainelRealDash
