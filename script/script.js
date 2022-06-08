//Separando as páginas da view
let nPages = parseInt(dados.length / 10) + 1;
let pages = [];
for(let i = 0; i<nPages; i++){
   let page = dados.slice(i*10, (i+1)*10);
   pages.push(page);     
}

 
$( document ).ready(function() {
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
    
    if(pages.length > 1){
        let indice = 1;
        setInterval(()=>{
            indice++;
            if(indice === pages.length){
                indice = 0;
            }  
            $('#list').hide(500);
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
                $('#list').show(500); 
            }, 500);
        }, 10000);
    }
    
});
