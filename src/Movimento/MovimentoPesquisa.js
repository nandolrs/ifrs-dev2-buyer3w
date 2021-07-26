import React from 'react';
import axios from 'axios';
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
        let p = entidade.p != '' ? '?'+entidade.p : '';

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/movimento/pesquisar" + p
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

                    <input type="text" class="form-control" id="inputdataMovimento"  
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

