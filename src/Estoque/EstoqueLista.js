import React from 'react';
import axios from 'axios';
import ListaCabecalho from '../SisPadrao/ListaCabecalho'
import ListaSelecao from '../SisPadrao/ListaSelecao'
import ListaBotoes from '../SisPadrao/ListaBotoes'

var matrizSelecionados = [];

class EstoqueLista extends React.Component
{
    constructor(props)
    {
      debugger;

        super(props);
        this.state={entidade:this.props.entidade};
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
      <h5>Produto</h5>
    {entidade.material.produto.nome}

    </div>
    <div class="card-body">
      <h5>Local</h5>
      {entidade.local.nome}
      <h5>Embalagem</h5>
      {entidade.material.embalagem.nome + ' com ' + entidade.material.embalagem.capacidade + ' ' + entidade.material.embalagem.unidadeMedida.nome }
      <h5>Estoque</h5>
      {entidade.quantidade }
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


export default EstoqueLista;

