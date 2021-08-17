import React from 'react';
import axios from 'axios';
import ListaCabecalho from '../SisPadrao/ListaCabecalho'
import ListaSelecao from '../SisPadrao/ListaSelecao'
import ListaBotoes from '../SisPadrao/ListaBotoes'

var matrizSelecionados = [];

class ReceitaMaterialLista extends React.Component
{
    constructor(props)
    {
        super(props);
        this.Pesquisar();
        //this.state={entidade:this.props.entidade};
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
        debugger;
        this.setState(resposta);
//
 //     if(resposta.visao=='listar')
 //     {
 //         this.props.OnListar(resposta);
 //     }
 //     else
 //     {
 //         this.setState(resposta);
 //     }
   }
        Pesquisar()
        {
            this.setState({visao:'processando'});

             var entidade={id:this.props.idReceita};

            this.SisManterPesquisar(entidade);
        }

          SisManterPesquisar(entidade)
            {   debugger;
                axios.get(process.env.REACT_APP_SERVER_URL + "/api/receitamaterial/pesquisar?receitaId=" + entidade.id
                    ,window.getCabeca()
                )
                .then((resposta)=>this.Pesquisou(resposta))
                .catch((resposta) => this.Pesquisou(resposta));
            }

            Pesquisou(resposta)
            {debugger;
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
                    { debugger;

                        retorno = {//visao:"listar"
                             entidade:resposta.data.dadosLista
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
      L I S T A R
  </div>
  <div class="card-body">

    <div>

        <div class="form-group">

              {this.state.entidade.map( (entidade) =>  
                <div>
  <div  class="card"  onClick={(e) => this.props.OnConsultar({id:entidade.id})} >
    <div class="card-header">
    {entidade.material.produto.nome}
    </div>
    <div class="card-body">
      {"xxx"}
    </div>
  </div>
  <br/>
                </div>
                )
              }


        </div>                            

    </div>

    <ListaBotoes 
      objetoAutorizacao={this.props.objetoAutorizacao}
      listaAutorizacao={this.props.listaAutorizacao}
      selecionados={this.state.selecionados}
      OnExcluir={(codigos) => this.props.OnExcluir(codigos)}
      OnVoltar={() => this.props.OnVoltar()}
    />


  </div>                            
</div>                            
        
        );
    
    }

}


export default ReceitaMaterialLista;

