import React, { useState } from 'react';
import './description.css';
import {  
  FaGlasses, 
  FaCloud, 
  FaThermometerFull, 
  FaWater,
  FaSun,
  FaWind,
  FaArrowsAltH
} from 'react-icons/fa';
import { IoMdRefresh } from "react-icons/io";

// exportar os dados da api - props
const Description = ({ feelsLike, cloudcover, pressure, wind_speed, uv_index, visibility }) => {
  return (
    <div className="section section__description">
      <div className="card">
        <div className="description__card-icon">
          <FaSun/>
          <small>Índice UV</small>
        </div>
        <h2>{uv_index}</h2>
      </div>   

      <div className="card">
        <div className="description__card-icon">
          <FaGlasses/>
          <small>Visibilidade (km)</small>
        </div>
        <h2>{visibility}</h2>
      </div>   

      <div className="card">
        <div className="description__card-icon">
          <FaCloud />
          <small>Cobertura Nuvens (%)</small>
        </div>
        <h2>{cloudcover}</h2>
      </div>   

      <div className="card">
        <div className="description__card-icon">
          <FaWater />
          <small>Pressão (hPa)</small>
        </div>
        <h2>{pressure}</h2>
      </div>   

      <div className="card">
        <div className="description__card-icon">
          <FaWind />
          <small>Ventos (km/h)</small>
        </div>                                          
        <h2>{wind_speed}</h2>
      </div>   

      <div className="card">
        <div className="description__card-icon">
          <FaThermometerFull />
          <small>Sensação térmica (ºC)</small>
        </div>
        <h2>{feelsLike}</h2>
      </div>

      <div className="button-screen">
        <button name="history"> <IoMdRefresh/> Consultar Histórico </button>
      </div>

      <div className="button-screen">
        <button name="comparative"> <FaArrowsAltH/> Comparar Cidades </button>
      </div>
  </div>


  )
  
}

export default Description;