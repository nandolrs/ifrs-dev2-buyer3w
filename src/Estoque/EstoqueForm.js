import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class EstoqueForm extends React.Component
{
    constructor(props)
    {        
        debugger;

        super(props);
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                ,localId:0
                ,materialId:0
                ,visao:process.env.REACT_APP_VISAO_INFORMANDO
                ,mensagens:null
                ,listaLocalBuscou:false
                ,listaMaterialBuscou:false
            };
        }
        else
        {             
            this.state={
                id:this.props.entidade.id
               ,visao:'processando'
               ,mensagens:null
               ,listaLocalBuscou:false
               ,listaMaterialBuscou:false
            };
           let entidade = {id:this.props.entidade.id}

           this.SisManterConsultar(entidade);
        }

        this.Listar();
    }
        
    Salvar()
    {
        let entidade =  {
        id:this.state.id
        ,nome:'none'
        ,local:{id:this.state.localId}
        ,material:{id:this.state.materialId}
        };
        this.SisManterSalvar(entidade);
    }

    
    Salvou(resposta)
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
                  ,mensagens:window.ToMensagens("Registro salvo com sucesso.")
                };
            }
        }
        else
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Erro ao salvar registro, repita a operação.")
            };
        }

        this.Evento(retorno, 'salvou');

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
        this.setState({visao:'processando'});

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/estoque/excluir/" + entidade.id
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
            ,mensagens:window.ToMensagens("Erro ao excluir registro, repita a operação.")
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
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
        else if(acao =='consultou')
        {
            let estado={
                id:resposta.entidade.id
               ,nome:resposta.entidade.nome
               ,quantidade:resposta.entidade.quantidade
               ,pontoMinimo:resposta.entidade.pontoMinimo
               ,pontoMaximo:resposta.entidade.pontoMaximo
               ,pontoPedido:resposta.entidade.pontoPedido
               ,localId:resposta.entidade.local.id
               ,materialId:resposta.entidade.material.id
               ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            };
            this.setState(estado);
        }
        else if(acao =='excluiu')
        {
            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
        }
    }

    SisManterSalvar(entidade)
    {
        this.setState({visao:'processando'});

        if(entidade.id==0)
        {
            debugger;
            let url = process.env.REACT_APP_SERVER_URL + "/api/estoque/salvar";

            axios.post(process.env.REACT_APP_SERVER_URL + "/api/estoque/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/estoque/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
    }

    SisManterConsultar(entidade)
    {

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/estoque/consultar/" + entidade.id
            ,window.getCabeca()
            )
            .then((resposta)=>this.Consultou(resposta))
            .catch((resposta) => this.Consultou(resposta));
    }

    Consultou(resposta)
    {
        var retorno = null;

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
            ,mensagens:window.ToMensagens("Erro ao consultar registro, repita a operação.")
            };
        }

        this.Evento(retorno, 'consultou');
    }

    Listar()
    {
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/local/listar",window.getCabeca()).then((resposta)=>this.Listou('local',resposta));
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/listar",window.getCabeca()).then((resposta)=>this.Listou('material',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='local')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaLocal:resposta.data.dadosLista, listaLocalBuscou:true});
            }
    
        }else if(tipo=='material')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaMaterial:resposta.data.dadosLista, listaMaterialBuscou:true});
            }
    
        }
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

            {this.state.listaLocalBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputLocal" 
                    onChange={(o)=>this.setState({localId:o.target.value})}
                    defaultValue={this.state.localId}
                    value={this.state.localId}
                >
            
                {this.state.listaLocal != null ?

                    this.state.listaLocal.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe o local.</option>

                </select>
                :
                <div></div>
            }

            {this.state.listaMaterialBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputMaterial" 
                    onChange={(o)=>this.setState({materialId:o.target.value})}
                    defaultValue={this.state.materialId}
                    value={this.state.materialId}
                >
            
                {this.state.listaMaterial != null ?

                    this.state.listaMaterial.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.produto.nome + ' ; ' + entidade.embalagem.nome + ' com ' + entidade.embalagem.capacidade + ' ' + entidade.embalagem.unidadeMedida.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe a material</option>

                </select>
                :
                <div></div>
            }


            <input type="text" class="form-control" id="inputQuantidade"  
                    aria-describedby="quantidadeHelp" 
                    placeHolder="Quantidade." 
                    onChange={(o)=>this.setState({quantidade:o.target.value})}
                    value={this.state.quantidade}
            />

            <input type="text" class="form-control" id="pontoMinimo"  
                    aria-describedby="pontoMinimoHelp" 
                    placeHolder="Ponto mínimo." 
                    onChange={(o)=>this.setState({pontoMinimo:o.target.value})}
                    value={this.state.pontoMinimo}
            />


            <input type="text" class="form-control" id="pontoMaximo"  
                    aria-describedby="pontoMaximoHelp" 
                    placeHolder="Ponto máximo." 
                    onChange={(o)=>this.setState({pontoMaximo:o.target.value})}
                    value={this.state.pontoMaximo}
            />

            <input type="text" class="form-control" id="pontoPedido"  
                    aria-describedby="pontoPedidoHelp" 
                    placeHolder="Ponto pedido." 
                    onChange={(o)=>this.setState({pontoPedido:o.target.value})}
                    value={this.state.pontoPedido}
            />

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


export default EstoqueForm;

