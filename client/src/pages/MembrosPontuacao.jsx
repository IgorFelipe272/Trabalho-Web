import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import "../styles/MembrosPontuacao.css";

import { useNavigate } from 'react-router-dom'

// Registrar os elementos necessários para gráficos de linhas e barras, a extensao pede q façamos isso 
ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function MembrosPontuacao() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("line"); // Estado para alternar entre os tipos de gráfico

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbx0g4m-S3XkeBeWZWVZbJrpkTyXowEFjTeN3Xoi9pBwHOAYzIVBFFeZQYAaN8XmoyYYog/exec"
        );
        if (!response.ok) throw new Error("Erro ao carregar os dados");
        const result = await response.json();
  
        // Verifique a resposta da API
        //console.log("Dados recebidos da API:", result);
  
        // Continuar o processamento dos dados
        const labels = result.map((item) => item.nome);
        const scores = result.map((item) => item.pontuacao);
  
        // Definir as cores das barras com base na área
        const colors = result.map((item) => {
          const area = item.area; 
          //console.log(`Área detectada para ${item.nome}: ${area}`); // Verifique a área de cada item
  
          switch (area) {
            case "AV":
              return "rgba(255, 99, 132, 0.8)"; // Cor para AV
            case "GD":
              return "rgba(255, 206, 86, 0.8)"; // Cor para game design
            case "GM":
              return "rgba(54, 162, 235, 0.8)"; // Cor para gestao e Marketing
            case "PROG":
              return "rgba(148, 0, 211, 0.8)"; // Cor para programação
            default:
              return "rgba(153, 102, 255, 0.8)"; // Cor padrão
          }
        });

        setData({
          labels,
          datasets: [
            {
              label: "Pontuação dos Membros",
              data: scores,
              borderColor: chartType === "black" , // Cor preta para o gráfico de linhas
              backgroundColor: colors,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      }
    }
  
    fetchData();
  }, [chartType]); // Dependência de chartType para reagir a mudanças

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Pontuação dos Membros",
      },
      legend: {
        display: false,
      },
    },
  };

  // Função para alternar entre os gráficos
  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "line" ? "bar" : "line"));
  };

  if (error) return <p>Erro: {error}</p>;
  if (!data) return <p>Carregando...</p>;

  return (
    <div className="membro">
      <h1>Gráfico de Pontuação</h1>
      <button onClick={toggleChartType}>
        Alternar para {chartType === "line" ? "Gráfico de Barras" : "Gráfico de Linhas"}
      </button>
      <button onClick={() => {navigate("/user")}}>Voltar</button>
      {chartType === "line" ? (
        <Line key={JSON.stringify(data)} data={data} options={options} />
      ) : (
        <Bar key={JSON.stringify(data)} data={data} options={options} />
      )}
    </div>
  );
}
