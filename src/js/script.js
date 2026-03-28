// загрузка портфолио
fetch("../src/data/portfolio.json")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("portfolio-list");

        data.forEach(item => {
            const el = document.createElement("div");
            el.className = "card";
            el.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
            container.appendChild(el);
        });
    });