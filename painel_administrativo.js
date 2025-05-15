
let banca = 100.00, wins = 0, losses = 0, entradas = 0;
let tempoInicial = Date.now(), ultimaEntrada = 0, tilt = 0;

const versiculos = [
  "“Não temas, porque eu sou contigo.” - Isaías 41:10",
  "“Tudo posso naquele que me fortalece.” - Filipenses 4:13",
  "“O Senhor é meu pastor e nada me faltará.” - Salmos 23:1"
];
const mensagens = [
  "Confiança é sua maior entrada. TX1 está com você.",
  "Pare quando estiver ganhando. Continue quando estiver pronto.",
  "A consistência supera a velocidade. Seja TX1."
];

function atualizarRelogio() {
  const d = new Date(), h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0'), s = String(d.getSeconds()).padStart(2, '0');
  document.getElementById("relogio").textContent = `${h}:${m}:${s}`;
}
setInterval(atualizarRelogio, 1000);
window.onload = () => {
  atualizarRelogio();
  document.getElementById("guardiao-msg").textContent = "Mensagem do Guardião: " + mensagens[Math.floor(Math.random()*mensagens.length)];
  atualizarRefugio();
};

function registrarEntrada(tipo) {
  if (Date.now() - ultimaEntrada < 8000) return alert("Aguarde 8 segundos.");
  if (entradas >= 10) return alert("Limite de entradas atingido.");
  ultimaEntrada = Date.now(); entradas++;

  const hora = new Date().toLocaleTimeString();
  const result = Math.random() > 0.5 ? 'WIN' : 'LOSS';
  const lucro = result === 'WIN' ? 8.30 : -10.00;
  banca += lucro;
  result === 'WIN' ? wins++ : losses++;
  result === 'LOSS' ? tilt++ : tilt = 0;

  if (tilt >= 3) {
    alert("Tilt detectado. Operações travadas.");
    document.querySelectorAll(".op").forEach(b => b.disabled = true);
    setTimeout(() => document.querySelectorAll(".op").forEach(b => b.disabled = false), 30000);
  }

  document.getElementById("banca").textContent = banca.toFixed(2);
  document.getElementById("score").textContent = `${Math.floor(Math.random()*20)+80}%`;
  document.getElementById("resultado").innerHTML = `Entrada: <strong>${tipo}</strong> | Resultado: <strong>${result}</strong> | Lucro: R$ ${lucro.toFixed(2)}`;
  document.getElementById("historico").innerHTML += `> ${hora} - ${tipo} - ${result} - R$ ${lucro.toFixed(2)}<br>`;
  atualizarStats();
  atualizarRefugio();
  if (banca >= 140) alert("Meta batida!");
  if (banca <= 70) alert("Stop de perda atingido.");
}

function atualizarStats() {
  const pct = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;
  const lucroTotal = (banca - 100).toFixed(2);
  const tempo = Math.floor((Date.now() - tempoInicial) / 60000);
  document.getElementById("estatisticas").innerHTML =
    `Entradas: ${entradas} | WIN: ${wins} | LOSS: ${losses} | Acerto: ${pct}% | Lucro: R$ ${lucroTotal} | Tempo: ${tempo} min`;
}

function atualizarRefugio() {
  const txt = versiculos[Math.floor(Math.random() * versiculos.length)];
  document.getElementById("refugio").innerHTML = `<strong>Refúgio TX1:</strong><br>${txt}`;
}

function alternarFoco() {
  document.querySelectorAll(".area").forEach(el => el.classList.toggle("hidden"));
}
