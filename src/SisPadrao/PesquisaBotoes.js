import React from 'react';

class PesquisaBotoes extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    GerarID(nome)
    {
        let retorno = nome + (this.props.objetoAutorizacao != null ? this.props.objetoAutorizacao : '');  
    
        return retorno;
    
    }

    render()
    {
        var _botoes = this.props.botoes;

        return(
            <div>
                    <button id={this.GerarID('inputPesquisar')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnPesquisar() }>Pesquisar </button>
                    <button id={this.GerarID('inputIncluir')}   type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnIncluir() }>Incluir </button>
            </div>
        );
    }
}
export default PesquisaBotoes;