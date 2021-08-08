import React from 'react';
import axios from 'axios';


import UsuarioAutenticadorForm from './UsuarioAutenticadorForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class UsuarioAutenticadorView extends React.Component
{
    constructor(props)
    {
        var _entidade = {id:0, nome:"", email:""};
        super(props);
        this.state={visao:"pesquisar"
            ,entidade:_entidade
            ,entidadeInicio:_entidade
            ,processando:false
            ,url:{
                pesquisar:process.env.REACT_APP_SERVER_URL + "/api/usuarioautenticador/pesquisar"
               ,salvar:process.env.REACT_APP_SERVER_URL + "/api/usuarioautenticador/salvar"
               ,consultar:process.env.REACT_APP_SERVER_URL + "/api/usuarioautenticador/consultar/"
               ,excluir:process.env.REACT_APP_SERVER_URL + "/api/usuarioautenticador/excluir/"
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
      LOGIN
  </div>
  <div class="card-body">

      

            
                <UsuarioAutenticadorForm 
                    entidade={this.state.entidade}
                    listaAutorizacao={this.state.listaAutorizacao}
                    objetoAutorizacao={this.state.objetoAutorizacao}
                    processando={this.state.processando}
                    OnVoltar={() => this.Voltar("pesquisar") }
            /> 
            
        </div>

  </div>


            );
    }
}

export default UsuarioAutenticadorView;