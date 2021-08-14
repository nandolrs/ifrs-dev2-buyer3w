import React from 'react';
import axios from 'axios';
import EmbalagemView from './EmbalagemView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class EmbalagemPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            codigo:0
            ,nome:''
            ,capacidade:''
            ,unidadeMedidaId:0
            ,visao:process.env.REACT_APP_VISAO_INFORMANDO
        }
        this.Listar();
    }
    Pesquisar()
    {
        this.setState({visao:'processando'});

        let _p = 'nome=<nome>&capacidade=<capacidade>&unidadeMedidaId=<unidadeMedidaId>';
        if(this.state.nome != '')
        {
           _p = _p.replace('<nome>', this.state.nome );
            _p = _p.replace('<capacidade>', '0' );
            _p = _p.replace('<unidadeMedidaId>', '0' );
        } else if(this.state.capacidade > 0)
        {
           _p = _p.replace('<nome>', '' );
            _p = _p.replace('<capacidade>', this.state.capacidade );
            _p = _p.replace('<unidadeMedidaId>', '0' );
        }else if(this.state.unidadeMedidaId > 0)
        {
           _p = _p.replace('<nome>', '' );
            _p = _p.replace('<capacidade>', '0' );
            _p = _p.replace('<unidadeMedidaId>', this.state.unidadeMedidaId );
        }else{
            _p = _p.replace('<nome>', '' );
            _p = _p.replace('<capacidade>', '0' );
            _p = _p.replace('<unidadeMedidaId>', '0' );

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
        let p = entidade.p != '' ? '?'+entidade.p : '';

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/embalagem/pesquisar" + p
            ,window.getCabeca()
        )   
        .then((resposta)=>this.Pesquisou(resposta))
        .catch((resposta) => this.Pesquisou(resposta));
    }



    Pesquisou(resposta)
    {
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
    Listar()
    {
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/UnidadeMedida/listar",window.getCabeca()).then((resposta)=>this.Listou('unidademedida',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='unidademedida')
        {
            if(resposta.request.status == 200)
            {
                this.setState({lista:resposta.data.dadosLista, listaBuscou:true});
            }
    
        }
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

                    <input type="text" class="form-control" id="inputNome"  
                            aria-describedby="nomeHelp" 
                            placeHolder="Nome." 
                            onChange={(o)=>this.setState({nome:o.target.value})}
                            value={this.state.nome}
                    />

                    <input type="text" class="form-control" id="inputCapacidade"  
                            aria-describedby="capacidadeHelp" 
                            placeHolder="capacidade." 
                            onChange={(o)=>this.setState({capacidade:o.target.value})}
                            value={this.state.capacidade}
                    />
                     {this.state.listaBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputunidadeMedida" 
                    onChange={(o)=>this.setState({unidadeMedidaId:o.target.value})}
                    defaultValue={this.state.unidadeMedidaId}
                    value={this.state.unidadeMedidaId}
                >
            
                {this.state.lista != null ?

                    this.state.lista.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.sigla }</option> 
                    )
                : ""
                }
                <option value="0" >Informe a Unidade de Medida</option>

                </select>
                :
                <div></div>
            }

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


            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    
    }

}


export default EmbalagemPesquisa;

