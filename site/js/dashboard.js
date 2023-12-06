const urlSolo = 'http://127.0.0.1:3000/Solo';
const loop = 5000;


//----------Pega os dados da API----------

//Coletando o ultimo registro de umidade do solo
async function fetchUltimoSolo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
    throw error;
  }
}


//Coletando o ultimo registro de umidade do ar
async function fetchUltimoAr(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
    throw error;
  }
}


//Coletando o ultimo registro da Temperatura
async function fetchUltimoTemp(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;


  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
    throw error;
  }
}


//Coletando a ultima data de irrigação
async function fetchIrrigou(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
    throw error;
  }
}


//Coletando a ultima data de irrigação
async function fetchUltimoFluxo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
    throw error;
  }
}


//Coleta os dados da API referentes a umidade de solo e data, e insere nos graficos
async function fetchSolo(url) {
  while (true) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      areaChart.updateSeries([{
        data: data

      }])
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
      throw error;
    }
    //mantem a função em atualização constante
    await new Promise((resolve) => setTimeout(resolve, loop));
  }
}


//Coleta os dados da API referentes a umidade de ar e data, e insere nos graficos
async function fetchAr(url) {
  while (true) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      areaChart2.updateSeries([{
        data: data,

      }])
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
      throw error;
    }
    //mantem a função em atualização constante
    await new Promise((resolve) => setTimeout(resolve, loop));
  }
}


//Coleta os dados da API referentes a Temperatura e data, e insere nos graficos
async function fetchTemp(url) {
  while (true) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      linechart.updateSeries([{
        data: data

      }])
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
      throw error;
    }
    //mantem a função em atualização constante
    await new Promise((resolve) => setTimeout(resolve, loop));
  }
}


//Coleta os dados da API referentes ao fluxo e data, e insere nos graficos
async function fetchFluxo(url) {
  while (true) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      linechart2.updateSeries([{
        data: data

      }])
    } catch (error) {
      console.error('Erro ao obter dados:', error.message);
      throw error;
    }
    //mantem a função em atualização constante
    await new Promise((resolve) => setTimeout(resolve, loop));
  }
}


fetchSolo("http://127.0.0.1:3000/Solo")
fetchAr("http://127.0.0.1:3000/Ar")
fetchTemp("http://127.0.0.1:3000/Temp")
fetchFluxo("http://127.0.0.1:3000/Fluxo")

// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

//   GRÁFICOS 

// gráfico da umidade do solo (area chart)
const areaChartOptions = {
  series: [
    {
      name: '% da umidade  do solo',
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10,
  },
  title: {
    text: 'Umidade',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666'
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  noData: {
    text: 'Loading...'
  }
};

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();


// gráfico da umidade do ar (area chart)
const areaChartOptions2 = {
  series: [
    {
      name: '% da umidade do ar',
      data: [],
    },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  colors: ['#407bcf', '#246dec'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10,
  },
  title: {
    text: 'Umidade',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666'
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  noData: {
    text: 'Loading...',
  }
};

const areaChart2 = new ApexCharts(
  document.querySelector('#area-chart2'),
  areaChartOptions2
);
areaChart2.render();


// gráfico da temperatura (line chart)   
var options = {
  series: [{
    name: 'Temperatura',
    data: []
  }],
  chart: {
    height: 350,
    type: 'line',
  },
  forecastDataPoints: {
    count: 7
  },
  stroke: {
    width: 5,
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10,
  },
  title: {
    text: 'Temperatura',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#FDD835'],
      shadeIntensity: 3,
      type: 'vertical',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    },
  },
  noData: {
    text: 'Loading...'
  }
};

var linechart = new ApexCharts(document.querySelector("#line-chart"), options);
linechart.render();


// gráfico do fluxo de água (line chart)

var options2 = {
  series: [{
    name: "Desktops",
    data: []
  }],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      type: 'x',
      enabled: true,
      autoScaleYaxis: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  markers: {
    size: 0,
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10,
  },
  title: {
    text: 'Água em ml',
    align: 'left',
    style: {
      fontSize: "16px",
      color: '#666'
    }
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  noData: {
    text: 'Loading...'
  }
};

var linechart2 = new ApexCharts(document.querySelector("#line-chart2"), options2);
linechart2.render();

// ---------- BOTÃO PARA SAIR Página Dashboard ----------
document.getElementById('logoutButton').addEventListener('click', function () {
  // Exibir uma caixa de confirmação personalizada
  var confirmLogout = window.confirm("Deseja realmente sair?");

  // Se o usuário clicar em "Ok", redirecionar para a página de login
  if (confirmLogout) {
    // Redirecionar para a página de login 
    window.location.href = 'index.html';
  }
  // Se o usuário clicar em "Cancelar", não fazer nada
});


// ----------  DIVS do HTML----------

//Coleta o ultimo dado da api com o valor da umidade do solo
const elementoSolo = document.querySelector("#umidade-solo");

//Chamada inicial
fetchUltimoSolo('http://127.0.0.1:3000/UltimoSolo').then((valor) => {
  elementoSolo.innerHTML = valor + "%";
}, (erro) => {
  elementoSolo.innerHTML = "Sem Conexão"
});

//Loop para repetir constantemente a chamada da API
setInterval(async () => {
  try {
    fetchUltimoSolo('http://127.0.0.1:3000/UltimoSolo').then((valor) => {
      elementoSolo.innerHTML = valor + "%";
    }, (erro) => {
      elementoSolo.innerHTML = "Sem Conexão"
    });
  } catch (error) {

  }
}, loop);


//Coleta o ultimo dado da api com o valor da umidade do ar
const elementoAr = document.querySelector("#umidade-ar");

//Chamada inicial
fetchUltimoAr('http://127.0.0.1:3000/UltimoAr').then((valor) => {
  elementoAr.innerHTML = valor + "%";
}, (erro) => {
  elementoAr.innerHTML = "Sem Conexão"
});

//Loop para repetir constantemente a chamada da API
setInterval(async () => {
  try {
    fetchUltimoAr('http://127.0.0.1:3000/UltimoAr').then((valor) => {
      elementoAr.innerHTML = valor + "%";
    }, (erro) => {
      elementoAr.innerHTML = "Sem Conexão"
    });
  } catch (error) {
  }
}, loop);


//Coleta o ultimo dado da api com o valor da Temperatura
const elementoTemp = document.querySelector("#temperatura");

//Chamada inicial
fetchUltimoTemp('http://127.0.0.1:3000/UltimoTemp').then((valor) => {
  elementoTemp.innerHTML = valor + "°C";
}, (erro) => {
  elementoTemp.innerHTML = "Sem Conexão"
});

//Loop para repetir constantemente a chamada da API
setInterval(async () => {
  try {
    fetchUltimoTemp('http://127.0.0.1:3000/UltimoTemp').then((valor) => {
      elementoTemp.innerHTML = valor + "°C";
    }, (erro) => {
      elementoTemp.innerHTML = "Sem Conexão"
    });
  } catch (error) {
  }
}, loop);


//Coleta o ultimo dado da api verificando qual dia regou, e pega ele
const elementoIrrigou = document.querySelector("#irrigou");

//Chamada inicial
fetchIrrigou('http://127.0.0.1:3000/Irrigou').then((valor) => {
  elementoIrrigou.innerHTML = valor;
}, (erro) => {
  elementoIrrigou.innerHTML = "Sem Conexão"
});

//Loop para repetir constantemente a chamada da API
setInterval(async () => {
  try {
    fetchIrrigou('http://127.0.0.1:3000/Irrigou').then((valor) => {
      elementoIrrigou.innerHTML = valor;
    }, (erro) => {
      elementoIrrigou.innerHTML = "Sem Conexão"
    });
  } catch (error) {
  }
}, loop);


//Coleta o ultimo dado da api verificando qual dia regou, e pega a quantidade de agua
const elementoFluxo = document.querySelector("#fluxo");

//Chamada inicial
fetchUltimoFluxo('http://127.0.0.1:3000/UltimoFluxo').then((valor) => {
  elementoFluxo.innerHTML = valor + " ml";
}, (erro) => {
  elementoFluxo.innerHTML = "Sem Conexão"
});

//Loop para repetir constantemente a chamada da API
setInterval(async () => {
  try {
    fetchUltimoFluxo('http://127.0.0.1:3000/UltimoFluxo').then((valor) => {
      elementoFluxo.innerHTML = valor + " ml";
    }, (erro) => {
      elementoFluxo.innerHTML = "Sem Conexão"
    });
  } catch (error) {
  }
}, loop);