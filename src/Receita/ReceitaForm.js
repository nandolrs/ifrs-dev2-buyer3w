import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

import ReceitaMaterialView from './ReceitaMaterialView';

class ReceitaForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                ,nome:''
                ,produtoId:0
                ,visao:process.env.REACT_APP_VISAO_INFORMANDO
                ,visao_material:null
                ,mensagens:null
                ,listaBuscou:false
            };
        }
        else
        {             
            this.state={
                id:this.props.entidade.id
               ,visao:'processando'
               ,mensagens:null
               ,listaBuscou:false
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
        ,nome:this.state.nome
        ,produto:{id:this.state.produtoId}
        };
        this.SisManterSalvar(entidade);
    }
    
    Salvou(resposta)
    {        
        var retorno = null;

        if(resposta.request.status == 200)
        {
            this.setState({visao_material:'ativo'});
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
               debugger;
                 retorno = {visao:"mensagem.sucesso"
                 ,mensagens:window.ToMensagens("Registro salvo com sucesso.")
                 ,idReceita:resposta.data.dados.id
                };
                this.setState(retorno);
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

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/receita/excluir/" + entidade.id
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
               ,produtoId:resposta.entidade.produto.id
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
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/receita/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/receita/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
    }

    SisManterConsultar(entidade)
    {

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/receita/consultar/" + entidade.id
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
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/produto/listar",window.getCabeca()).then((resposta)=>this.Listou('produto',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='produto')
        {
            if(resposta.request.status == 200)
            {
                this.setState({lista:resposta.data.dadosLista, listaBuscou:true});
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

            <input type="text" class="form-control" id="inputNome"  
                aria-describedby="nomeHelp" 
                placeHolder="Informe o nome." 
                onChange={(o)=>this.setState({nome:o.target.value})}
                value={this.state.nome}
            />

            {this.state.listaBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputProduto"
                    onChange={(o)=>this.setState({produtoId:o.target.value})}
                    defaultValue={this.state.produtoId}
                    value={this.state.produtoId}
                >
            
                {this.state.lista != null ?

                    this.state.lista.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe o produto</option>

                </select>
                :
                <div></div>
            }

            {this.state.visao_material == 'ativo' ?
                <ReceitaMaterialView
                    autenticado = {this.state.autenticado}
                    listaAutorizacao={this.state.listaAutorizacao}
                    visao = {this.state.visao}
                    idReceita = {this.state.idReceita}
                    OnEvento={(estado, acao) => this.setState({visao:acao})}
                    OnIniciar={()=>this.Iniciar()}
                    OnVoltar = {() => this.setState({visao:"painel.pesquisar"})}
                />
            : ""
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


export default ReceitaForm;

