import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';
import { FaSearch, FaTemperatureHigh, FaTemperatureLow, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import './index.css';

function App() {
  const { setValue, register, handleSubmit } = useForm();
// importar automaticamente os dados da api
  const [humidity, setHumidity] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [cloudcover, setCloudcover] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [wind_speed, setWind_speed] = useState(null);
  const [weather_descriptions, setWeather_descriptions] = useState(null);
  const [name, setName] = useState(null);
  const [uv_index, setUv_index] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [units, setUnits] = useState("m");
  const [bg, setBg] = useState(hotBg);
  
  async function fetchData(cityName) {
    try {
      const data = await getFormattedWeatherData(cityName);
      setHumidity(data?.current?.humidity ?? '');
      setFeelsLike(data?.current?.feelslike ?? '');
      setTemperature(data?.current?.temperature ?? '');
      setCloudcover(data?.current?.cloudcover ?? '');
      setPressure(data?.current?.pressure ?? '');
      setWind_speed(data?.current?.wind_speed ?? '');
      setName(data?.location?.name ?? '');
      setWeather_descriptions(data?.current?.weather_descriptions ?? '');
      setUv_index(data?.current?.uv_index ?? '');
      setVisibility(data?.current?.visibility ?? '');
      console.log(data?.current?.pressure);
    } catch (error) {
      console.log('Erro ao obter dados de previsão do tempo:', error);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormattedWeatherData(name, units);
      const threshold = units === 'm' ? 20 : 60;
      if (data?.current?.temperature <= threshold) {
        setBg(coldBg);
      } else {
        setBg(hotBg);
      }
    }
    fetchData();

    // background dinamico inverno -> verão

  }, [units, name]);

  const onSubmit = (data) => {
    const cityName = data.name; // Obtém o valor do campo "name" do formulário
    fetchData(cityName);
  };
  
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        setValue('name', data.localidade);
        const cityName = data.localidade; // Obtém o valor da cidade do CEP
        fetchData(cityName);
      });
  };


  return (
<form onSubmit={handleSubmit(onSubmit)}>
  <div className="App" style={{backgroundImage: `url(${bg})`}}>
   <div className="overlay">
    <div className="container section section__inputs">
     <div className="section section__inputs">
      <input type="text" {...register("cep")} placeholder="Digite o CEP" onBlur={checkCEP} />
      <input type="text" {...register("name")} />
      <button type="submit"><FaSearch/></button>
     </div>

     <div className="section section__temperature">
      <div className="icon">
        <h3>{name}</h3>
        <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="weatherIcon"/>
        <h5>{weather_descriptions}</h5>
      </div>

      <div className="temperature">
        <h1>{temperature} ºC</h1>
      </div>
     </div>

     {/*bottom description*/}    
     <Description 
        cloudcover={cloudcover} 
        feelsLike={feelsLike} 
        pressure={pressure} 
        wind_speed={wind_speed} 
        uv_index={uv_index} 
        visibility={visibility}
     />

    </div>
   </div>   
  </div>
</form>
  );
}

export default App;
