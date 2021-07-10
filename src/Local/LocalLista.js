import React from 'react';
import axios from 'axios';
import ListaCabecalho from '../SisPadrao/ListaCabecalho'
import ListaSelecao from '../SisPadrao/ListaSelecao'
import ListaBotoes from '../SisPadrao/ListaBotoes'

var matrizSelecionados = [];

class LocalLista extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state={
          entidade:this.props.entidade 
          ,selecionados:false
          ,listaAutorizacao: this.props.listaAutorizacao
          ,objetoAutorizacao:this.props.objetoAutorizacao 
        };
    }

    Voltar(){this.props.OnVoltar()}

    Consultar(id)
    {
        this.props.OnConsultar(id);
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

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <ListaCabecalho 
        objetoAutorizacao={this.state.objetoAutorizacao}
        listaAutorizacao={this.state.listaAutorizacao}
      />    
    </tr>
  </thead>
  <tbody>

  {
    this.state.entidade.map( (entidade) =>  <tr  key={entidade.id} >
    <td onClick={(e) => this.Consultar(entidade.id)} >{entidade.nome}</td>

    <ListaSelecao 
        objetoAutorizacao={this.state.objetoAutorizacao}
        listaAutorizacao={this.state.listaAutorizacao}
        id={entidade.id}  
        OnClick={(sel) => this.setState({selecionados:sel})  }
    />
  </tr>


    )
               
}      
   

  </tbody>
</table>
        </div>                            

    </div>

    <ListaBotoes 
      selecionados={this.state.selecionados}
      listaAutorizacao={this.props.listaAutorizacao}
      objetoAutorizacao={this.props.objetoAutorizacao}
      OnExcluir={(ids) => this.props.OnExcluir(ids)}
      OnVoltar={() => this.Voltar()}
    />

  </div>                            
</div>                            
        
        );
    
    }

}


export default LocalLista;

