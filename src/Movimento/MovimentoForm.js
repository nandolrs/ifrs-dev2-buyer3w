import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class MovimentoForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                 ,nome:''
                 ,dataMovimento:''//new Date().toLocaleDateString()
                 ,quantidade:''
                 ,valorUnitario:''
                 ,valorTotal:''
                 ,materialId:0
                 ,tipoId:0
                 ,estabelecimentoId:0
                 ,tipoId:5 // lista
                 ,localId:0
                 ,visao:process.env.REACT_APP_VISAO_INFORMANDO
                ,mensagens:null

            };
        }
        else
        { 
            debugger;
            
            this.state={
                id:this.props.entidade.id
               ,visao:'processando'
               ,mensagens:null

           };
           let entidade = {id:this.props.entidade.id}

           this.SisManterConsultar(entidade);
        }
        this.Listar();
    }
        
    Salvar()
    {
        let _estabelecimento = this.state.estabelecimentoId != 0 ? {id:this.state.estabelecimentoId} :null ; //  {id:null}

        let entidade =  {
        id:this.state.id
        ,nome:this.state.nome
        ,dataMovimento:this.state.dataMovimento
        ,quantidade:this.state.quantidade
        ,valorUnitario:'0'+this.state.valorUnitario
        ,valorTotal:'0'+this.state.valorTotal
        ,tipo:this.state.tipoId
        ,material:{id:this.state.materialId}
        ,estabelecimento: _estabelecimento
        ,local:{id:this.state.localId}
        };
        let validar = this.Validar(entidade);

        if(validar.ok)
        {
            this.SisManterSalvar(entidade);
        }
        else
        {
            this.setState(validar.estado);
        
    }
    }

    Excluir()
    {
        let entidade =  {
        id:this.state.id
        };
        this.SisManterExcluir(entidade);
    }



    SisManterExcluir(entidade)
    {
        debugger;

        this.setState({visao:'processando'});

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/movimento/excluir/" + entidade.id
            ,window.getCabeca())
            .then((resposta)=>this.Excluiu(resposta))
            .catch((resposta => this.Excluiu(resposta))
            );

    }

    Excluiu(resposta)
    {      
        var retorno = null;

        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {
                retorno = {visao:"mensagem.sucesso"
                  ,mensagens:window.ToMensagens("Registro excluido com sucesso.")
                };
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao excluir registro, repita a opera????o.")
            };
        }
    
        this.Evento(retorno, 'excluiu');
}

    Evento(resposta, acao)
    {        
        if(acao=='pesquisou' 
            || acao=='consultou'
            || acao=='salvou'
            || acao=='excluiu'
            )
        {
        }


        if(acao=='salvou')
        {
            debugger;

            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
        else if(acao =='consultou')
        {
            debugger;

            let estado={
                id:resposta.entidade.id
               ,nome:resposta.entidade.nome
               ,dataMovimento:resposta.entidade.dataMovimento
               ,quantidade:resposta.entidade.quantidade
               ,valorUnitario:resposta.entidade.valorUnitario
               ,valorTotal:resposta.entidade.valorTotal
               ,materialId:resposta.entidade.material.id
               ,tipoId:resposta.entidade.tipo
               ,estabelecimentoId:resposta.entidade.estabelecimento.id
               ,tipoId:resposta.entidade.tipo
               ,localId:resposta.entidade.local.id
               ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            };
            this.setState(estado);
        }
        else if(acao =='excluiu')
        {
            debugger;

            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
    }

    SisManterSalvar(entidade)
    {
        debugger;
        this.setState({visao:'processando'});

        if(entidade.id==0)
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/movimento/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/movimento/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
    }

    Salvou(resposta)
    {
        debugger;
        var retorno = null;

        if(resposta.request.status == 200)
        {
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {
                retorno = {visao:"mensagem.sucesso"
                  ,mensagens:window.ToMensagens("Registro salvo com sucesso.")
                };
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao salvar registro, repita a opera????o.")
            };
        }

        this.Evento(retorno, 'salvou');

    }


    SisManterConsultar(entidade)
    {
        debugger;
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/movimento/consultar/" + entidade.id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta))
            .catch((resposta) => this.Consultou(resposta));
    }

    Consultou(resposta)
    {
        var retorno = null;
        debugger;
        if(resposta.status == 200)
        {   
            var erro = resposta.data.erro;
            if(erro != null)
            {
                var itens = erro.itens;
                var msg = itens[0].mensagem;
                retorno = {visao:"mensagem.erro"
                  , mensagens:erro.itens
                };
            }
            else
            {
                retorno = {visao:"consultar"
                    ,entidade:resposta.data.dados
                    ,entidadePesquisa:resposta.data.dados
                    ,mensagens:window.ToMensagens("Consulta retornou com sucesso.")
                };
            }
            
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao consultar registro, repita a opera????o.")
            };
        }

        this.Evento(retorno, 'consultou');
    }
    Listar()
    {
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/listar",window.getCabeca()).then((resposta)=>this.Listou('material',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/estabelecimento/listar",window.getCabeca()).then((resposta)=>this.Listou('estabelecimento',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/local/listar",window.getCabeca()).then((resposta)=>this.Listou('local',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='material')
        {
            if(resposta.request.status == 200)
            {
                this.setState({lista:resposta.data.dadosLista, listaBuscou:true});
            }
         } if(tipo=='estabelecimento')
         {
             if(resposta.request.status == 200)
             {
                 this.setState({listaEstabelecimento:resposta.data.dadosLista, listaBuscouEstabelecimento:true});
             }
          }             
          if(tipo=='local')
         {
             if(resposta.request.status == 200)
             {
                 this.setState({listaLocal:resposta.data.dadosLista, listaBuscouLocal:true});
             }
          }             
    }
    Validar(entidade)
    {
        let validar = {ok:true, mensagens:[]};
        let retorno = {};

    if(entidade.quantidade < 1)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe uma quantidade valida acima de 0")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }

        if(entidade.valorUnitario < 1)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe o valor unitario acima de 1")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        } if(entidade.valorTotal < 1)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe o valor total acima de 1")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }
        return validar;

    }


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

<select 
    class="form-control form-control-sm" 
    id="InputTipo" 
    onChange={(o)=>this.setState({tipoId:o.target.value})}
    defaultValue={this.state.tipoId}
    value={this.state.tipoId}
>         

    <option 
        value='1'
        >ENTRADA</option> 
    <option 
        value='2'
        >SAIDA</option> 
    <option 
        value='3'
        >COMPRA</option> 
    <option 
        value='4'
        >COTACAO</option> 
    <option 
        value='5'
        >LISTA</option> 


<option value="0" >Informe o tipo</option>

</select>

{this.state.listaBuscouLocal==true ?
<select 
    class="form-control form-control-sm" 
    id="InputLocal" 
    onChange={(o)=>this.setState({localId:o.target.value})}
    defaultValue={this.state.localId}
    value={this.state.LocalId}
>

{this.state.listaLocal != null ?

    this.state.listaLocal.map( (entidade) =>
    <option 
        value={entidade.id} 
        >{entidade.nome }</option> 
    )
: ""
}
<option value="0" >Informe o local</option>

</select>
:
<div></div>
}


{this.state.listaBuscou==true ?
<select 
    class="form-control form-control-sm" 
    id="Inputmaterial" 
    onChange={(o)=>this.setState({materialId:o.target.value})}
    defaultValue={this.state.materialId}
    value={this.state.materialId}
>

{this.state.lista != null ?

    this.state.lista.map( (entidade) =>
    <option 
        value={entidade.id} 
        >{entidade.produto.nome + ' ' +entidade.embalagem.nome + ' com ' + entidade.embalagem.capacidade + ' ' + entidade.embalagem.unidadeMedida.nome  }</option> 
    )
: ""
}
<option value="0" >Informe o material</option>

</select>
:
<div></div>
}

{(this.state.tipoId == '3' 
|| this.state.tipoId == '4' )
  && this.state.listaBuscouEstabelecimento==true ?
<select 
    class="form-control form-control-sm" 
    id="Inputestabelecimento" 
    onChange={(o)=>this.setState({estabelecimentoId:o.target.value})}
    defaultValue={this.state.estabelecimentoId}
    value={this.state.estabelecimentoId}
>

{this.state.listaEstabelecimento != null ?

    this.state.listaEstabelecimento.map( (entidade) =>
    <option 
        value={entidade.id} 
        >{entidade.nomeFantasia }</option> 
    )
: ""
}
<option value="0" >Informe o Estabelecimento</option>

</select>
:
<div></div>
}



<input type="date" class="form-control" id="inputdataMovimento"  
            aria-describedby="dataMovimentoHelp" 
            placeHolder="dataMovimento." 
            onChange={(o)=>this.setState({dataMovimento:o.target.value})}
            value={this.state.dataMovimento}
    />

        <input type="text" class="form-control" id="inputquantidade"  
            aria-describedby="quantidadeHelp" 
            placeHolder="quantidade." 
            onChange={(o)=>this.setState({quantidade:o.target.value})}
            value={this.state.quantidade}
    />
    {this.state.tipoId == '3' || this.state.tipoId == '4'  ?
        <div>
            <input type="text" class="form-control" id="inputvalorUnitario "  
                    aria-describedby="valorUnitario Help" 
                    placeHolder="valorUnitario ." 
                    onChange={(o)=>this.setState({valorUnitario :o.target.value})}
                    value={this.state.valorUnitario }
            />

            <input type="text" class="form-control" id="inputvalorTotal "  
                aria-describedby="valorTotal Help" 
                placeHolder="valorTotal ." 
                onChange={(o)=>this.setState({valorTotal :o.target.value})}
                value={this.state.valorTotal }
            />   
        </div>
    : ''
    }


    
            <SisMensagemView
                visao={this.state.visao}
                mensagens={this.state.mensagens}
                OnClicou={(v) => this.setState({visao:v})}
            />

            {this.state.visao=='processando' ?
                <div class="text-center">
                    <div class="spinner-border" role="status">
                    </div>
                </div>
            : ""
            }

        </div>

        <FormBotoes
            id={this.props.entidade.id} 
            listaAutorizacao={this.props.listaAutorizacao}
            objetoAutorizacao={this.props.objetoAutorizacao}
            processando={this.props.processando}
            OnExcluir={() => this.Excluir()}
            OnSalvar={() => this.Salvar()}
            OnVoltar={() => this.props.OnVoltar()}
        />


    </fieldset>

  </div>
</div>
                            
        );
    
    }

}


export default MovimentoForm;

