import LINK_API from "./linkAPI.js";


document.getElementById('download-form').addEventListener('submit', async function(event) {
    const botaoBaixar = document.querySelector('.btn');
    const infoBaixando = document.querySelector('#infoBaixando');
    const container = document.querySelector('#container');
    const passos = document.querySelector('#container-passos');
    
    passos.style.display = 'none';
    botaoBaixar.style.display = 'none'
    infoBaixando.style.display = 'block'
    event.preventDefault();

    let url = document.getElementById('video-url').value;
    const messageDiv = document.getElementById('message');
    const downloadLinkDiv = document.getElementById('download-link');
    const videoLink = document.getElementById('video-link');
    const videoPlayer = document.querySelector('#video-player');

    messageDiv.textContent = '';
    downloadLinkDiv.style.display = 'none';
    console.log('front end link'+LINK_API)

    try {
        const response = await fetch(`${LINK_API}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ url })
          
        });
        
        const data = await response.json();
        console.log('Data recebido:', data);  // Adicione este log para depuração

        if (response.ok) {
            let limpaURL = document.getElementById('video-url').value = '';
           // messageDiv.textContent = data.message;
            if (data.filePath) {
                const videoUrl = `${LINK_API}/${data.filePath}`
           
                videoLink.href = videoUrl;
                videoLink.textContent = 'Baixar video';
               console.log(videoUrl)
                videoPlayer.src = videoUrl
            
                downloadLinkDiv.style.display = 'block';
                infoBaixando.style.display = 'none';
                  botaoBaixar.style.display = 'block';
                 
                  container.style.marginTop = '8rem';
                
            } else {
                messageDiv.textContent = 'Erro: Caminho do arquivo não encontrado.';
            }
        } else {
            messageDiv.textContent = data.error;
        }
    } catch (error) {
        messageDiv.textContent = 'Erro ao enviar a requisição: ' + error.message;
    }
});

////função para colocar texto se demorar o video
document.querySelector('.btn').addEventListener('click', function() {
    setTimeout(() => {
        const infoBaixando = document.querySelector('#infoBaixando');
        infoBaixando.style.color = 'rgb(26, 153, 238)';
        infoBaixando.textContent = 'Aguarde um momento, seu video é um pouco grande......';
    }, 18000);
});

////função para colocar texto se demorar o video
document.querySelector('.btn').addEventListener('click', function() {
    setTimeout(() => {
        const infoBaixando = document.querySelector('#infoBaixando');
        infoBaixando.style.color = 'rgb(26, 153, 238)';
        infoBaixando.textContent = 'Mais um momento, seu video está sendo baixado......';
    }, 40000);
});