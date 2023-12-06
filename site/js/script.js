const container = document.getElementById('container');
const cadastroBtn = document.getElementById('cadastrar');
const loginBtn = document.getElementById('login');
const emailInput = document.querySelector('.logar input[type="email"]');
const passwordInput = document.querySelector('.logar input[type="password"]');
const loginForm = document.querySelector('.logar form');
const mostrarSenha = document.querySelector('#olhinho')
const esconderSenha = document.querySelector('#senhaInserida')

mostrarSenha.addEventListener('click', function(){ //evento/ouvinte relacionado ao ícone, para que possa fechar os olhos e revelar a senha quando for clicado
    this.classList.toggle("fa-eye"); //referenciar o objeto (neste caso o ícone do olho aberto) e acessá-lo pela lista de classes
    this.classList.toggle("fa-eye-slash", !this.classList.contains("fa-eye")); //realiza a "negação" (!) do ícone com olhos abertos e acessa pela lista de classes o ícone de ohos fechados
    const type = esconderSenha.getAttribute("type") === "password" ? "text" : "password"; //checar se é igual a "senha", se sim, converte em "texto". E se é diferente de "senha" (identificado que é um texto), se tornará "senha" novamente
    esconderSenha.setAttribute("type", type);
})


cadastroBtn.addEventListener('click', () => { //adiciona um evento no elemento da constante (referente ao botão de cadastro)
    container.classList.add("active");  //ao ser clicado, a classe fica ativa na tela
});

loginBtn.addEventListener('click', () => { //adiciona evento no elemento da constante (referente ao botão de login)
    container.classList.remove("active"); //ao ser clicado, a classe é removida da tela
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário padrão
    
    // Verificação de login falso
    const testeEmail = 'user@example.com';
    const testeSenha = 'senha123';

    const inseriuEmail = emailInput.value;
    const inseriuSenha = passwordInput.value;

    if (inseriuEmail === testeEmail && inseriuSenha === testeSenha) {
        // Login bem-sucedido, redireciona para a página desejada
        window.location.href = 'dashboard.html';
    } else {
        // Exiba uma mensagem de erro ou realize outra ação em caso de login falho
        alert('Login falhou. Verifique seu e-mail e senha.');
    }

});
