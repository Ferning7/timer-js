const displayTempo = document.getElementById('display-tempo');
const botaoTestarConfetes = document.getElementById('testar-confetes');
const avisoEventoDiv = document.getElementById('aviso-evento');

let intervaloTimer;
let eventoAtual = null;
let confetesDisparados = false;

const eventos = [
    { hora: 15, minuto: 35, segundos: 5, mensagem: "Intervalo", confete: false },
    { hora: 16, minuto: 50, segundos: 5, mensagem: "Férias", confete: true }
];

function obterHoraAtualFormatada() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

function dispararConfetes() {
    if (typeof confetti !== 'function') return;

    confetti({
        particleCount: 200,
        spread: 160,
        origin: { x: 0.5, y: 0.5 }
    });
}

function verificarEventoAtual() {
    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    const segundo = agora.getSeconds();

    for (let evento of eventos) {
        const horaCorreta = hora === evento.hora;
        const minutoCorreto = minuto === evento.minuto;
        const segundoCorreto = segundo === 0;

        if (horaCorreta && minutoCorreto && segundoCorreto && eventoAtual !== evento.mensagem) {
            eventoAtual = evento.mensagem;
            avisoEventoDiv.textContent = evento.mensagem;
            avisoEventoDiv.classList.add('show');

            if (evento.confete) {
                // Disparar confetes por 5 segundos
                let tempo = 0;
                const intervaloConfete = setInterval(() => {
                    dispararConfetes();
                    tempo += 1;
                    if (tempo >= 5) clearInterval(intervaloConfete);
                }, 1000);
            }

            // Ocultar mensagem após 5 segundos
            setTimeout(() => {
                avisoEventoDiv.textContent = '';
                avisoEventoDiv.classList.remove('show');
                eventoAtual = null;
            }, 5000);

            break; // Garante que só um evento por vez seja disparado
        }
    }
}

function atualizarRelogio() {
    displayTempo.textContent = obterHoraAtualFormatada();
    verificarEventoAtual();
}

function iniciarRelogio() {
    clearInterval(intervaloTimer);
    atualizarRelogio();
    intervaloTimer = setInterval(atualizarRelogio, 1000);
}

botaoTestarConfetes.addEventListener('click', dispararConfetes);
document.addEventListener('DOMContentLoaded', iniciarRelogio);
