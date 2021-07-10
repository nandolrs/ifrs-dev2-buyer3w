import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

class FreteForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                ,nome:''
                ,arquivoBuscou:false

            };
        }
        else
        {

            var _entidadePai = {id:this.props.entidade.id};

            this.state={
                     id:this.props.entidade.id
                    ,nome:this.props.entidade.nome
                    ,lista:null
                    ,visao_detalhe:"FreteArquivo.manter.pesquisar"
                    ,entidadePai:_entidadePai
            };
        }

    }
        
    Salvar()
    {
        this.props.OnSalvar(
                {
                 id:this.state.id
                ,nome:this.state.nome
                }
            );
    }

    Voltar(){this.props.OnVoltar()}

    render()
    {
        return(

<div class="card">
  <div class="card-header">
    {this.state.id == 0 ? "I N C L U I R" : "A L T E R A R"}
  </div>
  <div class="card-body">

  <fieldset>

        <div class="form-group">

            <input type="text" class="form-control" id="inputNome"  
                aria-describedby="nomeHelp" 
                placeHolder="Informe o nome." 
                onChange={(o)=>this.setState({nome:o.target.value})}
                value={this.state.nome}
            />
    
        </div>

        {/* <FormBotoes
            codigo={this.props.entidade.codigo} 
            listaAutorizacao={this.props.listaAutorizacao}
            objetoAutorizacao={this.props.objetoAutorizacao}
            processando={this.props.processando}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.Voltar()}
        /> */}


        <FormBotoes
            id={this.props.entidade.id} 
            listaAutorizacao='<INICIO>xxx.salvar.incluir<FIM><INICIO>xxx.salvar.alterar<FIM>'
            objetoAutorizacao='xxx'
            processando={this.props.processando}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.Voltar()}
        />

    </fieldset>

  </div>
</div>
                            
        );
    
    }

}


export default FreteForm;

