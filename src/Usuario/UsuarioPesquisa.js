import React from 'react';
import axios from 'axios';
import UsuarioView from './UsuarioView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class UsuarioPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            id:0
            ,nome:''
            ,email:''
            ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            ,lista:null
        };
    }

    Pesquisar()
    {
        this.setState({visao:'processando'});

        let _p = 'nome=';
        if(this.state.nome != '')
        {
            _p = _p+ this.state.nome;
        }
        else
        {
            _p = _p+ '';

        }

        var entidade={codigo:0
            ,nome:this.state.nome
            ,p:_p

        
        };

        this.SisManterPesquisar(entidade);
    }
    

    Evento(resposta, acao)
    {        
        if(acao=='pesquisou' 
            || acao=='consultou'
            || acao=='salvou'
            || acao=='excluiu'
            )
        {
        }

        if(resposta.visao=='listar')
        {
            this.props.OnListar(resposta);
        }
        else
        {
            this.setState(resposta);
        }
    }

    SisManterPesquisar(entidade)
    {
        debugger;

        let p = entidade.p != '' ? '?'+entidade.p : '';

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/usuario/pesquisar" + p
            ,window.getCabeca()
        )   
        .then((resposta)=>this.Pesquisou(resposta))
        .catch((resposta) => this.Pesquisou(resposta));
    }



    Pesquisou(resposta)
    {
        debugger;
        
        var retorno = null;

        if(resposta.status == 200)
        {   
            var erro = resposta.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {

                retorno = {visao:"listar"
                    ,entidade:resposta.data.dadosLista
                    ,mensagens:window.ToMensagens("Pesquisa retornou com sucesso.")
                };
            }
            
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao pesquisar registro, repita a operação.")
            };
        }
        this.Evento(retorno, 'pesquisou');
    }

    render()
    {
        return(
<div class="card">
  <div class="card-header">
      P E S Q U I S A R
  </div>
  <div class="card-body">

        <div>
            <fieldset>

                <div class="form-group">

                    <input type="text" class="form-control" id="inputUf"  
                            aria-describedby="nomeHelp" 
                            placeHolder="Nome." 
                            onChange={(o)=>this.setState({nome:o.target.value})}
                            value={this.state.nome}
                    />

                    <input type="text" class="form-control" id="inputUf"  
                            aria-describedby="emailHelp" 
                            placeHolder="Email." 
                            onChange={(o)=>this.setState({email:o.target.value})}
                            value={this.state.email}
                    />

                    <SisMensagemView
                        visao={this.state.visao}
                        mensagens={this.state.mensagens}
                        OnClicou={(v) => this.setState({visao:v})}
                    />

                    {this.state.visao=='processando' ?
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                            </div>
                        </div>
                    : ""
                    }

                </div>

                <PesquisaBotoes 
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao={this.props.objetoAutorizacao}
                    OnIncluir={() => this.props.OnIncluir()}
                    OnPesquisar={() => this.Pesquisar()}
                />

                <br/>
                <button id='inputLogin'  type="button" class="btn btn-secondary btn-lg btn-block" onClick={() => this.props.OnLogin() }>Entrar  </button>

            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    
    }

}


export default UsuarioPesquisa;

