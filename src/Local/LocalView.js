import React from 'react';
import axios from 'axios';

import LocalPesquisa from './LocalPesquisa';
import LocalLista from './LocalLista';
import LocalForm from './LocalForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class FreteView extends React.Component
{
    constructor(props)
    {
        var _entidade = {id:0, nome:"", classe:{}, organizacao:{}};
        super(props);
        this.state={visao:"pesquisar"
            ,entidade:_entidade
            ,entidadeIncluir:_entidade
            ,entidadeConsultar:_entidade
            ,entidadePesquisa:null
            ,entidadeInicio:_entidade
            ,entidadeExcluir:null
            ,processando:false
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/local/pesquisar"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/local/salvar"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/local/consultar/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/local/excluir/"
           }
           ,listaAutorizacao:process.env.REACT_APP_FORM_LISTA_AUTORIZACAO
           ,objetoAutorizacao:process.env.REACT_APP_FORM_OBJETO_AUTORIZACAO

        };
    }

    Voltar(visao)
    {
        if(visao=="menu")
        {
            this.props.OnVoltar();
        }
        else
        {
            this.setState({visao:visao});
        }
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
        this.setState(resposta);
    }


    Incluir()
    {
        this.setState({visao:"incluir"});
        this.EntidadeSetar();
    }

    EntidadeSetar()
    {
        var entidade = {
            id:0
            ,nome:''
        };
        this.setState({entidade:entidade});
    }

    SetarEstadoConsulta(entidade)
    {
        debugger;

        this.setState({visao:'consultar', entidadeConsultar:entidade});

    }

    render()
    {

        return(

<div class="card">
  <div class="card-header">
      L O C A L
  </div>
  <div class="card-body">

      <div>  
            {this.state.visao=="pesquisar" ? 
                <LocalPesquisa 
                    entidade={this.state.entidadeInicio}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnPesquisar={(estado) => this.setState({visao:'listar', entidade:estado.entidade})}
                    OnListar={(estado) => this.setState({visao:'listar', entidade:estado.entidade})}
                /> : ""
            }

            {this.state.visao=="listar"  ? // && this.state.entidade != null 
                <LocalLista 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    OnConsultar={(entidade) => this.SetarEstadoConsulta(entidade)}
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnExcluir={(entidade) => this.setState({visao:"manter.excluir",entidadeExcluir:entidade})}
                    OnVoltar={() => this.Voltar("pesquisar") }
                /> : ""
            }

            {this.state.visao=="incluir"  ? 
                <LocalForm 
                    entidade={this.state.entidadeIncluir}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    processando={this.state.processando}
                    OnVoltar={() => this.Voltar("pesquisar") }
            /> : ""
            }


            {this.state.visao=="consultar" ? 
                <LocalForm 
                    entidade={this.state.entidadeConsultar}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    processando={this.state.processando}
                    OnVoltar={() => this.Voltar("pesquisar") }
            /> : ""
            }


        </div>

  </div>
</div>

            );
    }
}

export default FreteView;