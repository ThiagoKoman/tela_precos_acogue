//Separando as páginas da view
let nPages = parseInt(dados.length / 10) + 1;
let pages = [];
let valor = null;
for(let i = 0; i<nPages; i++){
   let page = dados.slice(i*10, (i+1)*10);
   pages.push(page);     
}
 
$( document ).ready(function() {

    //Pega a query string
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    let type = vars['type'];
    $.ajax({
        url: "https://mambohigienopolis.beeid.com.br/Produto/5", 
        success: function(result){
            console.log(result);
            valor = result;
    }});
    switch(type){
        case 'acougue':
            $('body').css('background-image', 'url("./img/acogue.jpeg")');
            
            break;
        case 'peixaria':
            $('body').css('background-image', 'url("./img/peixaria.jpeg")');
            break;
        case 'frios':
            $('body').css('background-image', 'url("./img/frios.jpeg")');
            break;
        default:
            $('body').css('background-image', 'url("./img/default.jpg")');
            $('#buttons').css('display', 'block');
            break;
    }

    //Gera a primeira página de conteudo, ao abrir a página html
    if(type){
        for(let i = 0; i <pages[0].length; i++){
            let produto = `
                    <li>
                        <p>${pages[0][i].descricao}</p>
                        <div class="price">
                            <p>R$${parseFloat(pages[0][i].preco).toFixed(2)}</p>
                        </div>
                    </li>`;
            $('#list').append(produto);
        } 
    }
    
    // Se houver mais de uma página, inicia o contador de animação
    if(pages.length > 1 && type){
        let indice = 1;
        setInterval(()=>{
            indice++;
            if(indice === pages.length){
                indice = 0;
            }  
            $('#list').hide();
            setTimeout(()=>{
                document.getElementById("list").innerText = "";
                for(let i = 0; i <pages[indice].length; i++){
                    let produto = `
                            <li>
                                <p>${pages[indice][i].descricao}</p>
                                <div class="price">
                                    <p>R$${parseFloat(pages[indice][i].preco).toFixed(2)}</p>
                                </div>
                            </li>`;
                    $('#list').append(produto);
                }
                $('#list').show(); 
            }, 0);
        }, 10000);
    }
});

function redirect(link){
    window.location.href = window.location.href.split('?',1)[0] + '?type=' + link;
}