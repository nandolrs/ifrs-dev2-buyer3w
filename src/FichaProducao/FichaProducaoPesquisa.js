import React from 'react';
import axios from 'axios';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class FichaProducaoPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            codigo:0
            ,nome:''
            ,produtoId:0
            ,materialId:0
            ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            ,listaProdutoBuscou:false
            ,listaMaterialBuscou:false

        };
        this.Listar();

    }

    Pesquisar()
    {
        debugger;

        this.setState({visao:'processando'});

        // configura produto se informado

        let _p = 'produtoId=';
        if(this.state.produtoId != 0)
        {
            _p = _p+ this.state.produtoId;
        }
        else
        {
            _p = _p+ '0';

        }

        // configura material se informado

        _p = _p + '&materialId=';
        if(this.state.materialId != 0)
        {
            _p = _p+ this.state.materialId;
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

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/receita/pesquisarPorProdutoXMaterial" + p
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
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/listar",window.getCabeca()).then((resposta)=>this.Listou('material',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='produto')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaProduto:resposta.data.dadosLista, listaProdutoBuscou:true});
            }
    
        }else if(tipo=='material')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaMaterial:resposta.data.dadosLista, listaMaterialBuscou:true});
            }
    
        }
    }

MaterialApresentar(entidade)
{
    debugger;

    let retorno =
    <div>
        <p>{entidade.produto.nome}</p>
        <p>{entidade.embalagem.nome + ' com ' + entidade.embalagem.capacidade + ' ' + entidade.embalagem.unidadeMedida.nome}</p> 
    </div>


    return retorno;
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
                        >{
                            entidade.nome
                        }
                    </option> 
                    )
                : ""
                }
                <option value="0" >Informe o produto</option>

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
                    <option value={entidade.id} > 
                    {
                    entidade.produto.nome
                    + ' - ' + entidade.embalagem.nome 
                    + ' com ' + entidade.embalagem.capacidade 
                    + ' ' + entidade.embalagem.unidadeMedida.nome
                        }
                    </option> 
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
                    OnIncluir={() => null } // this.props.OnIncluir()
                    OnPesquisar={() => this.Pesquisar()}
                />


            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    
    }

}


export default FichaProducaoPesquisa;

