
let banca = 100.00;
let wins = 0;
let losses = 0;
let entradas = 0;
let tiltCount = 0;
let tempoInicial = Date.now();
let ultimaEntrada = 0;
let limiteEntradas = 10;

const mensagens = [
  "Confiança é sua maior entrada. TX1 está com você.",
  "A melhor entrada é aquela que você não força.",
  "Consistência vale mais que pressa.",
  "Pare quando estiver ganhando. Continue quando estiver preparado.",
];

const versiculos = [
  "“Não temas, porque eu sou contigo.” - Isaías 41:10",
  "“Tudo posso naquele que me fortalece.” - Filipenses 4:13",
  "“O Senhor é meu pastor e nada me faltará.” - Salmos 23:1",
];

function atualizarRelogio() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  document.getElementById('relogio').textContent = horas + ':' + minutos + ':' + segundos;
}
setInterval(atualizarRelogio, 1000);
window.onload = () => {
  atualizarRelogio();
  atualizarGuardiao();
};

function atualizarGuardiao() {
  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  document.getElementById("guardiao-msg").textContent = "Mensagem do Guardião: " + msg;
}

function registrarEntrada(tipo) {
  const agora = Date.now();
  if (agora - ultimaEntrada < 10000) {
    alert("Aguarde 10 segundos entre entradas.");
    return;
  }
  if (entradas >= limiteEntradas) {
    alert("Limite de entradas atingido.");
    return;
  }
  ultimaEntrada = agora;
  entradas++;
  const hora = new Date().toLocaleTimeString();
  const resultado = Math.random() > 0.5 ? 'WIN' : 'LOSS';
  const lucro = resultado === 'WIN' ? 8.30 : -10.00;
  banca += lucro;
  if (resultado === 'WIN') {
    wins++;
    tiltCount = 0;
  } else {
    losses++;
    tiltCount++;
  }
  const score = Math.floor(Math.random() * 21) + 80;
  document.getElementById('banca').textContent = banca.toFixed(2);
  document.getElementById('score').textContent = score + '%';
  document.getElementById('resultado').innerHTML = `Entrada: <strong>${tipo}</strong> | Resultado: <strong>${resultado}</strong> | Lucro: R$ ${lucro.toFixed(2)}`;
  document.getElementById('historico').innerHTML += `> ${hora} - ${tipo} - ${resultado} - R$ ${lucro.toFixed(2)}<br>`;
  atualizarEstatisticas();
  if (tiltCount >= 3) {
    alert("Zona de tilt detectada. Botões travados por 30 segundos.");
    disableBotões(true);
    setTimeout(() => disableBotões(false), 30000);
  }
  if (banca >= 140) {
    alert("Meta batida! Operações encerradas.");
    disableBotões(true);
  } else if (banca <= 70) {
    alert("Stop de perda atingido.");
    disableBotões(true);
  }
  atualizarRefugio();
}

function atualizarEstatisticas() {
  const acertos = wins;
  const erros = losses;
  const total = acertos + erros;
  const pct = total > 0 ? Math.round((acertos / total) * 100) : 0;
  const lucroTotal = (banca - 100).toFixed(2);
  const tempo = Math.floor((Date.now() - tempoInicial) / 60000);
  document.getElementById('estatisticas').innerHTML = `
    <strong>Entradas:</strong> ${total} |
    <strong>WIN:</strong> ${wins} |
    <strong>LOSS:</strong> ${losses} |
    <strong>Taxa de acerto:</strong> ${pct}% |
    <strong>Lucro:</strong> R$ ${lucroTotal} |
    <strong>Tempo de sessão:</strong> ${tempo} min
  `;
}

function atualizarRefugio() {
  const frase = versiculos[Math.floor(Math.random() * versiculos.length)];
  document.getElementById("refugio").innerHTML = `<strong>Refúgio TX1:</strong><br>${frase}`;
}

function disableBotões(status) {
  document.querySelectorAll("button").forEach(btn => {
    if (!btn.textContent.includes("Foco")) {
      btn.disabled = status;
    }
  });
}

function alternarModoFoco() {
  document.querySelector(".graficos").classList.toggle("hidden");
  document.getElementById("refugio").classList.toggle("hidden");
  document.getElementById("estatisticas").classList.toggle("hidden");
}
