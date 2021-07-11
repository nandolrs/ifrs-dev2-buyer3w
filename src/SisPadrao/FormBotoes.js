import React from 'react';

class FormBotoes extends React.Component
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

                {this.props.botoes == null && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".salvar").concat(this.props.id == 0 ? ".incluir" : ".alterar"), this.props.listaAutorizacao)
                    ||  (this.props.botoes != null && _botoes.indexOf("salvar.incluir") >= 0 && window.AutorizacaoConsultar(this.props.objetoAutorizacao+".salvar"+this.props.id == 0 ? ".incluir" : ".alterar", this.props.listaAutorizacao)) ?
                    <button id={this.GerarID('inputSalvar')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnSalvar() }>Salvar </button>
                : ""
                }

                {this.props.id != 0 
                    && this.props.botoes == null 
                    && window.AutorizacaoConsultar(this.props.objetoAutorizacao.concat(".excluir"), this.props.listaAutorizacao) ?
                    <button id={this.GerarID('inputSalvar')}  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnExcluir() }>Excluir </button>
                : ""
                }

                <button id='inputVoltar'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnVoltar() }>Voltar </button>
            </div>
        );
    }
}
export default FormBotoes;