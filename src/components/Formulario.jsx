import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { monedas } from "../data"
import { useSelectMonedas } from "../hooks"
import { ErrorForm } from "./ErrorForm"


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3 ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export const Formulario = ({ setMonedas, setResultado }) => {

  const [ cryptos, setCryptos ] = useState([]);
  const [error, setError] = useState(false);

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas);
  const [ cryptomoneda, SelectCrypto ] = useSelectMonedas('Elige tu CryptoMoneda', cryptos);

  useEffect(() => {
    const consultarAPI = async() =>{
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const respuesta = await fetch(url);

      const { Data } = await respuesta.json();

      const ArrayCryptos = Data.map( ({CoinInfo}) => {
        const {Name, FullName} = CoinInfo

        const objeto = {
          id: Name,
          nombre: FullName,
        }
        return objeto
      })
      setCryptos(ArrayCryptos);
    };
    consultarAPI();
  }, [])
    
  const handleSubmit = e => {
    e.preventDefault();

    if ( [moneda, cryptomoneda].includes('') ) {
      setError(true)
      setMonedas({})
      setResultado({})
      return
    } 
    setError(false)
    setMonedas({
      moneda,
      cryptomoneda,
    })
  }

  return (
    <>
      {
        (error) && <ErrorForm>Todos los campos son obligatorios</ErrorForm>
      }
      <form onSubmit={ handleSubmit }>
          <SelectMonedas />
          <SelectCrypto />
          <InputSubmit 
              type='submit'
              value='Cotizar'
          />
      </form>
    </>
  )
}
