document.getElementById('download-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('video-url').value;
    const messageDiv = document.getElementById('message');
    const downloadLinkDiv = document.getElementById('download-link');
    const videoLink = document.getElementById('video-link');

    messageDiv.textContent = '';
    downloadLinkDiv.style.display = 'none';

    try {
        const response = await fetch('http://localhost:3000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        console.log('Data recebido:', data);  // Adicione este log para depuração

        if (response.ok) {
            messageDiv.textContent = data.message;
            if (data.filePath) {
                videoLink.href = `http://localhost:3000/${data.filePath}`;
                videoLink.textContent = `${data.filePath.split('/').pop()}`;
                downloadLinkDiv.style.display = 'block';
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
