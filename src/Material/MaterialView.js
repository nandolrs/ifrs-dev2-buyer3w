import React from 'react';
import axios from 'axios';

import MaterialPesquisa from './MaterialPesquisa';
import MaterialLista from './MaterialLista';
import MaterialForm from './MaterialForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class MaterialView extends React.Component
{
    constructor(props)
    {
        var _entidade = {id:0, nome:""};
        super(props);
        this.state={visao:"pesquisar"
            ,entidade:_entidade
            ,entidadeInicio:_entidade
            ,processando:false
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/material/pesquisar"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/material/salvar"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/material/consultar/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/material/excluir/"
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
      M A T E R I A L
  </div>
  <div class="card-body">

      <div>  
            {this.state.visao=="pesquisar" ? 
                <MaterialPesquisa 
                    entidade={this.state.entidadeInicio}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnPesquisar={(estado) => this.setState({visao:'listar', entidade:estado.entidade})}
                    OnListar={(estado) => this.setState({visao:'listar', entidade:estado.entidade})}
                /> : ""
            }

            {this.state.visao=="listar" ? 
                <MaterialLista 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    OnConsultar={(entidade) => this.setState({visao:"consultar", entidade:entidade}) }
                    OnIncluir={() => this.setState({visao:"incluir", entidade:this.state.entidadeInicio}) }
                    OnVoltar={() => this.Voltar("pesquisar") }
                /> : ""
            }

            {this.state.visao=="incluir" || this.state.visao=="consultar"  ? 
                <MaterialForm 
                    entidade={this.state.entidade}
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

export default MaterialView;