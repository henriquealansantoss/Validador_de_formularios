const c = (e)=> document.querySelector(e);
const cl = (e)=> document.querySelectorAll(e);

let validator = {
    handleSubmit:(event)=>{
        //interrompe o envio do submit
        event.preventDefault();
        
        let send = true;

        let inputs = form.querySelectorAll('input');

        //antes de acrescentar o erro na tela, tenho que limpar os que ja existem 
        validator.cleanErrors();

        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];
            // validando campo
            let check = validator.checkInput(input);
            if(check !== true){
                send = false;
                //exibir o erro
                validator.showError(input, check);
            }
        }
        if(send){
            form.submit();
        }
    },
    
    checkInput:(input)=>{
        //verifica se tem alguma regra
        let roles = input.getAttribute('data-roles');
        if(roles !== null){
            //verificando regras
            roles = roles.split('|');
            for(let d in roles){
                let rolesDetails = roles[d].split('=');
                switch(rolesDetails[0]){
                    case'required':
                            if(input.value === ''){
                                return 'Campo Obrigatório!';
                            }
                    break;
                    case 'mim':
                            // se a quantidade de caracteres em input for menor que a quantidade que eu quero (rolesDetails[0])
                            if(input.value.length < rolesDetails[1]){
                                return `Campo deve ter no mínimo ${rolesDetails[1]} caracteres!`;
                            }
                    break;
                    case 'email':
                        if(input.value != ''){
                            //expressao regular para validar email
                            let regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'e-mail informado não é válido';
                            }
                        }
                        break;
                }
            }
        }
        return true;
    },
    showError:(input, mensage_error)=>{
        input.style.borderColor = '#f00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML= mensage_error;

        // acrescentando a mensagem de erro apos o input
        // no javascript não existe uma função para acrescentar algo apos o elemento,(existe o insertBefore que acrescenta antes do elemento).
        // então é usado o parentElement para pegar o proximo elemento e acrescentar o algo dando a impressão
        // de ter acrescentado aposo elemento anterior
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    cleanErrors:()=>{
        //removendo as bordas vermelhas
        let inputs = form.querySelectorAll('input');
        for(let d =0; d<inputs.length; d++){
            inputs[d].style='';
        }

        // removendo a messagem de erro
        let errorElements = cl('.error');
        for(let i= 0 ; i < errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};

let form = c('.validator');
form.addEventListener('submit', validator.handleSubmit);


