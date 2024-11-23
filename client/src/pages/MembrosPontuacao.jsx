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


// Registrar os elementos necessários para gráficos de linhas e barras
ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function MembrosPontuacao() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("line"); // Estado para alternar entre os tipos de gráfico

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwI1I1yZclonfcI4_4caKJeqKeTgAs2UzMW-ZXbfFWmp59jWsbGu85RekdAhRT8pTh4dw/exec"
        );
        if (!response.ok) throw new Error("Erro ao carregar os dados");
        const result = await response.json();
  
        // Verifique a resposta da API
        console.log("Dados recebidos da API:", result);
  
        // Verificar se a chave 'area' existe
        result.forEach((item, index) => {
          console.log(`Área do Item ${index}:`, item.area);
        });
  
        // Continuar o processamento dos dados
        const labels = result.map((item) => item.nome);
        const scores = result.map((item) => item.pontuacao);
  
        // Definir as cores das barras com base na área
        const colors = result.map((item) => {
          const area = item.area ? item.area.toUpperCase() : "default"; // Fallback para "default" se area for undefined
          console.log(`Área detectada para ${item.nome}: ${area}`); // Verifique a área de cada item
  
          switch (area) {
            case "AV":
              return "rgba(255, 99, 132, 0.8)"; // Cor para AV
            case "GD":
              return "rgba(54, 162, 235, 0.8)"; // Cor para Desenvolvimento
            case "GM":
              return "rgba(255, 206, 86, 0.8)"; // Cor para Design
            case "PROG":
              return "rgba(75, 192, 192, 0.8)"; // Cor para Marketing
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
              borderColor: colors,
              backgroundColor: colors,
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      }
    }
  
    fetchData();
  }, []);
  
  

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
      <button onClick={toggleChartType} style={{ marginBottom: "20px" }}>
        Alternar para {chartType === "line" ? "Gráfico de Barras" : "Gráfico de Linhas"}
      </button>
      {chartType === "line" ? (
        <Line key={JSON.stringify(data)} data={data} options={options} />
      ) : (
        <Bar key={JSON.stringify(data)} data={data} options={options} />
      )}
    </div>
  );
}
