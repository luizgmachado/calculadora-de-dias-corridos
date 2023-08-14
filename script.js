function calculateBusinessDays() {
  // Função para verificar se uma data é feriado (você pode adicionar mais feriados aqui)
  function isHoliday(date) {
    const holidays = [
      // Insira aqui os feriados no formato 'YYYY-MM-DD'
      "14/08/2023", // Feriado Municipal BH
      "15/08/2023", // Feriado Municipal BH
      "07/09/2023", // Independência do Brasil
      "08/09/2023", // PONTO FACULTATIVO
      "12/10/2023", // Nossa Senhora Aparecida
      "01/11/2023", // PONTO FACULTATIVO
      "01/11/2023", // Dia do Servidor Publico
      "02/11/2023", // Finados
      "03/11/2023", // PONTO FACULTATIVO
      "15/11/2023", // Proclamação da República
      "08/12/2023",  // Feriado em BH Consagração á imaculada
      "25/12/2023" //Natal
      // Adicione mais feriados se necessário
    ];

    const dateString = date.toLocaleDateString('pt-BR').slice(0, 10);
    return holidays.includes(dateString);
  }

  // Função para verificar se a data é sábado (6) ou domingo (0) e pular para a próxima segunda-feira
  function getNextWeekday(date) {
    if (date.getDay() === 6 || date.getDay() === 0) {
      date.setDate(date.getDate() + (date.getDay() === 6 ? 2 : 1));
    }
    return date;
  }

  // Função que retorna a próxima data útil (não feriado e não sábado/domingo) a partir de uma data específica
  function getNextBusinessDay(startDate) {
    let currentDate = new Date(startDate);

    do {
      // Incrementa a data para o próximo dia
      currentDate.setDate(currentDate.getDate() + 1);

      // Verifica se a data é feriado ou final de semana
      if (!isHoliday(currentDate)) {
        getNextWeekday(currentDate);
      }
    } while (currentDate.getDay() === 6 || currentDate.getDay() === 0 || isHoliday(currentDate));

    return currentDate;
  }

  const startDate = new Date(document.getElementById("startDate").value);
  const numDays = parseInt(document.getElementById("numDays").value);
  const resultElement = document.getElementById("result");
  const finalResult = document.getElementById("finalResult");


  // Verificar se os inputs estão vazios
  if (!startDate || isNaN(numDays)) {
    alert("Por favor, preencha todos os campos antes de calcular.");
    return; // Sai da função para evitar que o cálculo seja feito com inputs vazios
  }

  let count = 0;
  let currentDate = new Date(startDate);

  while (count < numDays) {
    currentDate.setDate(currentDate.getDate() + 1);

    if (!isHoliday(currentDate)) {
      count++;
    }
  }

  const resultDate = getNextBusinessDay(currentDate);
  const formattedResultDate = resultDate.toLocaleDateString('pt-BR').substr(0, 10);
  resultElement.textContent = `Data Final: ${formattedResultDate}`;

  // Calcula o resultado com um dia a mais
  const finalResultDate = getNextBusinessDay(resultDate);
  finalResultDate.setDate(finalResultDate.getDate());
  const formattedFinalResultDate = finalResultDate.toLocaleDateString('pt-BR').slice(0, 10);

  const finalResultElement = document.getElementById("finalResult");
  finalResultElement.textContent = `Transito em julgado: ${formattedFinalResultDate}`;

  // Limpar os inputs após calcular
  document.getElementById("startDate").value = '';
  document.getElementById("numDays").value = '';
}

  // // Verificar se resultDate é sábado (6) ou domingo (0) e pular para a próxima segunda-feira
  // if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
  //   currentDate.setDate(currentDate.getDate() + (currentDate.getDay() === 6 ? 2 : 1));
  // }