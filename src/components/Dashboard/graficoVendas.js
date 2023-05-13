import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
  },
  yaxis: {
    title: {
      text: 'R$',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val) {
        return `R$ ${val}`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

const GraficoVendas = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {

    const token = localStorage.getItem('user_token');

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }),
    };

    fetch(process.env.REACT_APP_BASE_URL + "/recipeIngredients/dashboard", requestInfo)
      .then(resposta => resposta.json())
      .then((json) => {
          setSeries(json);
          setOptions(columnChartOptions);
        })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      tooltip: {
        theme: 'light',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500',
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div>
      <div id="chart" style={{ marginLeft: '30px' }}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={430}
          width={1400}
        />
      </div>
    </div>
  );
};

export default GraficoVendas;
