import React from 'react';
import axios from 'axios';
import EstoqueView from './EstoqueView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class EstoquePesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            codigo:0
            ,localId:0
            ,materialId:0
            ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            ,listaLocalBuscou:false
            ,listaMaterialBuscou:false

        };
        this.Listar();

    }

    Pesquisar()
    {
        this.setState({visao:'processando'});

        let _p = 'localId=<localId>&materialId=<materialId>';

        let valor = '0';
        if(this.state.localId != 0)
        {
            valor = this.state.localId;
        }
        _p = _p.replace('<localId>',valor);


        valor = '0';
        if(this.state.materialId != 0)
        {
            valor = this.state.materialId;
        }
        _p = _p.replace('<materialId>',valor);

        var entidade={id:0
            ,produto:{}
            ,material:{}
            ,p:_p
        };

        debugger;
        
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

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/estoque/pesquisar" + p
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
            ,mensagens:window.ToMensagens("Erro ao pesquisar registro, repita a opera????o.")
            };
        }
        this.Evento(retorno, 'pesquisou');
    }

    
    Listar()
    {
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/local/listar",window.getCabeca()).then((resposta)=>this.Listou('local',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/listar",window.getCabeca()).then((resposta)=>this.Listou('material',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='local')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaLocal:resposta.data.dadosLista, listaLocalBuscou:true});
            }
    
        }else if(tipo=='material')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaMaterial:resposta.data.dadosLista, listaMaterialBuscou:true});
            }
    
        }
    }

    OnIncluir()
    {
        
        let retorno = {visao:"mensagem.erro"
        ,mensagens:window.ToMensagens("Utilize a movimenta????o (Opera????es/Movimento) para incluir estoque.")
        };
        this.setState(retorno);


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

                {this.state.listaLocalBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputLocal" 
                    onChange={(o)=>this.setState({localId:o.target.value})}
                    defaultValue={this.state.localId}
                    value={this.state.localId}
                >
            
                {this.state.listaLocal != null ?

                    this.state.listaLocal.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe o local.</option>

                </select>
                :
                <div></div>
            }

            {this.state.listaMaterialBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputMaterial" 
                    onChange={(o)=>this.setState({materialId:o.target.value})}
                    defaultValue={this.state.materialId}
                    value={this.state.materialId}
                >
            
                {this.state.listaMaterial != null ?

                    this.state.listaMaterial.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.produto.nome + ' - ' + entidade.embalagem.nome + ' com ' + entidade.embalagem.capacidade + ' ' + entidade.embalagem.unidadeMedida.nome }</option> 
                    )
                : ""
                }
                <option value="0" >Informe o material</option>

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
                    OnIncluir={() => this.OnIncluir()}
                    OnPesquisar={() => this.Pesquisar()}
                />


            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    
    }

}


export default EstoquePesquisa;

