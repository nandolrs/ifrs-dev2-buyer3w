import React from 'react';
import axios from 'axios';
import ListaCabecalho from '../SisPadrao/ListaCabecalho'
import ListaSelecao from '../SisPadrao/ListaSelecao'
import ListaBotoes from '../SisPadrao/ListaBotoes'

var matrizSelecionados = [];

class MovimentoLista extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={entidade:this.props.entidade};
    }
    TraduzirTipo(tipo){
      if(tipo == 1){
        return "Entrada";

      }else if(tipo == 2)
      {
        return "Saida";
    }else if(tipo == 3)
    {
      return "Compra";
    }else if(tipo == 4){
      return "Cotação";
    }else{
      return "Indefinido";
    }
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
    {entidade.material.produto.nome + ' ' +entidade.material.embalagem.nome + ' com ' + entidade.material.embalagem.capacidade + ' ' + entidade.material.embalagem.unidadeMedida.nome }
    
    </div>
    <div  class="card-body">
    <p>Tipo</p>
      <p>{this.TraduzirTipo(entidade.tipo)}</p>
      <p>Data</p>
      <p>{ window.DataFormatada(entidade.dataMovimento)}</p>
      <p>Quantidade</p>
      <p>{ (entidade.quantidade)}</p>
      <p>Valor Unitario</p>
      <p>{ (entidade.valorUnitario)}</p>
      <p>Valor Total</p>
      <p>{ (entidade.valorTotal)}</p>
      <p>Estabelecimento</p>
      <p>{ (entidade.estabelecimento.nomeFantasia)}</p>
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


export default MovimentoLista;

