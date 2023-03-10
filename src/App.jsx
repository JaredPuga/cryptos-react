import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Formulario, Resultado, Spiner } from './components'
import ImagenCripto from './img/imagen-criptos.png'


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

export const App = () => {

  const [ monedas, setMonedas ] = useState({});
  const [ resultado, setResultado ] = useState({});
  const [cargando, setCargando] = useState(false);
  

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const CotizarCripto = async() =>{
        setCargando(true);
        setResultado({})
        const { moneda, cryptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cryptomoneda }&tsyms=${ moneda }`
        const respuesta = await fetch(url);
        const { DISPLAY } = await respuesta.json()

        setResultado(DISPLAY[cryptomoneda][moneda]);
        setCargando(false);
      }

      CotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <Imagen 
        src={ ImagenCripto }
        alt='Imagenes criptomonedas'
      />

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario 
          setMonedas = { setMonedas }
          setResultado = { setResultado }
        />
        {cargando && <Spiner />}
        { resultado && resultado.PRICE && <Resultado resultado = { resultado } /> }
      </div>
    </Contenedor>
  )
}

