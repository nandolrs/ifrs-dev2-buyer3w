import React from 'react';
import axios from 'axios';
import LocalView from './LocalView';
import PesquisaBotoes from '../SisPadrao/PesquisaBotoes'
import { unstable_createPortal } from 'react-dom';


class LocalPesquisa extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            codigo:0
            ,nome:''
            ,visao:this.props.visao
            ,lista:null
        };
    }


    Pesquisar()
    {
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

        this.props.OnPesquisar(entidade);
        
    }


    
    Incluir()
    {
        this.props.OnIncluir();
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

                    <input type="text" class="form-control" id="inputUf"  
                            aria-describedby="nomeHelp" 
                            placeHolder="Nome." 
                            onChange={(o)=>this.setState({nome:o.target.value})}
                            value={this.state.nome}
                    />

                </div>

                <PesquisaBotoes 
                    listaAutorizacao={this.props.listaAutorizacao}
                    objetoAutorizacao={this.props.objetoAutorizacao}
                    OnIncluir={() => this.Incluir()}
                    OnPesquisar={() => this.Pesquisar()}
                />

            </fieldset>
                                    
        </div>

  </div>
</div>        
        
        );
    
    }

}


export default LocalPesquisa;

