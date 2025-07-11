const displayTempo = document.getElementById('display-tempo');
const botaoTestarConfetes = document.getElementById('testar-confetes');
const avisoEventoDiv = document.getElementById('aviso-evento');
const cronometroContainer = document.querySelector('.cronometro-container');

let intervaloTimer;
let eventoEmAndamento = false;

const eventos = [
    { hora: 15, minuto: 35, segundos: 5, mensagem: "Intervalo", confete: false },
    { hora: 16, minuto: 50, segundos: 5, mensagem: "Férias", confete: true },
    { hora: 16, minuto: 32, segundos: 5, mensagem: "Férias", confete: true }
];

function obterHoraAtualFormatada() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

function dispararConfetesPor5Segundos() {
    let tempo = 0;
    const intervalo = setInterval(() => {
        confetti({
            particleCount: 200,
            spread: 180,
            origin: { x: Math.random(), y: Math.random() * 0.5 }
        });
        tempo++;
        if (tempo >= 5) clearInterval(intervalo);
    }, 1000);
}

function mostrarMensagemFinal(mensagem) {
    // Esconde o relógio
    displayTempo.style.display = 'none';
    
    // Substitui o conteúdo do aviso por uma mensagem animada
    avisoEventoDiv.innerHTML = `<span class="mensagem-final">${mensagem}</span>`;
    avisoEventoDiv.classList.add('show');

    // Estilo para a mensagem
    avisoEventoDiv.style.opacity = '1';

    // Começa os confetes
    dispararConfetesPor5Segundos();
}

function verificarEventoAtual() {
    if (eventoEmAndamento) return;

    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();
    const segundo = agora.getSeconds();

    for (let evento of eventos) {
        if (hora === evento.hora && minuto === evento.minuto && segundo === 0) {
            eventoEmAndamento = true;

            if (evento.confete) {
                mostrarMensagemFinal(evento.mensagem);
            } else {
                // Evento simples (como intervalo)
                avisoEventoDiv.textContent = evento.mensagem;
                avisoEventoDiv.classList.add('show');

                setTimeout(() => {
                    avisoEventoDiv.textContent = '';
                    avisoEventoDiv.classList.remove('show');
                    eventoEmAndamento = false;
                }, 5000);
            }

            break;
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

botaoTestarConfetes.addEventListener('click', dispararConfetesPor5Segundos);
document.addEventListener('DOMContentLoaded', iniciarRelogio);
