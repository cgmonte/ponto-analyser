const table = window.document.getElementById("tabelaDiasDoEspelho");
const tableBody = table.querySelector("tbody");
const rows = tableBody.querySelectorAll("tr");
const periodos = [
  "primeiro",
  "segundo",
  "terceiro",
  "quarto",
  "quinto",
  "sexto",
  "sétimo",
  "oitavo",
  "nono",
  "décimo",
];
const maxDuration = 2.16e7;

rows.forEach((row) => {
  const rowChildren = row.children;
  const cellContent = rowChildren[3].innerHTML;
  const date = rowChildren[0].innerHTML;

  if (cellContent.includes(":")) {
    const times = cellContent.split(" ");

    if (times.length % 2 !== 0) {
      //   rowChildren[3].style.cssText += "background-color:yellow";
      //   rowChildren[3].innerHTML =
      //     rowChildren[3].innerHTML + " " + "<b>Batidas ímpares!</b>";
      console.log(
        `%cNo dia ${date} você não teve um número par de marcações!`,
        `background: yellow; color: reset`
      );
    } else {
      let pairIndex = 0;
      let previousTime;
      times.forEach((time) => {
        const [hours, minutes] = time.split(":");
        const currentTime = new Date("1901", "0", "1", hours, minutes);

        if (!previousTime) {
          previousTime = currentTime;
        } else {
          const duration = new Date(currentTime - previousTime);
          const durationString = duration.toISOString().slice(11, 16);
          const backgroundColor =
            duration.getTime() >= maxDuration ? "#cc0000" : "green";

          console.log(
            `No dia ${date}, o ${periodos[pairIndex]} período de trabalho teve %c${durationString}` +
              "%c de duração",
            `background: ${backgroundColor}; color: white`,
            `background: reset; color: reset`
          );
          pairIndex += 1;
          previousTime = null;
        }
      });
    }
  }
});
