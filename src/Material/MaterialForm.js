import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class MaterialForm extends React.Component
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
                ,embalagemId:0
                ,visao:process.env.REACT_APP_VISAO_INFORMANDO
                ,mensagens:null
                ,listaProdutoBuscou:false
                ,listaEmbalagemBuscou:false
            };
        }
        else
        {             
            this.state={
                id:this.props.entidade.id
               ,visao:'processando'
               ,mensagens:null
               ,listaProdutoBuscou:false
               ,listaEmbalagemBuscou:false
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
        ,produto:{id:this.state.produtoId}
        ,embalagem:{id:this.state.embalagemId}
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

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/excluir/" + entidade.id
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
               ,embalagemId:resposta.entidade.embalagem.id
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
            let url = process.env.REACT_APP_SERVER_URL + "/api/material/salvar";

            axios.post(process.env.REACT_APP_SERVER_URL + "/api/material/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/material/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
    }

    SisManterConsultar(entidade)
    {

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/material/consultar/" + entidade.id
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
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/embalagem/listar",window.getCabeca()).then((resposta)=>this.Listou('embalagem',resposta));
    }

    Listou(tipo, resposta)
    {
        if(tipo=='produto')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaProduto:resposta.data.dadosLista, listaProdutoBuscou:true});
            }
    
        }else if(tipo=='embalagem')
        {
            if(resposta.request.status == 200)
            {
                this.setState({listaEmbalagem:resposta.data.dadosLista, listaEmbalagemBuscou:true});
            }
    
        }
    }

    Validar(entidade)
    {
        let validar = {ok:true, mensagens:[]};
        let retorno = {};

        if(entidade.produto.id == 0)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe o produto.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }

        if(entidade.embalagem.id == 0)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe a embalagem.")
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

            {this.state.listaProdutoBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputProduto" 
                    onChange={(o)=>this.setState({produtoId:o.target.value})}
                    defaultValue={this.state.produtoId}
                    value={this.state.produtoId}
                >
            
                {this.state.listaProduto != null ?

                    this.state.listaProduto.map( (entidade) =>
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

            {this.state.listaEmbalagemBuscou==true ?
                <select 
                    class="form-control form-control-sm" 
                    id="InputEmbalagem" 
                    onChange={(o)=>this.setState({embalagemId:o.target.value})}
                    defaultValue={this.state.embalagemId}
                    value={this.state.embalagemId}
                >
            
                {this.state.listaEmbalagem != null ?

                    this.state.listaEmbalagem.map( (entidade) =>
                    <option 
                        value={entidade.id} 
                        >{entidade.nome + ' com ' + entidade.capacidade + ' ' + entidade.unidadeMedida.nome}</option> 
                    )
                : ""
                }
                <option value="0" >Informe a embalagem</option>

                </select>
                :
                <div></div>
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


export default MaterialForm;

