const dataCanvas = document.getElementById("meuEstado");
const dataCtx = dataCanvas.getContext("2d");
const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");
const graficoCanvas = document.getElementById("meuGrafico");
const graficoCtx = graficoCanvas.getContext("2d");
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;
const raio = 100;

let dadosNMNA, dadosYMNA, dadosNMYA, dadosYMYA 

let state = "NMNA"; 
let counter = -1;
let history = "";
let contadorGrafico = 0;
let intervaloGrafico; 
let violations = 0; 
let delayValue = 0; 


const valueDelayInput = document.getElementById("valueDelay");

const centros = [ 
    { x: centroX - raio, y: centroY - raio, nome: "No Mig + No Attack" },
    { x: centroX + raio, y: centroY - raio, nome: "Mig + No Attack" },
    { x: centroX + raio, y: centroY + raio, nome: "No Mig + Attack" },
    { x: centroX - raio, y: centroY + raio, nome: "Mig + Attack" }
];

function criarGradiente(x1, y1, x2, y2, cor1, cor2) {
    const gradiente = ctx.createLinearGradient(x1, y1, x2, y2);
    gradiente.addColorStop(0, cor1);
    gradiente.addColorStop(1, cor2);
    return gradiente;
}

function desenharCirculo1(highlight) {
    const centro = centros[0];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#FFFFFF", "#D3D3D3");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "16px Roboto";

    const linha1 = "No migration";
    const linha2 = "No attack";

    
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

function desenharCirculo2(highlight) {
    const centro = centros[1];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#8B0000", "#FFC0CB");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const linha1 = "No migration";
    const linha2 = "Attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

function desenharCirculo3(highlight) {
    const centro = centros[2];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#00008B", "#ADD8E6");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const linha1 = "Migration";
    const linha2 = "No attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

function desenharCirculo4(highlight) {
    const centro = centros[3];
    const gradienteCirculo = criarGradiente(centro.x - raio / 2, centro.y - raio / 2, centro.x + raio / 2, centro.y + raio / 2, "#D3D3D3", "#808080");
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    ctx.ellipse(centro.x + 5, centro.y + 5, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = gradienteCirculo;
    ctx.beginPath();
    ctx.ellipse(centro.x, centro.y, raio / 2, raio / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Roboto";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const linha1 = "Migration";
    const linha2 = "Attack";

    // Desenha a primeira linha
    ctx.fillText(linha1, centro.x, centro.y - 8); // Ajuste a posição Y para cima

    // Desenha a segunda linha
    ctx.fillText(linha2, centro.x, centro.y + 8);

    if (highlight === true) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.ellipse(centro.x, centro.y, raio / 2 + 3, raio / 2 + 3, 0, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
}

let meuChart;
let labels = [];
let mediaData = [];
let mediaMaisDesvioData = [];
let mediaMenosDesvioData = [];
let delayValueData = [];
let violationData = [];
let stateData = [];

function atualizarGrafico(dados) {
    if (!dados || dados.length === 0) {
        console.warn("Dados para o gráfico são inválidos ou vazios.");
        return;
    }

    const pontoAleatorio = dados[Math.floor(Math.random() * dados.length)];

    if (intervaloGrafico && pontoAleatorio.maxV > delayValue) {
        violations++;
        updateViolationsDisplay();
    }

    labels.push(`${contadorGrafico}`);
    mediaData.push(pontoAleatorio.media);
    mediaMaisDesvioData.push(pontoAleatorio.maxV);
    mediaMenosDesvioData.push(pontoAleatorio.minV);
    delayValueData.push(delayValue);
    violationData.push(violations);
    stateData.push(state);

    if (meuChart) {
        meuChart.data.labels = labels;
        meuChart.data.datasets[0].data = mediaData;
        meuChart.data.datasets[1].data = mediaMaisDesvioData;
        meuChart.data.datasets[2].data = mediaMenosDesvioData;
        meuChart.update();
    } else {
        meuChart = new Chart(graficoCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mean',
                    data: mediaData,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, {
                    label: 'Maximum',
                    data: mediaMaisDesvioData,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }, {
                    label: 'Minimum',
                    data: mediaMenosDesvioData,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                }]
            },
            options: {
                scales: { y: { beginAtZero: true } },
                plugins: {
                    title: { display: true, text: `t = ${contadorGrafico}` }
                }
            }
        });
    }
}

function gerarTexto(history) {
    return history;
}

function baixarTexto(texto, nomeArquivo) {
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function gerarCSV(labels, mediaData, mediaMaisDesvioData, mediaMenosDesvioData, delayValueData, violationData) {
    let csv = "Labels,Mean,Max,Min,Delay,Violations\n";
    for (let i = 0; i < labels.length; i++) {
        csv += `${labels[i]},${mediaData[i]},${mediaMaisDesvioData[i]},${mediaMenosDesvioData[i]},${delayValueData[i]},${violationData[i]}\n`;
    }
    return csv;
}

function baixarCSV(csv, nomeArquivo) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function arrayCounter(arr){
    const contagem = {};
    arr.forEach(item => {
        contagem[item] = (contagem[item] || 0) + 1;
    });
    return contagem;
}

async function generatePdfReport(costs) {
    if (typeof window.jspdf === 'undefined') {
        console.error("jsPDF library not loaded.");
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'l',
        unit: 'pt',
        format: 'a4'
    });

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    const margin = 30;
    const cardPadding = 15;
    const mainTitleHeight = 24;
    const mainTitleTopOffset = 10;
    
    const availablePrintableHeight = pdfHeight - (margin * 2) - mainTitleHeight - mainTitleTopOffset;
    const topCardHeight = availablePrintableHeight / 2; 
    const bottomCardHeight = availablePrintableHeight / 2; 
    const bottomSectionY = margin + mainTitleTopOffset + mainTitleHeight + topCardHeight + (margin / 2);
    
    const spacingBetweenBottomCards = 15;
    const totalBottomCardsWidth = pdfWidth - (2 * margin);
    const historyCardWidth = totalBottomCardsWidth / 4;
    const remainingWidthForOtherTwo = totalBottomCardsWidth - historyCardWidth - (2 * spacingBetweenBottomCards);
    const otherTwoCardsWidth = remainingWidthForOtherTwo / 2;

    const chartCardX = margin;
    const chartCardY = margin + mainTitleTopOffset + mainTitleHeight; 
    const chartRenderableWidth = (pdfWidth - (2 * margin)) - (cardPadding * 2);
    const chartImageAvailableHeight = topCardHeight - (cardPadding * 2); 

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1600;
    tempCanvas.height = 900;
    tempCanvas.style.position = 'absolute';
    tempCanvas.style.left = '-9999px';
    document.body.appendChild(tempCanvas);

    const pdfChart = new Chart(tempCanvas.getContext('2d'), { 
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                { label: 'Mean', data: mediaData, borderColor: 'rgba(34, 139, 34, 1)', backgroundColor: 'rgba(34, 139, 34, 0.2)', fill: false, tension: 0.3, pointRadius: 8, borderWidth: 3, pointBackgroundColor: 'rgba(34, 139, 34, 1)'},
                { label: 'Maximum (MaxV)', data: mediaMaisDesvioData, borderColor: 'rgba(255, 99, 71, 1)', backgroundColor: 'rgba(255, 99, 71, 0.1)', fill: '-1', tension: 0.3, pointRadius: 8, borderWidth: 3, pointBackgroundColor: 'rgba(255, 99, 71, 1)'},
                { label: 'Minimum (MinV)', data: mediaMenosDesvioData, borderColor: 'rgba(65, 105, 225, 1)', backgroundColor: 'rgba(65, 105, 225, 0.1)', fill: '1', tension: 0.3, pointRadius: 8, borderWidth: 3, pointBackgroundColor: 'rgba(65, 105, 225, 1)'},
                { label: 'Acceptable Delay', data: delayValueData, borderColor: 'rgba(255, 165, 0, 1)', borderDash: [5, 5], fill: false, tension: 0, pointRadius: 5, borderWidth: 3 },
                { label: 'Accumulated Violations', data: violationData, borderColor: 'rgba(128, 0, 128, 1)', backgroundColor: 'rgba(128, 0, 128, 0.1)', fill: false, tension: 0.1, pointRadius: 8, borderWidth: 3, pointBackgroundColor: 'rgba(128, 0, 128, 1)', yAxisID: 'y-violations' }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Time (t)', font: { size: 46 }}, ticks: { font: { size: 44 }}},
                y: { type: 'linear', beginAtZero: true, title: { display: true, text: 'Values', font: { size: 46 }}, ticks: { font: { size: 44 }}, grid: { drawOnChartArea: false }},
                'y-violations': { type: 'linear', position: 'right', beginAtZero: true, title: { display: true, text: 'Violations', font: { size: 46 }}, ticks: { font: { size: 44 }}, grid: { drawOnChartArea: false }}
            },
            plugins: {
                title: { display: true, text: 'Performance Metrics', font: { size: 54 }},
                legend: { display: true, position: 'bottom', labels: { font: { size: 48 }}}
            }
        }
    });

    const sojournData = arrayCounter(stateData);
    const sojournLabels = Object.keys(sojournData);
    const sojournValues = Object.values(sojournData);
    let pieChartImage;

    if (sojournLabels.length > 0) {
        const pieCanvas = document.createElement('canvas');
        pieCanvas.width = 400; pieCanvas.height = 400;
        pieCanvas.style.position = 'absolute'; pieCanvas.style.left = '-9999px';
        document.body.appendChild(pieCanvas);

        const pieChart = new Chart(pieCanvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: sojournLabels.map(label => [label, `(${sojournData[label]} - ${((sojournData[label] / stateData.length) * 100).toFixed(1)}%)`]),
                datasets: [{ data: sojournValues, backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)'], borderColor: 'rgba(255, 255, 255, 1)', borderWidth: 2 }]
            },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'right', labels: { font: { size: 40 }, padding: 20 }}}}
        });
        
        await new Promise(resolve => setTimeout(resolve, 800));
        pieChartImage = await pieChart.toBase64Image('image/png', 1.0);
        pieChart.destroy();
        document.body.removeChild(pieCanvas);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    const chartImage = await pdfChart.toBase64Image('image/png', 1.0);
    
    doc.setFontSize(24);
    doc.text('VM migration as MQTT defense simulation results', pdfWidth / 2, margin + mainTitleTopOffset, { align: 'center' }); 

    doc.setFillColor(240, 240, 240);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.roundedRect(chartCardX, chartCardY, (pdfWidth - (2 * margin)), topCardHeight, 10, 10, 'FD'); 
    
    let imgDisplayWidth = chartRenderableWidth;
    let imgDisplayHeight = (tempCanvas.height * imgDisplayWidth) / tempCanvas.width;
    if (imgDisplayHeight > chartImageAvailableHeight) {
        imgDisplayHeight = chartImageAvailableHeight;
        imgDisplayWidth = (tempCanvas.width * imgDisplayHeight) / tempCanvas.height;
    }
    const chartImgX = chartCardX + cardPadding + (chartRenderableWidth - imgDisplayWidth) / 2;
    const chartImgY = chartCardY + cardPadding + (chartImageAvailableHeight - imgDisplayHeight) / 2;
    doc.addImage(chartImage, 'PNG', chartImgX, chartImgY, imgDisplayWidth, imgDisplayHeight); 

    // --- History Card ---
    const historyCardX = margin;
    const historyCardY = bottomSectionY;
    doc.setFillColor(240, 240, 240); 
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(historyCardX, historyCardY, historyCardWidth, bottomCardHeight, 10, 10, 'FD'); 
    doc.setFontSize(12);
    doc.text('Last 20 entries of the Simulation History', historyCardX + cardPadding, historyCardY + cardPadding, { maxWidth: historyCardWidth - (cardPadding * 2) }); 
    doc.setFontSize(9);
    const historyLines = history.split('\n').slice(-20);
    for (let i = 0; i < historyLines.length; i++) {
        doc.text(historyLines[i], historyCardX + cardPadding, historyCardY + 40 + (i * 10), { maxWidth: historyCardWidth - (cardPadding * 2) });
    }

    // --- State Sojourn Time Card ---
    const sojournCardX = margin + historyCardWidth + spacingBetweenBottomCards;
    const sojournCardY = bottomSectionY;
    doc.setFillColor(240, 240, 240); 
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(sojournCardX, sojournCardY, otherTwoCardsWidth, bottomCardHeight, 10, 10, 'FD'); 
    doc.setFontSize(16);
    doc.text('State Sojourn Time', sojournCardX + cardPadding, sojournCardY + cardPadding); 
    if (pieChartImage) {
        let pieImgDim = Math.min(otherTwoCardsWidth - (cardPadding * 2), bottomCardHeight - (cardPadding * 2) - 20);
        const pieImgX = sojournCardX + (otherTwoCardsWidth - pieImgDim) / 2;
        const pieImgY = sojournCardY + cardPadding + 20 + ((bottomCardHeight - (cardPadding * 2) - 20) - pieImgDim) / 2;
        doc.addImage(pieChartImage, 'PNG', pieImgX, pieImgY, pieImgDim, pieImgDim);
    } else {
        doc.setFontSize(10).text('No state data available.', sojournCardX + cardPadding, sojournCardY + 40);
    }

    // --- Economic Sustainability Card ---
    const economicCardX = margin + historyCardWidth + (2 * spacingBetweenBottomCards) + otherTwoCardsWidth;
    const economicCardY = bottomSectionY;
    doc.setFillColor(240, 240, 240); 
    doc.setDrawColor(200, 200, 200); 
    doc.roundedRect(economicCardX, economicCardY, otherTwoCardsWidth, bottomCardHeight, 10, 10, 'FD'); 
    doc.setFontSize(16);
    doc.text('Economic Sustainability', economicCardX + cardPadding, economicCardY + cardPadding, { maxWidth: otherTwoCardsWidth - (cardPadding * 2) });
    
    const costNMNA_total = (sojournData.NMNA || 0) * costs.nmna;
    const costYMNA_total = (sojournData.YMNA || 0) * costs.ymna;
    const costNMYA_total = (sojournData.NMYA || 0) * costs.nmya;
    const costYMYA_total = (sojournData.YMYA || 0) * costs.ymya;
    const subtotalOperacional = costNMNA_total + costYMNA_total + costNMYA_total + costYMYA_total;
    const costViolation_total = violations * costs.violation;
    const custoTotal = subtotalOperacional + costViolation_total;

    let yPos = economicCardY + cardPadding + 35;
    const lineHeight = 12;
    const textX = economicCardX + cardPadding;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Operational Cost:', textX, yPos);
    yPos += lineHeight;
    
    doc.setFont(undefined, 'normal');
    doc.text(`- Normal (NMNA): ${(sojournData.NMNA || 0)} x $${costs.nmna.toFixed(2)} = $${costNMNA_total.toFixed(2)}`, textX + 10, yPos);
    yPos += lineHeight;
    doc.text(`- Migration (YMNA): ${(sojournData.YMNA || 0)} x $${costs.ymna.toFixed(2)} = $${costYMNA_total.toFixed(2)}`, textX + 10, yPos);
    yPos += lineHeight;
    doc.text(`- Attack (NMYA): ${(sojournData.NMYA || 0)} x $${costs.nmya.toFixed(2)} = $${costNMYA_total.toFixed(2)}`, textX + 10, yPos);
    yPos += lineHeight;
    doc.text(`- Mig.+Attack (YMYA): ${(sojournData.YMYA || 0)} x $${costs.ymya.toFixed(2)} = $${costYMYA_total.toFixed(2)}`, textX + 10, yPos);
    
    yPos += lineHeight * 1.5;
    doc.setFont(undefined, 'bold');
    doc.text('SLA Violation Cost:', textX, yPos);
    yPos += lineHeight;
    doc.setFont(undefined, 'normal');
    doc.text(`- Violations: ${violations} x $${costs.violation.toFixed(2)} = $${costViolation_total.toFixed(2)}`, textX + 10, yPos);

    yPos += lineHeight * 2;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL ESTIMATED COST: $${custoTotal.toFixed(2)}`, textX, yPos);

    doc.save('simulation_report.pdf'); 
    pdfChart.destroy(); 
    document.body.removeChild(tempCanvas); 
}

if (valueDelayInput) {
    valueDelayInput.addEventListener("input", function() {
        delayValue = parseFloat(this.value) || 0;
    });
} else {
    console.error("Element with ID 'valueDelay' not found.");
}

document.getElementById("play").addEventListener("click", function() {
    if (!intervaloGrafico){
        if (!meuChart) { // Se for a primeira vez ou depois de um stop
            contadorGrafico = 0;
            labels = [];
            mediaData = [];
            mediaMaisDesvioData = [];
            mediaMenosDesvioData = [];
            delayValueData = [];
            violationData = [];
            stateData = [];
            violations = 0;
            updateViolationsDisplay(); 
            history = ""; 
            counter = -1;
            printState(state); 
        }
        intervaloGrafico = setInterval(function() {
            atualizarTituloGrafico();
            if (state === "NMNA") { atualizarGrafico(dadosNMNA); }
            else if (state === "NMYA") { atualizarGrafico(dadosNMYA); } 
            else if (state === "YMYA"){ atualizarGrafico(dadosYMYA); }
            else if (state === "YMNA"){ atualizarGrafico(dadosYMNA); }
            contadorGrafico++; 
        }, 1000); 
        valueDelayInput.disabled = true; 
        document.querySelectorAll('.cost-section input, #valueDelay').forEach(input => input.disabled = true);
    }else{
        intervaloGrafico = setInterval(function() {
            atualizarTituloGrafico();
            if (state === "NMNA") { atualizarGrafico(dadosNMNA); }
            else if (state === "NMYA") { atualizarGrafico(dadosNMYA); } 
            else if (state === "YMYA"){ atualizarGrafico(dadosYMYA); }
            else if (state === "YMNA"){ atualizarGrafico(dadosYMNA); }
            contadorGrafico++; 
        }, 1000); 
        valueDelayInput.disabled = true; 
        document.querySelectorAll('.cost-section input, #valueDelay').forEach(input => input.disabled = true);
    }
});

document.getElementById("pause").addEventListener("click", function() {
    clearInterval(intervaloGrafico); 
    //intervaloGrafico = null; 
    //valueDelayInput.disabled = false;
    valueDelayInput.disabled = false;
    //document.querySelectorAll('.cost-section input, #valueDelay').forEach(input => input.disabled = true);
});

document.getElementById("stop").addEventListener("click", async function() { 
    clearInterval(intervaloGrafico); 
    intervaloGrafico = null; 
    
    const costs = {
        nmna: parseFloat(document.getElementById('costNMNA').value) || 0,
        ymna: parseFloat(document.getElementById('costYMNA').value) || 0,
        nmya: parseFloat(document.getElementById('costNMYA').value) || 0,
        ymya: parseFloat(document.getElementById('costYMYA').value) || 0,
        violation: parseFloat(document.getElementById('costViolation').value) || 0
    };

    baixarCSV(gerarCSV(labels, mediaData, mediaMaisDesvioData, mediaMenosDesvioData, delayValueData, violationData), "simulation_output.csv");
    baixarTexto(gerarTexto(history), "history.txt");
    
    await generatePdfReport(costs); 

    contadorGrafico = 0; 
    if (meuChart) {
        meuChart.destroy();
        meuChart = null;
    }
    
    if (valueDelayInput) valueDelayInput.disabled = false; 
    document.querySelectorAll('.cost-section input, #valueDelay').forEach(input => input.disabled = false);
    violations = 0; 
    updateViolationsDisplay(); 
    
    labels = []; mediaData = []; mediaMaisDesvioData = []; mediaMenosDesvioData = [];
    delayValueData = []; violationData = []; stateData = [];
    
    history = "";
    counter = -1; 
    dataCtx.clearRect(0, 0, dataCanvas.width, dataCanvas.height);
    printState(state); 
});

const botoes = { startMigration: true, stopMigration: false, startAttack: true, stopAttack: false };

function atualizarTituloGrafico() {
    if (meuChart && typeof meuChart.update === 'function') {
        meuChart.options.plugins.title.text = `t = ${contadorGrafico}`;
        meuChart.update('none');
    }
}

function updateViolationsDisplay() {
    document.getElementById("violationsDisplay").textContent = violations;
}

function atualizarBotoes() {
    document.getElementById("startMigration").disabled = !botoes.startMigration;
    document.getElementById("stopMigration").disabled = !botoes.stopMigration;
    document.getElementById("startAttack").disabled = !botoes.startAttack;
    document.getElementById("stopAttack").disabled = !botoes.stopAttack;
}

document.getElementById("startMigration").addEventListener("click", function() {
    botoes.startMigration = false; botoes.stopMigration = true;
    atualizarBotoes();
    redesenharCirculos(true, false);
});

document.getElementById("stopMigration").addEventListener("click", function() {
    botoes.startMigration = true; botoes.stopMigration = false;
    atualizarBotoes();
    redesenharCirculos(true, false);
});

document.getElementById("startAttack").addEventListener("click", function() {
    botoes.startAttack = false; botoes.stopAttack = true;
    atualizarBotoes();
    redesenharCirculos(false, true);
});

document.getElementById("stopAttack").addEventListener("click", function() {
    botoes.startAttack = true; botoes.stopAttack = false;
    atualizarBotoes();
    redesenharCirculos(false, true);
});

function redesenharCirculos(mig, attk) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (mig) {
        if (state === "NMNA") state = "YMNA";
        else if (state === "NMYA") state = "YMYA";
        else if (state === "YMYA") state = "NMYA";
        else if (state === "YMNA") state = "NMNA";
    }

    if (attk) {
        if (state === "NMNA") state = "NMYA";
        else if (state === "NMYA") state = "NMNA";
        else if (state === "YMYA") state = "YMNA";
        else if (state === "YMNA") state = "YMYA";
    }
    
    printState(state);
    desenharCirculo1(state === "NMNA");
    desenharCirculo2(state === "NMYA");
    desenharCirculo3(state === "YMNA");
    desenharCirculo4(state === "YMYA");
}

function printState(state) {
    dataCtx.clearRect(0, 0, dataCanvas.width, dataCanvas.height);
    dataCtx.font = "20px Roboto";
    dataCtx.fillStyle = "black";
    dataCtx.textAlign = "center";
    dataCtx.textBaseline = "top";
    if (counter < 0) {
        history = "0; " + state + "; t = " + contadorGrafico;
        counter = 0;
    } else {
        counter++;
        history = history + '\n' + counter + "; " + state + "; t = " + contadorGrafico;
    }
    const linhas = history.split('\n');
    const alturaLinha = 20;
    const linhasVisiveis = Math.floor(dataCanvas.height / alturaLinha);
    const linhasParaDesenhar = linhas.slice(-linhasVisiveis);
    for (let i = 0; i < linhasParaDesenhar.length; i++) {
        dataCtx.fillText(linhasParaDesenhar[i], dataCanvas.width / 2, i * alturaLinha);
    }
}

async function loadData() {
    try {
        dadosNMNA = await carregarDadosArquivo('NMNA-final.csv');
        dadosYMNA = await carregarDadosArquivo('YMNA-final.csv');
        dadosNMYA = await carregarDadosArquivo('NMYA-final.csv');
        dadosYMYA = await carregarDadosArquivo('YMYA-final.csv');
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
    }
}

async function carregarDadosArquivo(nomeArquivo) {
    try {
        const resposta = await fetch(nomeArquivo);
        if (!resposta.ok) throw new Error(`Não foi possível carregar ${nomeArquivo}`);
        const texto = await resposta.text();
        const linhas = texto.trim().split('\n').slice(1);
        return linhas.map(linha => {
            const [data, avgrun, minV, maxV, media, desvioPadrao, avgBW, timeSt] = linha.split(',').map(Number);
            return { data, avgrun, minV, maxV, media, desvioPadrao, avgBW, timeSt };
        });
    } catch (error) {
        const errorDiv = document.getElementById('error-messages');
        if (errorDiv) {
            errorDiv.innerHTML += `<p style="color: red;">${error.message}. Verifique se o arquivo está na pasta correta e se o servidor local está rodando.</p>`;
        }
        throw error;
    }
}

loadData().then(() => {
    atualizarBotoes();
    printState(state);
    desenharCirculo1(true);
    desenharCirculo2(false);
    desenharCirculo3(false);
    desenharCirculo4(false);
    updateViolationsDisplay(); 
});
