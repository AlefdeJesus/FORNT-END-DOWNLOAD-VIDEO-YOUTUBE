
document.getElementById('download-form').addEventListener('submit', async function(event) {
    const botaoBaixar = document.querySelector('.btn');
    const infoBaixando = document.querySelector('#infoBaixando');
    const container = document.querySelector('#container');
    
    botaoBaixar.style.display = 'none'
    infoBaixando.style.display = 'block'
    event.preventDefault();

    const url = document.getElementById('video-url').value;
    const messageDiv = document.getElementById('message');
    const downloadLinkDiv = document.getElementById('download-link');
    const videoLink = document.getElementById('video-link');
    const videoPlayer = document.querySelector('#video-player');

    messageDiv.textContent = '';
    downloadLinkDiv.style.display = 'none';

    try {
        const response = await fetch('https://b19a-45-225-120-218.ngrok-free.app//download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        console.log('Data recebido:', data);  // Adicione este log para depuração

        if (response.ok) {
           // messageDiv.textContent = data.message;
            if (data.filePath) {
                const videoUrl = `https://b19a-45-225-120-218.ngrok-free.app/${data.filePath}`
           
                videoLink.href = videoUrl;
                videoLink.textContent = 'Baixar video';
               console.log(videoUrl)
                videoPlayer.src = videoUrl
            
                downloadLinkDiv.style.display = 'block';
                infoBaixando.style.display = 'none'
                  botaoBaixar.style.display = 'block'
                  container.style.marginTop = '10%'
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
