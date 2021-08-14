import React from 'react';
import axios from 'axios';
import MaterialView from './MaterialView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class MaterialPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            codigo:0
            ,nome:''
            ,produtoId:0
            ,embalagemId:0
            ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            ,listaProdutoBuscou:false
            ,listaEmbalagemBuscou:false

        };
        this.Listar();

    }

    Pesquisar()
    {
        this.setState({visao:'processando'});

        let _p = 'produtoId=';
        if(this.state.produtoId != 0)
        {
            _p = _p+ this.state.produtoId;
        }
        else
        {
            _p = _p+ '0';

        }

        var entidade={id:0
            ,produto:{}
            ,material:{}
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

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/pesquisar" + p
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
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/produto/listar",window.getCabeca()).then((resposta)=>this.Listou('produto',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/embalagem/listar",window.getCabeca()).then((resposta)=>this.Listou('embalagem',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='produto')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaProduto:resposta.data.dadosLista, listaProdutoBuscou:true});
            }
    
        }else if(tipo=='embalagem')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaEmbalagem:resposta.data.dadosLista, listaEmbalagemBuscou:true});
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

                {this.state.listaProdutoBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputProduto" 
                    onChange={(o)=>this.setState({produtoId:o.target.value})}
                    defaultValue={this.state.produtoId}
                    value={this.state.produtoId}
                >
            
                {this.state.listaProduto != null ?

                    this.state.listaProduto.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe o produto</option>

                </select>
                :
                <div></div>
            }

            {this.state.listaEmbalagemBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputEmbalagem" 
                    onChange={(o)=>this.setState({embalagemId:o.target.value})}
                    defaultValue={this.state.embalagemId}
                    value={this.state.embalagemId}
                >
            
                {this.state.listaEmbalagem != null ?

                    this.state.listaEmbalagem.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome + ' com ' + entidade.capacidade + ' ' + entidade.unidadeMedida.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe a embalagem</option>

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


export default MaterialPesquisa;

