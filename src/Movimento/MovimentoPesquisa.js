import React from 'react';
import axios from 'axios';
import MovimentoView from './MovimentoView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';


class MovimentoPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            codigo:0
            ,dataMovimento:''
            ,quantidade:''
            ,valorUnitario:''
            ,valorTotal:''
            ,materialId:0
            ,estabelecimentoId:0
            ,tipoId:0
            ,localId:0
            ,visao:process.env.REACT_APP_VISAO_INFORMANDO
    
        };
        this.Listar();
    }

    Pesquisar()
    {
        this.setState({visao:'processando'});
debugger;
        let _p = 'dataMovimento=<dataMovimento>&quantidade=<quantidade>&estabelecimentoId=<estabelecimentoId>&materialId=<materialId>&localId=<localId>';
        if(this.state.dataMovimento != '')
        {
           _p = _p.replace('<dataMovimento>', this.state.dataMovimento );
            _p = _p.replace('<quantidade>', '0' );
            _p = _p.replace('<estabelecimentoId>', '0' );
            _p = _p.replace('<materialId>', '0' );
            _p = _p.replace('<localid>', '0' );
        } else if(this.state.quantidade > 0)  {
           _p = _p.replace('<dataMovimento>', '' );
            _p = _p.replace('<quantidade>', this.state.quantidade );
            _p = _p.replace('<estabelecimentoId>', '0' );
            _p = _p.replace('<materialId>', '0' );
            _p = _p.replace('<localid>', '0' );
        }else if(this.state.estabelecimentoId > 0){
           _p = _p.replace('<dataMovimento>', '' );
            _p = _p.replace('<quantidade>', '0' );
            _p = _p.replace('<estabelecimentoId>', this.state.estabelecimentoId );
            _p = _p.replace('<materialId>', '0' );
            _p = _p.replace('<localid>', '0' );
        }else if(this.state.materialId > 0){
           _p = _p.replace('<dataMovimento>', '' );
            _p = _p.replace('<quantidade>', '0' );
            _p = _p.replace('<estabelecimentoId>', '0' );
            _p = _p.replace('<materialId>', this.state.materialId );
            _p = _p.replace('<localid>', '0' );
        }else if(this.state.localid > 0){
            _p = _p.replace('<dataMovimento>', '' );
             _p = _p.replace('<quantidade>', '0' );
             _p = _p.replace('<estabelecimentoId>', '0' );
             _p = _p.replace('<materialId>',  '0' );
             _p = _p.replace('<localid>', this.state.localId);
         }
        else{
            _p = _p.replace('<dataMovimento>', '' );
            _p = _p.replace('<quantidade>', '0' );
            _p = _p.replace('<estabelecimentoId>', '0' );
            _p = _p.replace('<materialId>', '0' );
            _p = _p.replace('<localid>', '0' );
        }
        

        var entidade={codigo:0
            ,p:_p
        };

        this.SisManterPesquisar(entidade);
    }
    

    Evento(resposta, acao)
    {        
        debugger;

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
let url = process.env.REACT_APP_SERVER_URL + "/api/movimento/pesquisar" + p;
        axios.get(url
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

    Listar()
    {
    
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/listar",window.getCabeca()).then((resposta)=>this.Listou('material',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/estabelecimento/listar",window.getCabeca()).then((resposta)=>this.Listou('estabelecimento',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/local/listar",window.getCabeca()).then((resposta)=>this.Listou('local',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='material')
        {
            if(resposta.request.status == 200)
            {
                this.setState({lista:resposta.data.dadosLista, listaBuscou:true});
            }
         } if(tipo=='estabelecimento')
         {
             if(resposta.request.status == 200)
             {
                 this.setState({listaEstabelecimento:resposta.data.dadosLista, listaBuscouEstabelecimento:true});
             }
          }
          if(tipo=='local')
         {
             if(resposta.request.status == 200)
             {
                 this.setState({listaLocal:resposta.data.dadosLista, listaBuscouLocal:true});
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

                <select 
                    class="form-control form-control-sm" 
                    id="InputTipo" 
                    onChange={(o)=>this.setState({tipoId:o.target.value})}
                    defaultValue={this.state.tipoId}
                    value={this.state.tipoId}
                >         

                    <option 
                        value='1'
                        >ENTRADA</option> 
                    <option 
                        value='2'
                        >SAIDA</option> 
                    <option 
                        value='3'
                        >COMPRA</option> 
                    <option 
                        value='4'
                        >COTACAO</option> 
                
                
                <option value="0" >Informe o tipo</option>

                </select>

                {this.state.listaBuscouLocal==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputLocal" 
                    onChange={(o)=>this.setState({localId:o.target.value})}
                    defaultValue={this.state.localId}
                    value={this.state.LocalId}
                >
            
                {this.state.listaLocal != null ?

                    this.state.listaLocal.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome }</option> 
                    )
                : ""
                }
                <option value="0" >Informe o Local</option>

                </select>
                :
                <div></div>
            }


                {this.state.listaBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="Inputmaterial" 
                    onChange={(o)=>this.setState({materialId:o.target.value})}
                    defaultValue={this.state.materialId}
                    value={this.state.materialId}
                >
            
                {this.state.lista != null ?

                    this.state.lista.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.produto.nome + ' ' +entidade.embalagem.nome + ' com ' + entidade.embalagem.capacidade + ' ' + entidade.embalagem.unidadeMedida.nome  }</option> 
                    )
                : ""
                }
                <option value="0" >Informe o material</option>

                </select>
                :
                <div></div>
            }
                
            

                <input type="date" class="form-control" id="inputdataMovimento"  
                            aria-describedby="dataMovimentoHelp" 
                            placeHolder="dataMovimento." 
                            onChange={(o)=>this.setState({dataMovimento:o.target.value})}
                            value={this.state.dataMovimento}
                    />

                        <input type="text" class="form-control" id="inputquantidade"  
                            aria-describedby="quantidadeHelp" 
                            placeHolder="quantidade." 
                            onChange={(o)=>this.setState({quantidade:o.target.value})}
                            value={this.state.quantidade}
                    />
                        <input type="text" class="form-control" id="inputvalorUnitario "  
                            aria-describedby="valorUnitario Help" 
                            placeHolder="valorUnitario ." 
                            onChange={(o)=>this.setState({valorUnitario :o.target.value})}
                            value={this.state.valorUnitario }
                    />

                        <input type="text" class="form-control" id="inputvalorTotal "  
                            aria-describedby="valorTotal Help" 
                            placeHolder="valorTotal ." 
                            onChange={(o)=>this.setState({valorTotal :o.target.value})}
                            value={this.state.valorTotal }


                    />      
                    {this.state.listaBuscouEstabelecimento==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="Inputestabelecimento" 
                    onChange={(o)=>this.setState({estabelecimentoId:o.target.value})}
                    defaultValue={this.state.estabelecimentoId}
                    value={this.state.estabelecimentoId}
                >
            
                {this.state.listaEstabelecimento != null ?

                    this.state.listaEstabelecimento.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nomeFantasia }</option> 
                    )
                : ""
                }
                <option value="0" >Informe o Estabelecimento</option>

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


export default MovimentoPesquisa;