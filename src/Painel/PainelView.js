import React from 'react';
import axios from 'axios';

//import PainelPesquisa from './PainelPesquisa';
//import PainelLista from './PainelLista';
import PainelForm from './PainelForm';
import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class FreteView extends React.Component
{
    constructor(props)
    {
        var _entidade = {id:0, nome:""};
        super(props);
        this.state={visao:"incluir"
            ,entidade:_entidade
            ,entidadeInicio:_entidade
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

    render()
    {

        return(

<div class="card">
  <div class="card-header">
      P A I N E L
  </div>
  <div class="card-body">

      <div>  


            {this.state.visao=="incluir" || this.state.visao=="consultar"  ? 
                <PainelForm 
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

export default FreteView;