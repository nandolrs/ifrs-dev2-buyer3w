import React from 'react';
import axios from 'axios';
import FormBotoes from '../SisPadrao/FormBotoes'
import FormBotoesDetalhe from '../SisPadrao/FormBotoesDetalhe'

import SisMensagemView from '../SisPadrao/SisMensagemView';
import SisManterView from '../SisPadrao/SisManterView';

class UnidadeMedidaForm extends React.Component
{
    constructor(props)
    {        
        super(props);
        if(this.props.entidade.id==0)
        {
            this.state={
                 id:0
                ,nome:''
                ,sigla:''
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
    }
        
    Salvar()
    {
        let entidade =  {
        id:this.state.id
        ,nome:this.state.nome
        ,sigla:this.state.sigla
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

        axios.get(process.env.REACT_APP_SERVER_URL + "/api/UnidadeMedida/excluir/" + entidade.id
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
            //this.props.OnPesquisar(resposta);
        }
        else if(acao =='consultou')
        {
            debugger;

            let estado={
                id:resposta.entidade.id
               ,nome:resposta.entidade.nome
               ,sigla:resposta.entidade.sigla
               ,lista:null
               ,visao:process.env.REACT_APP_VISAO_INFORMANDO
            };
            this.setState(estado);
        }
        else if(acao =='excluiu')
        {
            debugger;

            this.setState({visao:resposta.visao, mensagens:resposta.mensagens});
            //this.props.OnPesquisar(resposta);
        }
   //     this.setState(resposta);
    }

    SisManterSalvar(entidade)
    {
        this.setState({visao:'processando'});

        debugger;

        if(entidade.id==0)
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/UnidadeMedida/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
        }
        else
        {
            axios.post(process.env.REACT_APP_SERVER_URL + "/api/UnidadeMedida/salvar"
                ,entidade
                ,window.getCabeca()
            )
            .then((resposta)=>this.Salvou(resposta))
            .catch((resposta) => this.Salvou(resposta));
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
            ,mensagens:window.ToMensagens("Erro ao salvar registro, repita a opera????o.")
            };
        }

        this.Evento(retorno, 'salvou');

    }


    SisManterConsultar(entidade)
    {
        debugger;
        axios.get(process.env.REACT_APP_SERVER_URL + "/api/UnidadeMedida/consultar/" + entidade.id
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


        //this.props.OnEvento(retorno, 'consultou');
        this.Evento(retorno, 'consultou');
    }
    Validar(entidade)
    {
        let validar = {ok:true, mensagens:[]};
        let retorno = {};

        if(entidade.nome.length == 0)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe o nome.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }
//testando pelo intellij
        if(entidade.nome.length < 3)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe ao menos 3 caracteres no nome.")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }

        if(entidade.sigla.length < 1)
        {
            retorno = {visao:"mensagem.erro"
            ,mensagens:window.ToMensagens("Informe uma unidade de medida com pelo menos 1 caracteres")
            };
            validar = {ok:false, estado:retorno};
            return validar;
        }
        return validar;

    }
    //ok


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

            <input type="text" class="form-control" id="inputSigla"  
                aria-describedby="siglaHelp" 
                placeHolder="Informe o sigla." 
                onChange={(o)=>this.setState({sigla:o.target.value})}
                value={this.state.sigla}
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


export default UnidadeMedidaForm;

