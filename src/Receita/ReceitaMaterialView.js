import React from 'react';
import axios from 'axios';

import ReceitaMaterialPesquisa from './ReceitaMaterialPesquisa';
import ReceitaMaterialLista from './ReceitaMaterialLista';
import ReceitaMaterialForm from './ReceitaMaterialForm';
//import ReceitaMaterial from './ReceitaMaterial';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class ReceitaMaterialView extends React.Component
{
    constructor(props)
    { debugger;
        var _entidade = {id:0, nome:""};
        super(props);
        debugger;
        let _visao = this.props.visao == "" ? "pesquisar" : this.props.visao;
        this.state={visao:"pesquisar"
            ,entidade:_entidade
            ,entidadeInicio:_entidade
            ,processando:false
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/receitamaterial/pesquisar"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/receitamaterial/salvar"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/receitamaterial/consultar/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/receitamaterial/excluir/"
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

    render()
    {

        return(

<div class="card">
  <div class="card-header">
      INCLUIR INGREDIENTE
  </div>
  <div class="card-body">

      <div>  
            {this.state.visao=="pesquisar" ? 
                <ReceitaMaterialPesquisa
                    entidade={this.state.entidadeInicio}
                    listaAutorizacao={this.state.listaAutorizacao}
                    idReceita = {this.props.idReceita}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnPesquisar={(estado) => this.setState({visao:'listar', entidade:estado.entidade})}
                    OnListar={(estado) => this.setState({visao:'listar', entidade:estado.entidade})}
                /> : ""
            }

            {this.state.visao=="listar" ? 
                <ReceitaMaterialLista
                    entidade={this.state.entidade}
                    listaAutorizacao={this.state.listaAutorizacao}
                    idReceita = {this.props.idReceita}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    OnConsultar={(entidade) => this.setState({visao:"consultar", entidade:entidade}) }
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnVoltar={() => this.Voltar("pesquisar") }
                /> : ""
            }

            {this.state.visao=="incluir" || this.state.visao=="consultar"  ? 
                <ReceitaMaterialForm
                    entidade={this.state.entidade}
                    listaAutorizacao={this.state.listaAutorizacao}
                    idReceita = {this.props.idReceita}
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

export default ReceitaMaterialView;